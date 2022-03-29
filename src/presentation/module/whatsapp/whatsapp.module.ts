import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { WhatsappDataSource } from "@bailyes/data/data_source/whatsapp/whatsapp.datasource";
import { WhatsappDatasourceImpl } from "@bailyes/data/data_source/whatsapp/whatsapp_impl.datasource";
import { WhatsappRepository } from "@bailyes/domain/repositories/whatsapp/whatsapp.repository";
import { WhatsappRepositoryImpl } from "@bailyes/data/repositories/whatsapp/whatsapp.repository";
import { WhatsappConnectUseCase } from "@bailyes/domain/use_cases/whatsapp_connect.usecase";
import { HttpHookClient } from "@bailyes/data/clients/http_hook.client";
import { WhatsappController } from "@bailyes/presentation/controller/whatsapp/whatsapp.controller";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: WhatsappDataSource,
      useClass: WhatsappDatasourceImpl
    },
    {
      provide: WhatsappRepository,
      useClass: WhatsappRepositoryImpl,
    },
    WhatsappConnectUseCase,
    HttpHookClient,
  ],
  controllers: [WhatsappController],
})
export class WhatsappModule {}