class DialogAssertion {
  verifyMessage(msg: string): void {
    browser.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual(msg);
      await dialog.dismiss();
    });
  }
}

export default new DialogAssertion();
