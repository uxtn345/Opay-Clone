# Opay Clone - API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Endpoints

### Authentication

#### Register

```
POST /auth/register
```

**Request Body**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "+234801234567",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phoneNumber": "+234801234567",
      "kycStatus": "PENDING"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### Login

```
POST /auth/login
```

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "user": { },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### Refresh Token

```
POST /auth/refresh
```

**Request Body**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### Logout

```
POST /auth/logout
Authorization: Bearer <jwt_token>
```

**Response**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Users

#### Get Profile

```
GET /users/profile
Authorization: Bearer <jwt_token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "+234801234567",
    "profilePhoto": "https://...",
    "kycStatus": "VERIFIED",
    "dailyLimit": 1000000,
    "monthlyLimit": 10000000,
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

#### Update Profile

```
PUT /users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "profilePhoto": "base64_encoded_image"
}
```

#### Verify KYC

```
POST /users/verify-kyc
Authorization: Bearer <jwt_token>
```

**Request Body**
```json
{
  "dateOfBirth": "1990-01-15",
  "bvn": "22123456789",
  "nin": "11223344556",
  "identificationDocument": "base64_encoded_image"
}
```

### Wallet

#### Get Balance

```
GET /wallet/balance
Authorization: Bearer <jwt_token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "balance": 50000,
    "currency": "NGN",
    "lastUpdated": "2024-01-15T14:30:00Z"
  }
}
```

#### Get Transaction History

```
GET /wallet/transactions?limit=20&offset=0&type=ALL
Authorization: Bearer <jwt_token>
```

**Query Parameters**
- `limit`: Number of transactions (default: 20, max: 100)
- `offset`: Pagination offset (default: 0)
- `type`: Transaction type (ALL, SENT, RECEIVED, PAYMENT, WITHDRAWAL)
- `startDate`: Filter by date (ISO 8601)
- `endDate`: Filter by date (ISO 8601)

**Response**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "txn_123",
        "type": "SENT",
        "amount": 5000,
        "currency": "NGN",
        "recipient": {
          "id": "user_456",
          "name": "Jane Doe",
          "phoneNumber": "+234801234568"
        },
        "status": "COMPLETED",
        "timestamp": "2024-01-15T14:00:00Z",
        "reference": "OPC-20240115-001"
      }
    ],
    "total": 150,
    "limit": 20,
    "offset": 0
  }
}
```

#### Fund Wallet

```
POST /wallet/fund
Authorization: Bearer <jwt_token>
```

**Request Body**
```json
{
  "amount": 50000,
  "currency": "NGN",
  "paymentMethod": "CARD",
  "source": "stripe_or_paystack"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn_123",
    "status": "PENDING",
    "amount": 50000,
    "paymentUrl": "https://checkout.stripe.com/..."
  }
}
```

#### Withdraw Funds

```
POST /wallet/withdraw
Authorization: Bearer <jwt_token>
```

**Request Body**
```json
{
  "amount": 10000,
  "bankCode": "058",
  "accountNumber": "0000000000",
  "accountName": "John Doe"
}
```

### Transactions

#### Send Money

```
POST /transactions/send
Authorization: Bearer <jwt_token>
```

**Request Body**
```json
{
  "recipientPhoneNumber": "+234801234568",
  "amount": 5000,
  "narration": "Payment for items"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn_123",
    "status": "COMPLETED",
    "amount": 5000,
    "recipient": {
      "name": "Jane Doe",
      "phoneNumber": "+234801234568"
    },
    "timestamp": "2024-01-15T14:00:00Z",
    "reference": "OPC-20240115-001"
  }
}
```

#### Pay Bills

```
POST /transactions/bills
Authorization: Bearer <jwt_token>
```

**Request Body**
```json
{
  "provider": "DSTV",
  "amount": 5500,
  "phone": "+234801234567",
  "accountNumber": "123456",
  "billType": "MONTHLY"
}
```

#### Buy Airtime

```
POST /transactions/airtime
Authorization: Bearer <jwt_token>
```

**Request Body**
```json
{
  "provider": "MTN",
  "amount": 1000,
  "phoneNumber": "+234801234567"
}
```

**Supported Providers**: MTN, AIRTEL, GLO, 9MOBILE

#### Buy Data

```
POST /transactions/data
Authorization: Bearer <jwt_token>
```

**Request Body**
```json
{
  "provider": "MTN",
  "plan": "1GB",
  "amount": 3500,
  "phoneNumber": "+234801234567"
}
```

#### Get Transaction Details

```
GET /transactions/:transactionId
Authorization: Bearer <jwt_token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "txn_123",
    "type": "SENT",
    "amount": 5000,
    "currency": "NGN",
    "status": "COMPLETED",
    "reference": "OPC-20240115-001",
    "sender": { },
    "recipient": { },
    "timestamp": "2024-01-15T14:00:00Z",
    "receipt": "base64_encoded_pdf"
  }
}
```

## Error Codes

| Code | HTTP | Message |
|------|------|----------|
| `INVALID_CREDENTIALS` | 401 | Invalid email or password |
| `UNAUTHORIZED` | 401 | Unauthorized access |
| `FORBIDDEN` | 403 | Access forbidden |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `INSUFFICIENT_BALANCE` | 400 | Wallet balance insufficient |
| `TRANSACTION_FAILED` | 500 | Transaction processing failed |
| `SERVER_ERROR` | 500 | Internal server error |

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Auth endpoints: 5 requests per 15 minutes
- Payment endpoints: 10 requests per hour

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642254000
```
