import BasePage from 'pages/base';

class LoginPage extends BasePage {
  private readonly locator = {
    usernameTxt: '#userName',
    passwordTxt: '#password',
    loginBtn: 'button#login',
    newUserBtn: 'button#newUser',
    errorMessage: 'p#name',
  };

  private get usernameInput() {
    return $(this.locator.usernameTxt);
  }

  private get passwordInput() {
    return $(this.locator.passwordTxt);
  }

  private get loginButton() {
    return $(this.locator.loginBtn);
  }

  private get newUserButton() {
    return $(this.locator.newUserBtn);
  }

  private get errorMessage() {
    return $(this.locator.errorMessage);
  }

  public async open(): Promise<void> {
    await super.open('/login');
  }

  public async getUsernameValue(): Promise<string> {
    return await this.getElementValue(this.usernameInput, 'Username Input');
  }

  public async getPasswordValue(): Promise<string> {
    return await this.getElementValue(this.passwordInput, 'Password Input');
  }

  public async getAttrClassOfUsername(): Promise<string> {
    return (await this.usernameInput.getAttribute('class')) as string;
  }

  public async getAttrClassOfPassword(): Promise<string> {
    return (await this.passwordInput.getAttribute('class')) as string;
  }

  public async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage, 'Login Error Message');
  }

  public async clickNewUser(): Promise<void> {
    await this.clickElement(this.newUserButton, 'New User Button');
  }

  public async login(username: string = '', password: string = ''): Promise<void> {
    await this.enterText(this.usernameInput, username, 'Username Input');
    await this.enterText(this.passwordInput, password, 'Password Input');
    await this.clickElement(this.loginButton, 'Login Button');
    await this.waitForPageLoad();
  }

  public async redirectToRegister(): Promise<void> {
    await this.open();
    await this.clickNewUser();
    await this.waitForPageLoad();
    await browser.pause(7000);
  }
}

export default new LoginPage();
