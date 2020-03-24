import nodeURL from 'url';

import { CleanEnv, str, port, cleanEnv, makeValidator } from 'envalid';

type Environment = {
  NODE_ENV: string;
  PORT: number;
  SECRET_HEX: string;
  WHITELIST_ORIGINS: string[];
};

const strHex64 = makeValidator<string>((x) => {
  if (/^[0-9a-f]{64}$/.test(x)) {
    return x;
  }
  throw new Error('Expected a hex-character string of length 64');
});

const origins = makeValidator<string[]>((x: string) => {
  let origins: string[];
  try {
    origins = JSON.parse(x);
  } catch (error) {
    throw new Error(`Invalid urls: "${x}"`);
  }
  return origins.map((origin, index) => {
    try {
      new nodeURL.URL(origin);
      return origin;
    } catch (e) {
      throw new Error(`Invalid url at position [${index}]: "${origin}"`);
    }
  });
}, 'origins');

export type Config = Readonly<Environment & CleanEnv>;

const config: Config = cleanEnv<Environment>(process.env, {
  NODE_ENV: str({ choices: ['production', 'test', 'development'] }),
  PORT: port(),
  SECRET_HEX: strHex64(),
  WHITELIST_ORIGINS: origins(),
});

export default config;
