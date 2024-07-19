import { defineStore } from 'pinia';
import { uid } from 'quasar';

export interface Song {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
  date: string;
  songs: Song['id'][];
}

export interface Author {
  id: string;
  name: string;
  albums: Album['id'][];
}

interface Store {
  authors: Author[];
  albums: Album[];
  songs: Song[];
}

interface CreateAuthorPayload {
  name: string;
}

interface CreateAlbumPayload {
  authorId: Author['id'];
  name: string;
  date: string;
}

interface CreateSongPayload {
  albumIds: Album['id'][];
  name: string;
}

const LOCAL_STORAGE_KEY = 'store';

const getFromLocalStorage = (): Store => {
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!local)
    return {
      authors: [],
      albums: [],
      songs: [],
    };

  return JSON.parse(local) as Store;
};

const saveToLocalStorage = (store: Store) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
};

export const useStore = defineStore('store', {
  state: (): Store => {
    return getFromLocalStorage();
  },
  getters: {
    getAuthorById(state) {
      return (authorId: Author['id']) => {
        const author = state.authors.find(({ id }) => {
          return id === authorId;
        });

        return author ?? null;
      };
    },
    getAlbumsByAuthorId(state) {
      return (authorId: Author['id']) => {
        const author = state.authors.find(({ id }) => {
          return id === authorId;
        });

        if (!author) return [];

        const albumsIds = author.albums;

        const albums = state.albums.filter(({ id }) => {
          return albumsIds.includes(id);
        });

        return albums;
      };
    },
    getSongsByAlbumId(state) {
      return (albumId: Album['id']) => {
        const album = state.albums.find(({ id }) => {
          return id === albumId;
        });

        if (!album) return [];

        const songIds = album.songs;

        const songs = state.songs.filter(({ id }) => {
          return songIds.includes(id);
        });

        return songs;
      };
    },
  },
  actions: {
    createAuthor({ name }: CreateAuthorPayload) {
      const newAuthor: Author = {
        name,
        id: uid(),
        albums: [],
      };

      this.authors.push(newAuthor);

      saveToLocalStorage(this.$state);
    },
    createAlbum({ authorId, date, name }: CreateAlbumPayload) {
      const newAlbum: Album = {
        id: uid(),
        date,
        name,
        songs: [],
      };

      const authorIndex = this.authors.findIndex(({ id }) => {
        return id === authorId;
      });

      this.authors[authorIndex].albums.push(newAlbum.id);
      this.albums.push(newAlbum);
      saveToLocalStorage(this.$state);
    },
    createSong({ albumIds, name }: CreateSongPayload) {
      const newSong: Song = {
        id: uid(),
        name,
      };

      for (let i = 0; i < this.albums.length; i++) {
        if (albumIds.includes(this.albums[i].id)) {
          this.albums[i].songs.push(newSong.id);
        }
      }

      this.songs.push(newSong);
      saveToLocalStorage(this.$state);
    },
  },
});
