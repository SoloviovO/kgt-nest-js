import { Length } from 'class-validator';

export class UpdateTaskDto {
  readonly title: string;

  @Length(4, 255)
  readonly description: string;
}
