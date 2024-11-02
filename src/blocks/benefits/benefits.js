const benefits = () => {
  const image = document.querySelector(".benefits__content-image");
  const counters = document.querySelector(".benefits__counters");

  if (image && counters) {
    const adjustImageWidth = () => {
      if (window.matchMedia("(max-width: 1080px)").matches) {
        const countersWidth = counters.offsetWidth;
        image.style.width = countersWidth + "px";
      } else {
        image.style.width = "";
      }
    };

    adjustImageWidth();
    window.addEventListener("resize", adjustImageWidth);
  }
};

benefits();
