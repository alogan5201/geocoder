import { create } from 'zustand'
import { tron,shallowCopy } from 'util/helpers'
import {convertLatLngToDMS,convertDMStoLatLng} from 'util/geocoder'

 const useStore = create((set) => ({
   bears: 0,
   geoData: null,
   markerData: null,
   zoom: 0,
   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
   resetMapZoom: (data) => {
 set({ zoom: data });
   },
   removeAllBears: () => set({ bears: 0 }),
   setGeoData: (data) => {
     set({ geoData: data });
   },
   setMarkerData: (data) => {
     const markerData = [];

     for (let index = 0; index < data.length; index++) {
       const element = data[index];
       let obj = data[index];
       let lat = obj["lat"];
       let lng = obj["lng"];
       let dms = convertLatLngToDMS(lat, lng);
       obj["dms"] = dms;
       markerData.push(obj);
     }

     set({ markerData: markerData });
   },
 }));

export default useStore