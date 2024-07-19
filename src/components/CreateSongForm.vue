<template>
  <q-form @submit="onSubmit" class="column q-gutter-md q-mt-sm">
    <span class="text-h6 text-weight-medium">Создание песни</span>
    <q-input
      v-model="form.name"
      label="Название песни"
      filled
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Поле не может быть пустым']"
    />
    <q-select
      filled
      v-model="form.albums"
      :options="props.albums"
      option-value="id"
      option-label="name"
      label="Альбомы"
      multiple
      emit-value
      map-options
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Поле не может быть пустым']"
    >
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label>{{ opt.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <div>
      <q-btn label="Создать" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Album, useStore } from 'src/stores/store';

const { createSong } = useStore();
const props = defineProps<{
  albums: Album[];
}>();

const form = ref<{
  name: string;
  albums: Album['id'][];
}>({
  name: '',
  albums: [],
});

const onSubmit = () => {
  createSong({
    albumIds: form.value.albums,
    ...form.value,
  });

  form.value = {
    name: '',
    albums: [],
  };
};
</script>
