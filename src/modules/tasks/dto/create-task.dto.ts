import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskPriorityType, TaskStatusType } from '../entities/Tasks';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatusType)
  status: TaskStatusType;

  @IsNotEmpty()
  @IsEnum(TaskPriorityType)
  priority: TaskPriorityType;
}
