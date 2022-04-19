import { Injectable } from '@nestjs/common';
import { ConnectionEntity } from '@baileys/domain/entities/whatsapp/whatsapp.entity';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { VoidSuccess } from '@baileys/domain/entities/response/response';

@Injectable()
export class WhatsappConnectUseCase {
  constructor(private readonly repository: WhatsappRepository) {}

  call(connection: ConnectionEntity): Promise<VoidSuccess> {
    return this.repository.startConnection(connection);
  }
}
