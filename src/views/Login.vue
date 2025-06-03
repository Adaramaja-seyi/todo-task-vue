<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <div v-if="message" class="alert" :class="message.includes('successful') ? 'alert-success' : 'alert-danger'">
      {{ message }}
    </div>
    <b-form @submit.prevent="login">
      <b-form-group label="Email" class="mb-3">
        <b-form-input v-model="email" type="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password" class="mb-3">
        <b-form-input v-model="password" type="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
      <b-button variant="link" @click="goToSignup">Sign Up</b-button>
    </b-form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      message: '',
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore, router };
  },
  mounted() {
    this.authStore.loadCurrentUser();
    if (this.authStore.isAuthenticated) {
      this.router.push('/dashboard');
    }
  },
  methods: {
    login() {
      const result = this.authStore.login(this.email, this.password);
      this.message = result.message;
      if (result.success) {
        setTimeout(() => {
          this.router.push('/dashboard');
          this.message = '';
          this.email = '';
          this.password = '';
        }, 2000);
      }
    },
    goToSignup() {
      this.router.push('/signup');
    },
  },
};
</script>