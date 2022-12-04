import Location from '../../src/scripts/util/location';

describe('Create a location object', () => {
  it('should create an object with lat & lng properties', () => {
    const latitude = -10;
    const longitude = 10;
    const expectedLocation = { lat: -10, lng: 10 };

    const location = new Location(latitude, longitude);

    expect(location).toEqual(expectedLocation);
  });
});
