import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('logout')
  logOut(@Param(':id') id: number) {
    return this.authService.signOut({ id });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request) {
    if (request.cookies.token) {
      const token = request.cookies.token;
      return this.usersService.find({
        where: {
          token,
        },
      });
    }
  }
}
