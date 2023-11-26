

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.cb56a683.js","_app/immutable/chunks/scheduler.637e46a4.js","_app/immutable/chunks/index.66daa764.js","_app/immutable/chunks/singletons.6d25a48c.js","_app/immutable/chunks/index.dce7a17f.js"];
export const stylesheets = [];
export const fonts = [];
