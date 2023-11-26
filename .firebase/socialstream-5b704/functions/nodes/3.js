

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.26dc854b.js","_app/immutable/chunks/scheduler.637e46a4.js","_app/immutable/chunks/index.66daa764.js"];
export const stylesheets = [];
export const fonts = [];
