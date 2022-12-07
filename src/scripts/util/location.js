const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

export default class Location {
  constructor(latitude, longitude) {
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180)
      throw Error('Invalid input value');

    this.lat = latitude;
    this.lng = longitude;
  }
}

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coordinates. Please try again!');
  }

  const responseData = await response.json();

  if (responseData.error_message) {
    throw new Error(responseData.error_message);
  }

  const coordinates = responseData.results[0].geometry.location;

  return coordinates;
}

export async function getAddressFromCoords(coordinates) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address. Please try again!');
  }

  const responseData = await response.json();

  if (responseData.error_message) {
    throw new Error(responseData.error_message);
  }

  const address = responseData.results[0].formatted_address;

  return address;
}
