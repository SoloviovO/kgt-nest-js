import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenModule } from 'src/token/token.module';
import { TaskModule } from 'src/tasks/tasks.module';
import { Task, TasksSchema } from 'src/tasks/schemas/task.schema';
import { Project, ProjectsSchema } from 'src/projects/schemas/project.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UsersSchema } from './schemas/user.schema';

@Module({
  imports: [
    TokenModule,
    TaskModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UsersSchema },
      { name: Task.name, schema: TasksSchema },
      { name: Project.name, schema: ProjectsSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
