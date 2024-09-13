const about = () => {
  document.querySelector(".about__slider") && (() => {
    const sliderElement = document.querySelector(".about__slider-slides");
    const buttonPrev = document.querySelector(".about__slider-button.prev");
    const buttonNext = document.querySelector(".about__slider-button.next");
    const descImages = document.querySelectorAll(".about__desc-image");
    
    let currentSlideIndex = 0;

    // Создание слайдов на основе изображений из about__desc
    descImages.forEach((img) => {
      const slide = document.createElement('div');
      slide.classList.add('about__slider-slide');
      const slideImage = document.createElement('img');
      slideImage.classList.add('about__slider-image');
      slideImage.src = img.src;
      slideImage.alt = img.alt;
      slide.appendChild(slideImage);
      sliderElement.appendChild(slide);
    });

    const totalSlides = sliderElement.children.length;

    const showSlides = () => {
      Array.from(sliderElement.children).forEach((slide, index) => {
        slide.classList[index === currentSlideIndex ? 'add' : 'remove']("active");
      });
      sliderElement.classList.add("transition");
      setTimeout(() => {
        sliderElement.classList.remove("transition");
      }, 300);
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