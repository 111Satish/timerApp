# Timer App

A simple and intuitive timer app built with React Native, Expo, and Yarn. This app allows users to create, manage, and track timers with features like customizable alerts, history tracking, and export functionality.

## Features

- **Create Timers**: Add timers with custom names, durations, and categories.
- **Timer Alerts**: Set halfway alerts to notify users when 50% of the timer is completed.
- **History Tracking**: View a list of completed timers with their completion times.
- **Export History**: Export timer history as a JSON file.
- **Light/Dark Mode**: Supports both light and dark themes for better user experience.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher)
- **Expo CLI** (install globally using `npm install -g expo-cli`)

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/111satish/timerApp.git
cd timerApp
```

### 2. Install Dependencies

Install the required dependencies using Yarn:

```bash
yarn install
```

### 3. Generate Native Code

Run the following command to generate the native code for Android and iOS:

```bash
npx expo prebuild
```

This will create the `android` and `ios` directories in your project.

## Running the App

### Run on Android

To run the app on an Android emulator or device, use:

```bash
yarn android
```

This command will start the Metro bundler and launch the app on the connected Android device or emulator.

### Run on iOS

To run the app on an iOS simulator or device, use:

```bash
yarn ios
```

This command will start the Metro bundler and launch the app on the connected iOS simulator or device.

## Building the Project

### Build for Android

To build the Android app, run:

```bash
expo build:android
```

Follow the prompts to generate an APK or AAB file.

### Build for iOS

To build the iOS app, run:

```bash
expo build:ios
```

Follow the prompts to generate an IPA file.

## Running Tests

This project includes unit tests and integration tests. Run the tests using:

```bash
yarn test
```

## Folder Structure

```plaintext
timer-app/
├── assets/               # Static assets (images, fonts, etc.)
├── components/           # Reusable UI components
├── screens/              # App screens
├── utils/                # Utility functions and helpers
├── context/              # React context providers
├── App.tsx               # Main application entry point
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies
└── README.md             # Project documentation
