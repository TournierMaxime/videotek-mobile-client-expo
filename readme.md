# videotek

## Installation

- Add `.env` file and complete it with the dist env file `.env.dist`
- Launch the command `npm i` for installing packages
- Then launch `npm start`

## Updates

1. Android update
    - /android/app/build.gradle dans android.defaultConfig incrémenter versionCode et versionName

2. iOS update
    - /ios/VideoTek/Info.plist dans CFBundleShortVersionString et CFBundleVersion incrémenter les versions

## Utils

- Blue : `#00CCCA`
- Pink : `#FF0090`

watchman watch-del '/Users/maximetournier/Desktop/NAS/videotek/videotek-mobile-client-expo';
watchman watch-project '/Users/maximetournier/Desktop/NAS/videotek/videotek-mobile-client-expo'

## How to create a keystore

- Launch the command in `/android/app` keytool -genkey -v -keystore keystore.jks -alias ladd-exatech-mms-client -keyalg RSA -keysize 2048 -validity 10000

## List keystore fingerprints

- Launch the following command `keytool -list -v -keystore keystore.jks`

## Wireless Debug Issue

adb pair IP:PORT
adb connect IP:PORT

## Gradlew

- ./gradlew clean (clean project)