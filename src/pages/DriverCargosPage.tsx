import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { DriverCargoList } from '../components/DriverCargoList';
import { useStore } from '../store';

export const DriverCargosPage: React.FC = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();
  const drivers = useStore((state) => state.drivers);
  const driver = drivers.find((d) => d.id === driverId);

  if (!driver) {
    return (
      <Box>
        <Typography variant="h4" color="error">
          Driver not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">
          {driver.name}'s Cargos
        </Typography>
      </Box>
      <DriverCargoList driverId={driverId} />
    </Box>
  );
}; 