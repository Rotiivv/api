import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, PrismaService],
})
export class TasksModule {}
