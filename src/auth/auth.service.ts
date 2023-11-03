import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn({ username, password }: SignInDto): Promise<any> {
    const user = await this.usersService.find(username);
    const bytes = CryptoJS.AES.decrypt(
      user?.password,
      process.env.PASSWORD_SECRET,
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (password !== JSON.parse(originalText)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    // return result;
  }
}
