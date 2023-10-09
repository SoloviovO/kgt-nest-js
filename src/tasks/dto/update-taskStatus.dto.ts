import { IsEnum, IsString } from 'class-validator';
import { STATUS_TYPE } from '../../enums/enums';

export class UpdateTaskStatusDto {
  @IsString()
  @IsEnum(STATUS_TYPE, { message: 'Invalid status' })
  readonly status: string;
}
