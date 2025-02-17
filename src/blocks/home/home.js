const home = () => {
  if (document.querySelector(".home")) {
    const home = document.querySelector(".home");
    const background = document.querySelector(".home__background");
    const nextBackground = document.createElement("div");

    const backgrounds = [
      "imgs/home/home__background--1.webp",
      "imgs/home/home__background--5.webp",
      "imgs/home/home__background--2.webp",
      "imgs/home/home__background--3.webp",
      "imgs/home/home__background--4.webp",
    ];

    const backgroundsMobile = [
      "imgs/home/mobile/home__background--1.webp",
      "imgs/home/mobile/home__background--5.webp",
      "imgs/home/mobile/home__background--2.webp",
      "imgs/home/mobile/home__background--3.webp",
      "imgs/home/mobile/home__background--4.webp",
    ];

    let currentIndex = 0;
    nextBackground.className = "home__next-background";
    home.appendChild(nextBackground);

    const mediaQueryList = window.matchMedia("(max-width: 768px)");

    const changedBackground = () => {
      const bgArray = mediaQueryList.matches ? backgroundsMobile : backgrounds;
      const nextIndex = (currentIndex + 1) % bgArray.length;

      nextBackground.style.backgroundImage =
        `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${bgArray[nextIndex]})`;

      nextBackground.classList.add("slide-in");
      nextBackground.style.zIndex = "1";
      background.style.zIndex = "0";
      currentIndex = nextIndex;

      setTimeout(() => {
        background.style.backgroundImage =
          `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${bgArray[currentIndex]})`;
        nextBackground.classList.remove("slide-in");
        nextBackground.style.transform = "translateX(100%)";
        nextBackground.style.zIndex = "-1";
        background.style.zIndex = "1";
      }, 1000);
    };

    const bgArray = mediaQueryList.matches ? backgroundsMobile : backgrounds;
    background.style.backgroundImage =
      `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${bgArray[currentIndex]})`;

    setInterval(changedBackground, 5000);
    changedBackground();

    const style = document.createElement("style");
    style.innerHTML = `
      .home__background,
      .home__next-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        transition: background-image 1s ease;
        opacity: 1;
      }

      .home__next-background {
        transform: translateX(100%);
        z-index: -1;
        opacity: 1;
        transition: transform 1s ease;
      }

      .slide-in {
        animation: slideIn 1s forwards;
        opacity: 1;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 1;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    
    document.head.appendChild(style);

    mediaQueryList.addEventListener("change", changedBackground);
    
  }
};

home();