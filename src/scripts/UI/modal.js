export default class Modal {
  modalElement;
  backdropElement;

  constructor(contentId, fallbackText) {
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById('modal-template');
    this.fallbackText = fallbackText;
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalTemplateContent = this.modalTemplateEl.content;
      const contentTemplateContent = this.contentTemplateEl.content;

      const modalElements = document.importNode(modalTemplateContent, true);
      const contentElement = document.importNode(contentTemplateContent, true);

      this.modalElement = modalElements.querySelector('.modal');
      this.backdropElement = modalElements.querySelector('.backdrop');

      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }

  hide() {
    if (!this.modalElement) return;

    document.body.removeChild(this.modalElement);
    document.body.removeChild(this.backdropElement);

    this.modalElement = null;
    this.backdropElement = null;
  }
}
