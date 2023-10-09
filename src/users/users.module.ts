import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UsersSchema } from './schemas/user.schema';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TokenModule,
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
  ],
})
export class UsersModule {}
