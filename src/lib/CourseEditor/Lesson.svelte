<script>
	import { v4 as uuidv4 } from 'uuid';
	export let title;
	export let topics;
	export let id;

	function addLesson() {
		topics = [
			...topics,
			{
				id: uuidv4(),
				item_id: null,
				parent_id: id,
				slug: '',
				title: 'Untitled Lesson',
				topics: []
			}
		];
	}

</script>

<li class="bg-white border rounded">
	<div class="p-6 space-y-4">
		<div class="flex items-center">
			<input
				type="text"
				bind:value={title}
				class="font-medium text-gray-700 w-full p-0 border-none"
			/>
		</div>

		<!-- <hr /> -->

		<ul class="space-y-4">
			{#each topics as { title, topics, id }}
				<svelte:self {title} {topics} {id} />
				<!-- <li class="text-sm text-gray-600"><a href="/courses/{path}">{title}</a></li> -->
			{:else}
				<div class="text-sm text-red-600">There are no lessons. Add one below.</div>
			{/each}
		</ul>
	</div>
	<div class="rounded-b space-x-4 bg-gray-50 border-t flex items-center justify-start px-6 py-3">
		<button
			on:click={addLesson}
			class="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>Add new lesson
		</button>
		<button
			class="flex px-3 py-2 text-xs justify-center items-center transition border rounded-md text-gray-600  dark svelte-1fb58l0"
			type="submit">Save</button
		>
	</div>
</li>
