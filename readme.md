# videotek

## Installation

- Ajouter le fichier `.env` et compléter le à l'aide du fichier `.env.dist`
- Lancer la commande `npm i` pour installer les packages
- Lancer la commande `npm start`

## MAJ

1. Android Maj
    - /android/app/build.gradle dans android.defaultConfig incrémenter versionCode et versionName

2. iOS Maj
    - /ios/VideoTek/Info.plist dans CFBundleShortVersionString et CFBundleVersion incrémenter les versions

### Utils

- Bleu : `#00CCCA`
- Rose : `#FF0090`

watchman watch-del '/Users/maximetournier/Desktop/NAS/videotek/videotek-mobile-client-expo';
watchman watch-project '/Users/maximetournier/Desktop/NAS/videotek/videotek-mobile-client-expo'

## Création d'une clé keystore jks

- Lancer la commande dans `/android/app` keytool -genkey -v -keystore keystore.jks -alias ladd-exatech-mms-client -keyalg RSA -keysize 2048 -validity 10000