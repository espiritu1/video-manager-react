
import { create } from 'zustand';

export const useVideoStore = create((set) => ({
  // Control de categorías
  categoriesTrigger: 0,
  reloadCategorias: () => set((state) => ({ categoriesTrigger: state.categoriesTrigger + 1 })),

  // ⭐ Control de videos (¡Misma lógica limpia con contador!)
  videosTrigger: 0, // ⭐
  reloadVideos: () => set((state) => ({ videosTrigger: state.videosTrigger + 1 })), // ⭐

  // Tus otros estados por si los usas en otra parte
  isUploadSuccess: false,
  setUploadSuccess: (status) => set({ isUploadSuccess: status }),
  resetUploadStatus: () => set({ isUploadSuccess: false }),
}));