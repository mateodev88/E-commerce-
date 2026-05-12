import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Store para manejar la autenticación y sesión del usuario
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      login: (userData) => set({ 
        user: userData, 
        isLoggedIn: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isLoggedIn: false 
      }),
      
      updateUser: (updatedData) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedData } : null
      })),
    }),
    {
      name: 'auth-storage', // Nombre de la llave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
