import BasePage from 'pages/base';

class BookPage extends BasePage {
  public async open(): Promise<void> {
    await super.open('/books');
  }

  public async getBookPageUrl(): Promise<string> {
    return await this.getUrl();
  }
}

export default new BookPage();
