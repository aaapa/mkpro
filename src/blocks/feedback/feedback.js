const feedback = () => {
  const createFeedbackForm = () => {
    const feedbackContainer = document.createElement("div");
    feedbackContainer.classList.add("feedback");

    feedbackContainer.innerHTML = `
      <div class="feedback__body container">
        <header class="feedback__header">
          <button class="feedback__close-button" type="button" aria-label="Нажмите, чтобы закрыть форму обратной связи" aria-expanded="true">
            <span class="feedback__close-icon"></span>
          </button>
        </header>
        <div class="feedback__content">
          <img class="feedback__decor" src="imgs/feedback/feedback__decor.webp" alt="">
          <div class="feedback__content-main">
            <h2 class="feedback__title title normal">Получить бесплатную консультацию и замер</h2>
            <form class="feedback__form">
              <input class="feedback__form-input" type="text" placeholder="Ваше имя" required>
              <input class="feedback__form-input" type="tel" placeholder="+ 7 (999) ___ __ __" inputmode="tel" required>
              <input class="feedback__form-input" type="email" placeholder="Ваш Email" inputmode="email" required>
              <button class="feedback__form-button button" type="submit">
                <span>Отправить заявку</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.style.overflow = "clip";

    document.body.appendChild(feedbackContainer);

    const closeButton = feedbackContainer.querySelector(".feedback__close-button");
    closeButton.addEventListener("click", () => {
      feedbackContainer.remove();
      document.body.style.overflow = "";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        feedbackContainer.remove();
        document.body.style.overflow = "";
      }
    });

    feedbackContainer.addEventListener("click", (event) => {
      if (event.target === feedbackContainer) {
        feedbackContainer.remove();
        document.body.style.overflow = "";
      }
    });
  };

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-feedback-button]")) {
      createFeedbackForm();
    }
  });
};

feedback();