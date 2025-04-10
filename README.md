# CarGo - Driver and Cargo Management System

A React-based application for managing drivers and their cargo deliveries.

## Features

- View all drivers with their current locations
- Track all cargoes with their statuses
- Filter cargoes by date and status
- Search cargoes by location, notes, or driver
- Drag-and-drop functionality for reordering cargoes
- Detailed view of driver's cargo history
- Real-time data synchronization with Firebase

## Recent Changes

- Integrated Firebase Firestore for data persistence
- Implemented CRUD operations for drivers and cargoes
- Added status filtering and search functionality
- Fixed cargo update functionality in Firestore
- Improved error handling for database operations
- Added loading states for async operations

## Todo

- [ ] Implement user authentication with Firebase Auth
- [ ] Add real-time updates using Firebase listeners
- [ ] Implement batch operations for cargo updates
- [ ] Add error boundaries for better error handling
- [ ] Implement optimistic updates for better UX
- [ ] Add form validation for cargo and driver inputs
- [ ] Implement data caching for offline support
- [ ] Add unit tests for critical components
- [ ] Implement role-based access control
- [ ] Add activity logging for cargo status changes

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account and project setup

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

3. Configure Firebase:
   - Create a Firebase project in the Firebase Console
   - Enable Firestore database
   - Copy your Firebase configuration
   - Create `.env` file with your Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/src/store` - Zustand store for state management
- `/src/services` - Firebase and other service integrations
- `/src/types` - TypeScript interfaces and types
- `/src/config` - Application configuration

## Technologies Used

- React
- TypeScript
- Material-UI
- Zustand (State Management)
- React Router
- DnD Kit (Drag and Drop)
- Date-fns (Date manipulation)
- Firebase/Firestore (Database)

## Known Issues

- Cargo updates may fail if the document doesn't exist in Firestore
- Need to handle concurrent updates better
- Loading states could be more granular

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

If you encounter issues with cargo updates:
1. Check that the cargo ID matches between local state and Firestore
2. Verify that all required fields are present in the update
3. Check Firebase Console for any permission issues
4. Look for any error messages in the browser console
