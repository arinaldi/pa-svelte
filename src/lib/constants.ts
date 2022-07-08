export enum APP_MESSAGE_TYPES {
  ERROR = 'error',
  INFO = 'info',
}

export enum MESSAGES {
  ALBUM_PREFIX = 'Album successfully',
  SONG_PREFIX = 'Song successfully',
  RELEASE_PREFIX = 'Release successfully',
  SIGNIN = 'Invalid username or password',
  ERROR = 'Something went wrong',
  NO_DATA = 'No Data',
}

export enum MODAL_TYPES {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
}

export enum PAGE {
  FIRST = 'First page',
  LAST = 'Last page',
  NEXT = 'Next page',
  PREVIOUS = 'Previous page',
}

export enum PER_PAGE {
  SMALL = 25,
  MEDIUM = 50,
  LARGE = 100,
}

export enum ROUTE_HREF {
  TOP_ALBUMS = '/albums',
  FEATURED_SONGS = '/songs',
  NEW_RELEASES = '/releases',
  SIGNIN = '/signin',
}

export const ROUTES = [
  { href: ROUTE_HREF.TOP_ALBUMS, label: 'Top Albums' },
  { href: ROUTE_HREF.FEATURED_SONGS, label: 'Featured Songs' },
  { href: ROUTE_HREF.NEW_RELEASES, label: 'New Releases' },
];

export const ROUTES_ADMIN = {
  base: { href: '/admin', label: 'Admin' },
  create: { href: '/admin/create', label: 'Create Album' },
  edit: { href: '/admin/edit', label: 'Edit Album' },
  delete: { href: '/admin/delete', label: 'Delete Album' },
};

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
  NONE = '',
}

export const SPOTIFY_URL = 'https://open.spotify.com/search';
