import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPriorityType, TaskStatusType } from './entities/Tasks';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepository) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const { title, description, status, priority } = createTaskDto;

    const task = await this.tasksRepo.create({
      data: { userId, title, description, status, priority },
    });

    return task;
  }

  async findAllByUserId(
    userId: string,
    priority?: TaskPriorityType,
    status?: TaskStatusType,
  ) {
    return await this.tasksRepo.findMany(userId, priority, status);
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const { title, description, status, priority } = updateTaskDto;

    const isOwner = await this.tasksRepo.findUnique({
      where: { id: id, userId: userId },
    });

    if (!isOwner) throw new NotFoundException('Task not found');

    const updatedTask = await this.tasksRepo.update({
      where: { id: id, userId: userId },
      data: { title, description, status, priority },
    });

    return updatedTask;
  }

  async remove(userId: string, id: string) {
    const isOwner = await this.tasksRepo.findUnique({
      where: { id: id, userId: userId },
    });

    if (!isOwner) throw new NotFoundException('Task not found');

    await this.tasksRepo.delete({ where: { id: id, userId: userId } });

    return null;
  }
}
