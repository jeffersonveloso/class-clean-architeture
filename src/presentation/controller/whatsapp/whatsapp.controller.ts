import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WhatsappConnectUseCase } from '@baileys/domain/use_cases/whatsapp_connect.usecase';
import {
  SentMessageSuccess,
  VoidSuccess,
} from '@baileys/domain/entities/response/response';
import {
  ConnectionEntity,
  OutputButtonsMessage,
  OutputButtonsMessageWithImage,
  OutputContactMessage,
  OutputLocationMessage,
  OutputMentionsMessage,
  OutputReactionMessage,
  OutputReplyMessage,
  OutputTemplateMessage,
  OutputTemplateMessageWithImage,
  OutputTextMessage,
  ReadingMessages,
  UpdatePresence,
} from '@baileys/domain/entities/whatsapp/whatsapp.entity';
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

@Controller('whatsapp')
@ApiTags('Rotinas da automação do whatsapp')
export class WhatsappController {
  constructor(
    private readonly connectUseCase: WhatsappConnectUseCase,
    private readonly sendTextMessageUseCase: WhatsappSendTextMessageUseCase,
    private readonly sendReplyMessageUseCase: WhatsappSendReplyMessageUseCase,
    private readonly sendMentionsMessageUseCase: WhatsappSendMentionsMessageUseCase,
    private readonly sendContactMessageUseCase: WhatsappSendContactMessageUseCase,
    private readonly sendLocationMessageUseCase: WhatsappSendLocationMessageUseCase,
    private readonly sendButtonsMessageUseCase: WhatsappSendButtonsMessageUseCase,
    private readonly sendTemplateMessageUseCase: WhatsappSendTemplateMessageUseCase,
    private readonly sendReactionMessageUseCase: WhatsappSendReactionMessageUseCase,
    private readonly sendButtonsMessageWithImageUseCase: WhatsappSendButtonsMessageWithImageUseCase,
    private readonly sendTemplateMessageWithImageUseCase: WhatsappSendTemplateMessageWithImageUseCase,
    private readonly updatePresenceUseCase: WhatsappUpdatePresenceUseCase,
    private readonly readingMessagesUseCase: WhatsappReadingMessagesUseCase,
  ) {}

  @Post('connect')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: VoidSuccess,
    description: 'Retorna o sucesso ao conectar com o whatsapp',
  })
  @ApiOperation({
    summary: 'Chamada para realizar a conexão com o whatsapp',
  })
  async connect(@Body() body: ConnectionEntity): Promise<VoidSuccess> {
    return this.connectUseCase.call(body);
  }

  @Post(':instanceKey/send-text-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary: 'Envia uma mensagem utilizando a sessão.',
  })
  async sendTextMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputTextMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendTextMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-reply-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary: 'Envia uma mensagem de resposta utilizando a sessão.',
  })
  async sendReplyMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputReplyMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendReplyMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-mentions-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary: 'Menciona um usuário em uma conversa utilizando a sessão.',
  })
  async sendMentionsMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputMentionsMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendMentionsMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-contact-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary: 'Enviar um contato em uma conversa utilizando a sessão.',
  })
  async sendContactMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputContactMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendContactMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-location-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary: 'Enviar uma localização em uma conversa utilizando a sessão.',
  })
  async sendLocationMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputLocationMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendLocationMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-buttons-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary: 'Enviar botões em uma conversa utilizando a sessão.',
  })
  async sendButtonsMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputButtonsMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendButtonsMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-template-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary: 'Envia botões personalizados em uma conversa utilizando a sessão.',
  })
  async sendTemplateMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputTemplateMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendTemplateMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-reaction-message')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary:
      'Envia uma reação para uma determinada mensagem em uma conversa utilizando a sessão.',
  })
  async sendReactionMessage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputReactionMessage,
  ): Promise<SentMessageSuccess> {
    return this.sendReactionMessageUseCase.call(body);
  }

  @Post(':instanceKey/send-buttons-message-image')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary:
      'Envia uma botões e uma imagem em uma conversa utilizando a sessão.',
  })
  async sendButtonsMessageWithImage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputButtonsMessageWithImage,
  ): Promise<SentMessageSuccess> {
    return this.sendButtonsMessageWithImageUseCase.call(body);
  }

  @Post(':instanceKey/send-template-message-image')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SentMessageSuccess,
    description: 'Retorna a mensagem enviada.',
  })
  @ApiOperation({
    summary:
      'Envia uma botões personalizados e uma imagem em uma conversa utilizando a sessão.',
  })
  async sendTemplateMessageWithImage(
    @Query('instanceKey') instanceKey: string,
    @Body() body: OutputTemplateMessageWithImage,
  ): Promise<SentMessageSuccess> {
    return this.sendTemplateMessageWithImageUseCase.call(body);
  }

  @Post(':instanceKey/update-presence')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: VoidSuccess,
    description: '',
  })
  @ApiOperation({
    summary: 'Atualiza o estado em uma conversa utilizando a sessão.',
  })
  async updatePresence(
    @Query('instanceKey') instanceKey: string,
    @Body() body: UpdatePresence,
  ): Promise<VoidSuccess> {
    return this.updatePresenceUseCase.call(body);
  }

  @Post(':instanceKey/reading-messages')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: VoidSuccess,
    description: '',
  })
  @ApiOperation({
    summary: 'Marca mensagens como lida em uma conversa utilizando a sessão.',
  })
  async readingMessages(
    @Query('instanceKey') instanceKey: string,
    @Body() body: ReadingMessages,
  ): Promise<VoidSuccess> {
    return this.readingMessagesUseCase.call(body);
  }
}
