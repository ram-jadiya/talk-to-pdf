import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create a single optimized index
  await knex.raw(`
    CREATE INDEX idx_queries_docid_createdat 
    ON queries ("docId", "createdAt" DESC);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP INDEX IF EXISTS idx_queries_docid_createdat;
  `);
}
