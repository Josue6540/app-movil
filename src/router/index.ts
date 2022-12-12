import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import axios from 'axios';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        name: "tab1",
        component: () => import('@/views/Tab1Page.vue'),
        meta: {
          requiredAuth: true,
        },
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('token');
  if (to.matched.some((rec) => rec.meta.requiredAuth)) {
    axios.defaults.headers['Authorization'] = `Bearer ${user}`;
    if (user) {
      next();
    } else {
      next({
        name: "login",
      });
    }
  } else {
    if (user) {
      next({
        name: "tab1",
      });
    }
    next();
  }
});

export default router
