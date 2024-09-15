const works = () => {
  if (document.querySelector(".works__images") && document.querySelector(".works__button")) {
    const images = document.querySelector(".works__images");
    const button = document.querySelector(".works__button");

    function adjustImageWidth() {
        if (window.innerWidth <= 768) {
            const buttonWidth = button.offsetWidth;
            images.style.width = buttonWidth + "px";
        } else {
            images.style.width = "";
        }
    }

    adjustImageWidth();
    window.addEventListener("resize", adjustImageWidth);
  }

  document.querySelector(".works__slider") && (() => {
    const sliderElement = document.querySelector(".works__slider-slides");
    const buttonPrev = document.querySelector(".works__slider-button.prev");
    const buttonNext = document.querySelector(".works__slider-button.next");
    const slides = document.querySelectorAll(".works__slider-slide");
    const totalSlides = slides.length;

    let currentSlideIndex = 0;
    let slidesPerView = window.innerWidth <= 768 ? 1 : 2;

    const updateSlidesPerView = () => {
      slidesPerView = window.innerWidth <= 768 ? 1 : 2;
      showSlides();
    };

    const showSlides = () => {
      slides.forEach((slide, index) => {
        slide.classList[index >= currentSlideIndex && index < currentSlideIndex + slidesPerView ? 'add' : 'remove']("active");
      });
      sliderElement.classList.add("transition");
      setTimeout(() => {
        sliderElement.classList.remove("transition");
      }, 300);
    };

    const nextSlide = () => {
      currentSlideIndex = (currentSlideIndex + slidesPerView) % totalSlides;
      showSlides();
    };

    const previousSlide = () => {
      currentSlideIndex = (currentSlideIndex - slidesPerView + totalSlides) % totalSlides;
      showSlides();
    };

    buttonPrev.addEventListener("click", previousSlide);
    buttonNext.addEventListener("click", nextSlide);

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
  })();
};

works();