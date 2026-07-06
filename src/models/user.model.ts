import { BookResponse } from 'models/book';

export interface UserInfo {
  userId: string;
  username: string;
  books: BookResponse[];
}

export interface DeleteUser {
  code: number;
  message: string;
}

export interface Unauthorize {
  userId: string;
  message: string;
}

export interface GenerateToken {
  token: string;
  expires: string;
  status: string;
  result: string;
}
