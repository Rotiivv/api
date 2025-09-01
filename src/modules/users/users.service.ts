import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepo.findByEmail(email);

    if (emailTaken) throw new ConflictException('This email already in use.');

    const hashedPassword = await hash(password, 12);

    return await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async getUserById(userId: string) {
    const user = await this.usersRepo.findByUserId(userId);

    return user;
  }
}
