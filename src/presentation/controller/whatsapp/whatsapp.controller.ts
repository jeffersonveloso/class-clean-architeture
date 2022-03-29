import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { WhatsappConnectUseCase } from "@bailyes/domain/use_cases/whatsapp_connect.usecase";
import { VoidSuccess } from "@bailyes/domain/entities/response/response";
import { ConnectionEntity } from "@bailyes/domain/entities/whatsapp/whatsapp.entity";

@Controller('whatsapp')
@ApiTags('Rotinas da automação do whatsapp')
export class WhatsappController {
  constructor(
    private  readonly connectUseCase: WhatsappConnectUseCase,
  ) {}

  @Post('connect')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: VoidSuccess,
    description: 'Retorna o sucesso ao conectar com o whatsapp'
  })
  @ApiOperation({
    summary: 'Chamada para realizar a conexão com o whatsapp'
  })
  async connect(
    @Body() body: ConnectionEntity
  ): Promise<VoidSuccess> {
    return this.connectUseCase.call(body);
  }
}