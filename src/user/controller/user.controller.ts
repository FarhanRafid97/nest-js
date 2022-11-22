import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { validate } from 'class-validator';

import { UserDto } from '../dto/user.dto/user.dto';
import { UserService } from '../service/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async create(@Body() user: UserDto): Promise<UserDto | any> {
    validate(user).then((errors) => {
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
      } else {
        console.log('validation succeed');
      }
    });

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
  findAll(): string {
    return this.userService.findALl();
  }
}
