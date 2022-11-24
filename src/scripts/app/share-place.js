import '../../styles/share-place.css';
export class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    addressForm.addEventListener('submit', this.findAddressHandler);
    locateUserBtn.addEventListener('click', this.locateUserHandler);
  }

  findAddressHandler() {}

  locateUserHandler() {
    if (!navigator.geolocation) {
      return alert(
        'Location feature is not available in your browser - please use a modern browser or manually enter an address'
      );
    }

    navigator.geolocation.getCurrentPosition(
      successResult => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };

        console.log(coordinates);
      },
      error => {
        console.log(error);
        alert(
          'Could not locate you unfortunately. Please enter an address manually!'
        );
      }
    );
  }
}
