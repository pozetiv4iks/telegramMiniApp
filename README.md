# Telegram Mini App

Telegram Mini App built with React, TypeScript, and Vite.

## Features

- ✅ **Telegram WebApp SDK** - Full integration with Telegram WebApp API
- ✅ **TypeScript** - Type-safe development
- ✅ **React 19** - Latest React features
- ✅ **Vite** - Fast development and building
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Light Theme** - Optimized for Telegram's light theme
- ✅ **Cloudflare Ready** - Optimized for Cloudflare Pages deployment

## Getting Started

### Prerequisites

- Node.js 20+ 
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── index.css        # Global styles and Telegram WebApp variables
├── main.tsx         # Application entry point
└── assets/          # Static assets
```

## Telegram WebApp Integration

The app includes:

- **WebApp SDK** - Full Telegram WebApp API integration
- **User Data** - Automatic user information retrieval
- **Theme Support** - Light theme optimized for Telegram
- **Haptic Feedback** - Touch feedback support
- **Error Handling** - Graceful fallbacks for development

## Deployment

### Cloudflare Pages

The project is optimized for Cloudflare Pages deployment:

1. Push to GitHub
2. Connect to Cloudflare Pages
3. Deploy automatically

### Manual Deployment

1. Build the project: `yarn build`
2. Upload the `dist` folder to your hosting provider

## Development

- **Hot Reload** - Changes reflect immediately
- **TypeScript** - Full type checking
- **Error Boundaries** - Graceful error handling
- **Mock Data** - Works without Telegram environment

## License

MIT License
