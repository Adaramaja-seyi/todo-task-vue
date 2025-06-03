<template>
  <div class="container mt-5">
    <h2>Sign Up</h2>
    <div v-if="message" class="alert" :class="message.includes('successful') ? 'alert-success' : 'alert-danger'">
      {{ message }}
    </div>
    <b-form @submit.prevent="signup">
      <b-form-group label="Username" class="mb-3">
        <b-form-input v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email" class="mb-3">
        <b-form-input v-model="email" type="email" required @blur="checkEmail"></b-form-input>
      </b-form-group>
      <b-form-group label="Password" class="mb-3">
        <b-form-input v-model="password" type="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="isExistingUser">Sign Up</b-button>
      <b-button variant="link" @click="goToLogin" v-if="isExistingUser">Go to Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'SignupView',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      message: '',
      isExistingUser: false,
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
    checkEmail() {
      if (!this.email) return;
      const existingUser = this.authStore.users.find(u => u.email === this.email);
      this.isExistingUser = !!existingUser;
      this.message = this.isExistingUser ? 'Account already exists. Please log in.' : '';
    },
    signup() {
      const result = this.authStore.signup(this.username, this.email, this.password);
      this.message = result.message;
      if (result.success) {
        setTimeout(() => {
          this.router.push('/login');
          this.message = '';
          this.username = '';
          this.email = '';
          this.password = '';
        }, 2000);
      }
    },
    goToLogin() {
      this.router.push('/login');
    },
  },
};
</script>