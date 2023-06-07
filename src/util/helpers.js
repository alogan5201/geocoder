import Reactotron from "reactotron-react-js";
// ! Remove For production
import { create } from "apisauce";
const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;

// define the api
const mapBoxapi = create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  headers: { Accept: "application/vnd.github.v3+json" },
});

export const lowercaseFirst = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;



export const tron = {
  log: function (...args) {
    Reactotron.log(...args);
  },
  warn: function (...args) {
    Reactotron.warn(...args);
  },
  error: function (...args) {
    Reactotron.error(...args);
  },
  display: function (...args) {
    Reactotron.display(...args);
  },
  logImportant: function (...args) {
    Reactotron.logImportant(...args);
  },
};






export function extractWords(str) {
  //Split string into array of words
  return str.split(" ");
}
export function latLongToDMS(latitude, longitude) {
  let latDegrees = Math.floor(latitude);
  let latMinutes = Math.floor((latitude - latDegrees) * 60);
  let latSeconds = Math.floor(((latitude - latDegrees) * 60 - latMinutes) * 60);

  let longDegrees = Math.floor(longitude);
  let longMinutes = Math.floor((longitude - longDegrees) * 60);
  let longSeconds = Math.floor(((longitude - longDegrees) * 60 - longMinutes) * 60);
  // n -> a
  // a -> b
  // m -> c
  // l -> d
  // t -> lat
  // e -> lng
  return (
    latDegrees +
    "° " +
    latMinutes +
    "' " +
    latSeconds +
    '" ' +
    longDegrees +
    "° " +
    longMinutes +
    "' " +
    longSeconds +
    '"'
  );
}
export function convertLatLngToDMS(lat, lng) {
  let a = 0,
    b = 0,
    c = 0,
    d = "X";
  let latDms = getLat(lat, a, b, c, d);
  let lngDms = getLng(lng, a, b, c, d);
  return [latDms, lngDms];
  function getLat(lat, a, b, c, d) {
    let e = !0;
    d = e && 0 > lat ? "S" : !e && 0 > lat ? "W" : e ? "a" : "E";
    d = Math.abs(lat);
    a = Math.floor(d);
    c = 3600 * (d - a);
    b = Math.floor(c / 60);
    c = Math.round(1e4 * (c - 60 * b)) / 1e4;
    let data = a + "° " + b + "' " + c + "'' " + d;
    return data;
  }
  function getLng(lng, a, b, c, d) {
    let e = !1;
    d = e && 0 > lng ? "S" : !e && 0 > lng ? "W" : e ? "a" : "E";
    d = Math.abs(lng);
    a = Math.floor(d);
    c = 3600 * (d - a);
    b = Math.floor(c / 60);
    c = Math.round(1e4 * (c - 60 * b)) / 1e4;
    let data = a + "° " + b + "' " + c + "'' " + d;
    return data;
  }
}
// This function takes in a string argument in the format of 'degrees minutes seconds' (e.g. '41 19 47') and parses it into its respective degree, minute, and second components for conversion to latitude and longitude.


export function isNumber(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
export function convertDMStoLatLng(dms) {
  var t = !1,
    n = dms.latDegrees;
  0 > n && (t = !0);
  var o = Math.abs(dms.latMinutes),
    a = Math.abs(dms.latSeconds);
  t && ((o = -1 * o), (a = -1 * a));
  var l = n + o / 60 + a / 3600;
  let lat = parseFloat(l).toFixed(8);
  var i = dms.lngDegrees;
  0 > i && (t = !0);
  var m = Math.abs(dms.lngMinutes),
    r = Math.abs(dms.lngSeconds);
  isNumber(i) || (i = 0),
    isNumber(m) || (m = 0),
    isNumber(r) || (r = 0),
    t && ((m = -1 * m), (r = -1 * r));
  var d = i + m / 60 + r / 3600;
  let lng = parseFloat(d).toFixed(8);
  var s = "(" + lat + " , " + lng + ")";
  return [lat, lng];
}

export function convertLatLngToAddress(){
  // "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoibG9nYW41MjAxIiwiYSI6ImNrcTQybTFoZzE0aDQyeXM1aGNmYnR1MnoifQ.4kRWNfEH_Yao_mmdgrgjPA"
}
export function covertAddressToLatLng(address){
  let location = encodeURIComponent(address);
  
  // "https://api.mapbox.com/geocoding/v5/mapbox.places/Lagrange,GA.json?limit=2&access_token=pk.eyJ1IjoibG9nYW41MjAxIiwiYSI6ImNrcTQybTFoZzE0aDQyeXM1aGNmYnR1MnoifQ.4kRWNfEH_Yao_mmdgrgjPA"
  // start making calls
  mapBoxapi.get(`${location}.json?limit=2&access_token=${VITE_ACCESS_TOKEN}`).then((response) => {
    return response.json();
  });
}

export function test(){
  console.log("this is a test")
}


