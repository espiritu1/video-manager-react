import { create } from 'zustand';

export const useVideoStore = create((set) => ({
  
  isUploadSuccess: false,
  setUploadSuccess: (status) => set({ isUploadSuccess: status }),
  resetUploadStatus: () => set({ isUploadSuccess: false }),

  categoriesTrigger: 0,
  reloadCategorias: () => set((state) => ({ categoriesTrigger: state.categoriesTrigger + 1 }))

}));