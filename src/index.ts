import { SoBreadcrumb, SoBreadcrumbItem } from "./components/so-breadcrumb.js";
import { SoHeader } from "./components/so-header.js";

if (!customElements.get("so-header")) {
  customElements.define("so-header", SoHeader);
}

if (!customElements.get("so-breadcrumb")) {
  customElements.define("so-breadcrumb", SoBreadcrumb);
}

if (!customElements.get("so-breadcrumb-item")) {
  customElements.define("so-breadcrumb-item", SoBreadcrumbItem);
}

export { SoBreadcrumb, SoBreadcrumbItem, SoHeader };
