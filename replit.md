# Shunya AI - Infinite Learning Intelligence

A full-stack React application featuring an AI-powered learning platform with visual research, adaptive testing, and multi-modal intelligence.

## Project Overview

**Type**: Full-stack web application (React + Express)
**Framework**: React 18 + Vite + TypeScript
**Backend**: Express server integrated with Vite dev server
**Package Manager**: PNPM
**UI**: TailwindCSS 3 + Radix UI components
**Port**: 5000 (frontend serves on this port, backend integrated via middleware)

## Tech Stack

- **Frontend**: React 18, React Router 6, TypeScript, Vite, TailwindCSS 3
- **Backend**: Express server (runs as Vite middleware in dev)
- **UI Components**: Radix UI, Lucide React icons, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Testing**: Vitest

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx, Chat.tsx, NotFound.tsx)
├── components/           # React components
│   ├── ui/              # Pre-built Radix UI component library
│   ├── canvas/          # 3D canvas components
│   ├── chat/            # Chat interface components
│   └── layout/          # Layout components
├── App.tsx              # App entry point with SPA routing
└── global.css           # TailwindCSS theming

server/                  # Express API backend
├── index.ts             # Main server setup (createServer function)
├── routes/              # API route handlers
└── node-build.ts        # Production server entry point

shared/                  # Types shared between client & server
└── api.ts               # API interfaces
```

## Development

- **Dev Server**: `pnpm run dev` - Runs on port 5000
- **Build**: `pnpm build` - Builds both client and server
- **Production**: `pnpm start` - Runs production server
- **Type Check**: `pnpm typecheck`
- **Tests**: `pnpm test`

## Key Features

- **Integrated Dev Server**: Single port (5000) for both frontend and backend during development
- **API Routes**: All backend endpoints prefixed with `/api/`
- **SPA Routing**: React Router 6 with catch-all fallback to index.html
- **Type Safety**: TypeScript throughout with shared types between client/server
- **Modern UI**: Dark theme by default with comprehensive component library

## Replit Configuration

- **Vite Config**: Set to host `0.0.0.0` on port `5000` for Replit proxy compatibility
- **Workflow**: Single "Server" workflow running `pnpm run dev`
- **Environment**: Node.js with PNPM package manager

## Recent Changes (October 7, 2025)

- Imported from GitHub repository
- Configured for Replit environment:
  - Changed Vite server host from `::` to `0.0.0.0`
  - Changed port from `8080` to `5000`
  - Installed dependencies with pnpm
  - Set up workflow for development server
- Application successfully running with all features operational

## Architecture Notes

- The Express server runs as middleware within the Vite dev server during development
- Production build creates separate client (SPA) and server bundles
- Server serves static files from `dist/spa` in production
- All non-API routes fall back to `index.html` for React Router SPA handling
