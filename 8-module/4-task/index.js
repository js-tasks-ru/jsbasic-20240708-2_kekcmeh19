import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(!product) {
      return;
    }

    for(let item of this.cartItems) {
      if(item.product.id === product.id) {
        item.count += 1;

        this.onProductUpdate(item);

        return;
      }
    }

    this.cartItems.push(
      {
        product: product,
        count: 1
      }
    );
    this.onProductUpdate(this.cartItems[this.cartItems.length - 1]);
  }

  updateProductCount(productId, amount) {
    for(let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].product.id === productId) {
        this.cartItems[i].count += amount;

        this.onProductUpdate(this.cartItems[i]);
        
        if(this.cartItems[i].count === 0) {
          this.cartItems.splice(i, 1);
        }
      }
    }
  }

  isEmpty() {
    if(this.cartItems.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    if(this.cartItems.length === 0) {
      return 0;
    } else {
      this.sum = 0;

      this.cartItems.forEach(item => {
        this.sum += item.count;
      })

      return this.sum;
    }
  }

  getTotalPrice() {
    if(this.cartItems.length === 0) {
      return 0;
    } else {
      this.sum = 0;

      this.cartItems.forEach(item => {
        let productCost = item.product.price * item.count;
        this.sum += productCost;
      })
    }

    return this.sum;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.Modal = new Modal();
    this.Modal.setTitle("Your order");

    let modalBody = createElement(`
      <div></div>
      `);

    for (let cartItem of this.cartItems) {
      let product = this.renderProduct(cartItem.product, cartItem.count);
      modalBody.append(product);
    }

    let orderForm = this.renderOrderForm();
    modalBody.append(orderForm);

    this.Modal.setBody(modalBody);

    this.Modal.open();

    this.submitButton = document.querySelector('button[type="submit"]');

    this.addPlusMinusEventListenters();
  }

  addPlusMinusEventListenters() {
    let products = Array.from(document.querySelectorAll('.cart-product'));
    
    products.forEach(product => {
      product.querySelector('.cart-counter__button_plus').addEventListener('click', this.addPlus);
      product.querySelector('.cart-counter__button_minus').addEventListener('click', this.addMinus);
    });

    document.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
  }

  addPlus = (event) => {
    let product = event.target.closest('.cart-product');
    this.updateProductCount(product.dataset.productId, 1);
  }

  addMinus = (event) => {
    let product = event.target.closest('.cart-product');
    this.updateProductCount(product.dataset.productId, -1);
  }

  onProductUpdate(cartItem) {
    let openModal = document.querySelector('.is-modal-open');

    if(openModal) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      productCount.innerHTML = cartItem.count;


      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;

      if(cartItem.count === 0) {
        let product = modalBody.querySelector(`[data-product-id="${productId}"]`);
        product.remove();
      }

      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      
      if(this.getTotalPrice() === 0 ) {
        this.Modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData(this.form);
  
    let promiseResponse = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST',
    });

    promiseResponse
      .then((response) => {
        this.submitButton.classList.add('is-loading');

        this.Modal.setTitle('Success!');
        this.cartItems.length = 0;

        let newModalBody = createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
       `);

        this.Modal.setBody(newModalBody);
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

