export enum ConnectionState {
  open = 'open',
  close = 'close',
  connecting = 'connecting'
}

export interface OutputMessage {
  id: string;
  text: string;
}

export enum EventTypes {
  QRCODE = "QRCODE",
  CONNECTION = "CONNECTION",
  RECEIVED_MESSAGE = "RECEIVED_MESSAGE",
  MESSAGE_DELIVERY_STATUS = "MESSAGE_DELIVERY_STATUS",
  INCOMING_CALL = "INCOMING_CALL",
  BATTERY_LEVEL = "BATTERY_LEVEL",
}

export enum StatusTypes {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  REPLACED = "REPLACED",
  CONNECTING = "CONNECTING",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  CRASHED = "CRASHED",
  RECONNECTING = "RECONNECTING",
  LOGGED_OUT = "LOGGED_OUT",
}

export interface ConnectionEntity {
  webhookUrl: string;
  instanceKey: string;
  sectionJson?: string;
}