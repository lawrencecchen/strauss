import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://usnjtgmjhpcdncxfbvtk.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
