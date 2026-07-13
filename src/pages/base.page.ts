import { logger } from 'utils/logger';
import { TIMEOUTS } from 'constants/timeouts';
import { BrowserUtil } from 'utils/browser';

type Element = ChainablePromiseElement;

export default class BasePage {
  public async waitForPageLoad(): Promise<void> {
    await browser.setTimeout({ pageLoad: TIMEOUTS.PAGE_LOAD });
  }

  public async open(path: string): Promise<void> {
    try {
      await browser.url(path);
      await this.waitForPageLoad();
      await BrowserUtil.removeAds();
    } catch (error) {
      logger.error('Error when opening');
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async refresh(): Promise<void> {
    try {
      await browser.refresh();
      await this.waitForPageLoad();
      await BrowserUtil.removeAds();
    } catch (error) {
      logger.error('Error when refreshing');
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async goBack(): Promise<void> {
    try {
      await browser.back();
    } catch (error) {
      logger.error('Error when going back');
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async getTitle(): Promise<string> {
    try {
      return await browser.getTitle();
    } catch (error) {
      logger.error(`Error when getting page title`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async getUrl(): Promise<string> {
    try {
      return await browser.getUrl();
    } catch (error) {
      logger.error(`Error when getting page url`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async hover(element: Element, elementName: string = 'Element'): Promise<void> {
    try {
      await element.moveTo();
    } catch (error) {
      logger.error(`Error when hovering on: ${elementName.toLowerCase()}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async clickElement(element: Element, elementName: string = 'Element'): Promise<void> {
    try {
      await element.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
      if (await element.isDisplayed()) await element.click();
    } catch (error) {
      logger.error(`Error when clicking on: ${elementName.toLowerCase()}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async enterText(
    element: Element,
    text: string,
    elementName: string = 'Textbox',
  ): Promise<void> {
    try {
      await element.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
      if (await element.isDisplayed()) await element.setValue(text);
    } catch (error) {
      logger.error(`Error when entering data into: ${elementName.toLowerCase()}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async selectElementByText(
    element: Element,
    text: string,
    elementName: string = 'Element',
  ): Promise<void> {
    try {
      await element.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
      if (await element.isDisplayed()) await element.selectByVisibleText(text);
    } catch (error) {
      logger.error(`Error when selecting text of ${elementName.toLowerCase()}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async selectElementByValue(
    element: Element,
    value: string,
    elementName: string = 'Element',
  ): Promise<void> {
    try {
      await element.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
      if (await element.isDisplayed()) await element.selectByAttribute('value', value);
    } catch (error) {
      logger.error(`Error when selecting by value of ${elementName.toLowerCase()}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async getElementText(element: Element, elementName: string = 'Element'): Promise<string> {
    try {
      await element.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
      if (await element.isDisplayed()) return await element.getText();
      return 'Element is not displayed';
    } catch (error) {
      logger.error(`Error when retrieving text from: ${elementName.toLowerCase()}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async getElementValue(element: Element, elementName: string = 'Element'): Promise<string> {
    try {
      await element.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
      if (await element.isDisplayed()) return await element.getValue();
      return 'Element is not displayed';
    } catch (error) {
      logger.error(`Error when retrieving value from: ${elementName.toLowerCase()}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }
}
