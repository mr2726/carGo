import React from 'react';
import { Typography, Paper } from '@mui/material';
import { CargoForm } from '../components/CargoForm';

export const CreateCargoPage: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Cargo
      </Typography>
      <CargoForm />
    </Paper>
  );
}; 