# Firebase app
https://geotools-bc75a.firebaseapp.com/

console.log.*$

# Component Tree Hierarchy from Hope Page
1. HomePage


# Typography variants
- i.e. variant="subtitle2"
"h1" 
"h2" 
"h3" 
"h4" 
"h5" 
"h6" 
"subtitle1" 
"subtitle2" 
"body1" 
"body2" 
"button"  
"caption"  
"overline" 

# apisauce
https://github.com/infinitered/apisauce

{
  "section": {
    "py": {
      "xs": 0,
      "lg": 2
    }
  }
}

  name="Address to Latitude & Longitude"
          description="To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates."
          children={<Form addressToLatLng={true}/>}

          

          {
  "styles": {
    "section": {
      "py": {
        "xs": 0,
        "lg": 2
      }
    }
  },
  "name": "Address to Latitude & Longitude",
  "description": "To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.",
  "map": true
}

mapbox://styles/logan5201/

clie67dle008i01qp5yti5z4x

pk.eyJ1IjoibG9nYW41MjAxIiwiYSI6ImNrcTQybTFoZzE0aDQyeXM1aGNmYnR1MnoifQ.4kRWNfEH_Yao_mmdgrgjPA

pk.eyJ1IjoibG9nYW41MjAxIiwiYSI6ImNrcTQybTFoZzE0aDQyeXM1aGNmYnR1MnoifQ.4kRWNfEH_Yao_mmdgrgjPA

projection='globe'


# Development packages 
- These packages should be checked before going to production as they should only be used in dev mode

- callerPath
  - helper.js


git config --global user.email "drewthomaslogan5201@gmail.com"
git config --global user.name "alogan5201"


# POPUP FIX
Just make the popup so big that the map has to pan?

Currently I am debugging an issue with my React application. In relation to the map I would like the popup to always be centered when it is open. The issue is that when adjusting the zoom or moving the map around, entering the same location will cause the popup to not be centered anymore when its open. Specifically I'm trying to figure out why  var px = map.project(markerRef.current._popup._latlng); sometimes returns different x and y values. Can you please explain why this code isn't working? 

# Possible alternative names to Travel page

1. **Route Planner** - Indicates that users can plan routes between two points.
   
2. **Journey Calculator** - Reflects that the page helps calculate various aspects of a journey.
   
3. **Distance and Time Estimator** - Very descriptive; directly tells users that they can estimate travel distance and time.
   
4. **Trip Analyzer** - Suggests that users can analyze different aspects of a trip.
   
5. **Location Connector** - Indicates that users can connect two locations and get information about the connection.
   
6. **Map Your Route** - Friendly and informal; invites users to map out a route.
   
7. **Travel Metrics** - Indicates that users can get travel-related data/metrics.
   
8. **Itinerary Planner** - Suggests a tool for planning travel itineraries.
   
9. **Geo-Navigator** - A bit more technical; reflects the geolocation aspect.
   
10. **Path Finder** - Reflects that users can find paths between two points.
   
11. **Travel Insight** - Indicates that users can gain insights on their travel.
   
12. **Drive & Fly Calculator** - If your app supports different travel modes like driving and flying.
   
13. **Go Between** - A play on words; the term "go-between" means a mediator, but here it could mean going between two places.
   
14. **Waypoint Planner** - For users to plan their waypoints.

15. **Travel Companion** - Reflects that the page can assist travelers in planning their trips.

16. **Route Explorer** - Indicates that users can explore routes between locations.

Choose a name that you feel best matches the tone and functionality of your application. It's also worth considering your target audience and how they might interpret the name.

# Polyline prop options
export interface PathOptions extends InteractiveLayerOptions {
    stroke?: boolean | undefined;
    color?: string | undefined;
    weight?: number | undefined;
    opacity?: number | undefined;
    lineCap?: LineCapShape | undefined;
    lineJoin?: LineJoinShape | undefined;
    dashArray?: string | number[] | undefined;
    dashOffset?: string | undefined;
    fill?: boolean | undefined;
    fillColor?: string | undefined;
    fillOpacity?: number | undefined;
    fillRule?: FillRule | undefined;
    renderer?: Renderer | undefined;
    className?: string | undefined;
}

# Store 
  const [coords, setCoords] = useGlobalValue();
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const setMapZoom = useStore((state) => state.setMapZoom);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const setRouteData = useStore((state) => state.setRouteData);
  const routeData = useStore((state) => state.routeData);

* setRouteData
  * *routeData*

* setBookmarkForLocation
  * *bookmarkLocation*
* resetMarkerData
  * *clearMapInputs*

* setBookmarks
  * *bookmarks*

* increasePopulation

* resetMapZoom
  * *zoom*

* setBookmarked
  * *bookmarked*

* setMapZoom
  * *mapZoom*

* setMapStopped
  * *mapStopped*

* setGeoData
  * *geoData*

* setMapInputState
  * *clearMapInputs*

* setUserLocationActive
  * *userLocationActive*

* setTestData
  * *testData*

* setMarkerData
  * *markerData*


   <Polyline
            positions={route.map((coord) => [coord[1], coord[0]])}
            color={"#44afff"}
            opacity={0.7}
            weight={5}
          />













{
    "_southWest": {
        "lat": 30.267744,
        "lng": -97.743783
    },
    "_northEast": {
        "lat": 33.749296,
        "lng": -84.389338
    }
}


import useStore from "store/mapStore";
  const setLoading = useStore((state) => state.setLoading);


  TODO: 
  Fix the geolocation part