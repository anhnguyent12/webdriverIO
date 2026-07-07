import { BookResponse } from 'models/book';

export interface UserResponse {
  userId: string;
  username: string;
  books: BookResponse[];
}

export interface DeleteUserResponse {
  code: number;
  message: string;
}

export interface UnauthorizeResponse {
  userId: string;
  message: string;
}

export interface GenerateTokenResponse {
  token: string;
  expires: string;
  status: string;
  result: string;
}
