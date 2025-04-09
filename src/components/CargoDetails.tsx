import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Cargo, CargoStatus } from '../types';
import { useStore } from '../store';

interface CargoDetailsProps {
  cargo: Cargo;
  open: boolean;
  onClose: () => void;
}

export const CargoDetails: React.FC<CargoDetailsProps> = ({
  cargo,
  open,
  onClose,
}) => {
  const { drivers, updateCargo } = useStore();
  const [editedCargo, setEditedCargo] = useState<Cargo>(cargo);

  const handleChange = (field: keyof Cargo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedCargo((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleDateChange = (field: 'pickupDateTime' | 'deliveryDateTime') => (
    date: Date | null
  ) => {
    if (date) {
      setEditedCargo((prev) => ({
        ...prev,
        [field]: date.toISOString(),
      }));
    }
  };

  const handleSave = () => {
    updateCargo(editedCargo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Cargo Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pickup Location"
              value={editedCargo.pickupLocation}
              onChange={handleChange('pickupLocation')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Delivery Location"
              value={editedCargo.deliveryLocation}
              onChange={handleChange('deliveryLocation')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Pickup Date/Time"
                value={new Date(editedCargo.pickupDateTime)}
                onChange={handleDateChange('pickupDateTime')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Delivery Date/Time"
                value={new Date(editedCargo.deliveryDateTime)}
                onChange={handleDateChange('deliveryDateTime')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              value={editedCargo.notes}
              multiline
              rows={4}
              onChange={handleChange('notes')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Driver"
              value={editedCargo.driverId}
              onChange={handleChange('driverId')}
            >
              {drivers.map((driver) => (
                <MenuItem key={driver.id} value={driver.id}>
                  {driver.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Status"
              value={editedCargo.status}
              onChange={handleChange('status')}
            >
              <MenuItem value="booked">Booked</MenuItem>
              <MenuItem value="dispatched">Dispatched</MenuItem>
              <MenuItem value="pickedup">Picked Up</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="TONU">TONU</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 