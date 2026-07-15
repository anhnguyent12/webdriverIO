import dialogAssertion from 'assertions/dialog';
import bookBuilder from 'builders/book';
import userBuilder from 'builders/user';
import listBookComponent from 'components/listBook';
import userMenuComponent from 'components/userMenu';
import { BookError } from 'constants/messages/error/index';
import { bookSuccess } from 'constants/messages/success/index';
import { GenerateTokenResponse } from 'models/user';
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
    const response = await userService.generateToken(userBuilder.username, userBuilder.password);
    const token = (response.data as GenerateTokenResponse).token;
    await bookService.deleteAllBooks(userBuilder.userId as string, token);
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
    dialogAssertion.verifyMessage(bookSuccess.ADD_TO_COLLECTION);
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
    dialogAssertion.verifyMessage(BookError.EXISTED_COLLECTION);
  });
});
