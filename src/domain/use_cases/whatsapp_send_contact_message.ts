import { Injectable } from '@nestjs/common';
import { OutputContactMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappSendContactMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputContactMessage): Promise<SentMessageSuccess> {
    return this.repository.sendContactMessage(message);
  }
}
