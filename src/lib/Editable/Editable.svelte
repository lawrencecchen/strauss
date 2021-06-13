<script>
	import { tick } from 'svelte';

	export let value;
	let editing = false;
	let inputEl;
	async function click() {
		editing = !editing;
		await tick();
		inputEl.focus();
	}

	let className;
	export { className as class };

</script>

<div>
	{#if !editing}
		<span on:click={click} class={className}>{value}</span>
	{:else}
		<input type="text" bind:this={inputEl} bind:value class="border-0 p-0 w-full {className}" />
	{/if}
</div>
