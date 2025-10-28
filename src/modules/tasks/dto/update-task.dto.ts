import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TaskPriorityType, TaskStatusType } from '../entities/Tasks';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(TaskStatusType)
  status: TaskStatusType;

  @IsNotEmpty()
  @IsEnum(TaskPriorityType)
  priority: TaskPriorityType;
}
