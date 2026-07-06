import userBuilder from 'builders/user';
import loginPage from 'pages/login';
import registerPage from 'pages/register';
import registerBuilder from 'builders/register';
import userMenuComponent from 'components/userMenu';
import profilePage from 'pages/profile';
import modalComponent from 'components/modal';
import { RegisterErrors } from 'constants/messages/error/index';
import { UserSuccess } from 'constants/messages/success/index';

describe('Register @register', () => {
  beforeEach(async () => {
    // Has two ways to redirect to the Register page
    // Fist way: go to Login page -> Clicking on Register button
    // await loginPage.open();
    // await loginPage.redirectToRegister();

    // Second way: go to Register page
    await registerPage.open();
  });

  it('Should register success with a valid user @smoke', async () => {
    expect(await registerPage.isRegisterFormDisplayed()).toBe(true);
    await registerPage.submitForm(
      registerBuilder.firstName,
      registerBuilder.lastName,
      registerBuilder.username,
      registerBuilder.password,
    );
    browser.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual(UserSuccess.REGISTER_SUCCESS);
      await dialog.dismiss();
    });

    // Verify login success with new user
    await loginPage.open();
    loginPage.login(registerBuilder.username, registerBuilder.password);
    expect(await userMenuComponent.getUsername()).toEqual(registerBuilder.username);
    expect(await userMenuComponent.isLogoutDisplayed()).toBe(true);

    // Delete account
    await profilePage.clickDeleteAccount();
    expect(await modalComponent.isModalTitleDisplayed()).toBe(true);
    expect(await modalComponent.getModelTitle()).toEqual('Delete Account');
    expect(await modalComponent.getModelBody()).toEqual('Do you want to delete your account?');
    await modalComponent.clickOK();
  });

  it('Should show error message with an existing user', async () => {
    const existingCredentials = {
      firstName: 'Test',
      lastName: 'Auto',
      username: userBuilder.username,
      password: userBuilder.password,
    };

    await registerPage.submitForm(
      existingCredentials.firstName,
      existingCredentials.lastName,
      existingCredentials.username,
      existingCredentials.password,
    );
    expect(await registerPage.getErrorMessage()).toEqual(RegisterErrors.EXISTING_USER);

    expect(await registerPage.getFirstNameValue()).toEqual(existingCredentials.firstName);
    expect(await registerPage.getLastNameValue()).toEqual(existingCredentials.lastName);
    expect(await registerPage.getUsernameValue()).toEqual(existingCredentials.username);
    expect(await registerPage.getPasswordValue()).toEqual(existingCredentials.password);
  });

  it('Should contain error css when missing user credentials', async () => {
    const cssClass = 'is-invalid';
    await registerPage.submitForm();
    expect(await registerPage.getAttrClassOfFirstName()).toContain(cssClass);
    expect(await registerPage.getAttrClassOfLastName()).toContain(cssClass);
    expect(await registerPage.getAttrClassOfUsername()).toContain(cssClass);
    expect(await registerPage.getAttrClassOfPassword()).toContain(cssClass);
  });
});
