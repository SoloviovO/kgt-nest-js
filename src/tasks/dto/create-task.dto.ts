import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AppError } from 'src/common/constants/errors';
import { STATUS_TYPE } from 'src/common/enums/enums';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Clean room',
    description: 'Title of task',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    required: false,
    example: 'Wipe all the furniture, wipe the dust',
    description: 'Description of task',
  })
  @IsOptional()
  @IsString()
  @Length(4, 255)
  readonly description: string;

  @ApiProperty({
    required: false,
    example: 'new',
    description: 'Status of task',
    enum: STATUS_TYPE,
  })
  @IsOptional()
  @IsEnum(STATUS_TYPE, { message: AppError.TASK_STATUS })
  readonly status: STATUS_TYPE;
}
