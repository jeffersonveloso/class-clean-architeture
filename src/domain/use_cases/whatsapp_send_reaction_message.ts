import { Injectable } from '@nestjs/common';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';
import { OutputReactionMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';

@Injectable()
export class WhatsappSendReactionMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputReactionMessage): Promise<SentMessageSuccess> {
    return this.repository.sendReactionMessage(message);
  }
}
