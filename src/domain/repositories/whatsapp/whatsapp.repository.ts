import { ConnectionEntity, OutputMessage } from "@bailyes/domain/entities/whatsapp/whatsapp.entity";
import { VoidSuccess } from "@bailyes/domain/entities/response/response";

export abstract class WhatsappRepository {
  public abstract startConnection(connection: ConnectionEntity): Promise<VoidSuccess>;
  public abstract sendMessage(message: OutputMessage): Promise<any>;
}