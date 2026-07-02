import path from 'node:path';
import { logger } from 'utils/logger';
import { mkdir, rm } from 'node:fs/promises';
import { TIMEOUTS } from 'constants/timeouts';

const screenshotPath: string = path.join(process.cwd(), 'screenshots');

export const baseConfig: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: '../tsconfig.json',
  specs: ['./tests/specs/**/*.spec.ts'],
  suites: {
    login: ['./tests/specs/login/login.spec.ts'],
    regression: ['./tests/specs/**/*.spec.ts'],
  },
  exclude: [],
  maxInstances: 5,
  capabilities: [
    {
      'wdio:maxInstances': 5,
      browserName: 'chrome',
      pageLoadStrategy: 'normal',
      'goog:chromeOptions': {
        args: ['--disable-gpu', '--ignore-certificate-errors'],
      },
      acceptInsecureCerts: true,
    },
  ],
  logLevel: 'error',
  bail: 0,
  waitforTimeout: TIMEOUTS.EXPLICIT,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  onPrepare: async function () {
    logger.info('Starting test...');
    // await rm(screenshotPath, { recursive: true, force: true });
  },

  before: async function (capabilities, specs) {
    logger.info(`Setting up environment for spec: "${specs[0].split('specs/')[1]}"`);
    await browser.maximizeWindow();
  },

  afterTest: async function (test, context, { error, result, duration, passed }) {
    if (!passed) {
      logger.error(`Test fail: ${test.title}`, { error });
      logger.info('Screenshot captured and attached to Allure Report.');
      await browser.takeScreenshot();
    }
    await mkdir(screenshotPath, { recursive: true });
    await browser.saveScreenshot(`${screenshotPath}/${test.title}.png`);
  },

  onComplete: function (exitCode) {
    logger.info(`Testing has completed. Exit code: ${exitCode}`);
  },
};
