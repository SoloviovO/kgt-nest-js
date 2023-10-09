import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @Length(4, 255)
  readonly description: string;
}
