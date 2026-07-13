export class BrowserUtil {
  static async removeAds(): Promise<void> {
    await browser.execute(() => {
      const selectors = [
        '#fixedban', // DemoQA
        '#RightSide_Advertisement',
        '.advertisement',
        '.adsbygoogle',
        'iframe[src*="doubleclick"]',
        'iframe[src*="googlesyndication"]',
        'iframe[id*="google_ads"]',
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      });
    });
  }
}
