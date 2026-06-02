# Opay Clone - Architecture Documentation

## System Architecture

```
┌─────────────────┐
│   Android App   │
│  (Kotlin/KMP)   │
└────────┬────────┘
         │ HTTPS/REST
         ↓
┌─────────────────────────────────┐
│     API Gateway / Load Balancer │
└────────┬────────────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│   Express.js Backend Servers    │
│  (Multiple instances for scale) │
└────────┬────────────────────────┘
         │
    ┌────┴────┬──────────┐
    ↓         ↓          ↓
┌───────┐ ┌──────┐  ┌──────────┐
│   DB  │ │Redis │  │Payment   │
│ PostgreSQL   │  │Gateways  │
│(PostgreSQL)  │  │(Stripe/  │
│       │ │      │  │PayStack) │
└───────┘ └──────┘  └──────────┘

    ↓
┌──────────────────┐
│ Firebase         │
│ Cloud Messaging  │
└──────────────────┘
```

## Backend Architecture

### Folder Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── jwt.ts
│   │   └── payment.ts
│   │
│   ├── controllers/          # Request handlers
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── walletController.ts
│   │   ├── transactionController.ts
│   │   └── paymentController.ts
│   │
│   ├── services/             # Business logic
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── walletService.ts
│   │   ├── transactionService.ts
│   │   ├── paymentService.ts
│   │   └── notificationService.ts
│   │
│   ├── models/              # Database models
│   │   ├── User.ts
│   │   ├── Wallet.ts
│   │   ├── Transaction.ts
│   │   ├── KYC.ts
│   │   └── BillProvider.ts
│   │
│   ├── routes/              # API routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── wallet.ts
│   │   ├── transactions.ts
│   │   └── payments.ts
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   ├── rateLimit.ts
│   │   └── logging.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── validators.ts
│   │   ├── hashers.ts
│   │   ├── jwt.ts
│   │   ├── logger.ts
│   │   └── errors.ts
│   │
│   ├── database/
│   │   ├── migrations/      # Database migrations
│   │   └── seeds/           # Database seeds
│   │
│   └── index.ts             # Entry point
│
├── tests/                   # Test files
├── package.json
└── tsconfig.json
```

## Android Architecture

### Clean Architecture Layers

```
┌──────────────────────────┐
│   Presentation Layer     │ (UI)
│  (Compose, ViewModels)   │
└────────────┬─────────────┘
             │
┌────────────▼─────────────┐
│   Domain Layer           │ (Business Logic)
│  (Use Cases, Entities)   │
└────────────┬─────────────┘
             │
┌───���────────▼─────────────┐
│   Data Layer             │ (Data Management)
│  (Repositories, API, DB) │
└──────────────────────────┘
```

### Folder Structure

```
android/app/src/main/
├── java/com/opay/clone/
│   ├── di/                      # Dependency Injection (Hilt)
│   │   ├── AppModule.kt
│   │   ├── NetworkModule.kt
│   │   └── RepositoryModule.kt
│   │
│   ├── presentation/
│   │   ├── theme/              # Compose theme
│   │   ├── components/         # Reusable components
│   │   ├── screens/            # Screen composables
│   │   │   ├── auth/
│   │   │   │   ├── LoginScreen.kt
│   │   │   │   └── RegisterScreen.kt
│   │   │   ├── home/
│   │   │   │   └── HomeScreen.kt
│   │   │   ├── wallet/
│   │   │   │   ├── WalletScreen.kt
│   │   │   │   └── TransactionHistoryScreen.kt
│   │   │   ├── transactions/
│   │   │   │   ├── SendMoneyScreen.kt
│   │   │   │   ├── BillPaymentScreen.kt
│   │   │   │   └── AirtimeScreen.kt
│   │   │   └── profile/
│   │   │       └── ProfileScreen.kt
│   │   │
│   │   └── viewmodels/         # ViewModels
│   │       ├── AuthViewModel.kt
│   │       ├── WalletViewModel.kt
│   │       ├── TransactionViewModel.kt
│   │       └── UserViewModel.kt
│   │
│   ├── domain/
│   │   ├── model/              # Data models
│   │   ├── repository/         # Repository interfaces
│   │   └── usecase/            # Use cases
│   │
│   ├── data/
│   │   ├── local/              # Local database (Room)
│   │   │   ├── AppDatabase.kt
│   │   │   └── dao/
│   │   │
│   │   ├── remote/             # Remote API (Retrofit)
│   │   │   ├── ApiService.kt
│   │   │   ├── dto/
│   │   │   └── interceptors/
│   │   │
│   │   └── repository/         # Repository implementations
│   │
│   ├── util/                   # Utilities
│   │   ├── Constants.kt
│   │   ├── Extensions.kt
│   │   └── Validators.kt
│   │
│   └── MainActivity.kt
│
└── res/
    ├── layout/
    ├── drawable/
    ├── values/
    │   ├── strings.xml
    │   ├── colors.xml
    │   └── dimens.xml
    └── ...
```

## Data Flow

### Authentication Flow

```
1. User enters credentials
2. LoginViewModel calls LoginUseCase
3. LoginUseCase calls UserRepository
4. Repository calls ApiService (Retrofit)
5. ApiService sends POST /auth/login to backend
6. Backend validates credentials
7. Backend returns JWT token + user data
8. Repository stores token locally
9. ViewModel updates UI state
10. User navigates to home screen
```

### Transaction Flow

```
1. User initiates transaction (send money)
2. TransactionViewModel validates input
3. Calls SendMoneyUseCase
4. Repository sends request to backend
5. Backend:
   a. Validates transaction
   b. Checks balance
   c. Creates transaction record
   d. Updates both wallets
   e. Returns confirmation
6. Repository updates local database
7. ViewModel updates UI
8. Push notification sent via FCM
9. Transaction displayed in history
```

## Security Considerations

### Backend
- JWT tokens with refresh mechanism
- Password hashing with bcrypt
- Rate limiting on endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js for security headers
- SQL injection prevention

### Android
- Encrypted SharedPreferences for tokens
- SSL/TLS pinning
- Secure storage of sensitive data
- Runtime permissions
- Input validation before sending

## Scalability

### Database Scaling
- Connection pooling
- Read replicas for queries
- Indexing on frequently queried fields
- Partitioning for large tables

### API Scaling
- Horizontal scaling with load balancer
- Caching with Redis
- API rate limiting
- Async task processing (Bull/Bee-Queue)

### Mobile App
- Lazy loading of data
- Local caching
- Efficient image loading
- Background tasks with WorkManager

## Error Handling

### Backend
- Centralized error handler
- Standardized error responses
- Detailed logging
- Error recovery mechanisms

### Android
- Try-catch blocks
- Error UI state
- Retry mechanisms
- User-friendly error messages
