import "./src/scss/base.scss";

import "simplebar";
import "simplebar/dist/simplebar.css";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

tippy("[data-tippy-content]");

import { useDynamicAdapt } from "./src/libraries/dynamicAdapt/dynamicAdapt.js";
useDynamicAdapt();

import "./src/components/header/header.js";

import "./src/blocks/works/works.js";
import "./src/blocks/about/about.js";


const updateWrapperPadding = () => {
  if (document.querySelector(".header")) {
    const header = document.querySelector(".header");
    const wrapper = document.querySelector(".wrapper");
    const home = document.querySelector(".home");

    if (home) {
      wrapper.paddingTop = "0px";
    } else {
        const observer = new ResizeObserver(entries => {
          for (let entry of entries) {
              const headerHeight = entry.target.getBoundingClientRect().height;
              wrapper.style.paddingTop = `${headerHeight}px`;
          }
      });
  
      observer.observe(header);
    }
  };
};
updateWrapperPadding();