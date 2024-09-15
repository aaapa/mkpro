import catalogData from "./catalog.json";

const catalog = () => {
  if (document.querySelector(".catalog__list")) {
    const list = document.querySelector(".catalog__list");

    catalogData.forEach((item, index) => {
      const listItem = document.createElement("li");
      const colorsHTML = `
        <div class="catalog__card-colors">
          ${item.colors.white ? '<span class="catalog__card-color white" data-color="white"></span>' : ''}
          ${item.colors.default ? '<span class="catalog__card-color default active" data-color="default"></span>' : ''}
        </div>
      `;

      let propertiesHTML = '';

      if (item.series) {
        propertiesHTML += `
          <div class="catalog__card-property">
            <span class="catalog__card-property-name">Серия</span>
            <b class="catalog__card-property-value">${item.series}</b>
          </div>
        `;
      }

      if (item.height) {
        propertiesHTML += `
          <div class="catalog__card-property">
            <span class="catalog__card-property-name">Высота</span>
            <b class="catalog__card-property-value">${item.height}</b>
          </div>
        `;
      }

      if (item.thickness) {
        propertiesHTML += `
          <div class="catalog__card-property">
            <span class="catalog__card-property-name">Толщина дверного полотна</span>
            <b class="catalog__card-property-value">${item.thickness}</b>
          </div>
        `;
      }

      listItem.innerHTML = `
        <div class="catalog__card" data-index="${index}">
          <div class="catalog__card-top">
            <img class="catalog__card-image" src="${item.colors.default}" alt="">
            <h4 class="catalog__card-title">${item.name}</h4>
          </div>
          <div class="catalog__card-info">
            <div class="catalog__card-property">
              <span class="catalog__card-property-name">Цвет</span>
              ${colorsHTML}
            </div>
            ${propertiesHTML}
          </div>
        </div>
      `;
      list.appendChild(listItem);

      listItem.querySelector(".catalog__card").addEventListener("click", () => {
        openPopup(item);
      });
    });
  }
};

const openPopup = (item) => {
  const popup = document.createElement("div");
  popup.classList.add("catalog__popup");
  popup.innerHTML = `
    <div class="catalog__popup-body container">
      <header class="catalog__popup-header">
        <button class="catalog__popup-close-button" type="button" aria-label="Нажмите, чтобы закрыть параметры двери" aria-expanded="true">
          <span class="catalog__popup-close-icon"></span>
        </button>
      </header>
      <div class="catalog__popup-main">
        <div class="catalog__popup-preview">
          <img class="catalog__popup-image" src="${item.colors.default}" alt="${item.name}">
          <div class="catalog__popup-colors">
            <span class="catalog__popup-color white" data-color="white"></span>
            <span class="catalog__popup-color default active" data-color="default"></span>
          </div>
        </div>
        <div class="catalog__popup-content">
          <div class="catalog__popup-content-main">
            <h2 class="catalog__popup-title title normal">Параметры двери</h2>
            <div class="catalog__popup-info">
              <div class="catalog__popup-property">
                <span>Покрытие</span>
                <span>${item.coating || "Не указано"}</span>
              </div>
              <div class="catalog__popup-property">
                <span>Цвета</span>
                <span>${item.colors.white ? "Белый" : ""}/${item.colors.default ? "Серый" : ""}</span>
              </div>
              <div class="catalog__popup-property">
                <span>Стиль</span>
                <span>${item.style || "Не указано"}</span>
              </div>
              <div class="catalog__popup-property">
                <span>Размер полотна</span>
                <span>${item.sizes || "Не указано"}</span>
              </div>
              <div class="catalog__popup-property">
                <span>Толщина полотна</span>
                <span>${item.thickness}</span>
              </div>
            </div>
          </div>
          <div class="catalog__popup-bottom">
            <a class="catalog__popup-button button" href="contacts.html">Рассчитать стоимость</a>
            <button class="catalog__popup-button button dark" type="button" data-feedback-button>Получить консультацию</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector(".catalog__body").appendChild(popup);
  document.documentElement.style.overflow = "clip";

  popup.querySelector(".catalog__popup-close-button").addEventListener("click", () => {
    document.querySelector(".catalog__body").removeChild(popup);
    document.documentElement.style.overflow = "";
  });

  // Устанавливаем активный цвет по умолчанию
  const defaultColor = popup.querySelector(".catalog__popup-color.default");
  if (defaultColor) {
    defaultColor.classList.add("active");
  }

  popup.querySelectorAll(".catalog__popup-color").forEach(color => {
    color.addEventListener("click", () => {
      const selectedColor = color.getAttribute("data-color");

      if (!color.classList.contains("active")) {
        const newImageSrc = item.colors[selectedColor];
        popup.querySelector(".catalog__popup-image").src = newImageSrc;

        const activeColor = popup.querySelector(".catalog__popup-color.active");
        if (activeColor) {
          activeColor.classList.remove("active");
        }
        
        color.classList.add("active");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const popup = document.querySelector(".catalog__popup");
      if (popup) {
        document.querySelector(".catalog__body").removeChild(popup);
        document.documentElement.style.overflow = "";
      }
    }
  });
};

catalog();