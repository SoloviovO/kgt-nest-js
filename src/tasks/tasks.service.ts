import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-taskStatus.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async create(taskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(taskDto);
    return newTask.save();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, taskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, taskDto, { new: true });
  }

  async updateStatus(id: string, taskDto: UpdateTaskStatusDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, taskDto, { new: true });
  }
}
