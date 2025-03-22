import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  // ავტომატურად დაკავშირება მოდულის ინიციალიზაციისას
  async onModuleInit() {
    await this.$connect();
  }

  // ავტომატურად გათიშვა მოდულის განადგურებისას
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
