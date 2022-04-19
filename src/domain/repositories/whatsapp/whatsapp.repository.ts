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
import {
  SentMessageSuccess,
  VoidSuccess,
} from '@baileys/domain/entities/response/response';

export abstract class WhatsappRepository {
  public abstract startConnection(
    connection: ConnectionEntity,
  ): Promise<VoidSuccess>;

  public abstract sendTextMessage(
    message: OutputTextMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendReplyMessage(
    message: OutputReplyMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendMentionsMessage(
    message: OutputMentionsMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendContactMessage(
    message: OutputContactMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendLocationMessage(
    message: OutputLocationMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendButtonsMessage(
    message: OutputButtonsMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendTemplateMessage(
    message: OutputTemplateMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendListMessage(
    message: OutputListMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendReactionMessage(
    message: OutputReactionMessage,
  ): Promise<SentMessageSuccess>;

  public abstract sendButtonsMessageWithImage(
    message: OutputButtonsMessageWithImage,
  ): Promise<SentMessageSuccess>;

  public abstract sendTemplateMessageWithImage(
    message: OutputTemplateMessageWithImage,
  ): Promise<SentMessageSuccess>;

  public abstract updatePresence(data: UpdatePresence): Promise<VoidSuccess>;

  public abstract readingMessages(data: ReadingMessages): Promise<VoidSuccess>;
}
