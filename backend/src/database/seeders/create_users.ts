import { Knex } from 'knex';
import { UserFactory } from '../factories/userFactory';

export async function seed(knex: Knex): Promise<void> {
  // Create sample users
  const users = UserFactory.createMany(10);

  // Insert into database
  await knex('users').insert(users);
}
