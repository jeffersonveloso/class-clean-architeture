import { Injectable } from "@nestjs/common";
import makeWASocket, { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, useSingleFileAuthState } from '@adiwajshing/baileys'
import P from 'pino';

const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json')

@Injectable()
class WhatsappDatasourceImpl implements WhatsappDataSource {


startConnection(): Promise<any> {
    sock: Record<string, unknow>

    return new Promise(async (resolve, reject) => {
      const { version, isLatest } = await fetchLatestBaileysVersion();

      const sock = makeWASocket({
        version,
        logger: P({ level: 'trace' }),
        printQRInTerminal: true,
        auth: state,
      });

      sock.ev.on ('creds.update', saveState);
    });
  }
}