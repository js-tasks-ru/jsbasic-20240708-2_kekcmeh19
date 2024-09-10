import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filtredProducts = [];
    this.filters = {
      noNuts: false, // true/false
      vegeterianOnly: false, // true/false
      maxSpiciness: 5, // числа от 0 до 4
      category: '' // уникальный идентификатор категории товара
    };
    this.elem = this.render();
  }

  updateFilter(filters) {
    this.filters = Object.assign({}, this.filters, filters);
    this.filtredProducts = this.products.filter(item => {
      if (this.filters.noNuts && item.nuts) {
        return false;
      }
  
      if (this.filters.vegeterianOnly && !item.vegeterian) {
        return false;
      }
  
      if (this.filters.maxSpiciness && item.spiciness > this.filters.maxSpiciness) {
        return false;
      }
  
      if (this.filters.category && item.category !== this.filters.category) {
        return false;
      }
  
      return true; 
    });
    
    this.addProducts(this.filtredProducts);
  }

  addProducts(products) {
    this.elem.querySelector('.products-grid__inner').textContent = '';

    products.forEach(item => {
      let product = new ProductCard(item);
      this.elem.querySelector('.products-grid__inner').append(product.elem);
    });
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);
    
    this.updateFilter(this.filters);
    this.addProducts(this.filtredProducts);

    return this.elem;
  }
}
