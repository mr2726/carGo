import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography, Paper, Chip, Stack, alpha } from '@mui/material';
import { Cargo } from '../types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableCargoItemProps {
  cargo: Cargo;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'dispatched':
      return 'info';
    case 'pickedup':
      return 'warning';
    case 'delivered':
      return 'success';
    case 'booked':
      return 'primary';
    default:
      return 'default';
  }
};

export const SortableCargoItem: React.FC<SortableCargoItemProps> = ({ cargo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cargo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 2,
        mb: 1.5,
        background: (theme) => 
          isDragging 
            ? alpha(theme.palette.primary.main, 0.05)
            : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        borderRadius: 2,
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <DragIndicatorIcon 
          sx={{ 
            color: 'text.secondary',
            mr: 1,
            mt: 0.5,
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing',
            },
            opacity: 0.5,
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 1,
            }
          }} 
        />
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Chip
              label={cargo.status}
              size="small"
              color={getStatusColor(cargo.status)}
              sx={{ 
                textTransform: 'capitalize',
                fontWeight: 500,
              }}
            />
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              Order #{cargo.order}
            </Typography>
          </Stack>

          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                From: <strong>{cargo.pickupLocation}</strong>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: 'error.main', mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                To: <strong>{cargo.deliveryLocation}</strong>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                {new Date(cargo.pickupDateTime).toLocaleString()} → {new Date(cargo.deliveryDateTime).toLocaleString()}
              </Typography>
            </Box>
          </Stack>

          {cargo.notes && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mt: 1.5,
                fontStyle: 'italic',
                borderLeft: '3px solid',
                borderColor: 'primary.main',
                pl: 1.5,
                py: 0.5,
                background: (theme) => alpha(theme.palette.primary.main, 0.03),
                borderRadius: '0 4px 4px 0',
              }}
            >
              {cargo.notes}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}; 