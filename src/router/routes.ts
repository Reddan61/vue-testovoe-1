import AlbumsVue from 'src/pages/Albums.vue';
import HomeVue from 'src/pages/Home.vue';
import SongsVue from 'src/pages/Songs.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeVue,
  },
  {
    path: '/:authorId',
    component: AlbumsVue,
  },
  {
    path: '/:authorId/:albumId',
    component: SongsVue,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/',
  },
];

export default routes;
