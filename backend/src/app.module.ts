import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FieldsModule } from './fields/fields.module';
import { AlertsModule } from './alerts/alerts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SensorsModule } from './sensors/sensors.module';
import { AiModule } from './ai/ai.module';
import { WeatherModule } from './weather/weather.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    PrismaModule,
    FieldsModule,
    AlertsModule,
    DashboardModule,
    SensorsModule,
    AiModule,
    WeatherModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
