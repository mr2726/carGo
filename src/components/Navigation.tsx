import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  alpha,
  useTheme,
  Tooltip,
  Button,
  Badge,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from '../store';

const DRAWER_WIDTH = 240;

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
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: theme.palette.background.paper,
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '14px',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
              },
              '50%': {
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              '100%': {
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
              },
            },
          }}
        >
          <DirectionsCarIcon sx={{ color: 'white', fontSize: 26 }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
          }}
        >
          CarGo
        </Typography>
      </Box>

      <List sx={{ px: 2 }}>
        <ListItem
          button
          onClick={() => navigate('/')}
          sx={{
            borderRadius: '12px',
            mb: 1,
            background: isActive('/') ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: isActive('/') ? theme.palette.primary.main : theme.palette.text.primary,
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main,
            },
          }}
        >
          <ListItemIcon>
            <DirectionsCarIcon
              sx={{
                color: isActive('/') ? theme.palette.primary.main : theme.palette.text.primary,
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Drivers" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate('/cargos')}
          sx={{
            borderRadius: '12px',
            mb: 1,
            background: isActive('/cargos') ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: isActive('/cargos') ? theme.palette.primary.main : theme.palette.text.primary,
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main,
            },
          }}
        >
          <ListItemIcon>
            <Badge
              badgeContent={activeCargosCount + bookedCargosCount}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  animation: activeCargosCount + bookedCargosCount > 0 ? 'bounce 1s infinite' : 'none',
                  '@keyframes bounce': {
                    '0%, 100%': {
                      transform: 'scale(1) translate(50%, -50%)',
                    },
                    '50%': {
                      transform: 'scale(1.1) translate(50%, -50%)',
                    },
                  },
                },
              }}
            >
              <LocalShippingIcon
                sx={{
                  color: isActive('/cargos') ? theme.palette.primary.main : theme.palette.text.primary,
                }}
              />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="All Cargoes" />
        </ListItem>

        <Box sx={{ px: 2, mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create-cargo')}
            fullWidth
            sx={{
              py: 1.2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.35)}`,
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            Create Cargo
          </Button>
        </Box>
      </List>
    </Drawer>
  );
}; 