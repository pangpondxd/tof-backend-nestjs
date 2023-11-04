import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn({ username, password }: SignInDto): Promise<any> {
    const user = await this.usersService.find({
      where: { username },
      select: ['password', 'username', 'id'],
    });
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (password !== JSON.parse(originalText)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    await this.userRepository.save({ ...user, token });
    return {
      access_token: token,
    };
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    // return result;
  }

  async signOut({ id }: { id: number }) {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.save({ ...user, token: null });
  }
}
