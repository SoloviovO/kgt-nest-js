import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AppValidation } from 'src/common/constants/validation';

export class CreateUserDto {
  @ApiProperty({
    example: 'Test@example.com',
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '123456789Zz',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: AppValidation.PASSWORD_MIN })
  @MaxLength(16, { message: AppValidation.PASSWORD_MAX })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])/, {
    message: AppValidation.PASSWORD_TYPE,
  })
  readonly password: string;
}
