import bookBuilder from 'builders/book';
import userBuilder from 'builders/user';
import listBookComponent from 'components/listBook';
import randomNumber from 'utils/random';
import loginPage from 'pages/login';
import profilePage from 'pages/profile';
import bookService from 'services/book';
import userService from 'services/user';
import { logger } from 'utils/logger';
import modalComponent from 'components/modal';

describe('Delete Book @deleteBook', () => {
  before(async () => {
    logger.info('Setup token for call API');
    const token = (await userService.generateToken(userBuilder.username, userBuilder.password))
      .token;
    process.env.AUTH_TOKEN = token;
    const listISBNs = bookBuilder.listISBNs().builder();
    const userId = userBuilder.userId as string;
    await bookService.deleteAllBooks(userId);
    await bookService.addBooks(userId, listISBNs.isbn);
  });

  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login(userBuilder.username, userBuilder.password);
    await browser.pause(5000);
    expect(await profilePage.getUrl()).toContain('/profile');
  });

  afterEach(async () => {
    await browser.deleteAllCookies();
  });

  it('Should delete book success', async () => {
    const listBookNames = await listBookComponent.getBooks();
    const bookName = randomNumber.generateElementOfList(listBookNames);
    for await (const [index, name] of listBookNames.entries()) {
      if (name === bookName) {
        listBookComponent.clickDeleteBook(index);
        break;
      }
    }
    expect(await modalComponent.getModelTitle()).toEqual('Delete Book');
    expect(await modalComponent.getModelBody()).toEqual('Do you want to delete this book?');
    await modalComponent.clickOK();

    // Refresh page and verify the book deleted wasn't contain in collection
    await profilePage.refresh();
    await browser.pause(3000);
    const newListBookNames = await listBookComponent.getBooks();
    expect(newListBookNames).not.toContain(bookName);
  });

  it('Should delete all books success', async () => {
    await profilePage.clickDeleteAllBooks();
    expect(await modalComponent.getModelTitle()).toEqual('Delete All Books');
    expect(await modalComponent.getModelBody()).toEqual('Do you want to delete all books?');
    await modalComponent.clickOK();

    await profilePage.refresh();
    await browser.pause(3000);
    expect(await listBookComponent.getLengthOfTableRow()).toEqual(0);
  });

  it('Should show dialog warning no book when clicking on Delete All Books', async () => {
    await profilePage.clickDeleteAllBooks();
    expect(await modalComponent.getModelTitle()).toEqual('Delete All Books');
    expect(await modalComponent.getModelBody()).toEqual('Do you want to delete all books?');
    await modalComponent.clickOK();

    browser.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual("No books available in your's collection!");
      await dialog.dismiss();
    });
  });
});
