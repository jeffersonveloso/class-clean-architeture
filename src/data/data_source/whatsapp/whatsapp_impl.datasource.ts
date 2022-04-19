import { Injectable } from '@nestjs/common';
import makeWASocket, {
  AuthenticationState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  proto,
  SocketConfig,
  useSingleFileAuthState,
} from '@adiwajshing/baileys';
import P from 'pino';
import {
  AccountInfo,
  OutputButtonsMessageWithImage,
  ConnectionEntity,
  ConnectionState,
  EventTypes,
  OutputListMessage,
  OutputLocationMessage,
  OutputReactionMessage,
  ReadingMessages,
  OutputReplyMessage,
  StatusTypes,
  OutputTemplateMessage,
  OutputTemplateMessageWithImage,
  UpdatePresence,
  WebMessageInfoStatus,
  OutputMentionsMessage,
  OutputContactMessage,
  OutputButtonsMessage,
  OutputTextMessage,
  TemplateButtons,
} from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappDataSource } from '@baileys/data/data_source/whatsapp/whatsapp.datasource';
import { Boom } from '@hapi/boom';
import { HttpHookClient } from '@baileys/data/clients/http_hook.client';
import {
  SentMessageSuccess,
  VoidSuccess,
} from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappDatasourceImpl implements WhatsappDataSource {
  // Socket config used to configure the WhatsApp socket
  private socketConfig: Partial<SocketConfig> = {
    printQRInTerminal: true,
    logger: P({ level: 'silent' }),
  };

  socket?: ReturnType<typeof makeWASocket>;
  connectionEntity: ConnectionEntity;

  private authState: {
    state: AuthenticationState;
    saveState: () => void;
  };

  constructor(private readonly hook: HttpHookClient) {
    this.authState = useSingleFileAuthState('./auth_info_multi.json');
  }

  createEventUniqueId(): string {
    const unixTimestamp = Math.floor(new Date().getTime() / 1000);
    const uniqueCode = (Math.floor(Math.random() * 100) + 100)
      .toString()
      .substring(1);

    return `${new Date().getFullYear()}${unixTimestamp}${uniqueCode}`;
  }

  private createId(jid: string) {
    if (jid.includes('@g.us') || jid.includes('@s.whatsapp.net')) {
      return jid;
    }

    return jid.includes('-') ? `${jid}@g.us` : `${jid}@s.whatsapp.net`;
  }

  processTemplateButtons(
    templateButtons: TemplateButtons,
  ): Promise<proto.IHydratedTemplateButton[]> {
    return new Promise((resolve, reject) => {
      try {
        let finalButtons: proto.IHydratedTemplateButton[] = [];

        Object.keys(templateButtons).map((button) => {
          finalButtons = [...finalButtons, templateButtons[button]];
        });

        return resolve(finalButtons);
      } catch (error) {
        return reject(error);
      }
    });
  }

  private notifyHook(
    event: EventTypes,
    status: StatusTypes,
    qr?: string,
  ): Promise<VoidSuccess> {
    return new Promise((resolve, reject) => {
      if (this.connectionEntity.disableWebhook) {
        return resolve(new VoidSuccess({ success: true }));
      }

      const body = {
        event,
        status,
        qr,
        instanceKey: this.connectionEntity.instanceKey,
        eventId: this.createEventUniqueId(),
        timestamp: new Date(),
      };

      this.hook
        .notify(this.connectionEntity.webhookUrl, body)
        .subscribe((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return resolve(new VoidSuccess({ success: true }));
          } else {
            return reject(response.data);
          }
        });
    });
  }

  private streamEvents() {
    this.socket.ev.on('creds.update', this.authState.saveState);

    this.socket.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === ConnectionState.close) {
        const shouldReconnect =
          (lastDisconnect.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;

        // reconnect if not logged out
        if (shouldReconnect) {
          await this.notifyHook(
            EventTypes.CONNECTION,
            StatusTypes.RECONNECTING,
            update.qr,
          );

          return await this.startConnection(this.connectionEntity);
        } else {
          //aqui tu completa...
          return await this.notifyHook(
            EventTypes.CONNECTION,
            StatusTypes.LOGGED_OUT,
            null,
          );
        }

        //
      } else if (connection === ConnectionState.open) {
        console.log('opened connection');
        return await this.notifyHook(
          EventTypes.CONNECTION,
          StatusTypes.CONNECTED,
          null,
        );
      }

      if (update.qr) {
        return await this.notifyHook(
          EventTypes.CONNECTION,
          StatusTypes.CONNECTING,
          update.qr,
        );
      }
    });
  }

  startConnection(connection: ConnectionEntity): Promise<VoidSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        this.connectionEntity ??= connection;
        const { version, isLatest } = await fetchLatestBaileysVersion();

        this.socketConfig.auth = this.authState.state;

        this.socket = makeWASocket({
          ...this.socketConfig,
          version,
        });

        this.streamEvents();

        return resolve(
          new VoidSuccess({
            success: true,
          }),
        );
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  }

  // Check if jid is registered on WhatsApp
  private isRegistered(jid: string): Promise<AccountInfo> {
    return new Promise<AccountInfo>(async (resolve, reject) => {
      try {
        if (jid.includes('@g.us')) {
          return { exists: true, jid };
        }

        const [result] = await this.socket?.onWhatsApp(this.createId(jid));

        if (result) {
          return resolve(result);
        }

        return reject('Number not registered on WhatsApp');
      } catch (error) {
        return reject('Instance not connected or an unknow error ocurred.');
      }
    });
  }

  sendTextMessage(message: OutputTextMessage): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const response = await this.socket?.sendMessage(
          jid,
          message.textMessage,
        );

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.textMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendReplyMessage(message: OutputReplyMessage): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        //PRECISA INSERIR OUTROS TIPOS DE RESPOSTA
        const response = await this.socket?.sendMessage(jid, message.answer, {
          quoted: {
            key: {
              remoteJid: this.createId(message.to),
              id: message.messageId,
              participant: message.participant,
            },
            message: message.message,
          },
        });

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.answer,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendMentionsMessage(
    message: OutputMentionsMessage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        //PRECISA INSERIR OUTROS TIPOS DE RESPOSTA
        const response = await this.socket?.sendMessage(
          jid,
          message.mentionsMessage,
        );

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.mentionsMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendContactMessage(
    message: OutputContactMessage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const vcard =
          'BEGIN:VCARD\n' + // metadata of the contact card
          'VERSION:3.0\n' +
          `FN:${message.contactMessage.fullName}\n` + // full name
          `ORG:${message.contactMessage.organization};\n` + // the organization of the contact
          `TEL;type=CELL;type=VOICE;waid=${message.contactMessage.phoneNumber}:${message.contactMessage.phoneNumber}\n` + // WhatsApp ID + phone number
          'END:VCARD';

        const response = await this.socket?.sendMessage(jid, {
          contacts: {
            displayName: message.contactMessage.fullName,
            contacts: [{ displayName: message.contactMessage.fullName, vcard }],
          },
        });

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.contactMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendLocationMessage(
    message: OutputLocationMessage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const response = await this.socket?.sendMessage(
          jid,
          message.locationMessage,
        );

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.locationMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendButtonsMessage(
    message: OutputButtonsMessage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const response = await this.socket?.sendMessage(
          jid,
          message.buttonsMessage,
        );

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.buttonsMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendTemplateMessage(
    message: OutputTemplateMessage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const templateButtons = await this.processTemplateButtons(
          message.templateMessage.templateButtons,
        );

        const response = await this.socket?.sendMessage(jid, {
          ...message.templateMessage,
          templateButtons,
        });

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.templateMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendListMessage(message: OutputListMessage): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const response = await this.socket?.sendMessage(
          jid,
          message.listMessage,
        );

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.listMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendReactionMessage(
    message: OutputReactionMessage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const response = await this.socket?.sendMessage(
          jid,
          message.reactionMessage,
        );

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.reactionMessage, //Precisa retornar apenas a reactionMessage e não sei pq nao aceita
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendButtonsMessageWithImage(
    message: OutputButtonsMessageWithImage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const data = {
          image: {
            url: message.buttonsMessage.mediaUrl,
          },
          footerText: message.buttonsMessage.footerText ?? '',
          caption: message.buttonsMessage.caption,
          buttons: message.buttonsMessage.buttons,
          headerType: message.buttonsMessage.headerType ?? 4,
          mimetype: message.buttonsMessage.mimeType,
        };

        const response = await this.socket?.sendMessage(jid, data);

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.buttonsMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  sendTemplateMessageWithImage(
    message: OutputTemplateMessageWithImage,
  ): Promise<SentMessageSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(message.to);

        const templateButtons = await this.processTemplateButtons(
          message.templateMessage.templateButtons,
        );

        const data = {
          image: {
            url: message.templateMessage.mediaUrl,
          },
          footer: message.templateMessage.footer ?? '',
          caption: message.templateMessage.caption,
          templateButtons,
          mimetype: message.templateMessage.mimeType,
        };

        const response = await this.socket?.sendMessage(jid, data);

        return resolve(
          new SentMessageSuccess({
            success: true,
            message: {
              to: response.key.remoteJid,
              message: message.templateMessage,
              messageId: response.key.id,
              status: WebMessageInfoStatus[response.status],
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  updatePresence(data: UpdatePresence): Promise<VoidSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid } = await this.isRegistered(data.to);

        await this.socket?.sendPresenceUpdate(data.presence, jid);

        return resolve(
          new VoidSuccess({
            success: true,
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  readingMessages(data: ReadingMessages): Promise<VoidSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        const { jid: jidTo } = await this.isRegistered(data.to);
        const { jid: jidParticipant } = await this.isRegistered(
          data.participant,
        );

        await this.socket?.sendReadReceipt(jidTo, jidParticipant, [
          data.messageId,
        ]);

        return resolve(
          new VoidSuccess({
            success: true,
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
