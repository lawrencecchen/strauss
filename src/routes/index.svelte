<script>
	import { auth } from '$lib/stores/auth';
	import supabase from '$lib/supabase';
</script>

<div class="p-5">
	<div>
		<h1 class="font-bold">Courses</h1>
		<a href="/courses/algebra">Algebra 1</a>
	</div>

	{#if !$auth}
		<a href="/login">Sign in</a>
	{:else}
		Hello, {$auth.user.email}!
		<button on:click={() => supabase.auth.signOut()}>Sign Out</button>
	{/if}
</div>
