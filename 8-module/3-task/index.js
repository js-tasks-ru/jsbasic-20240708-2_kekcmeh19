export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

