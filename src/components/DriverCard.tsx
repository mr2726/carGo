import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Driver } from '../types';
import { useStore } from '../store';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

interface DriverCardProps {
  driver: Driver;
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  const navigate = useNavigate();
  const getDriverLastLocation = useStore((state) => state.getDriverLastLocation);
  const lastLocation = getDriverLastLocation(driver.id);

  const handleClick = () => {
    navigate(`/driver/${driver.id}`);
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        borderRadius: 2,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 56, 
              height: 56, 
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              mr: 2
            }}
          >
            {driver.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {driver.name}
            </Typography>
            <Chip 
              icon={<DirectionsCarIcon />}
              label="Available"
              size="small"
              color="success"
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>

        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
            <Typography color="text.secondary" variant="body2">
              {driver.phone}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
            <Typography color="text.secondary" variant="body2">
              {driver.homeCity}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
            <Typography color="primary" variant="body2" sx={{ fontWeight: 500 }}>
              {lastLocation}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}; 