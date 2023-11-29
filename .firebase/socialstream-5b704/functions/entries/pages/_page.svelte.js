import { c as create_ssr_component, b as validate_store, d as subscribe, e as escape, f as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { a as authStore } from "../../chunks/authStore.js";
const Auth_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.s-mCb0N04zrwz6.s-mCb0N04zrwz6{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1}.container.s-mCb0N04zrwz6 form.s-mCb0N04zrwz6{display:flex;flex-direction:column;color:black}",
  map: null
};
const Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authStore;
  validate_store(authStore, "authStore");
  $$unsubscribe_authStore = subscribe(authStore, (value) => value);
  let email = "";
  let password = "";
  $$result.css.add(css);
  $$unsubscribe_authStore();
  return `<div class="container s-mCb0N04zrwz6"><h1>${escape("Log in")}</h1> <form class="gap-2 s-mCb0N04zrwz6"><label><input type="email" placeholder="Email"${add_attribute("value", email, 0)}></label> <label><input type="password" placeholder="Password"${add_attribute("value", password, 0)}></label> ${``} <button type="button" class="btn variant-filled-primary" data-svelte-h="svelte-bidcct">Submit</button></form> ${`<div>Don&#39;t have an account? <p data-svelte-h="svelte-tc5bhy">Sign Up</p></div> <div data-svelte-h="svelte-rmu0cx">Forgot Password?</div>`} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Auth, "Auth").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
