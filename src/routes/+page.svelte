<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { listCharacters } from '$lib/core/api/rick-and-morty';
	import { CharacterBrowser } from '$lib/features/character-browser';
	import type { CharacterBrowserData } from '$lib/features/character-browser/model';

	let data: CharacterBrowserData = {
		characters: [],
		total: 0,
		query: '',
		loading: true
	};

	let requestSequence = 0;

	function readQuery(url: URL) {
		return url.searchParams.get('q') ?? url.searchParams.get('name') ?? '';
	}

	async function syncCharacters(query: string) {
		const sequence = ++requestSequence;

		data = {
			...data,
			query,
			loading: true,
			error: undefined
		};

		try {
			const result = await listCharacters(fetch, query ? { name: query } : {});

			if (sequence !== requestSequence) {
				return;
			}

			data = {
				characters: result.characters,
				total: result.total,
				pagination: result.pagination,
				filters: result.filters,
				query,
				loading: false
			};
		} catch (error) {
			if (sequence !== requestSequence) {
				return;
			}

			data = {
				characters: [],
				total: 0,
				query,
				loading: false,
				error: error instanceof Error ? error.message : 'No se pudo cargar la API de Rick and Morty.'
			};
		}
	}

	$: currentQuery = readQuery($page.url);
	$: if (browser) {
		void syncCharacters(currentQuery);
	}

	function updateQuery(value: string) {
		const trimmed = value.trim();
		const params = new URLSearchParams();

		if (trimmed) {
			params.set('q', trimmed);
		}

		const target = params.toString() ? `?${params.toString()}` : $page.url.pathname;
		goto(target, { replaceState: true, noScroll: true });
	}
</script>

<CharacterBrowser data={data} onQueryChange={updateQuery} />
