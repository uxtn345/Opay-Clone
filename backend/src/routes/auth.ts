import { Router, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest, generateAccessToken, generateRefreshToken, verifyRefreshToken, authenticateToken } from '../middleware/auth';

const router = Router();

// Mock database
const users: any = {};

// Register
router.post('/register', async (req: any, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Passwords do not match' }
      });
    }

    const existingUser = Object.values(users).find(
      (u: any) => u.email === email || u.phoneNumber === phoneNumber
    );

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { code: 'USER_EXISTS', message: 'User already exists' }
      });
    }

    const userId = `user_${uuidv4()}`;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      passwordHash,
      kycStatus: 'PENDING',
      dailyLimit: 1000000,
      monthlyLimit: 10000000,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users[userId] = user;

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          kycStatus: user.kycStatus
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Login
router.post('/login', async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email and password required' }
      });
    }

    const user = Object.values(users).find((u: any) => u.email === email) as any;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          kycStatus: user.kycStatus
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Refresh Token
router.post('/refresh', async (req: any, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Refresh token required' }
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid or expired refresh token' }
    });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req: any, res: Response) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;
