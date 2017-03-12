jest.mock('os');
const os = require('os');
const index = require('../src/');

describe('index.js', () => {
  test('returns the system uptime (full)', () => {
    os.uptime = jest.fn(() => 99368);

    return index()().then((result) => {
      expect(result).toEqual([{ title: '01d 03h 36m 08s' }]);
    });
  });

  test('returns the system uptime (hours)', () => {
    os.uptime = jest.fn(() => 9368);

    return index()().then((result) => {
      expect(result).toEqual([{ title: '02h 36m 08s' }]);
    });
  });

  test('returns the system uptime (minutes)', () => {
    os.uptime = jest.fn(() => 368);

    return index()().then((result) => {
      expect(result).toEqual([{ title: '06m 08s' }]);
    });
  });

  test('returns the system uptime (seconds)', () => {
    os.uptime = jest.fn(() => 36);

    return index()().then((result) => {
      expect(result).toEqual([{ title: '36s' }]);
    });
  });
});
