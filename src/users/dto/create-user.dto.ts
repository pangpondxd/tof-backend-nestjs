import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('TH')
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  updated_at: Date;

  created_at: Date;

  role: Role;

  token: string;

  refresh_token: string;
}
