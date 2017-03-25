jest.mock('os');
const os = require('os');
const index = require('../src/');

describe('index.js', () => {
  test('returns an Promise', () => {
    expect(index()()).toBeInstanceOf(Promise);
  });

  test('returns an object with a id', () => (
    index()().then((result) => {
      expect(result[0].id).toBeDefined();
    })
  ));

  test('returns an object with a title', () => (
    index()().then((result) => {
      expect(result[0].title).toBeDefined();
    })
  ));

  test('returns the system uptime (full)', () => {
    os.uptime = jest.fn(() => 99368);

    return index()().then((result) => {
      expect(result).toEqual([{
        id: 'zazu-uptime.99368',
        title: '01d 03h 36m 08s',
      }]);
    });
  });

  test('returns the system uptime (hours)', () => {
    os.uptime = jest.fn(() => 9368);

    return index()().then((result) => {
      expect(result).toEqual([{
        id: 'zazu-uptime.9368',
        title: '02h 36m 08s',
      }]);
    });
  });

  test('returns the system uptime (minutes)', () => {
    os.uptime = jest.fn(() => 368);

    return index()().then((result) => {
      expect(result).toEqual([{
        id: 'zazu-uptime.368',
        title: '06m 08s',
      }]);
    });
  });

  test('returns the system uptime (seconds)', () => {
    os.uptime = jest.fn(() => 36);

    return index()().then((result) => {
      expect(result).toEqual([{
        id: 'zazu-uptime.36',
        title: '36s',
      }]);
    });
  });
});
