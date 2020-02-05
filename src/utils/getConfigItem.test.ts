import getConfigItem from './getConfigItem';

describe('getConfigItem', () => {
  const OLD_ENV = process.env;
  const MOCKED_ENV = {
    port: '8003',
    NODE_ENV: process.env.NODE_ENV,
  };

  beforeAll(() => {
    jest.resetModules();
    process.env = { ...MOCKED_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should throw an error when the key doesn\'t exist', () => {
    expect(() => {
      getConfigItem('badKey');
    }).toThrowError('The key passet doesn\' exist on .env');
  });

  it('should return the proper value when the key exists', () => {
    expect(getConfigItem('port')).toBe('8003');
  });
});
