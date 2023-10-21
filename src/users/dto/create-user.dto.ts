import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(16, { message: 'Password must not exceed 16 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])/, {
    message: 'Password must contain both upper and lower case letters',
  })
  readonly password: string;
}
