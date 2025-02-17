const header = () => {
  if (document.querySelector(".header")) {
    const headerElement = document.querySelector(".header");

    if (!document.documentElement.classList.contains("main-page")) {
      headerElement.classList.remove("index");
    }

    const handleScroll = () => {
      window.scrollY > 5
        ? headerElement.classList.add("scrolled")
        : headerElement.classList.remove("scrolled");
    };

    window.addEventListener("scroll", handleScroll);
  }

  if (document.querySelector(".header__menu-button")) {
    const logoDefault = document.querySelector(".header__logo-image.default");
    const logoOpen = document.querySelector(".header__logo-image.open");
    const addressGPS = document.querySelector(".header__address-row.gps");
    const addressPhone = document.querySelector(".header__address-row.phone");
    const menuButton = document.querySelector(".header__menu-button");
    const menuIcon = document.querySelector(".header__menu-icon");
    const menuContent = document.querySelector(".header__menu-content");
    const headerBottom = document.querySelector(".header__bottom");

    logoOpen.style.display = "none";

    const toggleMenu = () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      const newExpandedValue = !isExpanded;
      menuButton.setAttribute("aria-expanded", newExpandedValue);

      if (!isExpanded) {
        menuContent.style.left = "0px";
        document.documentElement.style.overflow = "clip";

        logoDefault.style.display = "none";
        logoOpen.style.display = "block";

        const addressGPSClone = addressGPS.cloneNode(true);
        const addressPhoneClone = addressPhone.cloneNode(true);

        headerBottom.prepend(addressGPSClone);
        addressGPSClone.classList.add("open");

        headerBottom.appendChild(addressPhoneClone);
        addressPhoneClone.classList.add("open");

        menuIcon.classList.add("open");
      } else {
        closeMenu();
      }
    };

    menuButton.addEventListener("click", toggleMenu);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu();
      }
    });

    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuContent.style.left = "-200%";
      document.documentElement.style.overflow = "";

      logoOpen.style.display = "none";
      logoDefault.style.display = "block";

      const addressGPSElements = headerBottom.querySelectorAll(".header__address-row.gps");
      const addressPhoneElements = headerBottom.querySelectorAll(".header__address-row.phone");

      addressGPSElements.forEach((element) => element.remove());
      addressPhoneElements.forEach((element) => element.remove());

      menuIcon.classList.remove("open");
    };

    const nav = document.querySelector(".header__nav");
    if (nav) {
      const links = nav.getElementsByTagName("a");

      for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", () => {
          closeMenu();
        });

        if (links[i].href === window.location.href) {
          links[i].classList.add("active");
          break;
        }
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", header);