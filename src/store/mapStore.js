import { create } from 'zustand'


 const useStore = create((set) => ({
  bears: 0,
  geoData: null,
  markerData: null,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  setGeoData: (data) => {
    set({ geoData: data })},
  setMarkerData: (data) => {
    set({ markerData: data })},
}))

export default useStore