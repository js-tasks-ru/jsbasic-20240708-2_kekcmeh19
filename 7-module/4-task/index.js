import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.render();
  }

  createSpans() {
    this.spansHTML = '';

    for (let i = 0; i < this.steps; i++) {
      this.spansHTML += '<span></span>';
    }

    return this.spansHTML;
  }

  createSliderListeners() {
    this.elem.addEventListener('click', (event) => {

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);

      this.currentSliderPosition()

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }))
    });

    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', this.onDown); 
  }

  currentSliderPosition() {
    this.elem.querySelector('.slider__value').textContent = this.value;

    this.spans = Array.from(this.elem.querySelectorAll('span'));
    this.spans.map( (span, newValue) => {  
      if(span.classList.contains("slider__step-active")) {
        span.classList.remove("slider__step-active");
      }
      
      if (newValue == this.value + 1) {
        span.classList.add("slider__step-active");
      }
    })

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    this.leftPercents = this.value / (this.steps - 1) * 100;
    this.thumb.style.left = `${this.leftPercents}%`;
    this.progress.style.width = `${this.leftPercents}%`;
  }

  onDown = (event) => {
    event.ondragstart = (e) => e.preventDefault();

    document.addEventListener('pointermove', this.onMove);
    document.addEventListener('pointerup', this.onUp);
  }

  onMove = (event) => {
    this.elem.classList.add("slider_dragging");

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    
    let leftPercents = leftRelative * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.elem.querySelector('.slider__value').textContent = this.value;
  }

  onUp = () => {
    document.removeEventListener('pointerup', this.onUp); 
    document.removeEventListener('pointermove', this.onMove);

    this.elem.dispatchEvent(new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    }))
    
    this.elem.classList.remove("slider_dragging");
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>
        <div class="slider__progress" style="width: 50%;"></div>
        <div class="slider__steps">
          ${this.createSpans()}
        </div>
      </div>
    `)

    this.createSliderListeners();
    this.currentSliderPosition();

    this.elem.querySelector('.slider__thumb').ondragstart = () => false;

    return this.elem;
  }
}
