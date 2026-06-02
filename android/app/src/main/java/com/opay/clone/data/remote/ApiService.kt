package com.opay.clone.data.remote

import com.opay.clone.data.remote.dto.*
import retrofit2.http.*

interface ApiService {
    // Auth endpoints
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): AuthResponse

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): AuthResponse

    @POST("auth/refresh")
    suspend fun refreshToken(@Body request: RefreshTokenRequest): TokenResponse

    @POST("auth/logout")
    suspend fun logout(): ApiResponse

    // User endpoints
    @GET("users/profile")
    suspend fun getProfile(@Header("Authorization") token: String): UserProfileResponse

    @PUT("users/profile")
    suspend fun updateProfile(
        @Header("Authorization") token: String,
        @Body request: UpdateProfileRequest
    ): ApiResponse

    // Wallet endpoints
    @GET("wallet/balance")
    suspend fun getBalance(@Header("Authorization") token: String): BalanceResponse

    @GET("wallet/transactions")
    suspend fun getTransactions(
        @Header("Authorization") token: String,
        @Query("limit") limit: Int = 20,
        @Query("offset") offset: Int = 0
    ): TransactionsResponse

    @POST("wallet/fund")
    suspend fun fundWallet(
        @Header("Authorization") token: String,
        @Body request: FundWalletRequest
    ): FundWalletResponse

    @POST("wallet/withdraw")
    suspend fun withdraw(
        @Header("Authorization") token: String,
        @Body request: WithdrawRequest
    ): ApiResponse

    // Transaction endpoints
    @POST("transactions/send")
    suspend fun sendMoney(
        @Header("Authorization") token: String,
        @Body request: SendMoneyRequest
    ): TransactionResponse

    @POST("transactions/bills")
    suspend fun payBill(
        @Header("Authorization") token: String,
        @Body request: PayBillRequest
    ): TransactionResponse

    @POST("transactions/airtime")
    suspend fun buyAirtime(
        @Header("Authorization") token: String,
        @Body request: BuyAirtimeRequest
    ): TransactionResponse

    @POST("transactions/data")
    suspend fun buyData(
        @Header("Authorization") token: String,
        @Body request: BuyDataRequest
    ): TransactionResponse

    @GET("transactions/{transactionId}")
    suspend fun getTransactionDetails(
        @Header("Authorization") token: String,
        @Path("transactionId") transactionId: String
    ): TransactionDetailsResponse
}
