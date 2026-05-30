import { Controller, Get, Query } from '@nestjs/common';
// AlertSeverity is now a plain string type since SQLite doesn't support enums
type AlertSeverity = 'low' | 'medium' | 'high';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  findAll(@Query('severity') severity?: AlertSeverity) {
    return this.alertsService.findAll(severity);
  }
}
