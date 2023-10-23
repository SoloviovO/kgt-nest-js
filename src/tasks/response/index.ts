import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Task } from 'src/tasks/schemas/task.schema';
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

export class UserLoginResponse {
  @ApiProperty({
    required: false,
    example: 'Test@example.com',
    description: 'User email',
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    required: false,
    example: '65365881e280f2849c71c9e8',
    description: 'User id',
  })
  @IsString()
  id: string;

  @ApiProperty({
    required: false,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MzY1ODgxZTI4MGYyODQ5YzcxYzllOCIsImVtYWlsIjoiVGVzdEBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEUzU3dFVTI4NnBmVm1pOFlmY2FJdU9IR2ZoUlQyZG4vZXYuVUhiUzlJSmp6bXhYNWdmazUyIiwicHJvamVjdHMiOltdLCJ0YXNrcyI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMTAtMjNUMTE6MjY6NTcuMjcwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMTAtMjNUMTE6MjY6NTcuMjcwWiJ9LCJpYXQiOjE2OTgwODkxMTUsImV4cCI6MTY5ODA4OTI5NX0.Xjxlzs6J65mIsAGJZ1offzk7ACrK7EkfBNTS2hkVe8',
    description: 'User access token',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    required: false,
    example:
      '[{ "_id": "653658b2e280f2849c71c9f3", "title": "1", "owner": "65365881e280f2849c71c9e8", "tasks": ["653658a0e280f2849c71c9ef", "653658a7e280f2849c71c9f1"], "createdAt": "2023-10-23T11:27:46.136Z", "updatedAt": "2023-10-23T11:50:01.646Z" }]',
    description: 'User projects',
  })
  @IsArray()
  projects: Project[];

  @ApiProperty({
    required: false,
    example:
      '[{ "_id": "653658a0e280f2849c71c9ef", "title": "Clear", "description": "Damage", "owner": "65365881e280f2849c71c9e8", "project": ["653658b2e280f2849c71c9f3", "653658b6e280f2849c71c9f5"], "createdAt": "2023-10-23T11:27:28.762Z", "updatedAt": "2023-10-23T12:30:47.964Z", "status": "new"}]',
    description: 'User tasks',
  })
  @IsArray()
  tasks: Task[];
}
