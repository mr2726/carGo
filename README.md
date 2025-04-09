# CarGo - Driver and Cargo Management System

A React-based application for managing drivers and their cargo deliveries.

## Features

- View all drivers with their current locations
- Track all cargoes with their statuses
- Filter cargoes by date
- Drag-and-drop functionality for reordering cargoes
- Detailed view of driver's cargo history

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd car_go
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/src/store` - Zustand store for state management
- `/src/types` - TypeScript interfaces and types
- `/src/mockData.ts` - Mock data for testing

## Technologies Used

- React
- TypeScript
- Material-UI
- Zustand (State Management)
- React Router
- DnD Kit (Drag and Drop)
- Date-fns (Date manipulation)
- Firebase (for future implementation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
