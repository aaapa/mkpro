import "./src/scss/base.scss";

import "simplebar";
import "simplebar/dist/simplebar.css";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

tippy("[data-tippy-content]");

import { useDynamicAdapt } from "./src/libraries/dynamicAdapt/dynamicAdapt.js";
useDynamicAdapt();

import "./src/components/header/header.js";
