

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/stream/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.46c285ba.js","_app/immutable/chunks/scheduler.05b32eb2.js","_app/immutable/chunks/index.78efd558.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/authStore.d059c703.js","_app/immutable/chunks/index.6e2f1da7.js"];
export const stylesheets = ["_app/immutable/assets/5.28619ebb.css"];
export const fonts = [];
