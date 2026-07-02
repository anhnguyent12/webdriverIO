import BasePage from 'pages/base';

class UserMenuComponent extends BasePage {
  private readonly locator = {
    searchTxt: 'input#searchBox',
    usernameLbl: 'label#userName-value',
    logoutBtn: '//button[text()="Logout"]',
  };

  private get searchInput() {
    return $(this.locator.searchTxt);
  }

  private get usernameLabel() {
    return $(this.locator.usernameLbl);
  }

  private get logoutButton() {
    return $(this.locator.logoutBtn);
  }

  public async searchBook(bookName: string): Promise<void> {
    await this.enterText(this.searchInput, bookName, 'Search Input');
  }

  public async getUsername(): Promise<string> {
    return await this.getElementText(this.usernameLabel, 'Username Label');
  }

  public async clickLogout(): Promise<void> {
    await this.clickElement(this.logoutButton, 'Logout Button');
  }

  public async isLogoutDisplayed(): Promise<boolean> {
    return await this.logoutButton.isDisplayed();
  }
}

export default new UserMenuComponent();
