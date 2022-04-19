import { Injectable } from '@nestjs/common';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';
import { OutputLocationMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';

@Injectable()
export class WhatsappSendLocationMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputLocationMessage): Promise<SentMessageSuccess> {
    return this.repository.sendLocationMessage(message);
  }
}
