import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import configurations from './configurations';

@Module({
  imports: [
    TaskModule,
    ProjectsModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('dbHost'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    UsersModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
