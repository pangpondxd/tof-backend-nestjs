import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { FindOneOptions } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import * as CryptoJS from 'crypto-js';

@Controller('user')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    const token = await this.authService.signIn({
      username: user?.username,
      password: JSON.parse(
        CryptoJS.AES.decrypt(
          user.password,
          process.env.PASSWORD_SECRET,
        ).toString(CryptoJS.enc.Utf8),
      ),
    });
    return { ...user, token };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('user')
  find(@Body() options: FindOneOptions) {
    return this.usersService.find(options);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
