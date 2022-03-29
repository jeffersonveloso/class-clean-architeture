import { ConnectionEntity } from "@bailyes/domain/entities/whatsapp/whatsapp.entity";
import { VoidSuccess } from "@bailyes/domain/entities/response/response";


export abstract class WhatsappDataSource {
  public abstract startConnection(connection: ConnectionEntity): Promise<VoidSuccess>;
}