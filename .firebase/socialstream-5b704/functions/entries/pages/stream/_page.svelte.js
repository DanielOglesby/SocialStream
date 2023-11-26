import { c as create_ssr_component, f as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
const YouTube_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".youtube-player.s-q4GTRpz7qyVE{width:100%;height:100%}",
  map: null
};
const ytPlayerId = "youtube-player";
const YouTube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { player } = $$props;
  let { initialVideoId = "" } = $$props;
  if ($$props.player === void 0 && $$bindings.player && player !== void 0)
    $$bindings.player(player);
  if ($$props.initialVideoId === void 0 && $$bindings.initialVideoId && initialVideoId !== void 0)
    $$bindings.initialVideoId(initialVideoId);
  $$result.css.add(css$1);
  return `${$$result.head += `<!-- HEAD_svelte-uqb4l9_START --><script src="https://www.youtube.com/iframe_api" data-svelte-h="svelte-2lmn1n"><\/script><!-- HEAD_svelte-uqb4l9_END -->`, ""} <div${add_attribute("id", ytPlayerId, 0)} class="youtube-player s-q4GTRpz7qyVE"></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".youtube-player.s-EHh9iHn8Ikr3{aspect-ratio:16/9;min-width:70vw}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let player;
  let videoSlug;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<main class="flex items-center justify-center h-screen flex-col gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8"><div class="youtube-player s-EHh9iHn8Ikr3">${validate_component(YouTube, "Youtube").$$render(
      $$result,
      { player },
      {
        player: ($$value) => {
          player = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="w-[50vw]"><input class="input" title="Input (text)" type="text" placeholder="Input YouTube video URL"${add_attribute("value", videoSlug, 0)}></div> <button data-svelte-h="svelte-10pt4jf">change video</button> </main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
