# 🛍️ Vaymp Shopping App

A modern, feature-rich React Native e-commerce application built as part of the **Vaymp Frontend Assessment**. The app allows users to browse products, filter/sort them, and manage a persistent shopping bag.

---

## 📱 APK Download

> **[⬇️ Download APK](./apk/shop-preview.apk)**
>
> _Tested on Android 10+ devices._

---

## 🔗 GitHub Repository

> **[https://github.com/YOUR_USERNAME/vaymp_assessment](https://github.com/YOUR_USERNAME/vaymp_assessment)**

---

## ✨ Features

- 🛒 **Product Listing** — Fetches live products from [FakeStore API](https://fakestoreapi.com/products)
- 🔍 **Search** — Real-time search by product title or category
- 🔃 **Sort** — Sort by Newest, Price (Low→High / High→Low), and Rating
- 🎛️ **Filter** — Filter products by category
- ❤️ **Shopping Bag** — Add/remove items with Redux-powered state
- 💾 **Persistent Bag** — Cart state persists across app restarts using `redux-persist` + `AsyncStorage`
- 💰 **INR Pricing** — Prices converted to Indian Rupees with discount display
- 🌗 **Dark / Light Mode** — Auto adapts to system theme

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.81.5 | Core mobile framework |
| Expo | ~54.0.34 | Build toolchain & native APIs |
| Expo Router | ~6.0.23 | File-based navigation |
| Redux Toolkit | ^2.12.0 | State management |
| Redux Persist | ^6.0.0 | Persistent shopping bag |
| AsyncStorage | 2.2.0 | Local bag storage |
| TypeScript | ~5.9.2 | Type safety |

---

## 📁 Project Structure

```
shop/
├── src/
│   ├── app/
│   │   ├── _layout.tsx        # Root layout with Redux Provider
│   │   ├── index.tsx          # Products listing screen
│   │   └── bag.tsx            # Shopping bag screen
│   ├── components/
│   │   ├── ProductCard.tsx    # Product card with add-to-bag
│   │   ├── SortModal.tsx      # Sort bottom sheet
│   │   └── FilterModal.tsx    # Filter bottom sheet
│   ├── store/
│   │   ├── index.ts           # Redux store with persist config
│   │   ├── bagSlice.ts        # Bag actions & reducer
│   │   └── hooks.ts           # Typed Redux hooks
│   └── constants/
│       └── colors.ts          # Design tokens (colors, spacing, fonts)
├── assets/
│   └── images/                # App icons, splash screen, product images
├── app.json                   # Expo configuration
├── eas.json                   # EAS Build configuration
└── package.json
```

---

## ⚙️ Setup & Run Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) app on your Android/iOS device _(for development)_

```bash
npm install -g expo-cli
```

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/vaymp_assessment.git
cd vaymp_assessment/shop
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start the Development Server

```bash
npm start
```

This will open the **Expo Dev Server**. You can:
- Scan the QR code with **Expo Go** (Android/iOS)
- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator

---

### 4️⃣ Run on Android (with Android Studio)

```bash
npm run android
```

> Make sure Android Studio is installed and an emulator/device is connected.

---

### 5️⃣ Run on iOS (Mac only)

```bash
npm run ios
```

---

## 🏗️ Building APK (EAS Build)

To generate an APK using Expo Application Services:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to your Expo account
eas login

# Build the APK
eas build -p android --profile preview
```

> The APK will be available to download from your [Expo dashboard](https://expo.dev/).

---

## 🔑 Environment / Configuration

No `.env` file is required. The app uses the public **FakeStore API**:

```
https://fakestoreapi.com/products
```

---

## 📸 Screenshots

| Products Screen | Shopping Bag |
|---|---|
| _(Add screenshot here)_ | _(Add screenshot here)_ |

---

## 👨‍💻 Author

**Harash Poriya**
- Built for: Vaymp Frontend Assessment
- Contact: _(Add your email/LinkedIn)_

---

## 📄 License

This project is submitted as part of a technical assessment and is not intended for commercial distribution.
