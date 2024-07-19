<template>
  <div>
    <q-btn
      label="К авторам"
      no-caps
      type="button"
      color="primary"
      @click="redirectToAuthors"
    />

    <div class="row q-gutter-x-md">
      <create-album-form />
      <create-song-form :albums="albums" />
    </div>

    <q-list bordered separator class="q-mt-sm" v-if="albums.length">
      <q-item
        clickable
        v-ripple
        v-for="album in albums"
        :key="album.id"
        @click="redirectToSongs(album.id)"
      >
        <q-item-section>
          <q-item-label>{{ album.name }}</q-item-label>
          <q-item-label caption>{{ album.date }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Album, useStore } from 'src/stores/store';
import CreateAlbumForm from 'src/components/CreateAlbumForm.vue';
import CreateSongForm from 'src/components/CreateSongForm.vue';

const { getAlbumsByAuthorId, getAuthorById } = useStore();
const route = useRoute();
const router = useRouter();

const authorId = route.params.authorId as string;

const albums = computed(() => {
  return getAlbumsByAuthorId(authorId);
});

const redirectToSongs = (id: Album['id']) => {
  router.push({
    path: `/${authorId}/${id}`,
  });
};

const redirectToAuthors = () => {
  router.push({
    path: '/',
  });
};

onBeforeMount(() => {
  const author = getAuthorById(authorId);

  if (!author) {
    redirectToAuthors();
  }
});
</script>
