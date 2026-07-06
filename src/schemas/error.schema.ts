import { JSONSchemaType } from 'ajv';
import { ErrorResponse } from 'models/error';

export const errorSchema: JSONSchemaType<ErrorResponse> = {
  type: 'object',
  properties: {
    code: { type: 'integer' },
    message: { type: 'string' },
  },
  required: ['code', 'message'],
  additionalProperties: false,
};
