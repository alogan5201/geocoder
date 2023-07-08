import { create } from 'zustand'
import { tron,shallowCopy } from 'util/helpers'
import {convertLatLngToDMS,convertDMStoLatLng} from 'util/geocoder'

 const useStore = create((set) => ({
   bears: 0,
   geoData: null,
   markerData: null,
   cachedMarkerData: null,
   zoom: 0,
   testData: null,
   userLocationActive: false,
   clearMapInputs: false,
   bookmarks: [],
   bookmarked: false,
   bookmarkLocation: false,
   mapZoom: null,
   mapStopped: false,
   routeData: null,
   errorMessage: false,
  weather: null,
  loading: false,
   setLoading: (data) => {
       set(() => ({ loading: data }));
   },
   setErrorMessage: (data) => {
       set(() => ({ errorMessage: data }));
   },
   setRouteData: (data) => {
       set(() => ({ routeData: data }));
   },
   setWeather: (data) => {
       set(() => ({ weather: data }));
   },
   setBookmarkForLocation: (data) => {
       set(() => ({ bookmarkLocation: data }));
   },
   resetMapData: () => {
    // Used on page change to reset state
     set({ markerData: null, clearMapInputs: true, mapZoom: null });
   },
   setBookmarks: () => {
     const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
     set({ bookmarks: bookmarks });
   },
   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
   resetMapZoom: (data) => {
     set({ zoom: data });
   },
   setBookmarked: (data) => {
     set((state) => ({ bookmarked: data }));
   },
   setMapZoom: (data) => {
     set(() => ({ mapZoom: data }));
   },
   setMapStopped: (data) => {
     set(() => ({ mapStopped: data }));
   },
   removeAllBears: () => set({ bears: 0 }),
   setGeoData: (data) => {
     set({ geoData: data });
   },
   setMapInputState: (data) => {
     set({ clearMapInputs: data });
   },
   setUserLocationActive: (data) => {
     set({ userLocationActive: data });
   },
   setTestData: (data) => {
     set({ testData: data });
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
       obj["userLocation"] = obj["userLocation"];
       markerData.push(obj);
     }

     set({ markerData: markerData });
   },
 }));

export default useStore