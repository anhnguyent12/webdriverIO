import BasePage from 'pages/base';

class BookDetailPage extends BasePage {
  private readonly locator = {
    isbnLbl: '//div[@id="ISBN-wrapper"]//label[@id="userName-value"]',
    bookTitleLbl: '//div[@id="title-wrapper"]//label[@id="userName-value"]',
    backToBookStoreBtn: 'div.text-left>button',
    addToYourCollectionBtn: 'div.text-right>button#addNewRecordButton',
  };

  private get isbnLabel() {
    return $(this.locator.isbnLbl);
  }

  private get bookTitleLabel() {
    return $(this.locator.bookTitleLbl);
  }

  private get backToBookStoreButton() {
    return $(this.locator.backToBookStoreBtn);
  }

  private get addToYourCollectionButton() {
    return $(this.locator.addToYourCollectionBtn);
  }

  public async getBookDetailPageUrl(): Promise<string> {
    return await this.getUrl();
  }

  public async getISBN(): Promise<string> {
    return await this.getElementText(this.isbnLabel, 'ISBN Label');
  }

  public async getBookTitle(): Promise<string> {
    return await this.getElementText(this.bookTitleLabel, 'Book Title Label');
  }

  public async clickBackToBookStore(): Promise<void> {
    await this.clickElement(this.backToBookStoreButton, 'Back to Book Store Button');
  }

  public async clickAddToYourCollection(): Promise<void> {
    await this.addToYourCollectionButton.scrollIntoView();
    await this.clickElement(this.addToYourCollectionButton, 'Add to your collection Button');
  }
}

export default new BookDetailPage();
