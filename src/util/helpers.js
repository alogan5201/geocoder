import Reactotron from "reactotron-react-js";
// ! Remove For production


export const tron = {
  log: function (args) {
    Reactotron.log(args);
  },
  warn: function (args) {
    Reactotron.warn(args);
  },
  error: function (args) {
    Reactotron.error(args);
  },
  display: function (args) {
    Reactotron.display(args);
  },
  logImportant: function (args) {
    Reactotron.logImportant(args);
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

// This function takes in a string argument in the format of 'degrees minutes seconds' (e.g. '41 19 47') and parses it into its respective degree, minute, and second components for conversion to latitude and longitude.
export function convertGeoLocation(geoLocation) {
  // Split geoLocation string argument into array
  let geoArray = geoLocation.split(" ");

  // Parse each component of the geoArray into its respective degree, minute, and second components
  let degree = parseInt(geoArray[0]);
  let minute = parseInt(geoArray[1]);
  let second = parseInt(geoArray[2]);

  // Calculate latitude and longitude by converting each component into its decimal equivalent
  let latitude = degree + minute / 60 + second / 3600;
  let longitude = degree + minute / 60 + second / 3600;

  // Return the converted latitude and longitude
  return {
    latitude: latitude,
    longitude: longitude,
  };
}


export default {
  extractWords,
  latLongToDMS,
  convertGeoLocation,
};
