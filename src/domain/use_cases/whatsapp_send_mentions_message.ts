import { Injectable } from '@nestjs/common';
import { SentMessageSuccess } from '@baileys/domain/entities/response/response';
import { OutputMentionsMessage } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';

@Injectable()
export class WhatsappSendMentionsMessageUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(message: OutputMentionsMessage): Promise<SentMessageSuccess> {
    return this.repository.sendMentionsMessage(message);
  }
}
