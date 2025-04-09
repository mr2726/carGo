export type CargoStatus = 'booked' | 'dispatched' | 'pickedup' | 'delivered' | 'paid' | 'TONU' | 'canceled';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  homeCity: string;
  lastLocation?: string;
}

export interface Cargo {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDateTime: string;
  deliveryDateTime: string;
  notes: string;
  status: CargoStatus;
  driverId: string;
  order: number;
} 