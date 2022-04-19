import { Injectable } from '@nestjs/common';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { OutputButtonsMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappSendButtonsMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputButtonsMessage): Promise<SentMessageSuccess> {
    return this.repository.sendButtonsMessage(message);
  }
}
