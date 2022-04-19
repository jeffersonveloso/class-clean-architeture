import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { UpdatePresence } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { Injectable } from '@nestjs/common';
import { VoidSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappUpdatePresenceUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(data: UpdatePresence): Promise<VoidSuccess> {
    return this.repository.updatePresence(data);
  }
}
