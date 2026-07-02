const Ajv = require('ajv');

const ajv = new Ajv();

export class SchemaValidator {
  static validate(schema: object, response: unknown) {
    const validate = ajv.compile(schema);
    const valid = validate(response);

    if (!valid) {
      throw new Error(JSON.stringify(validate.errors, null, 2));
    }
  }
}
