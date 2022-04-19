import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { OutputTextMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { Injectable } from '@nestjs/common';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappSendTextMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputTextMessage): Promise<SentMessageSuccess> {
    return this.repository.sendTextMessage(message);
  }
}
