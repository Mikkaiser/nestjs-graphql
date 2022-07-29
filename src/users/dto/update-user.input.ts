import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'This field should not be empty' })
  @IsOptional()
  name?: string;

  @IsNotEmpty({ message: 'This field should not be empty' })
  @IsEmail()
  @IsOptional()
  email?: string;
}
