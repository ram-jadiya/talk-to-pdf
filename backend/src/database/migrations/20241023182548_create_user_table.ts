import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('email').notNullable().unique(); // Email must be unique
    table.string('fName').notNullable(); // First name
    table.string('lName').notNullable(); // Last name
    table.string('avatar'); // Avatar URL, optional
    table.string('googleId'); //Google Id, optional
    table.boolean('isVerified').defaultTo(false); // account verification flag
    table.timestamp('createdAt').defaultTo(knex.fn.now()); // Created at timestamp
    table.timestamp('lastLogin').defaultTo(knex.fn.now()); // Last login timestamp
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
