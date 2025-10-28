import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  overview(@ActiveUserId() userId: string) {
    return this.dashboardService.overview(userId);
  }
}
