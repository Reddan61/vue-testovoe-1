<template>
  <div>
    <q-btn
      label="К альбомам"
      no-caps
      type="button"
      color="primary"
      @click="redirectToAlbums"
    />

    <q-list bordered separator class="q-mt-sm" v-if="songs.length">
      <q-item clickable v-ripple v-for="song in songs" :key="song.id">
        <q-item-section>{{ song.name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'src/stores/store';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { getSongsByAlbumId } = useStore();
const route = useRoute();
const router = useRouter();

const songs = computed(() => {
  const albumId = route.params.albumId as string;

  return getSongsByAlbumId(albumId);
});

const redirectToAlbums = () => {
  const authorId = route.params.authorId as string;

  router.push({
    path: `/${authorId}`,
  });
};
</script>
