import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  fromId: number;

  @IsNumber()
  toUserId: number;

  @IsString()
  message: string;
}
