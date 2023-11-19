import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as CryptoJS from 'crypto-js';
import { Role } from 'src/enums/role.enum';
import { SharedService } from 'src/shared/shared.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const updated_at = new Date();
    await this.findDuplicateAccount(createUserDto);
    const password = CryptoJS.AES.encrypt(
      JSON.stringify(createUserDto.password),
      process.env.PASSWORD_SECRET,
    ).toString();
    const payload: User = {
      ...createUserDto,
      updated_at,
      password,
      role: Role.User,
    };
    return await this.userRepository.save(payload);
  }

  async findDuplicateAccount(createUserDto: CreateUserDto) {
    const { username, email, phone } = createUserDto;
    const existingUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const existingPhone = await this.userRepository.findOne({
      where: { phone },
    });
    if (existingPhone) {
      throw new HttpException(
        'Phone number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  find(options: FindOneOptions) {
    return this.userRepository.findOne(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
