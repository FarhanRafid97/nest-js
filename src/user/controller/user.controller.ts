import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto, UserDto } from '../dto/user.dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../service/user/user.service';
import * as jwt from 'jsonwebtoken';

@Controller('api/v1/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
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

  @Post('/login')
  async login(@Body(new ValidationPipe()) auth: AuthDto): Promise<unknown> {
    try {
      const userData = await this.userService.findUser(auth.email);
      if (!userData) {
        return { status: HttpStatus.BAD_REQUEST, msg: 'User Not Found' };
      }
      const isValidPassword = await bcrypt.compare(
        auth.password,
        userData.password,
      );
      if (!isValidPassword) {
        return { status: HttpStatus.BAD_REQUEST, msg: 'Wrong Password' };
      }
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
}
