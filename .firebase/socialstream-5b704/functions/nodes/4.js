

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/stream/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.cb449234.js","_app/immutable/chunks/scheduler.637e46a4.js","_app/immutable/chunks/index.66daa764.js","_app/immutable/chunks/globals.7f7f1b26.js"];
export const stylesheets = ["_app/immutable/assets/4.e4d9d086.css"];
export const fonts = [];
