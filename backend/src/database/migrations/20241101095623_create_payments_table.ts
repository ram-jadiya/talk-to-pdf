import type { Knex } from 'knex';
import { PaymentStatus } from '../../constants/enums';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('payments', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('stripePaymentId').notNullable();
    table.decimal('amount', 10, 2).notNullable(); // Using decimal for monetary values
    table.string('currency').notNullable();
    table.enum('status', Object.values(PaymentStatus)).notNullable();
    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('expiredDate').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());

    // Indexes
    table.index('userId');
    table.index('stripePaymentId');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('payments');
}
