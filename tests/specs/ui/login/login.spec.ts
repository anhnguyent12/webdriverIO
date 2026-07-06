import loginPage from 'pages/login';
import userBuilder from 'builders/user';
import userMenuComponent from 'components/userMenu';
import { LoginErrors } from 'constants/messages/error/index';

describe('Login @login', () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  it('Should login successfully with a valid user @smoke', async () => {
    await loginPage.login(userBuilder.username, userBuilder.password);
    expect(await userMenuComponent.getUsername()).toEqual(userBuilder.username);
    expect(await userMenuComponent.isLogoutDisplayed()).toBe(true);
    await userMenuComponent.clickLogout();
  });

  it('Should show error message with an invalid user', async () => {
    const invalidUser = {
      username: userBuilder.username + '123',
      password: userBuilder.password + '123',
    };
    await loginPage.login(invalidUser.username, invalidUser.password);
    expect(await loginPage.getErrorMessage()).toEqual(LoginErrors.INVALID_CREDENTIALS);
  });

  it('Should contain error css with missing user credentials', async () => {
    const cssClass = 'is-invalid';
    await loginPage.login();
    expect(await loginPage.getAttrClassOfUsername()).toContain(cssClass);
    expect(await loginPage.getAttrClassOfPassword()).toContain(cssClass);
  });
});
