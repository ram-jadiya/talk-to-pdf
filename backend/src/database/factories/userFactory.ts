import { faker } from '@faker-js/faker';

export interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserFactory {
  static create(override: Partial<User> = {}): User {
    return {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      created_at: new Date(),
      updated_at: new Date(),
      ...override,
    };
  }

  static createMany(count: number, override: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => this.create(override));
  }
}
