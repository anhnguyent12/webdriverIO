import dev from './dev.js';
import test from './test.js';
import prod from './prod.js';

const env = process.env.ENV || 'test';

export default {
  dev,
  test,
  prod,
}[env];
