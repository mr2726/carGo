import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { useStore } from './store';
import { mockDrivers, mockCargos } from './mockData';

// Initialize store with mock data
const store = useStore.getState();
store.drivers = mockDrivers;
store.cargos = mockCargos;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 