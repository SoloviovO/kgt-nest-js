import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { UpdateTaskStatusDto } from './dto/update-taskStatus.dto';
import { AuthGuard } from '../users/users.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getTasks(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any): Promise<Task> {
    const userId = req.user;

    const taskWithUserId = {
      ...createTaskDto,
      userId,
    };
    console.log(taskWithUserId);

    return this.taskService.create(taskWithUserId);
    // return this.taskService.create(createTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<Task> {
    return this.taskService.remove(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.updateStatus(id, updateTaskStatusDto);
  }
}
