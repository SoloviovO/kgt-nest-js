import { ApiProperty } from '@nestjs/swagger';

import { Task } from 'src/tasks/schemas/task.schema';

export class ProjectResponse {
  @ApiProperty({
    required: false,
    example: 'Prometheus',
    description: 'Title of project',
  })
  readonly title: string;

  @ApiProperty({
    required: false,
    example: 'Passionate cleaning',
    description: 'Description of project',
  })
  readonly description: string;

  @ApiProperty({
    required: false,
    example: '65365881e280f2849c71c978',
    description: 'Owner of project',
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
    description: 'Tasks of project',
  })
  tasks: Task[];

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

export class ProjectAppendResponse {
  @ApiProperty({
    required: false,
    example: 'Prometheus',
    description: 'Title of project',
  })
  readonly title: string;

  @ApiProperty({
    required: false,
    example: 'Passionate cleaning',
    description: 'Description of project',
  })
  readonly description: string;

  @ApiProperty({
    required: false,
    example: '65365881e280f2849c71c978',
    description: 'Owner of project',
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
    example:
      '[{"_id": "653658a7e280f2849c71c9f1", "title": "3", "description": "Damage", "owner": "65365881e280f2849c71c9e8", "project": [ "653658b2e280f2849c71c9f3", "653658b6e280f2849c71c9f5" ], "createdAt": "2023-10-23T11:27:35.440Z" }]',
    description: 'Tasks of project',
  })
  tasks: Task[];

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
