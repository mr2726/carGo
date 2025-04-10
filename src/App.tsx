import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import { DriversPage } from './pages/DriversPage';
import { AllCargosPage } from './pages/AllCargosPage';
import { DriverCargosPage } from './pages/DriverCargosPage';
import { CreateCargoPage } from './pages/CreateCargoPage';
import { Navigation } from './components/Navigation';
import { useStore } from './store';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const { fetchDrivers, fetchCargos, isLoading } = useStore();

  useEffect(() => {
    fetchDrivers();
    fetchCargos();
  }, [fetchDrivers, fetchCargos]);

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
          }}
        >
          <CircularProgress />
        </Container>
      </ThemeProvider>
    );
  }

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