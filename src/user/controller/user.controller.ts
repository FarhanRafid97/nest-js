import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../service/user/user.service';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async create(@Body(new ValidationPipe()) user: UserDto): Promise<unknown> {
    try {
      const password = await bcrypt.hash(user.password, 10);

      const userData = await this.userService.create({ ...user, password });
      const accessToken = jwt.sign(
        { id: userData.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '4000000s' },
      );
      return { accessToken };
    } catch (error) {
      console.log(error);
      if (error.meta.target?.[0] === 'email') {
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
