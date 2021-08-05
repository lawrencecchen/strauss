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
	import Lesson from '$lib/CourseEditor/Lesson.svelte';
	import { v4 as uuidv4 } from 'uuid';

	function addUnit() {
		course.topics = [
			...course.topics,
			{
				id: uuidv4(),
				item_id: null,
				parent_id: course.id,
				slug: '',
				title: 'Untitled Unit',
				topics: []
			}
		];
	}

	// function addLesson(parentId) {
	//   const unitIndex =
	//   // const target = course.topics.
	// }
</script>

<div class="flex flex-col flex-grow">
	<div class="bg-indigo-800 px-4">
		<div class="py-2 max-w-6xl mx-auto">
			<div class="font-medium text-sm text-indigo-300">Editing</div>

			<h1 class="text-white text-lg font-semibold">{course.title}</h1>
		</div>
	</div>
</div>

<div class="bg-gray-50 px-4">
	<div class="py-10 max-w-6xl w-full mx-auto space-y-6">
		<div class="md:col-span-1">
			<div class="">
				<h3 class="text-lg font-medium leading-6 text-gray-900">Course Editor</h3>
				<p class="mt-1 text-sm text-gray-600">Organize your course into units and lessons.</p>
			</div>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<ul class="space-y-4 ">
				{#each course.topics as { title, topics, id }}
					<Lesson {title} {topics} {id} />
				{/each}
			</ul>
			<button
				class="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				on:click={addUnit}
			>
				Add new unit
			</button>
		</div>
	</div>
</div>
