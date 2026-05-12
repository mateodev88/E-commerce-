import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Store para manejar el estado de los productos con persistencia
const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      isLoading: false,
      error: null,
      
      setProducts: (products) => set({ products }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: 'product-storage', // Nombre de la llave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore;
