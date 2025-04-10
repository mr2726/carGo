import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Driver, Cargo } from '../types';

// Collections
const DRIVERS_COLLECTION = 'drivers';
const CARGOS_COLLECTION = 'cargos';

// Driver Services
export const getDrivers = async (): Promise<Driver[]> => {
  const driversCol = collection(db, DRIVERS_COLLECTION);
  const driverSnapshot = await getDocs(driversCol);
  return driverSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Driver[];
};

export const addDriver = async (driver: Omit<Driver, 'id'>) => {
  const driversCol = collection(db, DRIVERS_COLLECTION);
  const docRef = await addDoc(driversCol, driver);
  return { id: docRef.id, ...driver };
};

export const updateDriver = async (id: string, driver: Partial<Driver>) => {
  const driverRef = doc(db, DRIVERS_COLLECTION, id);
  await updateDoc(driverRef, driver);
  return { id, ...driver };
};

export const deleteDriver = async (id: string) => {
  const driverRef = doc(db, DRIVERS_COLLECTION, id);
  await deleteDoc(driverRef);
};

// Cargo Services
export const getCargos = async (): Promise<Cargo[]> => {
  const cargosCol = collection(db, CARGOS_COLLECTION);
  const cargoSnapshot = await getDocs(cargosCol);
  return cargoSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Cargo[];
};

export const addCargo = async (cargo: Omit<Cargo, 'id'>): Promise<Cargo> => {
  const cargosCol = collection(db, CARGOS_COLLECTION);
  // Ensure all required fields are present
  const cargoToAdd = {
    ...cargo,
    order: cargo.order || 0,
    status: cargo.status || 'booked'
  };
  const docRef = await addDoc(cargosCol, cargoToAdd);
  return { id: docRef.id, ...cargoToAdd };
};

export const updateCargo = async (id: string, cargo: Partial<Cargo>): Promise<Cargo> => {
  const cargoRef = doc(db, CARGOS_COLLECTION, id);
  
  // Get the current document
  const docSnap = await getDoc(cargoRef);
  if (!docSnap.exists()) {
    throw new Error('Cargo not found');
  }

  // Get current data and merge with updates
  const currentData = docSnap.data() as Omit<Cargo, 'id'>;
  const updatedData = {
    ...currentData,
    ...cargo
  };

  // Update the document
  await updateDoc(cargoRef, updatedData);

  // Return the complete updated cargo
  return {
    id,
    ...updatedData
  };
};

export const deleteCargo = async (id: string) => {
  const cargoRef = doc(db, CARGOS_COLLECTION, id);
  await deleteDoc(cargoRef);
}; 