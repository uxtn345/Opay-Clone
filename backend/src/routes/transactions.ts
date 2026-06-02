import { Router, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Send Money
router.post('/send', authenticateToken, async (req: any, res: Response) => {
  try {
    const { recipientPhoneNumber, amount, narration } = req.body;

    if (!recipientPhoneNumber || !amount) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Amount must be positive' }
      });
    }

    res.json({
      success: true,
      data: {
        transactionId: `txn_${uuidv4()}`,
        status: 'COMPLETED',
        amount,
        recipient: {
          name: 'Jane Doe',
          phoneNumber: recipientPhoneNumber
        },
        timestamp: new Date(),
        reference: `OPC-${Date.now()}`
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Pay Bills
router.post('/bills', authenticateToken, async (req: any, res: Response) => {
  try {
    const { provider, amount, phone, accountNumber } = req.body;

    if (!provider || !amount || !phone) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      });
    }

    res.json({
      success: true,
      data: {
        transactionId: `txn_${uuidv4()}`,
        status: 'COMPLETED',
        provider,
        amount,
        reference: `OPC-${Date.now()}`
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Buy Airtime
router.post('/airtime', authenticateToken, async (req: any, res: Response) => {
  try {
    const { provider, amount, phoneNumber } = req.body;

    if (!provider || !amount || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      });
    }

    res.json({
      success: true,
      data: {
        transactionId: `txn_${uuidv4()}`,
        status: 'COMPLETED',
        provider,
        amount,
        phoneNumber,
        reference: `OPC-${Date.now()}`
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Buy Data
router.post('/data', authenticateToken, async (req: any, res: Response) => {
  try {
    const { provider, plan, amount, phoneNumber } = req.body;

    if (!provider || !plan || !amount || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      });
    }

    res.json({
      success: true,
      data: {
        transactionId: `txn_${uuidv4()}`,
        status: 'COMPLETED',
        provider,
        plan,
        amount,
        phoneNumber,
        reference: `OPC-${Date.now()}`
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

// Get Transaction Details
router.get('/:transactionId', authenticateToken, async (req: any, res: Response) => {
  try {
    const { transactionId } = req.params;

    res.json({
      success: true,
      data: {
        id: transactionId,
        type: 'SENT',
        amount: 5000,
        currency: 'NGN',
        status: 'COMPLETED',
        reference: `OPC-${Date.now()}`,
        timestamp: new Date()
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
