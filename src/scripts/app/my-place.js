import sanitize from 'sanitize-html';

import Map from '../UI/map';

import '../../styles/app.css';
import '../../styles/my-place.css';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);

    const headerTitleElement = document.querySelector('header h1');
    headerTitleElement.textContent = sanitize(address);
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coordinates = {
  lat: parseFloat(queryParams.get('lat')),
  lng: parseFloat(queryParams.get('lng')),
};
const address = queryParams.get('address');

new LoadedPlace(coordinates, address);
