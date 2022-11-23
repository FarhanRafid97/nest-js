import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { MessageDto } from '../dto/message.dto/message.dto';
import { MessageService } from '../service/message/message.service';

@Controller('/api/v1/message')
export class ControllerController {
  constructor(private messageService: MessageService) {}

  @Post('/:id')
  async create(@Body() message: MessageDto, @Req() req: Request) {
    try {
      const numberId = Number(req.params.id);

      const dataMsg = await this.messageService.sendMessage({
        fromId: req.userId,
        toUserId: numberId,
        ...message,
      });
      return dataMsg;
    } catch (error) {
      console.log(error);
    }
  }
}
