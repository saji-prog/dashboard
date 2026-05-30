import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FieldsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.field.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const field = await this.prisma.field.findUnique({ where: { id } });
    if (!field) throw new NotFoundException(`Lahan ${id} tidak ditemukan`);
    return field;
  }
}
