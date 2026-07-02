import BasePage from 'pages/base';

class ModalComponent extends BasePage {
  private readonly locator = {
    modalTitle: 'div.modal-title',
    modalBody: 'div.modal-body',
    okBtn: 'button#closeSmallModal-ok',
    cancelBtn: 'button#closeSmallModal-cancel',
  };

  private get modalTitle() {
    return $(this.locator.modalTitle);
  }

  private get modalBody() {
    return $(this.locator.modalBody);
  }

  private get okButton() {
    return $(this.locator.okBtn);
  }

  private get cancelButton() {
    return $(this.locator.cancelBtn);
  }

  public async getModelTitle(): Promise<string> {
    return await this.getElementText(this.modalTitle, 'Model Title');
  }

  public async getModelBody(): Promise<string> {
    return await this.getElementText(this.modalBody, 'Model Body');
  }

  public async isModalTitleDisplayed(): Promise<boolean> {
    return await this.modalTitle.isDisplayed();
  }

  public async isModalBodyDisplayed(): Promise<boolean> {
    return await this.modalBody.isDisplayed();
  }

  public async clickOK(): Promise<void> {
    await this.clickElement(this.okButton, 'OK Button');
  }

  public async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton, 'Cancel Button');
  }
}

export default new ModalComponent();
