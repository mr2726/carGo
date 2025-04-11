import React, { useState, useMemo } from 'react';
import { Grid, Typography, Box, TextField, InputAdornment, alpha } from '@mui/material';
import { DriverCard } from '../components/DriverCard';
import { AddTestDrivers } from '../components/AddTestDrivers';
import { useStore } from '../store';
import SearchIcon from '@mui/icons-material/Search';

export const DriversPage: React.FC = () => {
  const drivers = useStore((state) => state.drivers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [drivers, searchQuery]);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">
          Drivers
        </Typography>
        <TextField
          fullWidth
          placeholder="Search drivers by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
              },
              '&.Mui-focused': {
                backgroundColor: (theme) => alpha(theme.palette.background.paper, 1),
              },
            },
          }}
        />
      </Box>
      {/* <AddTestDrivers /> */}
      <Grid container spacing={3}>
        {filteredDrivers.length === 0 ? (
          <Grid item xs={12}>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                py: 8,
                color: 'text.secondary',
                fontStyle: 'italic',
              }}
            >
              No drivers found matching "{searchQuery}"
            </Typography>
          </Grid>
        ) : (
          filteredDrivers.map((driver) => (
            <Grid item xs={12} sm={6} md={4} key={driver.id}>
              <DriverCard driver={driver} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}; 