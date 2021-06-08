<script>
	import { auth } from '$lib/stores/auth';

	import supabase from '$lib/supabase';

	async function signIn() {
		await supabase.auth.signIn({ provider: 'github' });
	}

</script>

<div class="p-5">
	<div>
		<h1 class="font-bold">Courses</h1>
		<a href="/courses/algebra">Algebra 1</a>
	</div>
	{#if !$auth}
		<button on:click={signIn}>Sign in with GitHub</button>
	{:else}
		Hello, {$auth.user.email}!
		<button on:click={() => supabase.auth.signOut()}>Sign Out</button>
	{/if}
	<button on:click={() => console.log($auth)}>see auth</button>
</div>
