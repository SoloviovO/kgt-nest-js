import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Project, ProjectsSchema } from 'src/projects/schemas/project.schema';
import { TaskService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TasksSchema } from './schemas/task.schema';

@Module({
  controllers: [TasksController],
  providers: [TaskService, JwtService],
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TasksSchema },
      { name: Project.name, schema: ProjectsSchema },
      ,
    ]),
  ],
})
export class TaskModule {}
