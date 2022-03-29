import { Injectable } from "@nestjs/common";
import makeWASocket, { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, useSingleFileAuthState } from '@adiwajshing/baileys'
import P from 'pino';
import {
  ConnectionEntity,
  ConnectionState,
  EventTypes,
  StatusTypes
} from "@bailyes/domain/entities/whatsapp/whatsapp.entity";
import { WhatsappDataSource } from "@bailyes/data/data_source/whatsapp/whatsapp.datasource";
import { Boom } from '@hapi/boom'
import { HttpHookClient } from "@bailyes/data/clients/http_hook.client";
import { VoidSuccess } from "@bailyes/domain/entities/response/response";


const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json')

@Injectable()
export class WhatsappDatasourceImpl implements WhatsappDataSource {
  socket?: ReturnType<typeof makeWASocket>;
  connectionEntity: ConnectionEntity;

  constructor(private  readonly hook: HttpHookClient) { }

  private notifyHook(event: EventTypes, status: StatusTypes, qr?: string): Promise<VoidSuccess> {
    return new Promise(async (resolve, reject) => {
      const body = {
        event,
        status,
        qr,
        instanceKey: this.connectionEntity.instanceKey
      }

      this.hook.notify(this.connectionEntity.webhookUrl, body).subscribe(        (response) => {
        if (response.status >= 200 && response.status <= 299) {
          return resolve(new VoidSuccess({success: true}));
        } else {
          return reject(response.data);
        }
      });
    });
  }

  private streamEvents(): Promise<VoidSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        this.socket.ev.on ('creds.update', saveState);
        this.socket.ev.on('connection.update', async (update) => {
          const { connection, lastDisconnect } = update
          if(connection === ConnectionState.close) {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
              await this.notifyHook(EventTypes.CONNECTION, StatusTypes.RECONNECTING, update.qr);
              this.startConnection(this.connectionEntity).then((response) => {
                return resolve(new VoidSuccess({success: true}));
              }).catch((e) => {
                return reject(e);
              });
            } else {
              //aqui tu completa...
              return resolve(await this.notifyHook(EventTypes.CONNECTION, StatusTypes.LOGGED_OUT, null));
            }
          } else if(connection === ConnectionState.open) {
            console.log('opened connection')
            return resolve(await this.notifyHook(EventTypes.CONNECTION, StatusTypes.CONNECTED, null));
          }

          if (update.qr) await this.notifyHook(EventTypes.CONNECTION, StatusTypes.CONNECTING, update.qr);
        });
      } catch(e) {
        console.log(e);
        return reject(e);
      }
    });
  }

  startConnection(connection: ConnectionEntity): Promise<VoidSuccess> {
    return new Promise(async (resolve, reject) => {
      try {
        this.connectionEntity ??= connection;
        const { version, isLatest } = await fetchLatestBaileysVersion();

        this.socket = makeWASocket({
          version,
          logger: P({ level: 'trace' }),
          printQRInTerminal: true,
          auth: state,
        });

        return resolve(await this.streamEvents());
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    });
  }


}