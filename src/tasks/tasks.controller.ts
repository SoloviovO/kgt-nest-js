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
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/users/users.guard';
import { STATUS_TYPE } from 'src/common/enums/enums';
import { AppError } from 'src/common/constants/errors';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { UpdateTaskStatusDto } from './dto/update-taskStatus.dto';
import { TaskResponse } from './response';

@ApiTags('Task')
@ApiBearerAuth('Bearer')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({ status: 200, type: [TaskResponse] })
  @ApiResponse({ status: 400, description: AppError.ID_NOT_VALID })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit per page',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Task status',
    enum: STATUS_TYPE,
  })
  @ApiQuery({
    name: 'projectId',
    required: false,
    description: 'Project ID',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort by date: createdAt:desc or createdAt:asc',
    example: 'createdAt:desc',
  })
  getTasks(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status: STATUS_TYPE,
    @Query('projectId') projectId: string,
    @Query('sortBy') sortBy: string,
    @Req() req: any,
  ): Promise<{ tasks: Task[]; total: number }> {
    const { _id } = req.user;

    return this.taskService.getAll(page, limit, status, projectId, sortBy, _id);
  }

  @ApiResponse({ status: 200, type: TaskResponse })
  @ApiResponse({ status: 400, description: AppError.ID_NOT_VALID })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 404, description: AppError.USER_NOT_TASK })
  @Get(':id')
  @UseGuards(AuthGuard)
  getOne(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const { _id } = req.user;
    return this.taskService.getById(id, _id);
  }

  @ApiResponse({ status: 201, type: TaskResponse })
  @ApiResponse({ status: 400, description: AppError.VALIDATION_MESSAGE })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 404, description: AppError.USER_NOT_TASK })
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any): Promise<Task> {
    const { _id } = req.user;

    return this.taskService.create(createTaskDto, _id);
  }

  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: AppError.ID_NOT_VALID })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 404, description: AppError.USER_NOT_TASK })
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const { _id } = req.user;
    return this.taskService.remove(id, _id);
  }

  @ApiResponse({ status: 200, type: TaskResponse })
  @ApiResponse({ status: 400, description: AppError.VALIDATION_MESSAGE })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 404, description: AppError.USER_NOT_TASK })
  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<Task> {
    const { _id } = req.user;
    return this.taskService.update(id, updateTaskDto, _id);
  }

  @ApiResponse({ status: 200, type: TaskResponse })
  @ApiResponse({ status: 400, description: AppError.VALIDATION_MESSAGE })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 404, description: AppError.USER_NOT_TASK })
  @Patch(':id/status')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<Task> {
    const { _id } = req.user;
    return this.taskService.updateStatus(id, updateTaskStatusDto, _id);
  }
}
