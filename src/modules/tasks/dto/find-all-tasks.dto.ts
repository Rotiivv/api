import { IsEnum, IsOptional } from 'class-validator';
import { TaskPriorityType, TaskStatusType } from '../entities/Tasks';

export class FindAllTasksDto {
  @IsOptional()
  @IsEnum(TaskPriorityType)
  priority?: TaskPriorityType;

  @IsOptional()
  @IsEnum(TaskStatusType)
  status?: TaskStatusType;
}
