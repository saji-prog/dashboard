import { Controller, Get, Query } from '@nestjs/common';
import { AlertSeverity } from '@prisma/client';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  findAll(@Query('severity') severity?: AlertSeverity) {
    return this.alertsService.findAll(severity);
  }
}
