import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/message/dto/message.dto/message.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(msg: MessageDto): Promise<MessageDto> {
    console.log(msg);
    const dataUser = await this.prisma.messages.create({ data: msg });
    return dataUser;
  }
}
