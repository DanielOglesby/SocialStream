import { g as get_store_value, c as create_ssr_component } from "../../chunks/ssr.js";
import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
import { w as writable, r as readable } from "../../chunks/index.js";
import "../../chunks/firebase.client.js";
import "firebase/auth";
const app = "";
const storePopup = writable(void 0);
const stores = {};
function localStorageStore(key, initialValue, options) {
  options?.serializer ?? JSON;
  options?.storage ?? "local";
  if (!stores[key]) {
    const store = writable(initialValue, (set2) => {
    });
    const { subscribe, set } = store;
    stores[key] = {
      set(value) {
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set(value);
      },
      subscribe
    };
  }
  return stores[key];
}
localStorageStore("modeOsPrefers", false);
localStorageStore("modeUserPrefers", void 0);
localStorageStore("modeCurrent", false);
function prefersReducedMotion() {
  return false;
}
readable(prefersReducedMotion(), (set) => {
});
const ProgressBar_svelte_svelte_type_style_lang = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".mainContainer.s-7IPF32Wcq3s8{min-height:100vh;display:flex;flex-direction:column}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  storePopup.set({
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow
  });
  $$result.css.add(css);
  return `<main class="mainContainer h-screen flex-col gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 s-7IPF32Wcq3s8">${slots.default ? slots.default({}) : ``} </main>`;
});
export {
  Layout as default
};
