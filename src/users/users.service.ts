import { CreateUserInput } from './dto/create-user.input';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(data: CreateUserInput): Promise<Users> {
    const user = await this.usersRepository.create(data);
    const userSaved = await this.usersRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('We have a problem');
    }

    return userSaved;
  }
}
