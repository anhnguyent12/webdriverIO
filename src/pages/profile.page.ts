import BasePage from 'pages/base';

class ProfilePage extends BasePage {
  private readonly locator = {
    goToBookStoreBtn: 'button#gotoStore',
    deleteAccountBtn: '//button[text()="Delete Account"]',
    deleteAllBooksBtn: '//button[text()="Delete All Books"]',
  };

  private get goToBookStoreButton() {
    return $(this.locator.goToBookStoreBtn);
  }

  private get deleteAccountButton() {
    return $(this.locator.deleteAccountBtn);
  }

  private get deleteAllBooksButton() {
    return $(this.locator.deleteAllBooksBtn);
  }

  public async open(): Promise<void> {
    await super.open('/profile');
    await browser.pause(1000);
  }

  public async clickGoToBookStore(): Promise<void> {
    await this.clickElement(this.goToBookStoreButton, 'Go to Book Store Button');
    await this.waitForPageLoad();
  }

  public async clickDeleteAccount(): Promise<void> {
    await this.clickElement(this.deleteAccountButton, 'Delete Account Button');
  }

  public async clickDeleteAllBooks(): Promise<void> {
    await this.deleteAllBooksButton.scrollIntoView();
    await this.clickElement(this.deleteAllBooksButton, 'Delete All Books Button');
  }
}

export default new ProfilePage();
