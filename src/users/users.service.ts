import { CreateUserInput } from './dto/create-user.input';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserInput): Promise<Users> {
    const user = await this.usersRepository.create(data);
    const userSaved = await this.usersRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('We have a problem');
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<Users> {
    const user = await this.findOne(id);

    await this.usersRepository.update(user, { ...data });

    const userUpdated = Object.assign(user, data);

    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDeleted = await this.usersRepository.delete(user);

    if (userDeleted) return true;

    return false;
  }
}
