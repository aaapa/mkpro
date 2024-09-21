const about = () => {
  document.querySelector(".about__slider") && (() => {
    const sliderElement = document.querySelector(".about__slider-slides");
    const buttonPrev = document.querySelector(".about__slider-button.prev");
    const buttonNext = document.querySelector(".about__slider-button.next");
    
    let currentSlideIndex = 0;
    const totalSlides = sliderElement.children.length;

    const showSlides = () => {
      Array.from(sliderElement.children).forEach((slide, index) => {
        if (index === currentSlideIndex) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
    };

    const nextSlide = () => {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      showSlides();
    };

    const previousSlide = () => {
      currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
      showSlides();
    };

    buttonPrev.addEventListener("click", previousSlide);
    buttonNext.addEventListener("click", nextSlide);

    showSlides();
  })();
};

about();