const header = () => {
    const headerElement = document.querySelector(".header");
    const htmlElement = document.documentElement;
  
    if (document.querySelector(".header__menu-button")) {
      const logoImage = document.querySelector(".header__logo-image");
      const addressGPS = document.querySelector(".header__address-row.gps");
      const addressPhone = document.querySelector(".header__address-row.phone");
      const menuButton = document.querySelector(".header__menu-button");
      const menuIcon = document.querySelector(".header__menu-icon");
      const menuContent = document.querySelector(".header__menu-content");
      const headerBottom = document.querySelector(".header__bottom");
  
      const logoOriginalSrc = logoImage.src;
      const logoNewSrc = "imgs/logo/logo--black.webp";
  
      menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !isExpanded);
  
        if (!isExpanded) {
          logoImage.classList.add("logo-animation");
          logoImage.src = logoNewSrc;
          menuContent.style.left = "0px";
          document.documentElement.style.overflow = "clip";
  
          const addressGPSClone = addressGPS.cloneNode(true);
          const addressPhoneClone = addressPhone.cloneNode(true);
  
          // Дублируем addressGPS в начало
          headerBottom.prepend(addressGPSClone);
          addressGPSClone.classList.add("open");
  
          // Дублируем addressPhone в конец
          headerBottom.appendChild(addressPhoneClone);
          addressPhoneClone.classList.add("open");
  
          menuIcon.classList.add("open");
        } else {
          logoImage.classList.add("logo-animation");
          logoImage.src = logoOriginalSrc;
          menuContent.style.left = "-200%";
          document.documentElement.style.overflow = "";
  
          const addressGPSElements = headerBottom.querySelectorAll(".header__address-row.gps");
          const addressPhoneElements = headerBottom.querySelectorAll(".header__address-row.phone");
  
          addressGPSElements.forEach(element => element.remove());
          addressPhoneElements.forEach(element => element.remove());
  
          menuIcon.classList.remove("open");
        }
  
        logoImage.addEventListener("animationend", () => {
          logoImage.classList.remove("logo-animation");
        });
      });
  
      document.addEventListener("keydown", event => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
          menuButton.setAttribute("aria-expanded", "false");
          logoImage.classList.add("logo-animation");
          logoImage.src = logoOriginalSrc;
          menuContent.style.left = "-200%";
          document.documentElement.style.overflow = "";
  
          const addressGPSElements = headerBottom.querySelectorAll(".header__address-row.gps");
          const addressPhoneElements = headerBottom.querySelectorAll(".header__address-row.phone");
  
          addressGPSElements.forEach(element => element.remove());
          addressPhoneElements.forEach(element => element.remove());
  
          menuIcon.classList.remove("open");
  
          logoImage.addEventListener("animationend", () => {
            logoImage.classList.remove("logo-animation");
          });
        }
      });
    }
  };
  
  header();