import config from '../config';

describe('Config service', () => {
  test('.env contents are added to config', () => {
    expect(config['PORT']).toEqual(3000);
  });
});
