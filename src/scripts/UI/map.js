import { Loader } from 'google-maps';

const loader = new Loader(process.env.GOOGLE_MAPS_PLATFORM_API_KEY);

export default class Map {
  constructor(coordinates) {
    this.render(coordinates);
  }

  render(coordinates) {
    loader
      .load()
      .then(google => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: 8,
        });

        new google.maps.Marker({
          position: coordinates,
          map: map,
        });
      })
      .catch(error => {
        console.log(error);
        return alert('Could not load Maps Library - please try again later!');
      });
  }
}
