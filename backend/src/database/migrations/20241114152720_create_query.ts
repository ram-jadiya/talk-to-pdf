import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('queries', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table
      .integer('docId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('documents')
      .onDelete('CASCADE'); // Foreign key to documents, cascade on delete
    table.string('query').notNullable(); // user query
    table.text('response').notNullable(); // query response
    table.timestamp('createdAt').defaultTo(knex.fn.now()); // Created at timestamp

    // Create index on id and userId for faster lookups
    table.index(['id', 'docId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('queries');
}
