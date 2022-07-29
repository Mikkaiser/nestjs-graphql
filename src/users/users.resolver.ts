import { UpdateUserInput } from './dto/update-user.input';
import { Users } from './models/user.entity';
import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => Users)
  async user(@Args('id') id: string): Promise<Users> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [Users])
  async users(): Promise<Users[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Mutation(() => Users)
  async createUser(@Args('data') data: CreateUserInput): Promise<Users> {
    return this.usersService.createUser(data);
  }

  @Mutation(() => Users)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<Users> {
    return this.usersService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.usersService.deleteUser(id);
  }
}
