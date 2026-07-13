import modalComponent from 'components/modal';
import { ModalContent } from 'constants/modalContent';

class ModalAssertion {
  async verify(expected: ModalContent) {
    expect(await modalComponent.isModalTitleDisplayed()).toBe(true);
    expect(await modalComponent.getModalTitle()).toEqual(expected.title);
    expect(await modalComponent.getModalBody()).toEqual(expected.body);
    await modalComponent.clickOK();
  }
}

export default new ModalAssertion();
