import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async overview(userId: string) {
    const completedTasks = await this.prismaService.task.findMany({
      where: { userId, status: 'DONE' },
    });

    const inProgressTasks = await this.prismaService.task.findMany({
      where: { userId, status: 'IN_PROGRESS' },
    });

    const avaliableTasks = await this.prismaService.task.findMany({
      where: { userId, status: 'NOT_STARTED' },
    });

    const totalTasks = await this.prismaService.task.count({
      where: { userId },
    });

    const done = (completedTasks.length * 100) / totalTasks;
    const inProgress = (inProgressTasks.length * 100) / totalTasks;
    const avaliables = (avaliableTasks.length * 100) / totalTasks;

    const percentages = {
      done: Number(done.toFixed(1)) || 0,
      inProgress: Number(inProgress.toFixed(1)) || 0,
      avaliables: Number(avaliables.toFixed(1)) || 0,
    };

    return {
      tasks: {
        done: completedTasks,
        inProgress: inProgressTasks,
        avaliables: avaliableTasks,
      },
      endAngles: {
        done: (percentages.done * 360) / 100,
        inProgress: (percentages.inProgress * 360) / 100,
        avaliables: (percentages.avaliables * 360) / 100,
      },
      percentages: percentages,
      totalTasks: totalTasks,
    };
  }
}
