# 🛍️ Shop — React Native E-Commerce App

A modern, feature-rich mobile shopping application built with **React Native**, **Expo SDK 54**, and **Redux Toolkit**. Includes product listing with filter/sort, a shopping bag with persistent state, and a clean premium UI.

---

## 📱 Screenshots

| Product Listing | Shopping Bag |
|---|---|
| Browse products with filter & sort | Add/remove items, view total |

---

## ✨ Features

- 🛒 **Product Listing** — Browse products with search, filter by category/price/rating, and sort options
- 🛍️ **Shopping Bag** — Add, remove, and update quantities with real-time total calculation
- 💾 **Persistent Cart** — Shopping bag state saved with `redux-persist` + `AsyncStorage`
- 🎨 **Premium UI** — Custom color palette (`#4342ff`), smooth animations, and clean typography
- 📦 **EAS Build Ready** — Configured for internal APK distribution via Expo Application Services

---

## 🗂️ Project Structure

```
shop/
├── src/
│   ├── app/
│   │   ├── _layout.tsx          # Root layout with Redux Provider
│   │   ├── index.tsx            # Product listing screen
│   │   └── bag.tsx              # Shopping bag screen
│   ├── components/
│   │   ├── ProductCard.tsx      # Individual product display card
│   │   ├── FilterModal.tsx      # Filter by category, price, rating
│   │   └── SortModal.tsx        # Sort products modal
│   ├── store/
│   │   ├── index.ts             # Redux store with redux-persist config
│   │   ├── bagSlice.ts          # Shopping bag slice (add/remove/update)
│   │   └── hooks.ts             # Typed useAppDispatch & useAppSelector
│   └── global.css               # Global CSS variables and fonts
├── assets/
│   └── images/                  # App icons, splash screen, tab icons
├── android/                     # Native Android project files
├── app.json                     # Expo app configuration
├── eas.json                     # EAS Build profiles
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds): `npm install -g eas-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/Harashporiya/vaymp_assessment.git
cd vaymp_assessment/shop

# Install dependencies
npm install
```

### Run Locally

```bash
# Start Expo development server
npx expo start

# Run on Android emulator
npx expo run:android

# Run on iOS simulator
npx expo run:ios
```

---

## 📦 Build APK (via EAS)

```bash
# Login to Expo account
eas login

# Build internal preview APK for Android
eas build -p android --profile preview
```

> The APK will be available for download from the [Expo dashboard](https://expo.dev).

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.81.5 | Core mobile framework |
| Expo SDK | ~54.0.34 | Development platform |
| Expo Router | ~6.0.23 | File-based navigation |
| Redux Toolkit | ^2.12.0 | State management |
| Redux Persist | ^6.0.0 | Cart persistence |
| AsyncStorage | 2.2.0 | Local data storage |
| React Native Reanimated | ~4.1.1 | Smooth animations |
| TypeScript | ~5.9.2 | Type safety |

---

## 🔧 EAS Build Profiles

Defined in `eas.json`:

| Profile | Platform | Output | Use Case |
|---|---|---|---|
| `development` | Android/iOS | Dev client | Local development |
| `preview` | Android | `.apk` | Internal testing |
| `production` | Android/iOS | `.aab` | Play Store / App Store |

---

## 📋 Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
npm run lint       # Run ESLint
```

---

## 🏗️ State Management

The app uses **Redux Toolkit** with **Redux Persist**:

- `bagSlice` — manages cart items (add, remove, increment/decrement quantity)
- Persisted to `AsyncStorage` so the cart survives app restarts
- Typed hooks (`useAppDispatch`, `useAppSelector`) for type-safe usage

---

## 👤 Author

**Harash Poriya**  
GitHub: [@Harashporiya](https://github.com/Harashporiya)
