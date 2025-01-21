import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN } from '../constants/common.constant';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { env } from '../configs/env.config';
import { UserRepository } from '../repositories/user.repository';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    // Check for the JWT token in the cookie
    const token = req.cookies[ACCESS_TOKEN];
    
    if (!token) {
      throw new UnauthorizedException();
    }

    // Verify the token
    const { userId } = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as { userId: number };

    const userInfo = await UserRepository.getInstance().findVerifiedUserById(userId);

    if (!userInfo) {
      throw new UnauthorizedException('Unauthorized user!');
    }

    req.user = userInfo; // attacking user information to request body

    next(); // Proceed to the next middleware or route handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    next(new UnauthorizedException('Unauthorized user!'));
  }
};
