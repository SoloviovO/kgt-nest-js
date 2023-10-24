import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppError } from 'src/common/constants/errors';
import { STATUS_TYPE } from 'src/common/enums/enums';
import { Project, ProjectDocument } from 'src/projects/schemas/project.schema';
import { isValidObjectId } from 'src/common/helpers/objectId.helper';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-taskStatus.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  private async findTaskByIdAndCheckOwnership(id: string, userId: string) {
    const task = await this.taskModel.findById(id);

    if (!task || task.owner.toString() !== userId) {
      throw new NotFoundException(AppError.USER_NOT_TASK);
    }

    return task;
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    status: STATUS_TYPE | undefined = undefined,
    projectId: string | undefined = undefined,
    sortBy: string | undefined = undefined,
    userId: string,
  ): Promise<{ tasks: Task[]; total: number }> {
    const filter: any = { owner: userId };

    if (status) {
      filter.status = status;
    }

    if (projectId) {
      isValidObjectId(projectId);
      filter.project = projectId;
    }

    const sort: any = {};
    if (sortBy) {
      const parts = sortBy.split(':');
      if (parts.length === 2) {
        const sortField = parts[0];
        const sortOrder = parts[1].toLowerCase() === 'desc' ? -1 : 1;
        sort[sortField] = sortOrder;
      }
    }

    const query = this.taskModel
      .find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const tasks = await query.exec();
    const total = await this.taskModel.countDocuments(filter);

    return { tasks, total };
  }

  async getById(id: string, userId: string): Promise<Task> {
    isValidObjectId(id);
    await this.findTaskByIdAndCheckOwnership(id, userId);
    return this.taskModel.findById(id);
  }

  async create(taskDto: CreateTaskDto, userId: string): Promise<Task> {
    const taskWithUserId = {
      ...taskDto,
      owner: userId,
    };

    const newTask = new this.taskModel(taskWithUserId);
    return newTask.save();
  }

  async remove(id: string, userId: string): Promise<Task> {
    isValidObjectId(id);
    const task = await this.findTaskByIdAndCheckOwnership(id, userId);

    const projects = await this.projectModel.find({ tasks: task._id });

    if (projects.length > 0) {
      for (const project of projects) {
        project.tasks = project.tasks.filter(
          (taskId) => taskId.toString() !== task._id.toString(),
        );
        await project.save();
      }
    }

    return this.taskModel.findByIdAndDelete(id);
  }

  async update(
    id: string,
    taskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    isValidObjectId(id);
    await this.findTaskByIdAndCheckOwnership(id, userId);

    const updatedTask = await this.taskModel.findByIdAndUpdate(id, taskDto, {
      new: true,
    });

    return updatedTask;
  }

  async updateStatus(
    id: string,
    taskDto: UpdateTaskStatusDto,
    userId: string,
  ): Promise<Task> {
    isValidObjectId(id);
    await this.findTaskByIdAndCheckOwnership(id, userId);

    const updatedTask = await this.taskModel.findByIdAndUpdate(id, taskDto, {
      new: true,
    });

    return updatedTask;
  }
}
