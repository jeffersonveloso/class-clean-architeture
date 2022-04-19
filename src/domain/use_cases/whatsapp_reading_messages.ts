import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { ReadingMessages } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { Injectable } from '@nestjs/common';
import { VoidSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappReadingMessagesUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(data: ReadingMessages): Promise<VoidSuccess> {
    return this.repository.readingMessages(data);
  }
}
