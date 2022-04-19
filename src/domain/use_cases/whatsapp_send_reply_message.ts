import { Injectable } from '@nestjs/common';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';
import { OutputReplyMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';

@Injectable()
export class WhatsappSendReplyMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputReplyMessage): Promise<SentMessageSuccess> {
    return this.repository.sendReplyMessage(message);
  }
}
