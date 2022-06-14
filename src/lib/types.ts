import type { JSONObject } from '@sveltejs/kit/types/private';

export interface Album extends JSONObject {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  year: string;
  cd: boolean;
  favorite: boolean;
  studio: boolean;
}

export interface Release extends JSONObject {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  date: string | null;
}

export interface Song extends JSONObject {
  id: number;
  created_at: string;
  artist: string;
  title: string;
  link: string;
}
