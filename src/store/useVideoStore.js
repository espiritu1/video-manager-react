import { create } from 'zustand';

export const useVideoStore = create((set) => ({
  // 1. Estado inicial
  isUploadSuccess: false,

  // 2. Acciones para modificar el estado
  setUploadSuccess: (status) => set({ isUploadSuccess: status }),
  
  // Opcional: Una acción para resetear el estado después de un tiempo
  resetUploadStatus: () => set({ isUploadSuccess: false })
}));