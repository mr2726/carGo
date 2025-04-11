import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography, Paper, Chip, Stack, alpha, useTheme, ChipProps } from '@mui/material';
import { Cargo } from '../types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableCargoItemProps {
  cargo: Cargo;
}

const getStatusConfig = (status: string, theme: any) => {
  switch (status.toLowerCase()) {
    case 'dispatched':
      return {
        color: 'info' as ChipProps['color'],
        background: alpha(theme.palette.info.main, 0.1),
        border: alpha(theme.palette.info.main, 0.2),
        text: theme.palette.info.light
      };
    case 'pickedup':
      return {
        color: 'warning' as ChipProps['color'],
        background: alpha(theme.palette.warning.main, 0.1),
        border: alpha(theme.palette.warning.main, 0.2),
        text: theme.palette.warning.light
      };
    case 'delivered':
      return {
        color: 'success' as ChipProps['color'],
        background: alpha(theme.palette.success.main, 0.1),
        border: alpha(theme.palette.success.main, 0.2),
        text: theme.palette.success.light
      };
    case 'booked':
      return {
        color: 'primary' as ChipProps['color'],
        background: alpha(theme.palette.primary.main, 0.1),
        border: alpha(theme.palette.primary.main, 0.2),
        text: theme.palette.primary.light
      };
    default:
      return {
        color: 'default' as ChipProps['color'],
        background: alpha(theme.palette.grey[500], 0.1),
        border: alpha(theme.palette.grey[500], 0.2),
        text: theme.palette.text.secondary
      };
  }
};

export const SortableCargoItem: React.FC<SortableCargoItemProps> = ({ cargo }) => {
  const theme = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cargo.id });

  const statusConfig = getStatusConfig(cargo.status, theme);

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
        background: isDragging 
          ? alpha(theme.palette.primary.main, 0.1)
          : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
        borderRadius: 2,
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backdropFilter: 'blur(10px)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <DragIndicatorIcon 
          sx={{ 
            color: alpha(theme.palette.text.secondary, 0.6),
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
              color: theme.palette.text.primary,
            }
          }} 
        />
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Chip
              label={cargo.status}
              size="small"
              color={statusConfig.color}
              sx={{ 
                textTransform: 'capitalize',
                fontWeight: 500,
                background: statusConfig.background,
                border: `1px solid ${statusConfig.border}`,
                '& .MuiChip-label': {
                  color: statusConfig.text,
                },
              }}
            />
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 500,
                letterSpacing: '0.5px',
                color: alpha(theme.palette.text.secondary, 0.8),
              }}
            >
              Order #{cargo.order}
            </Typography>
          </Stack>

          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: 20 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                }}
              >
                From: <Box component="span" sx={{ color: theme.palette.success.light }}>{cargo.pickupLocation}</Box>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: theme.palette.error.main, mr: 1, fontSize: 20 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                }}
              >
                To: <Box component="span" sx={{ color: theme.palette.error.light }}>{cargo.deliveryLocation}</Box>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ color: alpha(theme.palette.text.secondary, 0.8), mr: 1, fontSize: 20 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: alpha(theme.palette.text.secondary, 0.8),
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                {new Date(cargo.pickupDateTime).toLocaleString()} → {new Date(cargo.deliveryDateTime).toLocaleString()}
              </Typography>
            </Box>
          </Stack>

          {cargo.notes && (
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 1.5,
                fontStyle: 'italic',
                borderLeft: '3px solid',
                borderColor: theme.palette.primary.main,
                pl: 1.5,
                py: 0.5,
                color: alpha(theme.palette.text.secondary, 0.9),
                background: alpha(theme.palette.primary.main, 0.1),
                borderRadius: '0 4px 4px 0',
                '&:hover': {
                  color: theme.palette.text.primary,
                  background: alpha(theme.palette.primary.main, 0.15),
                },
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