import useStore from "store/mapStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "util/firebase";

const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;

export const lowercaseFirst = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

export const tron = {
  log: function (...args) {},
};

export function extractWords(str) {
  //Split string into array of words
  return str.split(" ");
}

// This function takes in a string argument in the format of 'degrees minutes seconds' (e.g. '41 19 47') and parses it into its respective degree, minute, and second components for conversion to latitude and longitude.

export function isNumber(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}

export const shallowCopy = (obj) => Object.assign({}, obj);
export function test() {}
function getUriSlug() {
  let slug = window.location.pathname + window.location.search;
  return slug.replace("/", "");
}

export function handleMapInputState(markerData) {
  let slug = getUriSlug();
  const handleState =
    slug === "address-to-lat-lng"
      ? addressToLatLngInputState(markerData)
      : latLngToAddressInputState(markerData);
  return handleState;
}

function latLngToAddressInputState(markerData) {
  const setMapInputState = useStore((state) => state.setMapInputState);
  const inputState = {
    addressInput: { readOnly: false, value: "Atlanta,GA", active: true },
    latLngInputs: { active: true, readOnly: true, values: { lat: null, lng: null } },
    dmsInputs: {
      active: false,
      readOnly: true,
      values: {
        degrees: 33,
        minutes: 44,
        seconds: 56.3712,
        lat: 33.748992,
        display: "33° 44' 56.37''",
      },
    },
  };
  const markerDataExample = [
    {
      id: "1",
      lat: 33.748992,
      lng: -84.390264,
      title: "Atlanta, Georgia, United States",
      userLocation: false,
      dms: {
        lat: {
          degrees: 33,
          minutes: 44,
          seconds: 56.3712,
          lat: 33.748992,
          display: "33° 44' 56.37''",
        },
        lng: {
          degrees: 84,
          minutes: 23,
          seconds: 24.9504,
          lng: 84.390264,
          display: "84° 23' 24.95''",
        },
      },
    },
  ];
  if (markerData) {
    const output = [];
    let obj = {};
    for (let index = 0; index < markerData.length; index++) {
      const element = markerData[index];
      obj[element.id] = element.id;
      obj["lat"] = element.lat;
      obj["lng"] = element.lng;
      obj["address"] = { readOnly: false, value: element.title, active: true };
      obj["dmsLatDegrees"] = element.dms.lat.degrees;
      obj["dmsLatMinutes"] = element.dms.lat.minutes;
      obj["dmsLatSeconds"] = element.dms.lat.seconds;
      obj["dmsLngDegrees"] = element.dms.lng.degrees;
      obj["dmsLngMinutes"] = element.dms.lng.minutes;
      obj["dmsLngSeconds"] = element.dms.lng.seconds;
      output.push(obj);
    }

    setMapInputState(output);
  }
}
function addressToLatLngInputState(markerData) {
  const inputState = {
    addressInput: { readOnly: false, value: "Atlanta,GA", active: true },
    latLngInputs: { active: true, readOnly: true, values: { lat: null, lng: null } },
    dmsInputs: {
      active: false,
      readOnly: true,
      values: {
        degrees: 33,
        minutes: 44,
        seconds: 56.3712,
        lat: 33.748992,
        display: "33° 44' 56.37''",
      },
    },
  };
  const markerDataExample = [
    {
      id: "1",
      lat: 33.748992,
      lng: -84.390264,
      title: "Atlanta, Georgia, United States",
      userLocation: false,
      dms: {
        lat: {
          degrees: 33,
          minutes: 44,
          seconds: 56.3712,
          lat: 33.748992,
          display: "33° 44' 56.37''",
        },
        lng: {
          degrees: 84,
          minutes: 23,
          seconds: 24.9504,
          lng: 84.390264,
          display: "84° 23' 24.95''",
        },
      },
    },
  ];
  if (markerData) {
    const output = [];
    let obj = {};
    for (let index = 0; index < markerData.length; index++) {
      const element = markerData[index];
      obj[element.id] = element.id;
      obj["address"] = { active: true, readOnly: false, value: element.title };
      obj["latLng"] = {
        active: true,
        readOnly: true,
        values: { lat: element.lat, lng: element.lng },
      };
      obj["dms"] = {
        active: false,
        readOnly: false,
        values: {
          lat: {
            degrees: element.dms.lat.degrees,
            minutes: element.dms.lat.minutes,
            seconds: element.dms.lat.seconds,
          },
          lng: {
            degrees: element.dms.lng.degrees,
            minutes: element.dms.lng.minutes,
            seconds: element.dms.lng.seconds,
          },
        },
      };
      output.push(obj);
    }

    return output;
  }
}

