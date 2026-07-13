import { baseConfig } from 'config/wdio.base';
import envConfig from 'env';

const isHeadless = process.env.HEADLESS === 'true';

export const config: WebdriverIO.Config = {
  ...baseConfig,
  baseUrl: envConfig?.baseUrl || 'https://demoqa.com',
  maxInstances: 1,
  capabilities: [
    {
      'wdio:maxInstances': 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [...(isHeadless ? ['--headless=new'] : [])],
      },
    },
  ],
};
