import useStore from "store/mapStore";
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

