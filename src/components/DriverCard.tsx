import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Stack, useTheme, alpha } from '@mui/material';
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
  const theme = useTheme();
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
        background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backdropFilter: 'blur(10px)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              fontSize: '1.5rem',
              mr: 2,
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            {driver.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                textShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.2)}`,
              }}
            >
              {driver.name}
            </Typography>
            <Chip 
              icon={<DirectionsCarIcon />}
              label="Available"
              size="small"
              color="success"
              sx={{ 
                mt: 0.5,
                background: alpha(theme.palette.success.main, 0.1),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                '& .MuiChip-label': {
                  color: theme.palette.success.light,
                },
                '& .MuiChip-icon': {
                  color: theme.palette.success.light,
                },
              }}
            />
          </Box>
        </Box>

        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ color: alpha(theme.palette.text.secondary, 0.8), mr: 1, fontSize: 20 }} />
            <Typography 
              variant="body2"
              sx={{ 
                color: alpha(theme.palette.text.secondary, 0.8),
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {driver.phone}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ color: alpha(theme.palette.text.secondary, 0.8), mr: 1, fontSize: 20 }} />
            <Typography 
              variant="body2"
              sx={{ 
                color: alpha(theme.palette.text.secondary, 0.8),
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {driver.homeCity}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500,
                color: theme.palette.primary.light,
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {lastLocation}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}; 