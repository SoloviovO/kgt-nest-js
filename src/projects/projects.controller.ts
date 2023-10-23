import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AppError } from 'src/common/constants/errors';
import { AuthGuard } from 'src/users/users.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schemas/project.schema';
import { ProjectAppendResponse, ProjectResponse } from './response';

@ApiTags('Project')
@ApiBearerAuth('Bearer')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiResponse({ status: 201, type: ProjectResponse })
  @ApiResponse({ status: 400, description: AppError.VALIDATION_MESSAGE })
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: any,
  ): Promise<Project> {
    const { user } = req.user;
    const userId = user._id;
    return this.projectsService.create(createProjectDto, userId);
  }

  @ApiResponse({ status: 200, type: ProjectAppendResponse })
  @ApiResponse({ status: 400, description: AppError.TASK_ADDED })
  @ApiResponse({ status: 404, description: AppError.PROJECT_NOT_EXIST })
  @Patch('addtask/:taskId/:projectId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  appendTaskToProject(
    @Param('taskId') taskId: string,
    @Param('projectId') projectId: string,
  ): Promise<Project> {
    return this.projectsService.append(taskId, projectId);
  }
}
