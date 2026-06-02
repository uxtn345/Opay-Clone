package com.opay.clone.util

object Constants {
    const val BASE_URL = "http://10.0.2.2:3000/api/v1/"
    const val CONNECT_TIMEOUT = 30L
    const val READ_TIMEOUT = 30L
    const val WRITE_TIMEOUT = 30L

    // Preferences
    const val PREFS_NAME = "opay_prefs"
    const val KEY_ACCESS_TOKEN = "access_token"
    const val KEY_REFRESH_TOKEN = "refresh_token"
    const val KEY_USER_ID = "user_id"
    const val KEY_USER_EMAIL = "user_email"
    const val KEY_USER_PHONE = "user_phone"

    // Transaction Types
    const val TXN_TYPE_SENT = "SENT"
    const val TXN_TYPE_RECEIVED = "RECEIVED"
    const val TXN_TYPE_PAYMENT = "PAYMENT"
    const val TXN_TYPE_WITHDRAWAL = "WITHDRAWAL"
    const val TXN_TYPE_FUND = "FUND"

    // Transaction Status
    const val TXN_STATUS_PENDING = "PENDING"
    const val TXN_STATUS_COMPLETED = "COMPLETED"
    const val TXN_STATUS_FAILED = "FAILED"

    // Airtime Providers
    val AIRTIME_PROVIDERS = listOf("MTN", "AIRTEL", "GLO", "9MOBILE")

    // Bill Providers
    val BILL_PROVIDERS = listOf("DSTV", "GOTV", "STARTIMES", "SMILE")
}
