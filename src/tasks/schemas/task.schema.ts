import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { STATUS_TYPE } from '../../enums/enums';
import { User } from '../../users/schemas/user.schema';
import { Project } from 'src/projects/schemas/project.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: STATUS_TYPE })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  project: Project[];
}

export const TasksSchema = SchemaFactory.createForClass(Task);
