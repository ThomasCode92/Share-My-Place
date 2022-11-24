export default class Modal {
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

      const modalElement = modalElements.querySelector('.modal');
      const backdropElement = modalElements.querySelector('.backdrop');

      modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', modalElement);
      document.body.insertAdjacentElement('afterbegin', backdropElement);
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }

  hide() {}
}
