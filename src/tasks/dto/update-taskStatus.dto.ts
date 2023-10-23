import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AppError } from 'src/common/constants/errors';
import { STATUS_TYPE } from 'src/common/enums/enums';

export class UpdateTaskStatusDto {
  @ApiProperty({
    example: 'completed',
    description: 'Status of task',
    enum: STATUS_TYPE,
  })
  @IsString()
  @IsEnum(STATUS_TYPE, { message: AppError.TASK_STATUS })
  readonly status: STATUS_TYPE;
}
