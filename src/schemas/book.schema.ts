const isoDatetimeRegex =
  /^(?<year>\d{4,})-(?<month>0[1-9]|1[0-2])-(?<day>0[1-9]|[12]\d|3[01])T(?<hour>[01]\d|2[0-3]):(?<minute>[0-5]\d):(?<second>[0-5]\d)\.(?<millisecond>\d{1,3})Z$/;

export const booksSchema = {
  type: 'object',
  properties: {
    books: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            isbn: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            subTitle: {
              type: 'string',
            },
            author: {
              type: 'string',
            },
            publish_date: {
              type: 'string',
              format: isoDatetimeRegex,
            },
            publisher: {
              type: 'string',
            },
            pages: {
              type: 'integer',
            },
            description: {
              type: 'string',
            },
            website: {
              type: 'string',
            },
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
        },
      ],
    },
  },
  required: ['books'],
};

export const bookSchema = {
  type: 'object',
  properties: {
    isbn: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    subTitle: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    publish_date: {
      type: 'string',
      format: isoDatetimeRegex,
    },
    publisher: {
      type: 'string',
    },
    pages: {
      type: 'integer',
    },
    description: {
      type: 'string',
    },
    website: {
      type: 'string',
    },
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
};

export const addBookSchema = {
  type: 'object',
  properties: {
    isbn: {
      type: 'string',
    },
  },
  required: ['isbn'],
};

export const replaceBookSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    books: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            isbn: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            subTitle: {
              type: 'string',
            },
            author: {
              type: 'string',
            },
            publish_date: {
              type: 'string',
              format: isoDatetimeRegex,
            },
            publisher: {
              type: 'string',
            },
            pages: {
              type: 'integer',
            },
            description: {
              type: 'string',
            },
            website: {
              type: 'string',
            },
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
        },
      ],
    },
  },
  required: ['userId', 'username', 'books'],
};

export const deleteBookSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
    },
    isbn: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
  },
  required: ['userId', 'isbn', 'message'],
};

export const deleteAllBooksSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
  },
  required: ['userId', 'message'],
};
