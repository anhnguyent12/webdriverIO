import { baseConfig } from 'config/wdio.shared';

export const config: WebdriverIO.Config = {
  ...baseConfig,
  baseUrl: 'https://demoqa.com',
  maxInstances: 1,
  capabilities: [
    {
      'wdio:maxInstances': 1,
      browserName: 'chrome',
    },
  ],
  waitforTimeout: 10000,
};
