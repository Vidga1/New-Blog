function Carousel(containerSelector) {
  this.container = document.querySelector(containerSelector);
  this.slides = this.container.querySelectorAll('li');
  this.totalSlides = this.slides.length;
  this.currentSlide = 0;
  this.autoplayInterval = null;

  // Создаем кнопки управления
  this.createControlButtons = function() {
    this.prevButton = document.createElement('button');
    this.prevButton.innerText = '<';
    this.prevButton.classList.add('prev-btn');
    this.container.appendChild(this.prevButton);

    this.nextButton = document.createElement('button');
    this.nextButton.innerText = '>';
    this.nextButton.classList.add('next-btn');
    this.container.appendChild(this.nextButton);

    this.togglePlayButton = document.createElement('button');
    this.togglePlayButton.innerText = '⏸';
    this.togglePlayButton.classList.add('toggle-play-btn');
    this.container.appendChild(this.togglePlayButton);
  };

  // Обновление отображения карусели
  this.updateCarousel = function() {
    this.slides.forEach((slide) => {
      slide.style.display = 'none'; // скрываем все слайды
    });
    this.slides[this.currentSlide].style.display = 'block'; // показываем текущий слайд
  };

  // Функция для автовоспроизведения
  this.startAutoplay = function(interval) {
    if(this.autoplayInterval) clearInterval(this.autoplayInterval); // Очистим существующий интервал, если он есть
    this.autoplayInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateCarousel();
    }, interval || 3000); 
  };

  // Функция для переключения воспроизведения
  this.toggleAutoplay = function() {
    if(this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
      this.togglePlayButton.innerText = '▶️'; // Символ паузы
  } else {
    this.startAutoplay();
    this.togglePlayButton.innerText = '⏸'; // Символ воспроизведения
  }
};


  // Инициализация событий клика и автовоспроизведения
  this.initEvents = function() {
    this.createControlButtons(); // Создаем кнопки управления

    this.prevButton.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.updateCarousel();
      clearInterval(this.autoplayInterval); // Остановим автовоспроизведение при ручном переключении
      this.startAutoplay(); // И перезапустим его заново
    });

    this.nextButton.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateCarousel();
      clearInterval(this.autoplayInterval); // Остановим автовоспроизведение при ручном переключении
      this.startAutoplay(); // И перезапустим его заново
    });

    this.togglePlayButton.addEventListener('click', () => {
      this.toggleAutoplay(); // Переключаем состояние воспроизведения
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
    clearInterval(this.autoplayInterval); // Остановим автовоспроизведение при свайпе
    this.startAutoplay(); // И перезапустим его заново
  };

  // Вызываем updateCarousel, чтобы показать первый слайд
  this.updateCarousel();
  this.startAutoplay(); // Запускаем автовоспроизведение при инициализации
}

// Для использования карусели создаем ее экземпляр с помощью ключевого слова new
const myCarousel = new Carousel('.carousel');
myCarousel.initEvents();