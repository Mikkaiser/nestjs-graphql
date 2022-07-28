import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'This field should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'This field should not be empty' })
  @IsEmail()
  email: string;
}
