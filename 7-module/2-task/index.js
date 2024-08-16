import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
  }

  setTitle(title) {
    this.elem.querySelector(".modal__title").innerHTML = title;
  }

  setBody(body) {
    this.elem.querySelector(".modal__body").innerHTML = '';
    this.elem.querySelector(".modal__body").append(body);
  }

  escButtonListener = (event) => {
    if(event.code === 'Escape') this.close();
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");

    document.querySelector(".modal__close").addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', this.escButtonListener)
  }

  close() {
    document.removeEventListener('keydown', this.escButtonListener)
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  }

  render () {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
    
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>

          <div class="modal__body"></div>
        </div>
      </div>
    `);

    return this.elem;
  }
}
