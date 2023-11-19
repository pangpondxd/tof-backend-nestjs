import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UsersService))
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
  getProfile(@Param(':name') name: string) {
    return this.usersService.find({
      where: {
        name,
      },
    });
  }
}
