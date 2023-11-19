import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SharedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ username, password }: SignInDto): Promise<any> {
    const user = await this.usersService.find({
      where: { username },
      select: ['password', 'username', 'id'],
    });
    if (!user) {
      throw new HttpException(
        'ชื่อบัญชีหรือรหัสผ่านไม่ถูกต้อง',
        HttpStatus.BAD_REQUEST,
      );
    }

    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (password !== JSON.parse(originalText)) {
      throw new HttpException(
        'ชื่อบัญชีหรือรหัสผ่านไม่ถูกต้อง',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    await this.userRepository.save({ ...user, token });
    return {
      access_token: token,
    };
  }

  async signOut({ id }: { id: number }) {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.save({ ...user, token: null });
  }
}
