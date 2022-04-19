import { Injectable } from '@nestjs/common';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { OutputTemplateMessageWithImage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappSendTemplateMessageWithImageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputTemplateMessageWithImage): Promise<SentMessageSuccess> {
    return this.repository.sendTemplateMessageWithImage(message);
  }
}
