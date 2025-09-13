# Members Book - Mobile App

A React Native mobile application built with Expo for managing members, optimized for both iOS and Android with a focus on iOS development.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── navigation/     # Navigation configuration
├── services/       # API services and external integrations
└── utils/          # Utility functions and helpers
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Navigate to the project directory:
   ```bash
   cd frontend/members-book
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- **Start the development server:**
  ```bash
  npm start
  ```

- **Run on iOS:**
  ```bash
  npm run ios
  ```

- **Run on Android:**
  ```bash
  npm run android
  ```

- **Run on Web:**
  ```bash
  npm run web
  ```

## Features

- Cross-platform compatibility (iOS, Android)
- Modern React Native architecture
- Expo managed workflow
- TypeScript ready
- Optimized for iOS development

## Development

This project uses Expo's managed workflow, which provides:

- Easy setup and configuration
- Over-the-air updates
- Access to native APIs through Expo SDK
- Simple build and deployment process

## Build Configuration

- **iOS Bundle ID:** com.membersbook.app
- **Android Package:** com.membersbook.app
- **Supports:** iPhone, iPad, Android phones and tablets

## Next Steps

1. Add navigation (React Navigation)
2. Implement member management features
3. Connect to backend API
4. Add authentication
5. Implement data persistence