import { Injectable } from "@nestjs/common";
import { WhatsappRepository } from "@bailyes/domain/repositories/whatsapp/whatsapp.repository";
import { ConnectionEntity, OutputMessage } from "@bailyes/domain/entities/whatsapp/whatsapp.entity";
import { WhatsappDataSource } from "@bailyes/data/data_source/whatsapp/whatsapp.datasource";
import { WhatsAppError } from "@bailyes/infra/exceptions/custo_exceptions";
import { VoidSuccess } from "@bailyes/domain/entities/response/response";

@Injectable()
export class WhatsappRepositoryImpl implements WhatsappRepository {

  constructor(private readonly dataSource: WhatsappDataSource) {
  }

  sendMessage(message: OutputMessage): Promise<any> {
    return Promise.resolve(undefined);
  }

  async startConnection(connection: ConnectionEntity): Promise<VoidSuccess> {
    try {
      return await this.dataSource.startConnection(connection);
    } catch (e) {
      console.log(e);
      throw new WhatsAppError('error_on_connect_whatsapp', 401);
    }

  }
}