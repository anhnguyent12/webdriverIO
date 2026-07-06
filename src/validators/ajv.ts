import { Ajv } from 'ajv';
import addFormats from 'ajv-formats';
import { isoDatetimeRegex } from 'constants/regex';

export const ajv = new Ajv({
  strict: true,
  allErrors: true,
});

addFormats.default(ajv);

ajv.addFormat('iso-datetime-ms', {
  type: 'string',
  validate: (value) => isoDatetimeRegex.test(value),
});
