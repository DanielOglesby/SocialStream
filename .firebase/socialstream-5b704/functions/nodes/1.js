

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d7d3c3d7.js","_app/immutable/chunks/scheduler.05b32eb2.js","_app/immutable/chunks/index.78efd558.js","_app/immutable/chunks/singletons.15374d6d.js","_app/immutable/chunks/index.6e2f1da7.js"];
export const stylesheets = [];
export const fonts = [];
