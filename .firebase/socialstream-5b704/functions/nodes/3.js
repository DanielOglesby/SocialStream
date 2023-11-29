

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.65e98261.js","_app/immutable/chunks/scheduler.05b32eb2.js","_app/immutable/chunks/index.78efd558.js"];
export const stylesheets = [];
export const fonts = [];
