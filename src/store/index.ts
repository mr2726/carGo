import { create } from 'zustand';
import { Driver, Cargo } from '../types';

interface StoreState {
  drivers: Driver[];
  cargos: Cargo[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addDriver: (driver: Driver) => void;
  updateDriver: (driver: Driver) => void;
  addCargo: (cargo: Cargo) => void;
  updateCargo: (cargo: Cargo) => void;
  updateCargoOrder: (cargoId: string, newOrder: number) => void;
  getDriverCargos: (driverId: string) => Cargo[];
  getDriverLastLocation: (driverId: string) => string;
}

export const useStore = create<StoreState>((set, get) => ({
  drivers: [],
  cargos: [],
  selectedDate: new Date(),

  setSelectedDate: (date) => set({ selectedDate: date }),

  addDriver: (driver) => 
    set((state) => ({ drivers: [...state.drivers, driver] })),

  updateDriver: (driver) =>
    set((state) => ({
      drivers: state.drivers.map((d) => (d.id === driver.id ? driver : d)),
    })),

  addCargo: (cargo) =>
    set((state) => ({ cargos: [...state.cargos, cargo] })),

  updateCargo: (cargo) =>
    set((state) => ({
      cargos: state.cargos.map((c) => (c.id === cargo.id ? cargo : c)),
    })),

  updateCargoOrder: (cargoId, newOrder) =>
    set((state) => ({
      cargos: state.cargos.map((cargo) =>
        cargo.id === cargoId ? { ...cargo, order: newOrder } : cargo
      ),
    })),

  getDriverCargos: (driverId) => {
    const state = get();
    return state.cargos
      .filter((cargo) => cargo.driverId === driverId)
      .sort((a, b) => a.order - b.order);
  },

  getDriverLastLocation: (driverId) => {
    const state = get();
    const driverCargos = state.cargos
      .filter((cargo) => cargo.driverId === driverId)
      .sort((a, b) => a.order - b.order);

    if (driverCargos.length === 0) {
      const driver = state.drivers.find((d) => d.id === driverId);
      return driver?.homeCity || '';
    }

    return driverCargos[driverCargos.length - 1].deliveryLocation;
  },
})); 