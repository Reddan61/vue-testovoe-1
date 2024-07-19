<template>
  <q-form @submit="onSubmit" class="column q-gutter-y-sm">
    <span class="text-h6 text-weight-medium">Создание автора</span>
    <q-input
      v-model="authorname"
      label="Имя автора"
      filled
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Поле не может быть пустым']"
    />
    <div>
      <q-btn label="Создать" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useStore } from 'src/stores/store';

const { createAuthor } = useStore();
const authorname = defineModel<string>();

const onSubmit = () => {
  if (!authorname.value) return;

  createAuthor({
    name: authorname.value,
  });

  authorname.value = '';
};
</script>
