import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const user = await this.usersService.create({ name, email, password });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials.');

    const isValidadePassword = await compare(password, user.password);

    if (!isValidadePassword)
      throw new UnauthorizedException('Invalid credentials.');

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
