import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { DriversPage } from './pages/DriversPage';
import { AllCargosPage } from './pages/AllCargosPage';
import { DriverCargosPage } from './pages/DriverCargosPage';
import { CreateCargoPage } from './pages/CreateCargoPage';
import { Navigation } from './components/Navigation';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<DriversPage />} />
            <Route path="/cargos" element={<AllCargosPage />} />
            <Route path="/create-cargo" element={<CreateCargoPage />} />
            <Route path="/driver/:driverId" element={<DriverCargosPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App; 