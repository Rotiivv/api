import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { isPublic } from 'src/shared/decorators/IsPublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('IS_PUBLIC', true)
  @Post('signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @isPublic()
  @Post('signin')
  @UsePipes(new ValidationPipe())
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
