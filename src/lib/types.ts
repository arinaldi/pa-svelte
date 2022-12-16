import type { MODAL_TYPES } from '$lib/constants';
import type { Database } from '$lib/db-types';

export type Album = Database['public']['Tables']['albums']['Row'];
export type Release = Database['public']['Tables']['releases']['Row'];
export type Song = Database['public']['Tables']['songs']['Row'];

export type AlbumInput = Omit<Album, 'id' | 'created_at'>;

export interface ModalType {
  data: Release | Song | null;
  type: MODAL_TYPES | null;
}
