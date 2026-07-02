export interface BookDetail {
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

export interface ListBooks {
  books: BookDetail[];
}

export interface AddBook {
  isbn: string;
}

export interface DeleteBooks {
  userId: string;
  message: string;
}

export interface DeleteBook {
  userId: string;
  isbn: string;
  message: string;
}

export interface ReplaceBook {
  userId: string;
  username: string;
  books: BookDetail[];
}
