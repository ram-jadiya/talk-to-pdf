import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('documents', (table) => {
    // Create index on title for search
    table.index('title', 'idx_documents_title');

    // Create index on created_on for sorting
    table.index('createdAt', 'idx_documents_created_at');

    // Create composite index for both search and sort
    table.index(['title', 'createdAt'], 'idx_documents_title_created');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('documents', (table) => {
    // Drop all indexes in reverse order
    table.dropIndex(['title', 'createdAt'], 'idx_documents_title_created');
    table.dropIndex('createdAt', 'idx_documents_created_on');
    table.dropIndex('title', 'idx_documents_title');
  });
}
