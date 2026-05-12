import { create } from "zustand";

export const useVideoStore = create((set) => ({
  selectedVideoId: null,

  setSelectedVideoId: (id) =>
    set(() => ({
      selectedVideoId: id,
    })),

  searchQuery: "",
  setSearchQuery: (value) =>
    set(() => ({
      searchQuery: value,
    })),

  clearSearch: () =>
    set(() => ({
      searchQuery: "",
    })),
}));