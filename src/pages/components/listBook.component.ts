import { logger } from 'utils/logger';

class ListBookComponent {
  private readonly locator = {
    tableRow: 'tbody > tr',
    booksLnk: 'div.action-buttons>span>a',
    deleteBookBtn: '//span[@title="Delete"]',
  };

  private get tableRows() {
    return $$(this.locator.tableRow);
  }

  private get booksLink() {
    return $$(this.locator.booksLnk);
  }

  private get deleteBookButton() {
    return $$(this.locator.deleteBookBtn);
  }

  public async getLengthOfTableRow(): Promise<number> {
    try {
      return (await this.tableRows.getElements()).length;
    } catch (error) {
      logger.error('Error when getting table row');
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async getBooks(): Promise<string[]> {
    try {
      return await this.booksLink.map(async (book) => await book.getText());
    } catch (error) {
      logger.error(`Error when getting text of books`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async isBookDisplayed(bookName: string): Promise<boolean> {
    try {
      let isDisplayed: boolean = false;
      for await (const book of this.booksLink) {
        if ((await book.getText()) === bookName) {
          isDisplayed = await book.isDisplayed();
          break;
        }
      }
      return isDisplayed;
    } catch (error) {
      logger.error(`Error when getting book name: ${bookName}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async clickBookByName(bookName: string): Promise<void> {
    try {
      for await (const book of this.booksLink) {
        if ((await book.getText()) === bookName) {
          await book.click();
          break;
        }
      }
    } catch (error) {
      logger.error(`Error when clicking book name: ${bookName}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  public async clickDeleteBook(index: number = 0): Promise<void> {
    try {
      await this.deleteBookButton[index].click();
    } catch (error) {
      logger.error(`Error when clicking delete book button with index: ${index}`);
      throw new Error(JSON.stringify(error, null, 2));
    }
  }
}

export default new ListBookComponent();
