<script lang="ts" context="module">
	import supabase from '$lib/supabase';
	import { arrayToTree } from 'performant-array-to-tree';

	export const load = async ({ page, fetch, session, context }) => {
		const { data, error } = await supabase
			.from('topics_tree')
			.select('*')
			.like('path', `${page.params.slug}%`);
		// .gte('path', page.params.path);

		const topics = arrayToTree(data, {
			parentId: 'parent_id',
			childrenField: 'topics',
			dataField: null,
			rootParentIds: {
				[data[0].parent_id]: true
			}
		});
		console.log(topics);

		if (data) {
			return {
				props: {
					course: topics[0]
				}
			};
		}
	};

</script>

<script>
	export let course;
	console.log(course);

</script>

<div class="flex flex-col flex-grow">
	<div class="bg-indigo-800 px-4">
		<div class="py-10 max-w-6xl mx-auto">
			<div class="font-medium text-indigo-300">Editing</div>

			<h1 class="text-white text-4xl font-extrabold">{course.title}</h1>
		</div>
	</div>
</div>

<div class="py-20 max-w-6xl w-full mx-auto">
	<ul class="space-y-4">
		{#each course.topics as { title, topics, path }}
			<li class="p-5 bg-white border rounded space-y-4">
				<div class="flex items-center">
					<div class="rounded-full bg-indigo-400 w-7 h-7 mr-3" />
					<div class="font-medium text-gray-700">
						<a href="/courses/{path}">{title}</a>
					</div>
				</div>

				<hr />

				<ul class="space-y-4">
					{#each topics as { title, path }}
						<li class="text-sm text-gray-600"><a href="/courses/{path}">{title}</a></li>
					{/each}
				</ul>
				<button
					class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>Add new lesson
				</button>
			</li>
		{/each}
	</ul>
	<button
		class="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>Add new unit
	</button>
</div>
