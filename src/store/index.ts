import { create } from 'zustand';
import { Driver, Cargo, CargoStatus } from '../types';
import * as firebaseService from '../services/firebase';

interface StoreState {
  drivers: Driver[];
  cargos: Cargo[];
  selectedDate: Date;
  isLoading: boolean;
  setSelectedDate: (date: Date) => void;
  fetchDrivers: () => Promise<void>;
  fetchCargos: () => Promise<void>;
  addDriver: (driver: Omit<Driver, 'id'>) => Promise<void>;
  updateDriver: (id: string, driver: Partial<Driver>) => Promise<void>;
  addCargo: (cargo: Omit<Cargo, 'id'>) => Promise<void>;
  updateCargo: (id: string, cargo: Partial<Cargo>) => Promise<void>;
  updateCargoOrder: (cargoId: string, newOrder: number) => Promise<void>;
  getDriverCargos: (driverId: string) => Cargo[];
  getDriverLastLocation: (driverId: string) => string;
}

export const useStore = create<StoreState>((set, get) => ({
  drivers: [],
  cargos: [],
  selectedDate: new Date(),
  isLoading: false,

  setSelectedDate: (date) => set({ selectedDate: date }),

  fetchDrivers: async () => {
    set({ isLoading: true });
    try {
      const drivers = await firebaseService.getDrivers();
      set({ drivers });
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCargos: async () => {
    set({ isLoading: true });
    try {
      const cargos = await firebaseService.getCargos();
      set({ cargos });
    } catch (error) {
      console.error('Error fetching cargos:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addDriver: async (driver) => {
    set({ isLoading: true });
    try {
      const newDriver = await firebaseService.addDriver(driver);
      set((state) => ({ drivers: [...state.drivers, newDriver] }));
    } catch (error) {
      console.error('Error adding driver:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateDriver: async (id, driver) => {
    set({ isLoading: true });
    try {
      const updatedDriver = await firebaseService.updateDriver(id, driver);
      set((state) => ({
        drivers: state.drivers.map((d) => (d.id === id ? { ...d, ...updatedDriver } : d)),
      }));
    } catch (error) {
      console.error('Error updating driver:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addCargo: async (cargo) => {
    set({ isLoading: true });
    try {
      const newCargo = await firebaseService.addCargo(cargo);
      set((state) => ({ cargos: [...state.cargos, newCargo] }));
    } catch (error) {
      console.error('Error adding cargo:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateCargo: async (id, cargo) => {
    set({ isLoading: true });
    try {
      const updatedCargo = await firebaseService.updateCargo(id, cargo);
      
      set((state) => ({
        cargos: state.cargos.map((c) => 
          c.id === id ? { ...c, ...updatedCargo } : c
        ),
      }));
    } catch (error) {
      console.error('Error updating cargo:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateCargoOrder: async (cargoId, newOrder) => {
    set({ isLoading: true });
    try {
      await firebaseService.updateCargo(cargoId, { order: newOrder });
      set((state) => ({
        cargos: state.cargos.map((cargo) =>
          cargo.id === cargoId ? { ...cargo, order: newOrder } : cargo
        ),
      }));
    } catch (error) {
      console.error('Error updating cargo order:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  getDriverCargos: (driverId) => {
    const state = get();
    return state.cargos
      .filter((cargo) => cargo.driverId === driverId)
      .sort((a, b) => a.order - b.order);
  },

  getDriverLastLocation: (driverId) => {
    const state = get();
    const activeStatuses: CargoStatus[] = ['booked', 'dispatched', 'pickedup'];
    const driverActiveCargos = state.cargos
      .filter((cargo) => 
        cargo.driverId === driverId && 
        activeStatuses.includes(cargo.status)
      )
      .sort((a, b) => a.order - b.order);

    if (driverActiveCargos.length === 0) {
      const driver = state.drivers.find((d) => d.id === driverId);
      return driver?.homeCity || '';
    }

    return driverActiveCargos[driverActiveCargos.length - 1].deliveryLocation;
  },
})); 