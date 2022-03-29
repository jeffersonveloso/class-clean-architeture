import { WhatsappRepository } from "@bailyes/domain/repositories/whatsapp/whatsapp.repository";
import { OutputMessage } from "@bailyes/domain/entities/whatsapp/whatsapp.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WhatsappSendMessage {
  constructor(private readonly repository: WhatsappRepository) {
  }

  call(message: OutputMessage): Promise<any> {
    return this.repository.sendMessage(message);
  }
}