import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  renderSlides() {
    this.slidesHTML = this.slides
      .map(({ name, price, image, id}) => {
        return (`
        <div class="carousel__slide" data-id="${id}">
          <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${price.toFixed(2)}</span>
            <div class="carousel__title">${name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        `);
      })
      .join('');

      return this.slidesHTML;
  }

  renderButtons() {
    return(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      `)
  }

  createCarouselListeners() {
    this.leftButton = this.elem.querySelector(".carousel__arrow_left");
    this.rightButton = this.elem.querySelector(".carousel__arrow_right");
    this.slides = this.elem.querySelectorAll('.carousel__slide');
    this.carousel = this.elem.querySelector(".carousel__inner");

    this.currentSlide = 0;

    if (this.currentSlide == 0) {
      this.leftButton.style.display = 'none';
    }

    this.leftButton.addEventListener('click', () => {
      this.currentSlide--;
      this.carousel.style.transform = `translateX(-${this.slides[0].offsetWidth * this.currentSlide}px)`
      
      if (this.currentSlide == 0) {
        this.leftButton.style.display = 'none';
      } else {
        this.leftButton.style.display = '';
        this.rightButton.style.display = '';
      };
    })

    this.rightButton.addEventListener('click', () => {
      this.currentSlide++;
      this.carousel.style.transform = `translateX(-${this.slides[0].offsetWidth * this.currentSlide}px)`;
      
      if (this.currentSlide == this.slides.length - 1) {
        this.rightButton.style.display = 'none';
      } else {
        this.leftButton.style.display = '';
        this.rightButton.style.display = '';
      };

    })

  }

  createButtonListeners() {
    this.buttons = this.elem.querySelectorAll('.carousel__button');
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        let slideID = button.closest('.carousel__slide').dataset.id;

        let event = new CustomEvent("product-add", {
          detail: slideID,
          bubbles: true
        })

        button.dispatchEvent(event);
      })
    })
  }

  render() {
    this.elem = createElement(`
      <div class="carousel">
        ${this.renderButtons()}
        <div class="carousel__inner">
        ${this.renderSlides()}
        </div>
      </div>
    `);
    
    this.createCarouselListeners();
    this.createButtonListeners();
    
    return this.elem;
  }
}
