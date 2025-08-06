# Pokemon Discovery App

A modern React application for discovering, collecting, and organizing your favorite Pokemon! Built with Vite, React Query, and Tailwind CSS.

## Features

- **Pokemon Discovery**: Browse and discover Pokemon with infinite scrolling
- **Collection Management**: Add Pokemon to your personal collection
- **Drag & Drop Sorting**: Reorder your collection with intuitive drag-and-drop
- **Bulk Actions**: Select and manage multiple Pokemon at once
- **Type Statistics**: View collection summaries with type breakdowns
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Build tool and dev server
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Styling
- **DND Kit** - Drag and drop functionality
- **React Icons** - Icon components

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Main application pages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and API calls
└── App.tsx             # Main application component
```

## API

This app uses the [PokeAPI](https://pokeapi.co/) to fetch Pokemon data.