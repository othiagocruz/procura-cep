import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	adapter: adapter(),
	define: {
		'process.env': process.env
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('./src/components'),
			$styles: path.resolve('./src/styles')
		}
	}
};

export default config;
