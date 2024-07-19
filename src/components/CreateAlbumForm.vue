<template>
  <q-form @submit="onSubmit" class="column q-gutter-y-md q-mt-sm">
    <span class="text-h6 text-weight-medium">Создание альбома</span>
    <q-input
      filled
      v-model="form.date"
      mask="date"
      lazy-rules
      :rules="['date']"
      emit-immediately
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="form.date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      v-model="form.name"
      label="Название альбома"
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { createAlbum } = useStore();
const route = useRoute();

const form = ref<{
  date: string;
  name: string;
}>({
  date: '',
  name: '',
});

const authorId = route.params.authorId as string;

const onSubmit = () => {
  createAlbum({
    authorId,
    ...form.value,
  });
  form.value = {
    date: '',
    name: '',
  };
};
</script>
