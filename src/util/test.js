async function getFakeData(input) {
  const response = await fetch(`http://localhost:3000/${input}`, { method: "GET" });
  if (response.status !== 200) {
    return;
  }
  const data = await response.json();
  const output = data["data"];
  return output;
}
const convertLatLngToAddress = async (lat, lng) => {
  const VITE_ACCESS_TOKEN =
    "pk.eyJ1IjoibG9nYW41MjAxIiwiYSI6ImNrcTQybTFoZzE0aDQyeXM1aGNmYnR1MnoifQ.4kRWNfEH_Yao_mmdgrgjPA";
  const VITE_NODE_ENV = "development";
  if (VITE_NODE_ENV === "development") {
    const response = await getFakeData(`addresses/atlanta`);
    return response;
  } else {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${VITE_ACCESS_TOKEN}`,
      { method: "GET" }
    );

    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    return data;
  }
};

async function main() {
  // 34.0623886 -84.2836908
  let lat = 34.0623886;
  let lng = -84.2836908;
  const data = await convertLatLngToAddress(lat, lng);
}

main();
