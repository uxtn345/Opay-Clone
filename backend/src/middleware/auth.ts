import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
  [key: string]: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret';

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'access' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; type: string };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string; type: string };
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Access token required' }
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
    });
  }
};
