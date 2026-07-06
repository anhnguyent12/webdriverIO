export interface BookResponse {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publish_date: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export interface BooksResponse {
  books: BookResponse[];
}

export interface AddBookResponse {
  isbn: string;
}

export interface DeleteBooksResponse {
  userId: string;
  message: string;
}

export interface DeleteBookResponse {
  userId: string;
  isbn: string;
  message: string;
}

export interface ReplaceBookResponse {
  userId: string;
  username: string;
  books: BookResponse[];
}
