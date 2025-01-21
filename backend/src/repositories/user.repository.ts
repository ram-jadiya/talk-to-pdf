import { dbPool } from '../configs/pgDB.config';
import { User, UserInfo } from '../types/user';

export class UserRepository {
  private static instance: UserRepository;

  private constructor() {}

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  /**
   * @method findUserByEmail
   * @param email The email address to search for
   * @returns The user if found, null otherwise
   * @description Find a user by their email address
   */
  async findUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await dbPool.query(query, [email]);
    return result.rows[0] || null;
  }

    /**
   * @method findUserById
   * @param id The id of user
   * @returns The user if found, null otherwise
   * @description Find a user by their email address
   */
    async findUserById(id: number): Promise<User | null> {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await dbPool.query(query, [id]);
      return result.rows[0] || null;
    }

  /**
   * @method findVerifiedUserById
   * @param id The unique Id of user
   * @returns The user if found, null otherwise
   * @description Find a user by their unique Id
   */
  async findVerifiedUserById(id: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1 AND "isVerified" = true';
    const result = await dbPool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * @method deleteUserByEmail
   * @param email The email address to search for
   * @returns The user if found, null otherwise
   * @description delete a user by their email address
   */
  async deleteUserByEmail(email: string): Promise<User | null> {
    const query = 'DELETE FROM users WHERE email = $1 RETURNING *';
    const result = await dbPool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * @method createUser
   * @param {UserInfo} userData - The user data to create
   * @returns Return all the info of created user
   * @description Insert user information into DB
   */
  async createUser(userData: UserInfo): Promise<User> {
    const query = `
    INSERT INTO users ("email", "fName", "lName", "googleId" ,"avatar", "isVerified")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;

    const values = [
      userData.email,
      userData.fName,
      userData.lName,
      userData.googleId,
      userData.avatar ?? null,
      userData.isVerified ?? false,
    ];

    const result = await dbPool.query(query, values);

    return result.rows[0];
  }

  /**
   * @method updateLastLogin
   * @param userId - The ID of the user to update
   * @returns The updated user
   * @description Update the last login time for a user
   */
  async updateLastLogin(userId: number): Promise<User> {
    const query = 'UPDATE users SET "lastLogin" = NOW() WHERE id = $1 RETURNING *';
    const result = await dbPool.query(query, [userId]);
    return result.rows[0];
  }

  /**
   * @method updateVerifyStatus
   * @param userId - The ID of the user to update
   * @returns The updated user
   * @description Update user email verify status to true
   */
  async updateVerifyStatus(userId: number): Promise<User> {
    const query = 'UPDATE users SET "isVerified" = true WHERE id = $1 RETURNING *';
    const result = await dbPool.query(query, [userId]);
    return result.rows[0];
  }

  /**
   * @method updateLastLogin
   * @param userId - The ID of the user to update
   * @returns The updated user
   * @description Update the last login time for a user
   */
  async updateIsPremiumByUserId(userId: number, isPremium: boolean): Promise<User> {
    const query = 'UPDATE users SET "isPremium" = $2  WHERE id = $1 RETURNING *';
    const result = await dbPool.query(query, [userId, isPremium]);
    return result.rows[0];
  }
}
