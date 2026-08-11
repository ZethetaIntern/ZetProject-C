# Zetheta Project C

A financial analytics dashboard prototype for institutional asset management.

## Overview

This repository implements a configurable dashboard UI with financial analytics widgets, session handling, role-based access, and simulated live feed behavior. Users can add, remove, collapse, and reorganize widgets while session state and layout preferences are persisted locally.

## What it does

- Displays a portfolio analytics dashboard with multiple widget panels
- Supports customizable widget layout and grid placement
- Includes real-time warnings for live feed disconnects
- Handles session expiry and user role permissions
- Persists theme, layout, and widget settings in browser storage
- Offers a rich widget set for portfolio and risk analytics

## Key features

- Portfolio summary panel
- NAV performance chart
- Value-at-risk gauge widgets
- Drawdown analysis and risk metrics
- Correlation matrix and yield curve views
- Brinson attribution analytics
- Sector allocation visualization
- Live transaction log feed
- Role-based UI modes for manager vs viewer
- Toast notifications and error boundary handling

## Tech stack

- React
- TypeScript
- Vite
- Zustand
- Recharts
- Zod
- Storybook
- Vitest
- ESLint / Prettier

## Getting started

1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd zethetaProjectC
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open the app in your browser at the URL shown by Vite.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - compile and build the app
- `npm run preview` - preview production build locally
- `npm run test` - run tests with Vitest
- `npm run test:coverage` - run tests and generate coverage
- `npm run lint` - run ESLint on source files
- `npm run format` - format source code with Prettier
- `npm run storybook` - start Storybook UI
- `npm run build-storybook` - build Storybook static site

## Environment

This app uses local environment settings in `.env`.

Example:

```env
VITE_API_BASE_URL=/api
VITE_WS_URL=ws://localhost:5173/ws
VITE_DEFAULT_THEME=dark
VITE_DATA_REFRESH_INTERVAL=5000
VITE_MAX_WIDGETS=20
VITE_ENABLE_MOCK_AUTH=true
```

## Notes

- `.env` is ignored by Git to keep local configuration private.
- No real secret API keys are included in this repository.
- If you want to deploy the app, replace the mock data and WebSocket URLs with real endpoints.

## License

This project has no license file. Add a license if you plan to publish it publicly.
