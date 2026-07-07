import bookBuilder from 'builders/book';
import userBuilder from 'builders/user';
import { HTTP_STATUS_CODES } from 'constants/httpCodes';
import { BookAPIError } from 'constants/messages/error/index';
import { GenerateTokenResponse } from 'models/user';
import {
  addBookSchema,
  bookSchema,
  booksSchema,
  deleteAllBooksSchema,
  deleteBookSchema,
  replaceBookSchema,
} from 'schemas/book';
import { errorSchema } from 'schemas/error';
import bookService from 'services/book';
import userService from 'services/user';
import { SchemaValidator } from 'validators/schemaValidator';

let token: string = '';
const userId: string = userBuilder.userId as string;

describe('Book API @bookApi', () => {
  before(async () => {
    const response = await userService.generateToken(userBuilder.username, userBuilder.password);
    token = (response.data as GenerateTokenResponse).token;
    await bookService.deleteAllBooks(userId, token);
  });

  it('Should return correct list books', async () => {
    const response = await bookService.getListBooks();
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    SchemaValidator.validate(booksSchema, await response.data);
  });

  it('Should return correct book detail', async () => {
    const book = bookBuilder.builder();
    const isbn = book.isbn as string;
    const response = await bookService.getBookDetail(isbn);
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    SchemaValidator.validate(bookSchema, await response.data);
    expect(response.data?.title).toEqual(book.title);
  });

  it('Should return correct book when adding to collection', async () => {
    const isbn = bookBuilder.builder().isbn as string;
    const ISBNs = bookBuilder.listISBNs().builder().isbn as string[];
    ISBNs.push(isbn);
    const response = await bookService.addBooks(userId, ISBNs, token);
    expect(response.status).toEqual(HTTP_STATUS_CODES.CREATED);
    SchemaValidator.validate(addBookSchema, await response.data);
  });

  it('Should fail to add a book existed', async () => {
    const isbn = bookBuilder.builder().isbn;
    const response = await bookService.addBooks(userId, isbn, token);
    expect(response.status).toEqual(HTTP_STATUS_CODES.BAD_REQUEST);
    SchemaValidator.validate(errorSchema, await response.data);
    expect(await response.data?.message).toEqual(BookAPIError.EXISTED_BOOK);
  });

  it('Should return correct book when replacing into collection', async () => {
    const oldBook = bookBuilder.builder();
    const newBook = bookBuilder.replaceBook().builder();
    const response = await bookService.replaceBook(
      oldBook.isbn as string,
      userId,
      newBook.isbn as string,
      token,
    );
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    SchemaValidator.validate(replaceBookSchema, await response.data);
    expect(await response.data?.books.title).toEqual(newBook.title);
  });

  it('Should delete a book successfully', async () => {
    const book = bookBuilder.replaceBook().builder();
    const response = await bookService.deleteBook(userId, book.isbn as string, token);
    expect(response.status).toEqual(HTTP_STATUS_CODES.NO_CONTENT);
    SchemaValidator.validate(deleteBookSchema, await response.data);
  });

  it('Should delete all books successfully', async () => {
    const response = await bookService.deleteAllBooks(userId, token);
    expect(response.status).toEqual(HTTP_STATUS_CODES.NO_CONTENT);
    SchemaValidator.validate(deleteAllBooksSchema, await response.data);
  });

  it('Should fail to add book with an invalid ISBN', async () => {
    const invalidISBN = bookBuilder.invalidISBN().builder().isbn as string;
    const response = await bookService.addBooks(userId, invalidISBN, token);
    expect(response.status).toEqual(HTTP_STATUS_CODES.BAD_REQUEST);
    SchemaValidator.validate(errorSchema, await response.data);
    expect(await response.data?.message).toEqual(BookAPIError.INVALID_ISBN);
  });
});
