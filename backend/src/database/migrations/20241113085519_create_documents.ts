import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('documents', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE'); // Foreign key to users, cascade on delete
    table.string('title').notNullable(); // Document title
    table.integer('pages').notNullable(); // Number of pages
    table.timestamp('createdAt').defaultTo(knex.fn.now()); // Created at timestamp
    table.string('pdfS3Key').notNullable(); // S3 key for PDF file

    // Create index on id and userId for faster lookups
    table.index(['id', 'userId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('documents');
}
