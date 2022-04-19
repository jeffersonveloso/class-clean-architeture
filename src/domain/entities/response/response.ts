import { MessageSent } from '@baileys/domain/entities/whatsapp/whatsapp.entity';

export class VoidSuccess {
  success: boolean;

  constructor({ success }: { success: boolean }) {
    Object.assign(this, {
      success,
    });
  }
}

export class SentMessageSuccess {
  success: boolean;
  message: MessageSent;

  constructor({
    success,
    message,
  }: {
    success: boolean;
    message: MessageSent;
  }) {
    Object.assign(this, {
      success,
      message,
    });
  }
}
