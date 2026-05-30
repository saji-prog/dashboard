import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [fields, alerts, farm] = await Promise.all([
      this.prisma.field.findMany(),
      this.prisma.alert.findMany({ include: { field: true } }),
      this.prisma.farm.findFirst(),
    ]);

    const avgHealth =
      fields.length > 0
        ? Math.round(fields.reduce((s, f) => s + f.health, 0) / fields.length)
        : 0;

    const avgMoisture =
      fields.length > 0
        ? Math.round(
            fields.reduce((s, f) => s + f.soilMoisture, 0) / fields.length,
          )
        : 0;

    const avgTemp =
      fields.length > 0
        ? Math.round(
            fields.reduce((s, f) => s + f.temperature, 0) / fields.length,
          )
        : 0;

    const avgHumidity =
      fields.length > 0
        ? Math.round(
            fields.reduce((s, f) => s + f.humidity, 0) / fields.length,
          )
        : 0;

    const criticalCount = fields.filter((f) => f.status === 'critical').length;
    const highAlerts = alerts.filter(
      (a) => a.severity === 'high' || a.severity === 'medium',
    ).length;

    return {
      farm: farm ?? { name: 'Kebun', areaHa: 0 },
      stats: {
        avgHealth,
        avgMoisture,
        avgTemp,
        avgHumidity,
        criticalCount,
        fieldCount: fields.length,
        alertCount: alerts.length,
        highAlerts,
        harvestEstimate: 'Rp 18.4 jt',
      },
      fields,
      alerts,
    };
  }
}
