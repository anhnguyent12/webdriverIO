import { JSONSchemaType } from 'ajv';
import {
  AddBookResponse,
  BookResponse,
  BooksResponse,
  DeleteBookResponse,
  DeleteBooksResponse,
  ReplaceBookResponse,
} from 'models/book';

export const booksSchema: JSONSchemaType<BooksResponse> = {
  type: 'object',
  properties: {
    books: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          isbn: { type: 'string' },
          title: { type: 'string' },
          subTitle: { type: 'string' },
          author: { type: 'string' },
          publish_date: { type: 'string', format: 'iso-datetime-ms' },
          publisher: { type: 'string' },
          pages: { type: 'integer' },
          description: { type: 'string' },
          website: { type: 'string' },
        },
        required: [
          'isbn',
          'title',
          'subTitle',
          'author',
          'publish_date',
          'publisher',
          'pages',
          'description',
          'website',
        ],
        additionalProperties: false,
      },
    },
  },
  required: ['books'],
  additionalProperties: false,
};

export const bookSchema: JSONSchemaType<BookResponse> = {
  type: 'object',
  properties: {
    isbn: { type: 'string' },
    title: { type: 'string' },
    subTitle: { type: 'string' },
    author: { type: 'string' },
    publish_date: { type: 'string', format: 'iso-datetime-ms' },
    publisher: { type: 'string' },
    pages: { type: 'integer' },
    description: { type: 'string' },
    website: { type: 'string' },
  },
  required: [
    'isbn',
    'title',
    'subTitle',
    'author',
    'publish_date',
    'publisher',
    'pages',
    'description',
    'website',
  ],
  additionalProperties: false,
};

export const addBookSchema: JSONSchemaType<AddBookResponse> = {
  type: 'object',
  properties: {
    isbn: { type: 'string' },
  },
  required: ['isbn'],
  additionalProperties: false,
};

export const replaceBookSchema: JSONSchemaType<ReplaceBookResponse> = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    username: { type: 'string' },
    books: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          isbn: { type: 'string' },
          title: { type: 'string' },
          subTitle: { type: 'string' },
          author: { type: 'string' },
          publish_date: { type: 'string', format: 'iso-datetime-ms' },
          publisher: { type: 'string' },
          pages: { type: 'integer' },
          description: { type: 'string' },
          website: { type: 'string' },
        },
        required: [
          'isbn',
          'title',
          'subTitle',
          'author',
          'publish_date',
          'publisher',
          'pages',
          'description',
          'website',
        ],
        additionalProperties: false,
      },
    },
  },
  required: ['userId', 'username', 'books'],
  additionalProperties: false,
};

export const deleteBookSchema: JSONSchemaType<DeleteBookResponse> = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    isbn: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['userId', 'isbn', 'message'],
  additionalProperties: false,
};

export const deleteAllBooksSchema: JSONSchemaType<DeleteBooksResponse> = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['userId', 'message'],
  additionalProperties: false,
};
