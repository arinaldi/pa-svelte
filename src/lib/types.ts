import type { MODAL_TYPES } from '$lib/constants';

export interface AlbumInput {
  artist: string;
  title: string;
  year: string;
  cd: boolean;
  favorite: boolean;
  studio: boolean;
}

export interface Album extends AlbumInput {
  id: number;
  created_at: string;
}

export interface Release {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  date: string | null;
}

export interface Song {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  link: string;
}

export interface ModalType {
  data: Release | Song | null;
  type: MODAL_TYPES | null;
}
