<template>
  <q-layout>
    <q-page-container>
      <q-page class="row justify-center q-pa-sm">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
});
</script>
