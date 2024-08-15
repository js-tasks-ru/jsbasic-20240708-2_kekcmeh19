import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  createRibbonItems() {
    this.categoriesHTML = this.categories
      .map(({ id, name }) => {
        return(`
          <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
        `)
      })
      .join('');

      return this.categoriesHTML;
  }

  createRibbonScrollListeners() {
    this.leftButton = this.elem.querySelector(".ribbon__arrow_left");
    this.rightButton = this.elem.querySelector(".ribbon__arrow_right");
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");

    this.scrollRight = this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth;

    this.leftButton.classList.add("ribbon__arrow_visible");
    this.rightButton.classList.add("ribbon__arrow_visible");
    if (this.ribbonInner.scrollLeft < 1) {
      this.leftButton.classList.remove("ribbon__arrow_visible");
    } else if (this.scrollRight < 1) {
      this.rightButton.classList.remove("ribbon__arrow_visible");
    }

    this.leftButton.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
      this.rightButton.classList.add("ribbon__arrow_visible");
      if (this.ribbonInner.scrollLeft < 1) {
        this.leftButton.classList.remove("ribbon__arrow_visible");
      }
    });

    this.rightButton.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
      this.leftButton.classList.add("ribbon__arrow_visible");
      if (this.scrollRight < 1) {
        this.rightButton.classList.remove("ribbon__arrow_visible");
      }
    });
  }

  createRibbonItemsListeners() {
    this.RibbonItems = this.elem.querySelectorAll('.ribbon__item');
    this.RibbonItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (document.querySelector(".ribbon__item_active")) {
          document.querySelector(".ribbon__item_active").classList.remove("ribbon__item_active");
        }
        item.classList.add("ribbon__item_active");

        let itemID = item.dataset.id;

        let event = new CustomEvent('ribbon-select', { 
          detail: itemID, 
          bubbles: true
        })

        item.dispatchEvent(event);
      })
    })
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.createRibbonItems()}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.createRibbonScrollListeners();
    this.createRibbonItemsListeners();

    return this.elem;
  }
}
