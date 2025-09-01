import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { TaskPriorityType, TaskStatusType } from './entities/Tasks';
import { FindAllTasksDto } from './dto/find-all-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@ActiveUserId() userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(userId, createTaskDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  findAll(@ActiveUserId() userId: string, @Query() Query: FindAllTasksDto) {
    return this.tasksService.findAllByUserId(
      userId,
      Query.priority,
      Query.status,
    );
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.tasksService.remove(userId, id);
  }
}
