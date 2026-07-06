import book from 'fixtures/book' with { type: 'json' };
import newBook from 'fixtures/book-replace' with { type: 'json' };

interface BookData {
  isbn: string | string[];
  title: string;
}

class BookBuilder {
  private book: BookData;

  constructor() {
    this.book = {
      title: book.title,
      isbn: book.isbn,
    };
  }

  public invalidISBN(isbn: string = '9781449325123123'): this {
    this.book.isbn = isbn;
    return this;
  }

  public listISBNs(isbn: string[] = ['9781449337711', '9781449365035', '9781491904244']): this {
    this.book.isbn = isbn;
    return this;
  }

  public replaceBook(): this {
    this.book = {
      title: newBook.title,
      isbn: newBook.isbn,
    };
    return this;
  }

  public builder(): BookData {
    return structuredClone(this.book);
  }
}

export default new BookBuilder();
