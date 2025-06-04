import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LandingPage from '../views/LandingPage.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Dashboard from '../views/Dashboard.vue';
import Tasks from '../views/Tasks.vue';
import History from '../views/History.vue';

const routes = [
  { path: '/', redirect: '/landing' },
  { path: '/landing', name: 'landing', component: LandingPage },
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
  { path: '/:pathMatch(.*)*', redirect: '/landing' }, // Catch-all
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.loadCurrentUser();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', replace: true });
  } else if ((to.name === 'login' || to.name === 'signup' || to.name === 'landing') && authStore.isAuthenticated) {
    next({ name: 'dashboard', replace: true });
  } else {
    next();
  }
});
export default router;