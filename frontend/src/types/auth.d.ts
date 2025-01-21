export type SignUpBody = {
  fName: string;
  lName: string;
  email: string;
};

export type SignUpResponse = User;
export type SignInResponse = User;

export type User = {
  id: number;
  email: string;
  fName: string;
  lName: string;
  avatar: string | null;
  googleId: string | null;
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
  isPremium: boolean;
};

export type VerifyOtpBody = {
  email: string;
  code: string;
}

export type VerifySignInResponse = {
  user: User,
  accessToken: string
}