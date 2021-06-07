<script lang="ts" context="module">
	import supabase from '$lib/supabase';
	import { arrayToTree } from 'performant-array-to-tree';

	export const load = async ({ page, fetch, session, context }) => {
		const { data, error } = await supabase
			.from('topics_tree')
			.select('*')
			.like('path', `${page.params.course}%`);
		// .gte('path', page.params.path);

		const topics = arrayToTree(data, {
			parentId: 'parent_id',
			childrenField: 'topics',
			dataField: null,
			rootParentIds: {
				[data[0].parent_id]: true
			}
		});
		console.log(data, topics);

		if (data) {
			return {
				props: {
					subject: topics[0]
				}
			};
		}

		// return {
		// 	status: res.status,
		// 	error: new Error(`Could not load ${url}`)
		// };
	};

</script>

<script>
	export let subject;

</script>

<div class="flex flex-col flex-grow">
	<div class="bg-indigo-800 px-4">
		<div class="py-10 max-w-6xl mx-auto">
			<div class="font-medium text-indigo-300">Math</div>
			<h1 class="text-white text-4xl font-extrabold">{subject.title}</h1>
		</div>
	</div>

	<div class="bg-gray-50 flex-grow px-4">
		<div class="max-w-6xl mx-auto py-20 lg:grid grid-cols-4 gap-4">
			<div class="col-span-1 lg:max-w-[260px] w-full">
				<div class="text-sm text-gray-500 font-light">Mastery Points</div>
				<h2 class="py-2 border-b font-medium">Course Summary</h2>

				<ul class="space-y-3 py-3 text-sm text-gray-700">
					{#each subject.topics as { title, path }}
						<li><a href="/courses/{path}">{title}</a></li>
					{/each}
				</ul>
			</div>
			<div class="col-span-3">
				<ul class="space-y-4">
					{#each subject.topics as { title, topics, path }}
						<li class="p-5 bg-white border rounded space-y-4">
							<div class="flex items-center">
								<div class="rounded-full bg-indigo-400 w-7 h-7 mr-3" />
								<div class="font-medium text-gray-700">
									<a href="/courses/{path}">{title}</a>
								</div>
							</div>

							<hr />

							<ul class="column-2 space-y-4">
								{#each topics as { title, path }}
									<li class="text-sm text-gray-600"><a href="/courses/{path}">{title}</a></li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.column-2 {
		columns: 2;
	}

</style>
