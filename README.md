
<p align="center">
  <img src="https://ludice.app/logo.png" width="200" alt="Ludice Logo">
</p>

<h1 align="center">📱 LudiceMobile – Companion App for Board Game Enthusiasts</h1>

<p align="center">
  A cross-platform mobile application built with <a href="https://expo.dev">Expo</a> and <a href="https://reactnative.dev/">React Native</a>.<br>
  Manage your board game collection, track scores, and much more – right from your pocket!
</p>

---

## 🗂️ Project Structure

```
.vscode/                      // Editor configuration files (VSCode settings)
app/                         // Main app folder using Expo Router (file-based routing)
├── (library)/
    └── library.tsx          // Library page to manage game collection
├── (tabs)/                  // Tab navigation screens (shown after login)
│   ├── homepage.tsx         // Home screen inside tabs
│   ├── score.tsx            // Score tab screen
│   ├── profile.tsx          // Profile tab screen
│   ├── search.tsx           // Search tab screen
│   └── _layout.tsx          // Layout for tab screens (defines tabs structure)
├── game-prep/               // Additional route folder with screens related to game preparation feature
├── games/                   // Games-related routes
│   └── [id].tsx             // Dynamic route: Game detail page by game ID
├── score/                   // Additional route folder for score-related pages
├── _layout.tsx              // Global layout wrapping the entire app, includes routing setup (stack screens)
├── global.css               // Tailwind CSS imports and global styles
├── index.tsx                // Login page (initial app entry)

assets/                      // Static assets (fonts, icons, images)
├── fonts/                   // Custom fonts
├── icons/                   // Icons used throughout the app
└── images/                  // Other images

components/                  // Reusable UI components
├── autocompletes/           // Autocomplete input components
├── buttons/                 // Button components
├── cards/                   // Card UI components (game cards, etc.)
├── inputs/                  // Input components (text fields, selectors)
├── modals/                  // Modal dialog components
└── ...                      // Other shared components like searchbar.tsx, TabIcon.tsx, etc.

constant/                    // Static constants like icons and images mappings
├── icons.ts                 // Icon constants
└── images.ts                // Image constants

hooks/                       // Custom React hooks
└── useFetch.ts              // Hook for data fetching

interfaces/                  // TypeScript interfaces and types
├── auth.ts                  // Authentication-related interfaces
├── games.ts                 // Game-related interfaces
├── index.ts                 // Global export file for all interfaces
└── ...                      // Other interface files

services/                    // API service logic
├── api/                     // Individual API service files
│   ├── auth.ts              // Auth API calls
│   ├── games.ts             // Games API calls
│   └── ...                  // Other API services
└── api.ts                   // Global API configuration (axios or fetch setup)

types/                       // Custom TypeScript type declarations
└── images.d.ts              // Type declarations related to images (e.g., imported image modules)

utils/                       // Utility functions and helpers
└── auth.ts                  // Authentication utilities (e.g., getAuthToken, isAuthenticated, etc.)

```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
cd <PROJECT_DIRECTORY>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

* Copy the example environment file:

  ```bash
  cp .env.example .env
  ```

* Open the `.env` file and set the `EXPO_PUBLIC_API_URL` variable:

  ```env
  EXPO_PUBLIC_API_URL=http://apiurl.test
  ```

  Replace the URL with the appropriate one for your environment (e.g., `https://tst.ludice.app` for a test environment or or `https://ludice.app` for production)..

### 4. Start the app

```bash
npx expo start
```

This command starts the Expo development server and generates a QR code.

Once running, you’ll be able to open the app in:

* [Expo Go](https://expo.dev/go) (for quick testing on real devices)
* [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
* [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
* A [development build](https://docs.expo.dev/develop/development-builds/introduction/) (for advanced features)

> 🛠 The project uses [file-based routing](https://docs.expo.dev/router/introduction) via the `app/` directory.

---

## 🧩 Features

- ✅ **Game Library** – Manage your personal board game collection  
- ✅ **Random Game Picker** – Select a game at random based on filters  
- ✅ **First Player Selector** – Choose who starts the game randomly  
- ✅ **Score Tracking** – Track and save game scores  
- ✅ **Native UI** – Smooth and responsive interface built with NativeWind

--- 

## 🛠️ Features to develop:

* Game request feature
* Enhanced theming (dark/light modes)

---

## 📚 Learn More

* [Expo Documentation](https://docs.expo.dev/)
* [React Native Docs](https://reactnative.dev/)
* [NativeWind](https://www.nativewind.dev/)
* [Expo Router (file-based routing)](https://docs.expo.dev/router/introduction/)

---

<p align="center">
  Built with ❤️ 
</p>
