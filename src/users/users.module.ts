import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Users } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
