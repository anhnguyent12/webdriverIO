import { AddBook, BookDetail, DeleteBook, DeleteBooks, ListBooks, ReplaceBook } from 'models/book';
import restClient from 'api/restClient';

const endpoint = {
  list: '/BookStore/v1/Books',
  detail: (isbn: string) => `/BookStore/v1/Book?ISBN=${isbn}`,
  add: '/BookStore/v1/Books',
  replace: (isbn: string) => `/BookStore/v1/Books/${isbn}`,
  delete: '/BookStore/v1/Book',
  deleteAll: (userId: string) => `/BookStore/v1/Books?UserId=${userId}`,
} as const;

class BookService {
  public async getListBooks(): Promise<ListBooks> {
    return await restClient.get<ListBooks>(endpoint.list);
  }

  public async getBookDetail(isbn: string): Promise<BookDetail> {
    return await restClient.get<BookDetail>(endpoint.detail(isbn));
  }

  // Header: authorization: token
  public async addBooks(userId: string, ISBNs: string | string[]): Promise<AddBook> {
    let collectionOfIsbns: object[] = [];

    typeof ISBNs === 'string'
      ? collectionOfIsbns.push({ isbn: ISBNs })
      : ISBNs.forEach((isbn) => collectionOfIsbns.push({ isbn }));

    return await restClient.post<AddBook>(endpoint.add, {
      userId,
      collectionOfIsbns,
    });
  }

  // Header: authorization: token
  public async replaceBook(odlISBN: string, userId: string, isbn: string): Promise<ReplaceBook> {
    return await restClient.put<ReplaceBook>(endpoint.replace(odlISBN), {
      userId,
      isbn,
    });
  }

  // Header: authorization: token
  public async deleteBook(userId: string, isbn: string): Promise<DeleteBook> {
    return await restClient.delete<DeleteBook>(endpoint.delete, {
      userId,
      isbn,
    });
  }

  // Header: authorization: token
  public async deleteAllBooks(userId: string): Promise<DeleteBooks> {
    return await restClient.delete<DeleteBooks>(endpoint.deleteAll(userId));
  }
}

export default new BookService();
