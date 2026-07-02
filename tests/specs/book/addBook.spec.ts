import bookBuilder from 'builders/book';
import userBuilder from 'builders/user';
import listBookComponent from 'components/listBook';
import userMenuComponent from 'components/userMenu';
import bookPage from 'pages/book';
import bookDetailPage from 'pages/bookDetail';
import loginPage from 'pages/login';
import profilePage from 'pages/profile';
import bookService from 'services/book';
import userService from 'services/user';
import { logger } from 'utils/logger';

describe('Add Book @addBook', () => {
  before(async () => {
    logger.info('Setup token for call API');
    const token = (await userService.generateToken(userBuilder.username, userBuilder.password))
      .token;
    process.env.AUTH_TOKEN = token;
    await bookService.deleteAllBooks(userBuilder.userId as string);
  });

  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login(userBuilder.username, userBuilder.password);
    await profilePage.clickGoToBookStore();
    expect(await bookPage.getBookPageUrl()).toContain('/books');
  });

  afterEach(async () => {
    await browser.deleteAllCookies();
  });

  it('Should add book success to collection', async () => {
    const book = bookBuilder.builder();
    await userMenuComponent.searchBook(book.title);
    await listBookComponent.clickBookByName(book.title);
    expect(await bookDetailPage.getBookDetailPageUrl()).toContain(`/books?search=${book.isbn}`);
    expect(await bookDetailPage.getISBN()).toEqual(book.isbn);
    expect(await bookDetailPage.getBookTitle()).toEqual(book.title);
    await bookDetailPage.clickAddToYourCollection();
    browser.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Book added to your collection.');
      await dialog.dismiss();
    });
    await profilePage.open();
    expect(await listBookComponent.isBookDisplayed(book.title)).toBe(true);
  });

  it('Should display dialog warning when book is existed', async () => {
    const book = bookBuilder.builder();
    await userMenuComponent.searchBook(book.title);
    await listBookComponent.clickBookByName(book.title);
    expect(await bookDetailPage.getBookDetailPageUrl()).toContain(`/books?search=${book.isbn}`);
    expect(await bookDetailPage.getISBN()).toEqual(book.isbn);
    expect(await bookDetailPage.getBookTitle()).toEqual(book.title);
    await bookDetailPage.clickAddToYourCollection();
    browser.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Book already present in the your collection!');
      await dialog.dismiss();
    });
  });
});
