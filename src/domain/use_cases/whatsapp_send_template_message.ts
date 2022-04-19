import { Injectable } from '@nestjs/common';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';
import { OutputTemplateMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';

@Injectable()
export class WhatsappSendTemplateMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputTemplateMessage): Promise<SentMessageSuccess> {
    return this.repository.sendTemplateMessage(message);
  }
}
