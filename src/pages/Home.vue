<template>
  <div>
    <create-author-form-vue />
    <q-list bordered separator class="q-mt-sm" v-if="authors.length">
      <q-item
        clickable
        v-ripple
        v-for="author in authors"
        :key="author.id"
        @click="redirect(author.id)"
      >
        <q-item-section>{{ author.name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Author, useStore } from '../stores/store';
import CreateAuthorFormVue from 'src/components/CreateAuthorForm.vue';

const { authors } = useStore();
const router = useRouter();

const redirect = (id: Author['id']) => {
  router.push({
    path: `/${id}`,
  });
};
</script>
