import { Injectable } from '@nestjs/common';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { OutputButtonsMessageWithImage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappSendButtonsMessageWithImageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputButtonsMessageWithImage): Promise<SentMessageSuccess> {
    return this.repository.sendButtonsMessageWithImage(message);
  }
}
