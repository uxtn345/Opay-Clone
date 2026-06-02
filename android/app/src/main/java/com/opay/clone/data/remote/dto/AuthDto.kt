package com.opay.clone.data.remote.dto

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val password: String,
    val confirmPassword: String
)

data class AuthResponse(
    val success: Boolean,
    val data: AuthData?,
    val error: ErrorResponse?
)

data class AuthData(
    val user: UserData,
    val accessToken: String,
    val refreshToken: String
)

data class UserData(
    val id: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String,
    val kycStatus: String
)

data class RefreshTokenRequest(
    val refreshToken: String
)

data class TokenResponse(
    val success: Boolean,
    val data: TokenData?,
    val error: ErrorResponse?
)

data class TokenData(
    val accessToken: String,
    val refreshToken: String
)

data class ErrorResponse(
    val code: String,
    val message: String
)
