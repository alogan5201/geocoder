const VITE_FIREBASE_API_KEY = "AIzaSyBCU8RRxV3qaSyxOgc4ObSWmUhlfnJsYTo";
async function getCityPhoto(cityName) {
  const apiKey = VITE_FIREBASE_API_KEY;
  try {
    // Step 1: Search for the city and retrieve a photo_reference
    const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      cityName
    )}&inputtype=textquery&fields=photos&key=${apiKey}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    const photoReference = placeSearchData.candidates[0].photos[0].photo_reference;

    // Step 2: Use the photo_reference to retrieve the image URL
    const maxwidth = 400; // You can set this to the desired image width
    const placePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${apiKey}`;

    // placePhotoUrl is the URL of the image. You can use it directly in an <img> element.
    return placePhotoUrl;
  } catch (error) {
    console.error("Error fetching city photo: ", error);
    return null;
  }
}

async function main() {
  let test = await getCityPhoto("Austin, Texas, United States");
return test
}


let x = main() 
console.log(x)
