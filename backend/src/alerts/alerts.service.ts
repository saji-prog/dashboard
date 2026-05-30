import { Injectable } from '@nestjs/common';
import { AlertSeverity, Prisma } from '@prisma/client';
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
