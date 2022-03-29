import { OutputMessage } from "@baileys/domain/entities/whatsapp/whatsapp.entity";

abstract class WhatsappRepository {
  public abstract startConnection(): Promise<any>;
  public abstract sendMessage(message: OutputMessage): Promise<any>;
}