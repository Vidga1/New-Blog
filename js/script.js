function Carousel(t){this.container=document.querySelector(t),this.slides=this.container.querySelectorAll("li"),this.totalSlides=this.slides.length,this.currentSlide=0,this.autoplayInterval=null,this.createControlButtons=function(){this.prevButton=document.createElement("button"),this.prevButton.innerText="<",this.prevButton.classList.add("prev-btn"),this.container.appendChild(this.prevButton),this.nextButton=document.createElement("button"),this.nextButton.innerText=">",this.nextButton.classList.add("next-btn"),this.container.appendChild(this.nextButton)},this.updateCarousel=function(){this.slides.forEach(t=>{t.style.display="none"}),this.slides[this.currentSlide].style.display="block"},this.startAutoplay=function(t){this.autoplayInterval&&clearInterval(this.autoplayInterval),this.autoplayInterval=setInterval(()=>{this.currentSlide=(this.currentSlide+1)%this.totalSlides,this.updateCarousel()},t||3e3)},this.initEvents=function(){this.createControlButtons(),this.prevButton.addEventListener("click",()=>{this.currentSlide=(this.currentSlide-1+this.totalSlides)%this.totalSlides,this.updateCarousel(),clearInterval(this.autoplayInterval),this.startAutoplay()}),this.nextButton.addEventListener("click",()=>{this.currentSlide=(this.currentSlide+1)%this.totalSlides,this.updateCarousel(),clearInterval(this.autoplayInterval),this.startAutoplay()}),this.handleSwipe()},this.handleSwipe=function(){let e=0,s;this.container.addEventListener("touchstart",t=>{e=t.changedTouches[0].screenX},!1),this.container.addEventListener("touchend",t=>{s=t.changedTouches[0].screenX,this.handleGesture(e,s)},!1)},this.handleGesture=function(t,e){e+50<t?this.currentSlide=(this.currentSlide+1)%this.totalSlides:t+50<e&&(this.currentSlide=(this.currentSlide-1+this.totalSlides)%this.totalSlides),this.updateCarousel(),clearInterval(this.autoplayInterval),this.startAutoplay()},this.updateCarousel(),this.startAutoplay()}const myCarousel=new Carousel(".carousel");myCarousel.initEvents();