import Location, { getCoordsFromAddress } from '../util/location';
import Modal from '../UI/modal';
import Map from '../UI/map';

import '../../styles/share-place.css';

export class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
  }

  async findAddressHandler(event) {
    event.preventDefault();

    const address = event.target.querySelector('input').value;

    if (!address || address.trim().length === 0) {
      return alert('Invalid address entered - please try again');
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );

    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates);
    } catch (error) {
      alert(error.message);
    }

    modal.hide();
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      return alert(
        'Location feature is not available in your browser - please use a modern browser or manually enter an address'
      );
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );

    modal.show();

    navigator.geolocation.getCurrentPosition(
      successResult => {
        modal.hide();

        const { latitude, longitude } = successResult.coords;
        const location = new Location(latitude, longitude);

        this.selectPlace(location);
      },
      error => {
        modal.hide();
        console.log(error);
        alert(
          'Could not locate you unfortunately. Please enter an address manually!'
        );
      }
    );
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }
}
