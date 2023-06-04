import { create } from 'zustand'
import { tron } from "util/helpers";


 const useStore = create((set) => ({
  bears: 0,
  geoData: null,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  setGeoData: (data) => {
    set({ geoData: data })
    tron.log(data)},
}))

export default useStore