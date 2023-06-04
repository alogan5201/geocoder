// ! Remove For production
import { create } from "apisauce";
const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;

// define the api
const mapBoxapi = create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  headers: { Accept: "application/vnd.github.v3+json" },
});

export const covertAddressToLatLng = async (address) => {
  let location = encodeURIComponent(address);
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
};
