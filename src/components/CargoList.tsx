import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { format } from 'date-fns';
import { Cargo, CargoStatus } from '../types';
import { useStore } from '../store';
import { CargoDetails } from './CargoDetails';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import NoteIcon from '@mui/icons-material/Note';

const statusOrder: CargoStatus[] = [
  'booked',
  'dispatched',
  'pickedup',
  'delivered',
  'paid',
  'TONU',
  'canceled',
];

const statusLabels: Record<CargoStatus, string> = {
  booked: 'Booked',
  dispatched: 'Dispatched',
  pickedup: 'Picked Up',
  delivered: 'Delivered',
  paid: 'Paid',
  TONU: 'TONU',
  canceled: 'Canceled',
};

const getStatusColor = (status: CargoStatus) => {
  switch (status) {
    case 'dispatched':
      return 'info';
    case 'pickedup':
      return 'warning';
    case 'delivered':
      return 'success';
    case 'booked':
      return 'primary';
    case 'paid':
      return 'success';
    case 'TONU':
      return 'error';
    case 'canceled':
      return 'error';
    default:
      return 'default';
  }
};

export const CargoList: React.FC = () => {
  const { cargos, selectedDate, drivers } = useStore();
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CargoStatus | 'all'>('all');

  const getDriverName = useCallback((driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    return driver?.name || 'Not Assigned';
  }, [drivers]);

  const filteredCargos = useMemo(() => {
    return cargos.filter((cargo) => {
      const cargoDate = new Date(cargo.pickupDateTime);
      const matchesDate =
        cargoDate.getDate() === selectedDate.getDate() &&
        cargoDate.getMonth() === selectedDate.getMonth() &&
        cargoDate.getFullYear() === selectedDate.getFullYear();
      
      if (!matchesDate) return false;
      
      if (statusFilter !== 'all' && cargo.status !== statusFilter) {
        return false;
      }

      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        cargo.pickupLocation.toLowerCase().includes(searchLower) ||
        cargo.deliveryLocation.toLowerCase().includes(searchLower) ||
        (cargo.notes?.toLowerCase().includes(searchLower) ?? false) ||
        getDriverName(cargo.driverId).toLowerCase().includes(searchLower)
      );
    });
  }, [cargos, selectedDate, statusFilter, searchTerm, getDriverName]);

  const sortedCargos = useMemo(() => {
    return [...filteredCargos].sort((a, b) => {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });
  }, [filteredCargos]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleStatusFilterChange = useCallback((event: SelectChangeEvent<CargoStatus | 'all'>) => {
    setStatusFilter(event.target.value as CargoStatus | 'all');
  }, []);

  const handleOpenCargo = (cargo: Cargo) => {
    setSelectedCargo(cargo);
  };

  const handleCloseCargo = () => {
    setSelectedCargo(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search cargoes..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={statusFilter}
            label="Status Filter"
            onChange={handleStatusFilterChange}
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon color="action" />
              </InputAdornment>
            }
          >
            <MenuItem value="all">All Statuses</MenuItem>
            {statusOrder.map((status) => (
              <MenuItem key={status} value={status}>
                {statusLabels[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          '& .MuiTableCell-root': {
            py: 2,
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell>Status</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCargos.map((cargo) => (
              <TableRow 
                key={cargo.id}
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  },
                  transition: 'background-color 0.2s',
                }}
                onClick={() => handleOpenCargo(cargo)}
              >
                <TableCell>
                  <Chip
                    label={statusLabels[cargo.status]}
                    color={getStatusColor(cargo.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        {cargo.pickupLocation}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ color: 'error.main', mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        {cargo.deliveryLocation}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(cargo.pickupDateTime), 'PPpp')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(cargo.deliveryDateTime), 'PPpp')}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  {cargo.notes && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <NoteIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {cargo.notes}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {getDriverName(cargo.driverId)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCargo(cargo);
                      }}
                    >
                      Open
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedCargo && (
        <CargoDetails
          cargo={selectedCargo}
          open={!!selectedCargo}
          onClose={handleCloseCargo}
        />
      )}
    </Box>
  );
}; 