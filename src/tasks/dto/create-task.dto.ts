import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @Length(4, 255)
  readonly description: string;

  readonly owner: string;
}
