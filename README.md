## Documentation

### Get started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   
   # or use any of the following
   npm run web
   npm run android
   npm run ios
   ```

### Coding Style

Please write clean and maintainable code. AVOID dumping code from chatGPT directly without double-checking its
correctness and code quality, unless the code is a prototype.

Some reminders:

- Write meaningful names for variable and functions..
- Group related codes together, and if possible, refactor to a single function or hook.

### Important Notes

PLEASE check before you include ANY new packages to the project. The package might be web-only and cause the app to fail
only in production.

Rebuild Dependency

   ```bash
   npx expo-doctor
   npx expo install --check 
   npx expo prebuild        
   eas build --platform android --profile development                         
   ```
