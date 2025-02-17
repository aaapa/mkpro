const feedback = () => {
  const createFeedbackForm = () => {
    const feedbackContainer = document.createElement("div");
    feedbackContainer.classList.add("feedback");

    feedbackContainer.insertAdjacentHTML("beforeend", `
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
              <input class="feedback__input" type="text" placeholder="Ваше имя" name="name" required>
              <input class="feedback__input" type="tel" placeholder="+ 7 (999) ___ __ __" inputmode="tel" maxlength="11" name="phone" required>
              <input class="feedback__input" type="email" placeholder="Ваш Email" inputmode="email" name="email">
              <button class="feedback__button button" type="submit">
                <span>Отправить заявку</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `);

    document.body.style.overflow = "hidden";
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

    const form = feedbackContainer.querySelector(".feedback__form");
    
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.querySelector('input[name="name"]').value.trim();
      const phone = form.querySelector('input[name="phone"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();

      sendMessage(name, phone, email, form, feedbackContainer);
    });
  };

  const sendMessage = (name, phone, email, form, feedbackContainer) => {
    const token = "";
    const chatId = "";

    const emailText = email ? email : "не указано";
    const message = `Имя: ${name}\nТелефон: ${phone}\nEmail: ${emailText}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const params = {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML"
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        showSuccessDialog("Ваши данные успешно отправлены! <br/> Ожидайте ответа.");
        form.reset();
        feedbackContainer.remove();
        document.body.style.overflow = "";
      } else {
        showSuccessDialog("Ошибка при отправке данных.", true);
      }
    })
    .catch(error => console.error("Ошибка:", error));
  };

  const showSuccessDialog = (message, isError = false) => {
    const dialog = document.createElement("div");
    
    dialog.classList.add("feedback__success");
    
    dialog.insertAdjacentHTML("beforeend", `
     <div class="feedback__success-body container">
      <header class="feedback__success-header">
       <button class="feedback__close-button" type="button" aria-label="Закрыть окно об отправке данных" aria-expanded="true">
        <span class="feedback__close-icon"></span>
       </button> 
      </header>
      <div class="${isError ? 'feedback__success-content warning' : 'feedback__success-content'}">
       <h2>${message}</h2>   
      </div>
     </div>
    `);
    
    document.body.appendChild(dialog);
    
    document.body.style.overflow = "hidden";

    dialog.querySelector(".feedback__close-button").addEventListener("click", () => {
      dialog.remove();
      document.body.style.overflow = "";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dialog.remove();
        document.body.style.overflow = "";
      }
    });
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-feedback-button]")) {
      createFeedbackForm();
    }
  });
};

feedback();