import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();
const { DB_HOST } = process.env;

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    TaskModule,
    ProjectsModule,
    MongooseModule.forRoot(DB_HOST),
    UsersModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
