<script lang="ts" context="module">
	import supabase from '$lib/supabase';
	import { arrayToTree } from 'performant-array-to-tree';

	export const load = async ({ page, fetch, session, context }) => {
		const { data, error } = await supabase
			.from('topics_tree')
			.select('*')
			.like('path', `${page.params.course}/${page.params.unit}%`);
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
					subject: topics[0]
				}
			};
		}
	};

</script>

<script>
	console.log('hai');
	export let subject;
	console.log(subject);

</script>

<div class="flex flex-col flex-grow">
	<div class="bg-indigo-800 px-4">
		<div class="py-10 max-w-6xl mx-auto">
			<div class="font-medium text-indigo-300">Math</div>
			<h1 class="text-white text-4xl font-extrabold">{subject.title}</h1>
		</div>
	</div>

	<div class="bg-gray-50 flex-grow px-4">
		<ul class="space-y-4">
			{#each subject.topics as { title, slug }}
				<li class="p-5 bg-white border rounded space-y-4">
					{title}
				</li>
			{/each}
		</ul>
	</div>
</div>
