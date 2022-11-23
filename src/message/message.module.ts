import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ControllerController } from './controller/controller.controller';
import { MessageService } from './service/message/message.service';

@Module({
  controllers: [ControllerController],
  providers: [MessageService, PrismaService],
})
export class MessageModule {}
