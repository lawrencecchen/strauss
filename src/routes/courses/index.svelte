<script>
	const topics = [
		{
			name: 'Algebra Foundation',
			topics: [
				{ name: 'Overview and history of algebra' },
				{ name: 'Introduction to variables' },
				{ name: 'Substitution and evaluating expressions' },
				{ name: 'Combining like terms' },
				{ name: 'Introduction to equivalent expressions' },
				{ name: 'Division by zero' }
			]
		},
		{
			name: 'Solving equations & inequalities',
			topics: [
				{ name: 'Overview and history of algebra' },
				{ name: 'Introduction to variables' },
				{ name: 'Substitution and evaluating expressions' },
				{ name: 'Combining like terms' },
				{ name: 'Introduction to equivalent expressions' },
				{ name: 'Division by zero' }
			]
		},
		{
			name: 'Working with units',
			topics: [
				{ name: 'Overview and history of algebra' },
				{ name: 'Introduction to variables' },
				{ name: 'Substitution and evaluating expressions' },
				{ name: 'Combining like terms' },
				{ name: 'Introduction to equivalent expressions' },
				{ name: 'Division by zero' }
			]
		},
		{
			name: 'Linear equations & graphs',
			topics: [
				{ name: 'Overview and history of algebra' },
				{ name: 'Introduction to variables' },
				{ name: 'Substitution and evaluating expressions' },
				{ name: 'Combining like terms' },
				{ name: 'Introduction to equivalent expressions' },
				{ name: 'Division by zero' }
			]
		},
		{
			name: 'Systems of equations',
			topics: [
				{ name: 'Overview and history of algebra' },
				{ name: 'Introduction to variables' },
				{ name: 'Substitution and evaluating expressions' },
				{ name: 'Combining like terms' },
				{ name: 'Introduction to equivalent expressions' },
				{ name: 'Division by zero' }
			]
		},
		{
			name: 'Inequalities (systems & graphs)',
			topics: [
				{ name: 'Overview and history of algebra' },
				{ name: 'Introduction to variables' },
				{ name: 'Substitution and evaluating expressions' },
				{ name: 'Combining like terms' },
				{ name: 'Introduction to equivalent expressions' },
				{ name: 'Division by zero' }
			]
		}
	];
</script>

<div class="flex flex-col flex-grow">
	<div class="bg-indigo-800 px-4">
		<div class="py-10 max-w-6xl mx-auto">
			<div class="font-medium text-indigo-300">Math</div>
			<h1 class="text-white text-4xl font-extrabold">Algebra 1</h1>
		</div>
	</div>

	<div class="bg-gray-50 flex-grow px-4">
		<div class="max-w-6xl mx-auto py-20 md:grid grid-cols-4 gap-4">
			<div class="col-span-1 md:max-w-[260px] w-full">
				<div class="text-sm text-gray-500 font-light">Mastery Points</div>
				<h2 class="py-2 border-b font-medium">Course Summary</h2>

				<ul class="space-y-3 py-3 text-sm text-gray-700">
					{#each topics as { name }}
						<li>{name}</li>
					{/each}
				</ul>
			</div>
			<div class="col-span-3">
				<ul class="space-y-4">
					{#each topics as { name, topics }}
						<li class="p-5 bg-white border rounded space-y-4">
							<div class="flex items-center">
								<div class="rounded-full bg-indigo-400 w-7 h-7 mr-3" />
								<div class="font-medium text-gray-700">
									{name}
								</div>
							</div>

							<hr />

							<ul class="column-2 space-y-4">
								{#each topics as { name }}
									<li class="text-sm text-gray-600">{name}</li>
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
