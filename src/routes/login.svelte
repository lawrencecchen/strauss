<script lang="ts">
	import supabase from '$lib/supabase';
	let email = '';
	async function submit() {
		const { data, error } = await supabase.auth.signIn({ email });
		if (error) {
			return console.log(error);
		}
		console.log(data);
	}
</script>

<form on:submit|preventDefault={submit}>
	<input type="text" placeholder="email" bind:value={email} />
	<button>Sign in</button>
</form>
