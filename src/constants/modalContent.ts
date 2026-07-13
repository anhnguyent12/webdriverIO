export interface ModalContent {
  title: string;
  body: string;
}

export const ModalContent = {
  deleteBook: {
    title: 'Delete Book',
    body: 'Do you want to delete this book?',
  },

  deleteAllBooks: {
    title: 'Delete All Books',
    body: 'Do you want to delete all books?',
  },

  deleteAccount: {
    title: 'Delete Account',
    body: 'Do you want to delete your account?',
  },
} as const satisfies Record<string, ModalContent>;

export type ModalName = keyof typeof ModalContent;
