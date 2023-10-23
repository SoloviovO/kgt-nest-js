import { ApiProperty } from '@nestjs/swagger';

import { STATUS_TYPE } from 'src/common/enums/enums';
import { Project } from 'src/projects/schemas/project.schema';

export class TaskResponse {
  @ApiProperty({
    required: false,
    example: 'Clean room',
    description: 'Title of task',
  })
  readonly title: string;

  @ApiProperty({
    required: false,
    example: 'Wipe all the furniture, wipe the dust',
    description: 'Description of task',
  })
  readonly description: string;

  @ApiProperty({
    required: false,
    example: 'new',
    description: 'Status of task',
  })
  readonly status: STATUS_TYPE;

  @ApiProperty({
    required: false,
    example: '65365881e280f2849c71c9e8',
    description: 'Owner of task',
  })
  readonly owner: string;

  @ApiProperty({
    required: false,
    example: '653658a0e280f2849c71c9ef',
    description: 'Task id',
  })
  _id: string;

  @ApiProperty({
    required: false,
    example: '[]',
    description: 'Project of task',
  })
  projects: Project[];

  @ApiProperty({
    required: false,
    example: '2023-10-23T19:50:20.053Z',
    description: 'CreatedAt of task',
  })
  createdAt: string;

  @ApiProperty({
    required: false,
    example: '2023-10-23T19:50:20.053Z',
    description: 'UpdatedAt of task',
  })
  updatedAt: string;
}
