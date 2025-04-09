import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  alpha,
  useTheme,
  Tooltip,
  Container,
  Badge,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from '../store';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { cargos } = useStore();

  const isActive = (path: string) => location.pathname === path;

  const activeCargosCount = cargos.filter(
    cargo => cargo.status === 'dispatched' || cargo.status === 'pickedup'
  ).length;

  const bookedCargosCount = cargos.filter(
    cargo => cargo.status === 'booked'
  ).length;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          disableGutters
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 80,
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <DirectionsCarIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
              }}
            >
              CarGo
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2,
              '& .MuiButton-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                px: 3,
                py: 1,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: isActive('/') ? '100%' : '0%',
                  height: '2px',
                  background: theme.palette.primary.main,
                  transition: 'all 0.3s ease',
                  transform: 'translateX(-50%)',
                },
                '&:hover::after': {
                  width: '100%',
                },
              },
            }}
          >
            <Tooltip title="View Drivers">
              <Button
                color="inherit"
                startIcon={<DirectionsCarIcon />}
                onClick={() => navigate('/')}
                sx={{
                  color: isActive('/') 
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    background: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Drivers
              </Button>
            </Tooltip>

            <Tooltip title="View All Cargoes">
              <Button
                color="inherit"
                startIcon={<LocalShippingIcon />}
                onClick={() => navigate('/cargos')}
                sx={{
                  color: isActive('/cargos') 
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    background: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                All Cargoes
              </Button>
            </Tooltip>

            <Tooltip title="Create New Cargo">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/create-cargo')}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
              >
                Create Cargo
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 