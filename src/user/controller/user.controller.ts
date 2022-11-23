import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto/user.dto';
import { UserService } from '../service/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async create(
    @Body(new ValidationPipe()) user: UserDto,
  ): Promise<UserDto | any> {
    try {
      const post = await this.userService.create(user);
      return post;
    } catch (error) {
      console.log(error.meta.target[0]);
      if (error.meta.target[0] === 'email') {
        return { status: HttpStatus.BAD_REQUEST, msg: 'email alredy taken' };
      } else {
        return { status: HttpStatus.BAD_REQUEST };
      }
    }
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findALl();
  }
}