async function getWikidataImage(wikidataId) {
  try {
    // Step 1: Fetch image filename from Wikidata entity
    const claimsUrl = `/wikidata-api?action=wbgetclaims&property=P18&entity=${wikidataId}&format=json`;
    const claimsResponse = await fetch(claimsUrl);

    const claimsText = await claimsResponse.text();
    //

    const claimsData = JSON.parse(claimsText); // Parse the text as JSON

    const imageName = claimsData.claims.P18[0].mainsnak.datavalue.value;

    // Step 2: Fetch the actual image URL from Wikimedia Commons
    const imageUrl = `/commons-api?action=query&titles=File:${encodeURIComponent(
      imageName
    )}&prop=imageinfo&iiprop=url&format=json`;
    const imageResponse = await fetch(imageUrl);
    const imageData = await imageResponse.json();

    // Extract image URL from the nested object
    const pages = imageData.query.pages;
    const firstPage = Object.keys(pages)[0];
    const imageUrlFinal = pages[firstPage].imageinfo[0].url;

    return imageUrlFinal;
  } catch (error) {
    console.error("Error fetching image: ", error);
    return null;
  }
}

export function secondsToHoursMinutes(seconds) {
  let totalMinutes = Math.floor(seconds / 60);
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;

  if (hours > 0) {
    let obj = { hours: hours, minutes: minutes };

    return obj;
  } else {
    let obj = { hours: null, minutes: minutes };
    return obj;
  }
}


    export const areObjectsEqual = (...objects) =>
       objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

export const fetchWeather = async (lat,lng) => {
     const response = await fetch(
       `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid&appid=6185638fa6045f2f694129e53175d997`,
       { method: "GET" }
     );
     if (response.status !== 200) {
       return;
     }
    const data = await response.json();
     const output = data && data.weather ? data.weather[0].icon : null; 
     if(output){

       return data;
     }

};       
export function getRangeForNumber(n, num) {
  const ranges = generateRanges(n);
  return ranges.find((range) => num >= range[0] && num <= range[1]);
}
export function generateRanges(n) {
  const ranges = [];
  for (let i = 1; i <= n; i += 15) {
    ranges.push([i, i + 14]);
  }
  return ranges;
}
export function isInPaginationPosition(total, number) {

  const subsets = generateRanges(total);
  return subsets.length < number ? false : true;
}

export async function getMovieListLength(){
const localMovieLength = localStorage.getItem("movie-list-length");
if(localMovieLength){
  return Number(localMovieLength);
}
else {

  // * As more movies are added to the database, this number should be updated
localStorage.setItem("movie-list-length", 250);
return 250
}
}
export function isFirstItemOf15Subset(total, number) {
  // calculate the subset start for the given number
  const subsetStart = Math.floor((number - 1) / 15) * 15 + 1;

  // if the subset start is equal to the number, then the number is the first item in its subset
  return subsetStart === number;
}

export function truncateToSixDecimals(num) {
  return Math.trunc(num * 1000000) / 1000000;
}

export function getCurrentTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}
 function convertLatLngToDMS(lat, lng) {
   let a = 0,
     b = 0,
     c = 0,
     d = "X";
   let latDms = getLat(lat, a, b, c, d);
   let lngDms = getLng(lng, a, b, c, d);
   let output = {
     lat: latDms,
     lng: lngDms,
   };
   return output;
   function getLat(lat, a, b, c, d) {
     let e = !0;
     d = e && 0 > lat ? "S" : !e && 0 > lat ? "W" : e ? "a" : "E";
     d = Math.abs(lat);
     a = Math.floor(d);
     c = 3600 * (d - a);
     b = Math.floor(c / 60);
     c = Math.round(1e4 * (c - 60 * b)) / 1e4;
     let displayA = Number.isInteger(a) ? a : a.toFixed(2);
     let displayB = Number.isInteger(b) ? b : b.toFixed(2);
     let displayC = Number.isInteger(c) ? c : c.toFixed(2);
     let display = displayA + "° " + displayB + "' " + displayC + "''";

     let text = a.toFixed(2);

     let latOutput = {
       degrees: a,
       minutes: b,
       seconds: c,
       lat: d,
       display: display,
     };

     return latOutput;
   }
   function getLng(lng, a, b, c, d) {
     let e = !1;
     d = e && 0 > lng ? "S" : !e && 0 > lng ? "W" : e ? "a" : "E";
     d = Math.abs(lng);
     a = Math.floor(d);
     c = 3600 * (d - a);
     b = Math.floor(c / 60);
     c = Math.round(1e4 * (c - 60 * b)) / 1e4;
     let displayA = Number.isInteger(a) ? a : a.toFixed(2);
     let displayB = Number.isInteger(b) ? b : b.toFixed(2);
     let displayC = Number.isInteger(c) ? c : c.toFixed(2);
     let display = displayA + "° " + displayB + "' " + displayC + "''";
     let lngOutput = {
       degrees: a,
       minutes: b,
       seconds: c,
       lng: d,
       display: display,
     };
     return lngOutput;
   }
 }
export function formatMarkerData(data){
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
       return markerData
}