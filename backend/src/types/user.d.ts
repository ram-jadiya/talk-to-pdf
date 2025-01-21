import { Request } from 'express';

export type User = {
  id: number;
  email: string;
  fName: string;
  lName: string;
  googleId?: string;
  avatar?: string;
  isVerified: boolean;
  isPremium: boolean;
  createdAt: Date;
  lastLogin: Date;
};

export type UserInfo = Omit<User, 'id' | 'lastLogin' | 'createdAt', 'isPremium'>;

export type GoogleUserData = {
  email: string;
  name: string;
  google_id: string;
  picture?: string;
};

export interface RequestWithUser extends Request {
  user?: User;
}
