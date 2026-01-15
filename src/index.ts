import { SoBreadcrump } from "./components/so-breadcrump.js";
import { SoHeader } from "./components/so-header.js";

if (!customElements.get("so-header")) {
  customElements.define("so-header", SoHeader);
}

if (!customElements.get("so-breadcrump")) {
  customElements.define("so-breadcrump", SoBreadcrump);
}

export { SoBreadcrump, SoHeader };
