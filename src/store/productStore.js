import { create } from 'zustand';

// Store para manejar el estado de los productos a nivel global
const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  
  // Acciones que implementaremos más adelante para llenar el store
  setProducts: (products) => set({ products }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default useProductStore;
