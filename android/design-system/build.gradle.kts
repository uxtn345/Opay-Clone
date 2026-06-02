plugins {
    id 'com.android.library'
    id 'kotlin-android'
}

android {
    compileSdk 34
    defaultConfig {
        minSdk 24
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    api 'androidx.compose.ui:ui:1.5.4'
    api 'androidx.compose.material3:material3:1.1.1'
}
