import type { Knex } from 'knex';
import { OtpType } from '../../constants/enums';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('otps', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index(); // Index for foreign key lookups
    table.string('code', 6).notNullable().checkLength('=', 6); // Ensures exactly 6 digits
    table.enum('type', [OtpType.LOGI_IN, OtpType.SIGN_UP]).notNullable().index(); // Index for type-based queries
    table.timestamp('expiredAt').notNullable().index(); // Index for expiration checks
    table.boolean('isUsed').notNullable().defaultTo(false).index(); // Index for checking used/unused OTPs

    // Composite indexes for common query patterns
    table.index(['userId', 'type', 'isUsed']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('otps');
}
