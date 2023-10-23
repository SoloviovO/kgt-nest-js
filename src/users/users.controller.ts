import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AppError } from 'src/common/constants/errors';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserLoginResponse, UserRegisterResponse } from './response';

@ApiTags('Auth')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 201, type: UserRegisterResponse })
  @ApiResponse({ status: 400, description: AppError.VALIDATION_MESSAGE })
  @ApiResponse({ status: 409, description: AppError.USER_EXIST })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @ApiResponse({ status: 200, type: UserLoginResponse })
  @ApiResponse({ status: 400, description: AppError.USER_BAD_DATA })
  @ApiResponse({ status: 404, description: AppError.USER_NOT_EXIST })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.login(createUserDto);
  }
}
