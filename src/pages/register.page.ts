import BasePage from 'pages/base';

class RegisterPage extends BasePage {
  private readonly locator = {
    pageTitle: 'h1.text-center',
    form: 'form#userForm',
    formTitle: '//h4[text()="Register to Book Store"]',
    firstNameTxt: 'input#firstname',
    lastNameTxt: 'input#lastname',
    usernameTxt: 'input#userName',
    passwordTxt: 'input#password',
    registerBtn: 'button#register',
    backToLoginBtn: 'button#gotologin',
    errorMessage: 'p#name',
  };

  private get pageTitle() {
    return $(this.locator.pageTitle);
  }

  private get registerForm() {
    return $(this.locator.form);
  }

  private get formTitle() {
    return $(this.locator.formTitle);
  }

  private get firstNameInput() {
    return $(this.locator.firstNameTxt);
  }

  private get lastNameInput() {
    return $(this.locator.lastNameTxt);
  }

  private get usernameInput() {
    return $(this.locator.usernameTxt);
  }

  private get passwordInput() {
    return $(this.locator.passwordTxt);
  }

  private get registerButton() {
    return $(this.locator.registerBtn);
  }

  private get backToLoginButton() {
    return $(this.locator.backToLoginBtn);
  }

  private get errorMessage() {
    return $(this.locator.errorMessage);
  }

  public async open(): Promise<void> {
    await super.open('/register');
    await browser.pause(7000);
  }

  public async submitForm(
    firstName: string = '',
    lastName: string = '',
    username: string = '',
    password: string = '',
  ): Promise<void> {
    await this.enterText(this.firstNameInput, firstName, 'Username Input');
    await this.enterText(this.lastNameInput, lastName, 'Username Input');
    await this.enterText(this.usernameInput, username, 'Username Input');
    await this.enterText(this.passwordInput, password, 'Username Input');
    await this.clickElement(this.registerButton, 'Register Button');
    await this.waitForPageLoad();
  }

  public async clickBackToLogin(): Promise<void> {
    await this.clickElement(this.backToLoginButton, 'Back to Login Button');
  }

  public async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage, 'Register Error Message');
  }

  public async getFirstNameValue(): Promise<string> {
    return await this.getElementValue(this.firstNameInput, 'First Name Input');
  }

  public async getLastNameValue(): Promise<string> {
    return await this.getElementValue(this.lastNameInput, 'Last Name Input');
  }

  public async getUsernameValue(): Promise<string> {
    return await this.getElementValue(this.usernameInput, 'Username Input');
  }

  public async getPasswordValue(): Promise<string> {
    return await this.getElementValue(this.passwordInput, 'Password Input');
  }

  public async getAttrClassOfFirstName(): Promise<string> {
    return (await this.firstNameInput.getAttribute('class')) as string;
  }

  public async getAttrClassOfLastName(): Promise<string> {
    return (await this.lastNameInput.getAttribute('class')) as string;
  }

  public async getAttrClassOfUsername(): Promise<string> {
    return (await this.usernameInput.getAttribute('class')) as string;
  }

  public async getAttrClassOfPassword(): Promise<string> {
    return (await this.passwordInput.getAttribute('class')) as string;
  }

  public async isPageTitleDisplayed(): Promise<boolean> {
    return await this.pageTitle.isDisplayed();
  }

  public async isRegisterFormDisplayed(): Promise<boolean> {
    return await this.registerForm.isDisplayed();
  }

  public async isFormTitleDisplayed(): Promise<boolean> {
    return await this.formTitle.isDisplayed();
  }
}

export default new RegisterPage();
