

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.98559b14.js","_app/immutable/chunks/scheduler.637e46a4.js","_app/immutable/chunks/index.66daa764.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/authStore.3c462420.js","_app/immutable/chunks/index.dce7a17f.js"];
export const stylesheets = ["_app/immutable/assets/2.d7ab7060.css"];
export const fonts = [];
