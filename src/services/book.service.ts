import restClient from 'api/restClient';

const endpoint = {
  list: '/BookStore/v1/Books',
  detail: '/BookStore/v1/Book',
  add: '/BookStore/v1/Books',
  replace: (isbn: string) => `/BookStore/v1/Books/${isbn}`,
  delete: '/BookStore/v1/Book',
  deleteAll: '/BookStore/v1/Books',
} as const;

class BookService {
  public async getListBooks() {
    return await restClient.get(endpoint.list);
  }

  public async getBookDetail(isbn: string) {
    const params = { ISBN: isbn };
    return await restClient.get(endpoint.detail, params);
  }

  public async addBooks(userId: string, ISBNs: string | string[], token: string) {
    const collectionOfIsbns: object[] = [];
    const body = { userId, collectionOfIsbns };
    const headers = { Authorization: `Bearer ${token}` };

    typeof ISBNs === 'string'
      ? collectionOfIsbns.push({ isbn: ISBNs })
      : ISBNs.forEach((isbn) => collectionOfIsbns.push({ isbn }));

    return await restClient.post(endpoint.add, body, headers);
  }

  public async replaceBook(odlISBN: string, userId: string, isbn: string, token: string) {
    const body = { userId, isbn };
    const headers = { Authorization: `Bearer ${token}` };
    return await restClient.put(endpoint.replace(odlISBN), body, headers);
  }

  public async deleteBook(userId: string, isbn: string, token: string) {
    const body = { userId, isbn };
    const headers = { Authorization: `Bearer ${token}` };
    return await restClient.delete(endpoint.delete, body, headers);
  }

  public async deleteAllBooks(userId: string, token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    const params = { UserId: userId };
    return await restClient.delete(endpoint.deleteAll, undefined, params, headers);
  }
}

export default new BookService();
