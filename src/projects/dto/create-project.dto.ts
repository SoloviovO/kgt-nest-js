import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Prometheus',
    description: 'Title of project',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Passionate cleaning',
    description: 'Description of project',
  })
  @IsOptional()
  @IsString()
  @Length(4, 255)
  readonly description: string;
}
