import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppError } from 'src/common/constants/errors';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import { Task, TaskDocument } from 'src/tasks/schemas/task.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<Project> {
    const projectWithUserId = {
      ...createProjectDto,
      owner: userId,
    };
    const newProject = new this.projectModel(projectWithUserId);
    return newProject.save();
  }

  async append(taskId: string, projectId: string): Promise<Project> {
    const task = await this.taskModel.findById(taskId);
    if (!task) throw new NotFoundException(AppError.TASK_NOT_EXIST);

    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException(AppError.PROJECT_NOT_EXIST);

    if (!project.tasks.some((task) => task.toString() === taskId)) {
      project.tasks.push(task);
      await project.save();
    } else {
      throw new BadRequestException(AppError.TASK_ADDED);
    }

    task.project.push(project);
    await task.save();

    const projectWithTask = await this.projectModel
      .findById(projectId)
      .populate('tasks');

    return projectWithTask;
  }
}
