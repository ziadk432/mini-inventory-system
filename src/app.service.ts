import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema';
import { DRIZZLE } from './db/database.module';

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkDatabase(): Promise<{ ok: true }> {
    await this.db.execute(sql`SELECT 1`);
    return { ok: true };
  }
}
