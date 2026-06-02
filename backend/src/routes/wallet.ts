import { Router, Response } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Mock database
const wallets: any = {};

// Get Balance
router.get('/balance', authenticateToken, async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const wallet = wallets[userId] || { balance: 50000 };

    res.json({
      success: true,
      data: {
        balance: wallet.balance,
        currency: 'NGN',
        lastUpdated: new Date()
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Get Transactions
router.get('/transactions', authenticateToken, async (req: any, res: Response) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    res.json({
      success: true,
      data: {
        transactions: [],
        total: 0,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Fund Wallet
router.post('/fund', authenticateToken, async (req: any, res: Response) => {
  try {
    const { amount, currency, paymentMethod } = req.body;

    if (!amount || !currency || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      });
    }

    res.json({
      success: true,
      data: {
        transactionId: `txn_${Date.now()}`,
        status: 'PENDING',
        amount,
        paymentUrl: 'https://checkout.stripe.com/...'
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Withdraw
router.post('/withdraw', authenticateToken, async (req: any, res: Response) => {
  try {
    const { amount, bankCode, accountNumber } = req.body;

    if (!amount || !bankCode || !accountNumber) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      });
    }

    res.json({
      success: true,
      data: {
        transactionId: `txn_${Date.now()}`,
        status: 'PROCESSING',
        amount
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

export default router;
