import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    const savedUser = await newUser.save();

    const userResponse = {
      id: savedUser._id,
      email: savedUser.email,
    };

    return userResponse;
  }

  async login(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });

    const validatePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!validatePassword) {
      throw new ConflictException('Email or password is wrong');
    }
    const token = await this.tokenService.generateJwtToken(email);

    const userResponse = {
      id: existingUser._id,
      email: existingUser.email,
      accessToken: token,
    };

    return userResponse;
  }
}
