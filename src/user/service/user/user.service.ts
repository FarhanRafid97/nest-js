import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from 'src/user/dto/user.dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: UserDto): Promise<UserDto> {
    const dataUser = await this.prisma.users.create({ data: user });
    return dataUser;
  }

  findALl(): string {
    return 'this.users;';
  }
}
