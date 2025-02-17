import catalogData from "./catalog.json";

const catalog = () => {
  if (document.querySelector(".catalog__list")) {
    const list = document.querySelector(".catalog__list");

    catalogData.forEach((item, index) => {
      const listItem = document.createElement("li");

      const colorsHTML = `
        <div class="catalog__card-colors">
          ${item.colors.map(color => color.show !== false ? `
            <span class="catalog__card-color ${color.name}" data-color="${color.name}"></span>
          ` : "").join("")}
        </div>
      `;

      const defaultImage = item.colors.find(color => color.default)?.image || item.colors[0].image;

      listItem.insertAdjacentHTML("beforeend", `
        <div class="catalog__card" data-index="${index}" data-aos="fade-up" data-aos-delay="100">
          <figure class="catalog__card-top">
            <img class="catalog__card-image" src="${defaultImage}" alt="${item.name}" data-aos="fade-up" data-aos-delay="100">
            <figcaption class="catalog__card-title" data-aos="fade-up" data-aos-delay="100">${item.name}</figcaption>
          </figure>
          <div class="catalog__card-info">
            <div class="catalog__card-property">
              <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Цвет</span>
              ${colorsHTML}
            </div>
            ${item.series ? `
              <div class="catalog__card-property">
                <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Серия</span>
                <b class="catalog__card-property-value" data-aos="fade-up" data-aos-delay="100">${item.series}</b>
              </div>
            ` : ""}
            ${item.height ? `
              <div class="catalog__card-property">
                <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Высота</span>
                <b class="catalog__card-property-value" data-aos="fade-up" data-aos-delay="100">${item.height}</b>
              </div>
            ` : ""}
            ${item.thickness ? `
              <div class="catalog__card-property">
                <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Толщина дверного полотна</span>
                <b class="catalog__card-property-value" data-aos="fade-up" data-aos-delay="100">${item.thickness}</b>
              </div>
            ` : ""}
          </div>
        </div>
      `);

      list.appendChild(listItem);
    });

    list.addEventListener("click", (event) => {
      const card = event.target.closest(".catalog__card");
      if (card) {
        const index = card.getAttribute("data-index");
        openPopup(catalogData[index]);
      }
    });
  }

  if (document.querySelector("[data-catalog-cards]")) {
    const elementsWithDataAttribute = document.querySelectorAll('[data-catalog-cards]');
    elementsWithDataAttribute.forEach(element => {
      catalogData.forEach((item, index) => {
        const defaultImage = item.colors.find(color => color.default)?.image || item.colors[0].image;
        const colorsHTML = `
          <div class="catalog__card-colors">
            ${item.colors.map(color => color.show !== false ? `<span class="catalog__card-color ${color.name}" data-color="${color.name}"></span>` : "").join("")}
          </div>
        `;
        const cardHTML = `
        <div class="catalog__card" data-index="${index}">
            <figure class="catalog__card-top">
              <img class="catalog__card-image" src="${defaultImage}" alt="${item.name}" data-aos="fade-up" data-aos-delay="100">
              <figcaption class="catalog__card-title" data-aos="fade-up" data-aos-delay="100">${item.name}</figcaption>
            </figure>
            <div class="catalog__card-info">
              <div class="catalog__card-property">
                <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Цвет</span>
                ${colorsHTML}
              </div>
              ${item.series ? `
                <div class="catalog__card-property">
                  <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Серия</span>
                  <b class="catalog__card-property-value" data-aos="fade-up" data-aos-delay="100">${item.series}</b>
                </div>
              ` : ""}
              ${item.height ? `
                <div class="catalog__card-property">
                  <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Высота</span>
                  <b class="catalog__card-property-value" data-aos="fade-up" data-aos-delay="100">${item.height}</b>
                </div>
              ` : ""}
              ${item.thickness ? `
                <div class="catalog__card-property">
                  <span class="catalog__card-property-name" data-aos="fade-up" data-aos-delay="100">Толщина дверного полотна</span>
                  <b class="catalog__card-property-value" data-aos="fade-up" data-aos-delay="100">${item.thickness}</b>
                </div>
              ` : ""}
            </div>
          </div>
        `;
        element.insertAdjacentHTML('beforeend', cardHTML);
      });
    });

   new Swiper('.works__catalog-slider', {
  });
  }

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  const openPopup = (item) => {
    disableScroll();

    const popup = document.createElement("div");
    popup.classList.add("catalog__popup");

    const colorsHTML = item.colors.map(color => color.show !== false ? `
      <span class="catalog__popup-color ${color.name}" data-color="${color.name}"></span>
    ` : "").join("");

    popup.insertAdjacentHTML("beforeend", `
      <div class="catalog__popup-body container">
        <header class="catalog__popup-header">
          <button class="catalog__popup-close-button" type="button" aria-label="Нажмите, чтобы закрыть параметры двери" aria-expanded="true">
            <span class="catalog__popup-close-icon"></span>
          </button>
        </header>
        <div class="catalog__popup-main">
          <h2 class="catalog__popup-title">${item.name}</h2>
          <div class="catalog__popup-main-content">
            <div class="catalog__popup-preview">
              <div class="catalog__popup-preview-content">
                <img class="catalog__popup-preview-image" src="${item.colors[0]?.image}" alt="">
                <div class="catalog__popup-colors">
                  ${colorsHTML}
                </div>
              </div>
              <div class="catalog__popup-properties">
                <div class="catalog__popup-property">
                  <span class="catalog__popup-property-name">Покрытие</span>
                  <span class="catalog__popup-property-decor curve-bottom"></span>
                  <span class="catalog__popup-property-value">ПЭТ</span>
                </div>
                <div class="catalog__popup-property">
                  <span class="catalog__popup-property-name">Размер полотна</span>
                  <span class="catalog__popup-property-decor line"></span>
                  <span class="catalog__popup-property-value">600/700/800/900×2000</span>
                </div>
                <div class="catalog__popup-property">
                  <span class="catalog__popup-property-name">Толщина полотна</span>
                  <span class="catalog__popup-property-decor curve-top"></span>
                  <span class="catalog__popup-property-value">38 мм</span>
                </div>
              </div>
            </div>
            <div class="catalog__popup-info">
              <div class="catalog__popup-benefits">
                <h2 class="catalog__popup-benefits-title">Преимущества</h2>
                <ul class="catalog__popup-benefits-list">
                  <li class="catalog__popup-benefits-item">
                    <div class="catalog__popup-benefits-card">
                      <span class="catalog__popup-benefits-icon">
                        <img class="catalog__popup-benefits-image" src="imgs/catalog/icons/catalog--1.svg" alt="">
                      </span>
                      <span>Устойчивость к <br> хим.веществам</span>
                    </div>
                  </li>
                  <li class="catalog__popup-benefits-item">
                    <div class="catalog__popup-benefits-card">
                      <span class="catalog__popup-benefits-icon">
                        <img class="catalog__popup-benefits-image" src="imgs/catalog/icons/catalog--2.svg" alt="">
                      </span>
                      <span>Устойчивость к <br> солнечным лучам</span>
                    </div>
                  </li>
                  <li class="catalog__popup-benefits-item">
                    <div class="catalog__popup-benefits-card">
                      <span class="catalog__popup-benefits-icon">
                        <img class="catalog__popup-benefits-image" src="imgs/catalog/icons/catalog--3.svg" alt="">
                      </span>
                      <span>Устойчивость к <br> царапинам</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="catalog__popup-links">
                <a class="catalog__popup-button button" href="contacts.html">Рассчитать стоимость</a>
                <button class="catalog__popup-button button dark" type="button" data-feedback-button="">
                  <span>Получить консультацию</span>
                </button>
              </div>
              <h6 class="catalog__popup-subtitle">Оставьте заявку и наши сотрудники свяжутся с вами для согласования всех подробностей покупки</h6>
            </div>
          </div>
        </div>
      </div>
    `);

    document.querySelector(".catalog__body").appendChild(popup);

    const moveColorsToProperties = () => {
      const colorsContainer = popup.querySelector(".catalog__popup-colors");
      const propertiesContainer = popup.querySelector(".catalog__popup-properties");

      if (window.innerWidth <= 992) {
        propertiesContainer.appendChild(colorsContainer);
      } else {
        if (colorsContainer.parentNode === propertiesContainer) {
          const previewContainer = popup.querySelector(".catalog__popup-preview-content");
          previewContainer.appendChild(colorsContainer);
        }
      }
    };

    moveColorsToProperties();

    window.addEventListener('resize', moveColorsToProperties);

    popup.querySelector(".catalog__popup-close-button").addEventListener("click", () => {
      enableScroll();
      const popupElement = document.querySelector(".catalog__popup");
      if (popupElement && document.querySelector(".catalog__body").contains(popupElement)) {
        document.querySelector(".catalog__body").removeChild(popupElement);
      }
      window.removeEventListener('resize', moveColorsToProperties);
    });

    popup.querySelectorAll(".catalog__popup-color").forEach(color => {
      color.addEventListener("click", () => {
        const selectedColor = color.getAttribute("data-color");

        if (!color.classList.contains("active")) {
          const newImageSrc = item.colors.find(c => c.name === selectedColor).image;
          popup.querySelector(".catalog__popup-preview-image").src = newImageSrc;

          const activeColor = popup.querySelector(".catalog__popup-color.active");
          if (activeColor) {
            activeColor.classList.remove("active");
          }

          color.classList.add("active");
        }
      });
    });

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        enableScroll();
        const popupElement = document.querySelector(".catalog__popup");
        if (popupElement && document.querySelector(".catalog__body").contains(popupElement)) {
          document.querySelector(".catalog__body").removeChild(popupElement);
        }
        document.removeEventListener("keydown", handleEscape);
      }
    };

    document.addEventListener("keydown", handleEscape);

    const defaultColor = popup.querySelector(".catalog__popup-color.white");
    if (defaultColor) {
      defaultColor.classList.add("active");
    }
  };
};

catalog();
