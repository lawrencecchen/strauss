import supabase from '$lib/supabase';
import { readable } from 'svelte/store';

export const auth = readable(null, (set) => {
	const session = supabase.auth.session();

	if (session) {
		set(session);
	}

	const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
		set(session);
	});

	return () => {
		authListener.unsubscribe();
	};
});
