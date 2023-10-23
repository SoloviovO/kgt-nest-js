import {
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AppError } from 'src/common/constants/errors';
import { STATUS_TYPE } from 'src/common/enums/enums';

export class UpdateTaskDto {
  @ApiProperty({
    required: false,
    example: 'Clean room',
    description: 'Title of task',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    required: false,
    example: 'Vacuum and pick up childrens toys',
    description: 'Description of task',
  })
  @IsOptional()
  @IsString()
  @Length(4, 255)
  readonly description: string;

  @ApiProperty({
    required: false,
    example: 'in-process',
    description: 'Status of task',
    enum: STATUS_TYPE,
  })
  @IsOptional()
  @IsString()
  @IsEnum(STATUS_TYPE, { message: AppError.TASK_STATUS })
  readonly status: STATUS_TYPE;
}
