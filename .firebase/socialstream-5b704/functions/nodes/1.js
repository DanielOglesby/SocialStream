

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.fe9be166.js","_app/immutable/chunks/scheduler.05b32eb2.js","_app/immutable/chunks/index.78efd558.js","_app/immutable/chunks/singletons.a368006e.js","_app/immutable/chunks/index.6e2f1da7.js"];
export const stylesheets = [];
export const fonts = [];
