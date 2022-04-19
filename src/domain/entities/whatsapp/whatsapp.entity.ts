import { ApiProperty, ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';

export enum ConnectionState {
  open = 'open',
  close = 'close',
  connecting = 'connecting',
}

export enum EventTypes {
  QRCODE = 'QRCODE',
  CONNECTION = 'CONNECTION',
  RECEIVED_MESSAGE = 'RECEIVED_MESSAGE',
  MESSAGE_DELIVERY_STATUS = 'MESSAGE_DELIVERY_STATUS',
  INCOMING_CALL = 'INCOMING_CALL',
  BATTERY_LEVEL = 'BATTERY_LEVEL',
}

export enum StatusTypes {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  REPLACED = 'REPLACED',
  CONNECTING = 'CONNECTING',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  CRASHED = 'CRASHED',
  RECONNECTING = 'RECONNECTING',
  LOGGED_OUT = 'LOGGED_OUT',
}

export enum WebMessageInfoStatus {
  ERROR = 0,
  PENDING = 1,
  SERVER_ACK = 2,
  DELIVERY_ACK = 3,
  READ = 4,
  PLAYED = 5,
  DELETED = 6,
}

export enum PresenceTypes {
  unavailable = 'unavailable',
  available = 'available',
  composing = 'composing',
  recording = 'recording',
  paused = 'paused',
}

export class ConnectionEntity {
  @ApiProperty()
  webhookUrl: string;

  @ApiProperty()
  instanceKey: string;

  @ApiProperty({ default: false })
  disableWebhook: boolean;
}

class DefaultParameters {
  @ApiProperty()
  to: string;
}

export interface AccountInfo {
  exists: boolean;
  jid: string;
}

class TextMessage {
  @ApiProperty()
  text: string;
}

export class OutputTextMessage extends DefaultParameters {
  @ApiProperty()
  textMessage: TextMessage;
}

//PRECISA INCLUIR OUTROS TIPOS DE RESPOSTA
export class OutputReplyMessage extends DefaultParameters {
  @ApiPropertyOptional()
  participant?: string;

  @ApiProperty()
  answer: TextMessage;

  @ApiProperty()
  messageId: string;

  @ApiProperty()
  message: Record<string, any>;
}

class MentionsMessageContent {
  @ApiProperty()
  text: string;

  @ApiProperty({ type: [String] })
  mentions: string[];
}

export class OutputMentionsMessage extends DefaultParameters {
  @ApiProperty()
  mentionsMessage: MentionsMessageContent;
}

class ContactMessageContent {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  organization?: string;

  @ApiProperty()
  phoneNumber: string;
}

export class OutputContactMessage extends DefaultParameters {
  @ApiProperty()
  contactMessage: ContactMessageContent;
}

class LocationData {
  @ApiProperty()
  degreesLatitude: number;

  @ApiProperty()
  degreesLongitude: number;
}

class LocationMessageContent {
  @ApiProperty()
  location: LocationData;
}

export class OutputLocationMessage extends DefaultParameters {
  @ApiProperty()
  locationMessage: LocationMessageContent;
}

class ButtonText {
  @ApiProperty()
  displayText: string;
}
class ButtonsData {
  @ApiProperty()
  buttonId: string;

  @ApiProperty()
  buttonText: ButtonText;

  @ApiProperty()
  type: number;
}

class ButtonsMessageContent {
  @ApiProperty()
  text: string;

  @ApiProperty()
  footer: string;

  @ApiProperty({ default: 1 })
  headerType: number;

  @ApiProperty({ type: [ButtonsData] })
  buttons: ButtonsData[];
}

export class OutputButtonsMessage extends DefaultParameters {
  @ApiProperty()
  buttonsMessage: ButtonsMessageContent;
}

class ButtonsMessageWithImageContent {
  @ApiProperty()
  caption: string;

  @ApiProperty()
  footerText: string;

  @ApiProperty({ default: 4 })
  headerType: number;

  @ApiProperty()
  mediaUrl: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty({ default: 'image' })
  mediaType: string;

  @ApiProperty({ type: [ButtonsData] })
  buttons: ButtonsData[];
}

export class OutputButtonsMessageWithImage extends DefaultParameters {
  @ApiProperty()
  buttonsMessage: ButtonsMessageWithImageContent;
}

class UrlButtonContent {
  @ApiProperty()
  displayText: string;

  @ApiProperty()
  url: string;
}

class UrlButton {
  @ApiProperty({ required: true })
  index: number;

  @ApiProperty()
  urlButton: UrlButtonContent;
}

class CallButtonContent {
  @ApiProperty()
  displayText: string;

  @ApiProperty()
  phoneNumber: string;
}

class CallButton {
  @ApiProperty({ required: true })
  index: number;

  @ApiProperty()
  callButton: CallButtonContent;
}

class QuickReplyButtonContent {
  @ApiProperty()
  displayText: string;

  @ApiProperty()
  id: string;
}
class QuickReplyButton {
  @ApiProperty({ required: true })
  index: number;

  @ApiProperty()
  quickReplyButton: QuickReplyButtonContent;
}

export class TemplateButtons {
  @ApiPropertyOptional({ required: false })
  urlButton?: UrlButton;

  @ApiPropertyOptional({ required: false })
  callButton?: CallButton;

  @ApiPropertyOptional({ required: false })
  quickReplyButton?: QuickReplyButton;
}

class TemplateMessageContent {
  @ApiProperty()
  text: string;

  @ApiProperty()
  footer: string;

  @ApiProperty()
  templateButtons: TemplateButtons;
}

export class OutputTemplateMessage extends DefaultParameters {
  @ApiProperty()
  templateMessage: TemplateMessageContent;
}

class TemplateMessageWithImageContent {
  @ApiProperty()
  caption: string;

  @ApiProperty()
  footer: string;

  @ApiProperty()
  mediaUrl: string;

  @ApiProperty({ default: 'image' })
  mediaType: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  templateButtons: TemplateButtons;
}

export class OutputTemplateMessageWithImage extends DefaultParameters {
  @ApiProperty()
  templateMessage: TemplateMessageWithImageContent;
}

class ListSections {
  @ApiProperty()
  title: string;

  @ApiProperty()
  rows: ListSectionRow[];
}

class ListSectionRow {
  @ApiProperty()
  title: string;

  @ApiProperty()
  rowId: string;

  @ApiPropertyOptional()
  description?: string;
}

class ListMessageContent {
  @ApiProperty()
  text: string;

  @ApiProperty()
  footer: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  buttonText: string;

  @ApiProperty({ type: [ListSections] })
  sections: ListSections[];
}

export class OutputListMessage extends DefaultParameters {
  @ApiProperty()
  listMessage: ListMessageContent;
}

interface ReactionData {
  text: string;
  key: MessageKey;
}

class ReactionMessageContent {
  @ApiProperty()
  react: Record<string, ReactionData>;
}

export class OutputReactionMessage extends DefaultParameters {
  @ApiProperty()
  reactionMessage: ReactionMessageContent;
}

interface MessageKey {
  remoteJid?: string;
  fromMe?: boolean;
  id?: string;
  participant?: string;
}

export class UpdatePresence extends DefaultParameters {
  @ApiProperty({ enum: PresenceTypes, default: PresenceTypes.composing })
  presence: PresenceTypes;
}

export class ReadingMessages extends DefaultParameters {
  @ApiProperty()
  participant: string;

  @ApiProperty()
  messageId: string;
}

export interface MessageSent {
  to: string;
  messageId: string;
  status: string;
  message:
    | TextMessage
    | OutputReplyMessage
    | MentionsMessageContent
    | ContactMessageContent
    | LocationMessageContent
    | ButtonsMessageContent
    | ButtonsMessageWithImageContent
    | OutputListMessage
    | TemplateMessageContent
    | TemplateMessageWithImageContent
    | ReactionMessageContent;
}
