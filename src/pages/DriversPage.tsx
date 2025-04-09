import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { DriverCard } from '../components/DriverCard';
import { useStore } from '../store';

export const DriversPage: React.FC = () => {
  const drivers = useStore((state) => state.drivers);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Drivers
      </Typography>
      <Grid container spacing={3}>
        {drivers.map((driver) => (
          <Grid item xs={12} sm={6} md={4} key={driver.id}>
            <DriverCard driver={driver} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 