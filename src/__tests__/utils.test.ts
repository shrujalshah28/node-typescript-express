import { camelToSnake } from '../utils';

describe('Utils Test', () => {
  test('should convert to snake case', () => {
    const camelCase = 'camelCase';
    const snakeCase = camelToSnake(camelCase);
    expect(snakeCase).toEqual('camel_case');
  });
});
