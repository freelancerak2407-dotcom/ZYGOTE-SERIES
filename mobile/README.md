# ZYGOTE SERIES - Mobile App (Stage 1)

This is the React Native + Expo project for the Student Mobile App.

## Prerequisites
- Node.js
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Emulator) or Expo Go app on your phone

## Setup & Run

1. **Navigate to the mobile directory:**
   \`\`\`bash
   cd mobile
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   yarn install
   \`\`\`

3. **Run the project:**
   \`\`\`bash
   npx expo start
   \`\`\`

4. **Run on Android:**
   - Press \`a\` in the terminal to open in Android Emulator.
   - Or scan the QR code with Expo Go app on Android.

## Build for Production (AAB)

1. **Install EAS CLI:**
   \`\`\`bash
   npm install -g eas-cli
   \`\`\`

2. **Login to Expo:**
   \`\`\`bash
   eas login
   \`\`\`

3. **Configure Build:**
   \`\`\`bash
   eas build:configure
   \`\`\`

4. **Build AAB:**
   \`\`\`bash
   eas build --platform android
   \`\`\`

## Features Implemented
- **Auth:** Mock Login/Onboarding flow with Zustand persistence.
- **Navigation:** Stack + Bottom Tabs.
- **Theme:** Centralized color tokens (Royal Navy Blue / Aqua).
- **Reader:** Tabbed interface for Notes/MCQs.
- **Mock Data:** MBBS Subjects and MCQs.
