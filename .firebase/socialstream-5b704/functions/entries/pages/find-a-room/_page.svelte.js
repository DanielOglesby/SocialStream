import { c as create_ssr_component, f as add_attribute } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let roomName = "";
  return `<div class="flex justify-center text-black items-center h-screen flex-col gap-10"><input class="input" title="Input (text)" type="text" placeholder="Choose the name of your room"${add_attribute("value", roomName, 0)}> <button type="button" class="btn bg-gradient-to-br variant-gradient-primary-secondary" data-svelte-h="svelte-ass7im">Enter Room</button></div>`;
});
export {
  Page as default
};
