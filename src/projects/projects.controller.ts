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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from 'src/users/users.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schemas/project.schema';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiResponse({ status: 201, type: CreateProjectDto })
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

  @ApiResponse({ status: 200, type: CreateProjectDto })
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
