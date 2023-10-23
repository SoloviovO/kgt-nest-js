import {
  ConflictException,
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

import { TokenService } from 'src/token/token.service';
import { AppError } from 'src/common/constants/errors';
import { Task, TaskDocument } from 'src/tasks/schemas/task.schema';
import { Project, ProjectDocument } from 'src/projects/schemas/project.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private readonly tokenService: TokenService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new ConflictException(AppError.USER_EXIST);

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
    if (!existingUser) throw new NotFoundException(AppError.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!validatePassword)
      throw new BadRequestException(AppError.USER_BAD_DATA);

    const token = await this.tokenService.generateJwtToken(existingUser);

    const userTasks = await this.taskModel.find({ owner: existingUser._id });
    const userProjects = await this.projectModel.find({
      owner: existingUser._id,
    });

    const userResponse = {
      id: existingUser._id,
      email: existingUser.email,
      accessToken: token,
      projects: userProjects,
      tasks: userTasks,
    };

    return userResponse;
  }
}
