import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Dashboard from '../views/Dashboard.vue';
import Tasks from '../views/Tasks.vue';
import History from '../views/History.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: SignUp },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
    meta: { requiresAuth: true },
  },
  {
    path: '/history',
    name: 'history',
    component: History,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }, // Catch-all
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login');
  } else if (to.path === '/login' && authStore.user) {
    next('/dashboard');
  } else {
    next();
  }
});


export default router;