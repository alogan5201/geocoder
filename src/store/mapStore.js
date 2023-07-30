import { create } from 'zustand';

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
   bookmarkLocation: null,
   mapZoom: null,
   mapStopped: false,
   routeData: null,
   errorMessage: false,
   weather: null,
   loading: false,
   autocompleteData: null,
   flyToMarker: null,
   locationMarkerData: null,
   imagesLoaded: 0,
   mapReady: false,
   hideAllLayers: false,
   setHideAllLayers: (data) => {
     set(() => ({ hideAllLayers: data }));
   },
   setMapReady: (data) => {
     set(() => ({ mapReady: data }));
   },
   setImagesLoaded: () => set((state) => ({ imagesLoaded: state.imagesLoaded + 1 })),

   setFlyToMarker: (data) => {
     set(() => ({ flyToMarker: data }));
   },
   setAutocompleteData: (data) => {
     set(() => ({ autocompleteData: data }));
   },
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
     set({
       markerData: null,
       clearMapInputs: true,
       mapZoom: null,
       userLocationActive: false,
       locationMarkerData: null,
       routeData: null,
       imagesLoaded: 0,
       weather: null,
     });
   },
   setBookmarks: () => {
     const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
     set({ bookmarks: bookmarks });
   },
   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
   resetMapZoom: (data) => {
     set({ zoom: data });
   },
   setBookmarked: (data) => {
     set({ bookmarked: data });
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
     set({ locationMarkerData: null });
     set({ markerData: data });
   },
   setLocationMarkerData: (data) => {
     set({ locationMarkerData: data });
   },
 }));

export default useStore