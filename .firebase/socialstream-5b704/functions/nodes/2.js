

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.e2f62654.js","_app/immutable/chunks/scheduler.05b32eb2.js","_app/immutable/chunks/index.78efd558.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/authStore.bcb6ff3c.js","_app/immutable/chunks/index-61e5ac61.bc91c765.js","_app/immutable/chunks/index.6e2f1da7.js"];
export const stylesheets = ["_app/immutable/assets/2.d7ab7060.css"];
export const fonts = [];
