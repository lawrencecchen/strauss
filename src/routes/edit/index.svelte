<script>
	import supabase from '$lib/supabase';

	let title = '';
	let slug = '';

	async function submit() {
		await supabase.from('topics').insert([
			{
				title,
				slug
			}
		]);
	}

	const course = {};

</script>

<div class="p-5">
	<h1>Create your course</h1>
	<form on:submit|preventDefault={submit}>
		<div>
			<label>
				Course title:
				<input type="text" bind:value={title} />
			</label>
		</div>

		<div>
			<label>
				URL Slug:
				<input type="text" bind:value={slug} />
			</label>
		</div>

		<button type="submit">Submit</button>
	</form>
</div>
