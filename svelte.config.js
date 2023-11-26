import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [ vitePreprocess()],
	
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'public',
			assets: 'public',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};
export default config;