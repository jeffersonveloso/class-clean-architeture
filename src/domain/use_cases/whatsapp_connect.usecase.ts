import { Injectable } from "@nestjs/common";
import { ConnectionEntity } from "@bailyes/domain/entities/whatsapp/whatsapp.entity";
import { WhatsappRepository } from "@bailyes/domain/repositories/whatsapp/whatsapp.repository";

@Injectable()
export class WhatsappConnectUseCase {
  constructor(private readonly repository: WhatsappRepository) {
  }
  
  call(connection: ConnectionEntity): Promise<any> {
    return this.repository.startConnection(connection);
  }
}