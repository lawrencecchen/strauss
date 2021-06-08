<script lang="ts">
	import Editor from '$lib/Editor/editor.svelte';

	// let sexpr = ['div', ['h1', 'Hello, world!'], ['p', 'What is up guys?']];
	// // let sexpr = ['p', 'What is up guys?'];

	// const fns = {
	// 	div: (...args) => `<div>${parser(...args)}</div>`,
	// 	h1: (...args) => `<h1>${parser(...args)}</h1>`,
	// 	p: (...args) => `<p>${parser(...args)}</p>`
	// };

	// function parser(lst) {
	// 	console.log(lst);
	// 	if (!Array.isArray(lst)) {
	// 		return lst;
	// 	}
	// 	if (lst.length < 2) {
	// 		return lst;
	// 	}
	// 	const [fName, ...args] = lst;

	// 	return fns[fName](...args.map(parser));
	// }

</script>

<Editor />
