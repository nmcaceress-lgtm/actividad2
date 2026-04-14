import adapter from '@sveltejs/adapter-static';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName ? `/${repositoryName}` : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: basePath
		}
	}
};

export default config;
