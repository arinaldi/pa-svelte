import { writable, type Writable } from 'svelte/store';
import type { Session } from '@supabase/supabase-js';

export const session: Writable<Session> = writable();
