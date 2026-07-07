import { JSONSchemaType } from 'ajv';
import {
  DeleteUserResponse,
  GenerateTokenResponse,
  UnauthorizeResponse,
  UserResponse,
} from 'models/user';

export const generateTokenSchema: JSONSchemaType<GenerateTokenResponse> = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    expires: { type: 'string', format: 'iso-datetime-ms' },
    status: { type: 'string' },
    result: { type: 'string' },
  },
  required: ['token', 'expires', 'status', 'result'],
  additionalProperties: false,
};

export const userSchema: JSONSchemaType<UserResponse> = {
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

export const deleteUserSchema: JSONSchemaType<DeleteUserResponse> = {
  type: 'object',
  properties: {
    code: { type: 'integer' },
    message: { type: 'string' },
  },
  required: ['code', 'message'],
  additionalProperties: false,
};

export const unauthorizedSchema: JSONSchemaType<UnauthorizeResponse> = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['userId', 'message'],
  additionalProperties: false,
};
