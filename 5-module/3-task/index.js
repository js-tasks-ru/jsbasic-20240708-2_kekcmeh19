function initCarousel() {
  // ваш код...
  let leftButton = document.querySelector('.carousel__arrow_left');
  let rightButton = document.querySelector('.carousel__arrow_right');
  let carousel = document.querySelector('.carousel__inner');
  let slideWidth = carousel.offsetWidth;

  let currentSlide = 1;
  let currentCarouselPosition = 0;
  
  hideButtonsOnBorders();

  function carouselGoRight() {
    let newCarouselPosition = currentCarouselPosition + slideWidth;
    carousel.style.transform = `translateX(${newCarouselPosition}px)`;

    currentCarouselPosition = newCarouselPosition;
    currentSlide--;
    hideButtonsOnBorders();
  }

  function carouselGoLeft() {
    let newCarouselPosition = currentCarouselPosition - slideWidth;
    carousel.style.transform = `translateX(${newCarouselPosition}px)`;

    currentCarouselPosition = newCarouselPosition;
    currentSlide++;
    hideButtonsOnBorders();
  }

  function hideButtonsOnBorders() {
    if(currentSlide == 1) {
      leftButton.style.display = 'none';
    } else if (currentSlide == 4) {
      rightButton.style.display = 'none';
    } else {
      leftButton.style.display = '';
      rightButton.style.display = '';
    }
  }

  leftButton.onclick = carouselGoRight;
  rightButton.onclick = carouselGoLeft;
}
