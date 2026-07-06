import { ajv } from 'validators/ajv';

export class SchemaValidator {
  static validate(schema: object, response: unknown): void {
    const validate = ajv.compile(schema);
    if (!validate(response)) {
      throw new Error(JSON.stringify(validate.errors, null, 2));
    }
  }
}
