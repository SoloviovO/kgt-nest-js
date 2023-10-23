import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Task, TasksSchema } from 'src/tasks/schemas/task.schema';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectsSchema } from './schemas/project.schema';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, JwtService],
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectsSchema },
      { name: Task.name, schema: TasksSchema },
    ]),
  ],
})
export class ProjectsModule {}
