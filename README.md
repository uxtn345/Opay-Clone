# Opay Clone - Educational Fintech App

A complete, production-ready fintech application featuring a robust Android mobile app and Node.js backend with real payment integration.

## 🎯 Features

- ✅ User Authentication (JWT + Refresh Tokens)
- ✅ Secure Wallet Management
- ✅ Real Transaction History
- ✅ Send Money to Users
- ✅ Bill Payments
- ✅ Airtime/Data Purchases
- ✅ Real Payment Gateway Integration (Stripe & PayStack)
- ✅ Push Notifications (FCM)
- ✅ Dashboard Analytics
- ✅ KYC Verification
- ✅ Transaction Receipts
- ✅ Multi-currency Support
- ✅ Transaction Limits & Security

## 📁 Project Structure

```
opay-clone/
├── android/                    # Android Kotlin App
│   ├── app/src/main/
│   ├── gradle/
│   └── build.gradle.kts
├── backend/                    # Node.js Express Backend
│   ├── src/
│   ├── tests/
│   └── package.json
├── docs/                       # Documentation
└── README.md
```

## 🛠 Tech Stack

### Android
- **Language**: Kotlin
- **UI**: Jetpack Compose
- **Networking**: Retrofit + OkHttp
- **Database**: Room + DataStore
- **DI**: Hilt
- **Notifications**: Firebase Cloud Messaging
- **State Management**: ViewModel + StateFlow

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **Cache**: Redis
- **Auth**: JWT (jsonwebtoken)
- **Payments**: Stripe & PayStack SDKs
- **Validation**: Joi
- **Testing**: Jest + Supertest

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Android Studio (Flamingo or later)
- PostgreSQL 14+
- Redis 7+
- Git

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# Configure database, payment keys, etc.

# Run migrations
npm run migrate

# Seed database (optional)
npm run seed

# Start development server
npm run dev

# Server runs on http://localhost:3000
```

### Android Setup

1. Open Android Studio
2. Open `android/` directory
3. Wait for Gradle sync
4. Create `local.properties` in `android/` directory:
   ```properties
   sdk.dir=/path/to/Android/sdk
   api.base_url=http://10.0.2.2:3000
   ```
5. Run the app on an emulator or device

## 📚 API Documentation

See [API Docs](./docs/API.md) for complete endpoint documentation.

### Base URL
- Development: `http://localhost:3000/api/v1`

### Key Endpoints

**Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

**Users**
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `POST /users/verify-kyc` - Start KYC verification

**Wallet**
- `GET /wallet/balance` - Get wallet balance
- `GET /wallet/transactions` - Transaction history
- `POST /wallet/fund` - Fund wallet (payment gateway)
- `POST /wallet/withdraw` - Withdraw funds

**Transactions**
- `POST /transactions/send` - Send money to user
- `POST /transactions/bills` - Pay bills
- `POST /transactions/airtime` - Buy airtime
- `GET /transactions/:id` - Get transaction details

## 🔐 Security

- JWT-based authentication
- Password hashing (bcrypt)
- Rate limiting on all endpoints
- HTTPS in production
- SQL injection prevention (parameterized queries)
- CORS configuration
- Input validation & sanitization
- Encryption for sensitive data

See [Security Guide](./docs/SECURITY.md) for details.

## 💳 Payment Integration

Supports two payment gateways:

### Stripe
- Sign up at [Stripe](https://stripe.com)
- Get API keys from dashboard
- Add to `.env`: `STRIPE_SECRET_KEY` and `STRIPE_PUBLIC_KEY`

### PayStack
- Sign up at [PayStack](https://paystack.com)
- Get secret key
- Add to `.env`: `PAYSTACK_SECRET_KEY`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Android Tests
```bash
cd android
./gradlew test              # Unit tests
./gradlew connectedAndroidTest  # Instrumented tests
```

## 📱 Screenshots

[Screenshots will be added during development]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes only. Not for production use without proper licensing.

## 📧 Support

For issues or questions, please create a GitHub issue.

## ⚠️ Disclaimer

This is an educational project demonstrating fintech architecture and implementation. It is not affiliated with Opay or any other payment service provider. Use only for learning and development purposes.
