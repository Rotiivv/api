import { type Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import {
  TaskPriorityType,
  TaskStatusType,
} from 'src/modules/tasks/entities/Tasks';

@Injectable()
export class TasksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(
    userId: string,
    priority?: TaskPriorityType,
    status?: TaskStatusType,
  ) {
    return this.prismaService.task.findMany({
      where: { userId: userId, priority: priority, status: status },
    });
  }

  findUnique(findUniqueDto: Prisma.TaskFindUniqueArgs) {
    return this.prismaService.task.findUnique(findUniqueDto);
  }

  create(createDto: Prisma.TaskCreateArgs) {
    return this.prismaService.task.create(createDto);
  }

  update(updateDto: Prisma.TaskUpdateArgs) {
    return this.prismaService.task.update(updateDto);
  }

  delete(deleteDto: Prisma.TaskDeleteArgs) {
    return this.prismaService.task.delete(deleteDto);
  }
}
