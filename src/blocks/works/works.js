const works = () => {
  if (
    document.querySelector(".works__images") &&
    document.querySelector(".works__button")
  ) {
    const images = document.querySelector(".works__images");
    const button = document.querySelector(".works__button");

    const adjustImageWidth = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        const buttonWidth = button.offsetWidth;
        images.style.width = buttonWidth + "px";
      } else {
        images.style.width = "";
      }
    };

    adjustImageWidth();
    window.addEventListener("resize", adjustImageWidth);
  }

  document.querySelector(".works__slider") &&
    (() => {
      const buttonPrev = document.querySelector(".works__slider-button.prev");
      const buttonNext = document.querySelector(".works__slider-button.next");
      const slides = document.querySelectorAll(".works__slider-slide");
      const totalSlides = slides.length;

      let currentSlideIndex = 0;
      let slidesPerView = window.matchMedia("(max-width: 768px)").matches
        ? 1
        : 2;

      const updateSlidesPerView = () => {
        slidesPerView = window.matchMedia("(max-width: 768px)").matches ? 1 : 2;
        showSlides();
      };

      const showSlides = () => {
        slides.forEach((slide, index) => {
          slide.classList.remove("active");
          if (
            index >= currentSlideIndex &&
            index < currentSlideIndex + slidesPerView
          ) {
            slide.classList.add("active");
          }
        });
      };

      const nextSlide = () => {
        currentSlideIndex = (currentSlideIndex + slidesPerView) % totalSlides;
        showSlides();
      };

      const previousSlide = () => {
        currentSlideIndex =
          (currentSlideIndex - slidesPerView + totalSlides) % totalSlides;
        showSlides();
      };

      setInterval(nextSlide, 5000);

      buttonPrev.addEventListener("click", previousSlide);
      buttonNext.addEventListener("click", nextSlide);

      window
        .matchMedia("(max-width: 768px)")
        .addEventListener("change", updateSlidesPerView);

      updateSlidesPerView();
      window.addEventListener("resize", updateSlidesPerView);
    })();

    
};

works();
