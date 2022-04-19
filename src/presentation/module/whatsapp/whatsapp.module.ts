import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WhatsappDataSource } from '@baileys/data/data_source/whatsapp/whatsapp.datasource';
import { WhatsappDatasourceImpl } from '@baileys/data/data_source/whatsapp/whatsapp_impl.datasource';
import { WhatsappRepository } from '@baileys/domain/repositories/whatsapp/whatsapp.repository';
import { WhatsappRepositoryImpl } from '@baileys/data/repositories/whatsapp/whatsapp.repository';
import { WhatsappConnectUseCase } from '@baileys/domain/use_cases/whatsapp_connect.usecase';
import { HttpHookClient } from '@baileys/data/clients/http_hook.client';
import { WhatsappController } from '@baileys/presentation/controller/whatsapp/whatsapp.controller';
import { WhatsappSendTextMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_text_message';
import { WhatsappSendReplyMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_reply_message';
import { WhatsappSendMentionsMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_mentions_message';
import { WhatsappSendContactMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_contact_message';
import { WhatsappSendLocationMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_location_message';
import { WhatsappSendButtonsMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_buttons_message';
import { WhatsappSendTemplateMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_template_message';
import { WhatsappSendReactionMessageUseCase } from '@baileys/domain/use_cases/whatsapp_send_reaction_message';
import { WhatsappSendButtonsMessageWithImageUseCase } from '@baileys/domain/use_cases/whatsapp_send_buttons_message_with_image';
import { WhatsappSendTemplateMessageWithImageUseCase } from '@baileys/domain/use_cases/whatsapp_send_template_message_with_image';
import { WhatsappUpdatePresenceUseCase } from '@baileys/domain/use_cases/whatsapp_update_presence';
import { WhatsappReadingMessagesUseCase } from '@baileys/domain/use_cases/whatsapp_reading_messages';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: WhatsappDataSource,
      useClass: WhatsappDatasourceImpl,
    },
    {
      provide: WhatsappRepository,
      useClass: WhatsappRepositoryImpl,
    },
    WhatsappConnectUseCase,
    WhatsappSendTextMessageUseCase,
    WhatsappSendReplyMessageUseCase,
    WhatsappSendMentionsMessageUseCase,
    WhatsappSendContactMessageUseCase,
    WhatsappSendLocationMessageUseCase,
    WhatsappSendButtonsMessageUseCase,
    WhatsappSendTemplateMessageUseCase,
    WhatsappSendReactionMessageUseCase,
    WhatsappSendButtonsMessageWithImageUseCase,
    WhatsappSendTemplateMessageWithImageUseCase,
    WhatsappUpdatePresenceUseCase,
    WhatsappReadingMessagesUseCase,
    HttpHookClient,
  ],
  controllers: [WhatsappController],
})
export class WhatsappModule {}
