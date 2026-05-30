import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// AlertSeverity is now a plain string type since SQLite doesn't support enums
type AlertSeverity = 'low' | 'medium' | 'high';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(severity?: AlertSeverity) {
    const where: Prisma.AlertWhereInput = severity ? { severity } : {};
    return this.prisma.alert.findMany({
      where,
      include: { field: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
