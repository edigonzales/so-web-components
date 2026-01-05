import { SoHeader } from "./components/so-header.js";

if (!customElements.get("so-header")) {
  customElements.define("so-header", SoHeader);
}

export { SoHeader };
