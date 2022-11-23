import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  id?: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
