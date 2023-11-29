import { c as create_ssr_component, f as add_attribute, h as each, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import "dayjs";
import "firebase/auth";
import { a as authStore } from "../../../../chunks/authStore.js";
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
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let messageFeed;
  authStore.subscribe((authState) => {
    console.log("Current User:", authState.currentUser);
    authState.currentUser;
  });
  let elemChat;
  messageFeed = [
    {
      id: 0,
      name: "Chloe",
      timestamp: "Yesterday @ 2:30pm",
      message: "Some message text.",
      color: "variant-soft-primary"
    },
    {
      id: 1,
      name: "Michael",
      timestamp: "Yesterday @ 2:45pm",
      message: "Some message text.",
      color: "variant-soft-primary"
    },
    {
      id: 2,
      name: "Michael",
      timestamp: "Yesterday @ 2:45pm",
      message: "Some message text.",
      color: "variant-soft-primary"
    }
  ];
  {
    console.log(messageFeed);
  }
  return `<div class="overflow-y-auto"${add_attribute("this", elemChat, 0)}><div class="w-full grid grid-cols-[auto_1fr] gap-1">${each(messageFeed, (message) => {
    return `<div class="bg-surface-500/30 p-4">${escape(message.name)}</div> <div class="bg-surface-500/30 p-4">${escape(message.message)}</div>`;
  })}</div></div> <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"><button class="input-group-shim" data-svelte-h="svelte-pe7l84">+</button> <textarea class="bg-transparent border-0 ring-0" name="prompt" id="prompt" placeholder="Write a message..." rows="1">${escape("")}</textarea> <button class="variant-filled-primary" data-svelte-h="svelte-tjij6a">Send</button></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".youtube-player.s-m-Hu420SDNpD{aspect-ratio:16/9;min-width:70vw}",
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
    $$rendered = `<main class="flex items-center justify-center flex-col gap-10"><div class="youtube-player s-m-Hu420SDNpD">${validate_component(YouTube, "Youtube").$$render(
      $$result,
      { player },
      {
        player: ($$value) => {
          player = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="w-[50vw]"><input class="input" title="Input (text)" type="text" placeholder="Input YouTube video URL"${add_attribute("value", videoSlug, 0)}></div> <button data-svelte-h="svelte-10pt4jf">change video</button> ${validate_component(Chat, "Chat").$$render($$result, {}, {}, {})} </main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
