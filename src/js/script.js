function Carousel(containerSelector, prevButtonSelector, nextButtonSelector) {
  this.container = document.querySelector(containerSelector);
  this.slides = this.container.querySelectorAll('li');
  this.totalSlides = this.slides.length;
  this.currentSlide = 0;
  this.prevButton = document.querySelector(prevButtonSelector);
  this.nextButton = document.querySelector(nextButtonSelector);

  // Обновление отображения карусели
  this.updateCarousel = function() {
    this.slides.forEach((slide) => {
      slide.style.display = 'none'; // скрываем все слайды
    });
    this.slides[this.currentSlide].style.display = 'block'; // показываем текущий слайд
  };

  // Инициализация событий клика
  this.initEvents = function() {
    this.prevButton.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.updateCarousel();
    });

    this.nextButton.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateCarousel();
    });

    // Инициализация сенсорных событий
    this.handleSwipe();
  };

  // Обработка сенсорных событий для свайпа
  this.handleSwipe = function() {
    let touchstartX = 0;
    let touchendX = 0;

    this.container.addEventListener('touchstart', (event) => {
      touchstartX = event.changedTouches[0].screenX;
    }, false);

    this.container.addEventListener('touchend', (event) => {
      touchendX = event.changedTouches[0].screenX;
      this.handleGesture(touchstartX, touchendX);
    }, false);
  };

  // Обработка жестов свайпа
  this.handleGesture = function(touchstartX, touchendX) {
    const threshold = 50; // Минимальное расстояние для свайпа
    if (touchendX + threshold < touchstartX) {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    } else if (touchendX > touchstartX + threshold) {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    }
    this.updateCarousel();
  };

  // Вызываем updateCarousel, чтобы показать первый слайд
  this.updateCarousel();
}

// Для использования карусели создаем ее экземпляр с помощью ключевого слова new
const myCarousel = new Carousel('.carousel', '.prev-btn', '.next-btn');
myCarousel.initEvents();