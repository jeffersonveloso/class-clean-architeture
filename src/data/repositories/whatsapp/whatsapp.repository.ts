import { Injectable } from '@nestjs/common';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import {
  ConnectionEntity,
  OutputButtonsMessage,
  OutputButtonsMessageWithImage,
  OutputContactMessage,
  OutputListMessage,
  OutputLocationMessage,
  OutputMentionsMessage,
  OutputTextMessage,
  OutputReactionMessage,
  OutputReplyMessage,
  OutputTemplateMessage,
  OutputTemplateMessageWithImage,
  ReadingMessages,
  UpdatePresence,
} from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappDataSource } from '@baileys/data/data_source/whatsapp/whatsapp.datasource';
import { WhatsAppError } from '@baileys/infra/exceptions/custo_exceptions';
import {
  SentMessageSuccess,
  VoidSuccess,
} from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappRepositoryImpl implements WhatsappRepository {
  constructor(private readonly dataSource: WhatsappDataSource) {}

  async startConnection(connection: ConnectionEntity): Promise<VoidSuccess> {
    try {
      return await this.dataSource.startConnection(connection);
    } catch (e) {
      console.log(e);
      throw new WhatsAppError('error_on_connect_whatsapp', 401);
    }
  }

  async sendTextMessage(
    message: OutputTextMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendTextMessage(message);
    } catch (e) {
      console.log('SEND MESSAGE', e);
      throw new WhatsAppError('error_on_send_message', 400);
    }
  }

  async sendReplyMessage(
    message: OutputReplyMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendReplyMessage(message);
    } catch (e) {
      console.log('SEND REPLY MESSAGE', e);
      throw new WhatsAppError('error_on_send_reply_message', 400);
    }
  }

  async sendMentionsMessage(
    message: OutputMentionsMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendMentionsMessage(message);
    } catch (e) {
      console.log('SEND MENTIONS MESSAGE', e);
      throw new WhatsAppError('error_on_send_mentions_message', 400);
    }
  }

  async sendContactMessage(
    message: OutputContactMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendContactMessage(message);
    } catch (e) {
      console.log('SEND CONTACT MESSAGE', e);
      throw new WhatsAppError('error_on_send_contact_message', 400);
    }
  }

  async sendLocationMessage(
    message: OutputLocationMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendLocationMessage(message);
    } catch (e) {
      console.log('SEND LOCATION MESSAGE', e);
      throw new WhatsAppError('error_on_send_location_message', 400);
    }
  }

  async sendButtonsMessage(
    message: OutputButtonsMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendButtonsMessage(message);
    } catch (e) {
      console.log('SEND BUTTONS MESSAGE', e);
      throw new WhatsAppError('error_on_send_buttons_message', 400);
    }
  }

  async sendTemplateMessage(
    message: OutputTemplateMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendTemplateMessage(message);
    } catch (e) {
      console.log('SEND TEMPLATE MESSAGE', e);
      throw new WhatsAppError('error_on_send_template_message', 400);
    }
  }

  async sendListMessage(
    message: OutputListMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendListMessage(message);
    } catch (e) {
      console.log('SEND LIST MESSAGE', e);
      throw new WhatsAppError('error_on_send_list_message', 400);
    }
  }

  async sendReactionMessage(
    message: OutputReactionMessage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendReactionMessage(message);
    } catch (e) {
      console.log('SEND Reaction MESSAGE', e);
      throw new WhatsAppError('error_on_send_reaction_message', 400);
    }
  }

  async sendButtonsMessageWithImage(
    message: OutputButtonsMessageWithImage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendButtonsMessageWithImage(message);
    } catch (e) {
      console.log('SEND BUTTONS MESSAGE WITH MEDIA', e);
      throw new WhatsAppError('error_on_send_buttons_message_with_image', 400);
    }
  }

  async sendTemplateMessageWithImage(
    message: OutputTemplateMessageWithImage,
  ): Promise<SentMessageSuccess> {
    try {
      return await this.dataSource.sendTemplateMessageWithImage(message);
    } catch (e) {
      console.log('SEND TEMPLATE MESSAGE WITH MEDIA', e);
      throw new WhatsAppError('error_on_send_template_message_with_image', 400);
    }
  }

  async updatePresence(message: UpdatePresence): Promise<VoidSuccess> {
    try {
      return await this.dataSource.updatePresence(message);
    } catch (e) {
      console.log('UPDATE PRESENCE', e);
      throw new WhatsAppError('error_on_update_presence', 400);
    }
  }

  async readingMessages(message: ReadingMessages): Promise<VoidSuccess> {
    try {
      return await this.dataSource.readingMessages(message);
    } catch (e) {
      console.log('READING MESSAGES', e);
      throw new WhatsAppError('error_on_reading_messages', 400);
    }
  }
}
