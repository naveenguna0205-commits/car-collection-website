import { createContext, useContext } from 'react';

export const CarContext = createContext(null);

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};

export { CarProvider } from './CarProvider';
