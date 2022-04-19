import { Injectable } from '@nestjs/common';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';
import { OutputListMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';

@Injectable()
export class WhatsappSendListMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputListMessage): Promise<SentMessageSuccess> {
    return this.repository.sendListMessage(message);
  }
}
