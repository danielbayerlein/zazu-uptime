jest.mock('os');

const index = require('../src/');

describe('index.js', () => {
  const os = require('os'); // eslint-disable-line global-require
  os.uptime = jest.fn(() => 99368);

  test('returns the system uptime', () => (
    index()().then((result) => {
      expect(result).toEqual([{ title: '01d 03h 36m 08s' }]);
    })
  ));
});
