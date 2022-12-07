import Location from '../../src/scripts/util/location';

describe('Location class', () => {
  it('should create an object with lat & lng properties', () => {
    const latitude = -10;
    const longitude = 10;
    const expectedLocation = { lat: -10, lng: 10 };

    const location = new Location(latitude, longitude);

    expect(location).toEqual(expectedLocation);
  });

  it('should throw an error if latitude is out of range', () => {
    const latitude = -100;
    const longitude = 10;

    const resultFn = () => new Location(latitude, longitude);

    expect(resultFn).toThrow(/[I-i]nvalid input/);
  });

  it('should throw an error if longitude is out of range', () => {
    const latitude = -10;
    const longitude = -190;

    const resultFn = () => new Location(latitude, longitude);

    expect(resultFn).toThrow(/[I-i]nvalid input/);
  });
});
