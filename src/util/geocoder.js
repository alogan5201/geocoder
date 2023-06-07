// ! Remove For production

import { create } from "apisauce";
const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN,VITE_NODE_ENV } = import.meta.env;
import { tron,lowercaseFirst } from "./helpers";
// define the api
const mapBoxapi = create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  headers: { Accept: "application/vnd.github.v3+json" },
});

export const covertAddressToLatLng = async (address) => {
  let location = encodeURIComponent(address);

  if(VITE_NODE_ENV === 'development'){
    let addr = lowercaseFirst(address)
    let loc = addr.includes('atlanta') ? 'atlanta' : addr.includes('atl') ? 'atlanta' : 'austin'
    const response = await getFakeData(`addresses/${loc}`)
    return response
  } 
else {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${VITE_ACCESS_TOKEN}`,
    { method: "GET" }
  );

  // "https://api.mapbox.com/geocoding/v5/mapbox.places/Lagrange,GA.json?limit=2&access_token=pk.eyJ1IjoibG9nYW41MjAxIiwiYSI6ImNrcTQybTFoZzE0aDQyeXM1aGNmYnR1MnoifQ.4kRWNfEH_Yao_mmdgrgjPA"
  // start making calls
/*   mapBoxapi.get(`${location}.json?limit=2&access_token=${VITE_ACCESS_TOKEN}`).then((response) => {

    return response
  }); */
  if (response.status !== 200) {
    return;
  }
  const data = await response.json();
  return data;
}

};

async function getFakeData(input) {
  const response = await fetch(
      `http://localhost:3000/${input}`,
      { method: "GET" }
  );
  if (response.status !== 200) {
      return;
  }
  const data = await response.json();
  const output = data['data']
  return output;
}

export function convertLatLngToDMS(lat, lng) {
  let a = 0,
    b = 0,
    c = 0,
    d = "X";
  let latDms = getLat(lat, a, b, c, d);
  let lngDms = getLng(lng, a, b, c, d);
  let output = {
    lat: latDms,
    lng: lngDms
  }
  return output;
  function getLat(lat, a, b, c, d) {
    let e = !0;
    d = e && 0 > lat ? "S" : !e && 0 > lat ? "W" : e ? "a" : "E";
    d = Math.abs(lat);
    a = Math.floor(d);
    c = 3600 * (d - a);
    b = Math.floor(c / 60);
    c = Math.round(1e4 * (c - 60 * b)) / 1e4;
      let display = a + "° " + b + "' " + c + "''";
    let latOutput = {
  degrees: a,
  minutes: b,
  seconds: c,
  lat: d,
  display: display
    }

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
    let display = a + "° " + b + "' " + c + "'' " + d;
      let lngOutput = {
  degrees: a,
  minutes: b,
  seconds: c,
        lng: d,
         display: display,
    }
    return lngOutput;
  }
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
// [ "33° 44' 56.3712'' 33.748992", "84° 23' 24.9504'' 84.390264" ]
let t = {
  latDegrees: 41,
  latMinutes: 19,
  latSeconds: 47,
  lngDegrees: -73,
  lngMinutes: 59,
  lngSeconds: 39,
}