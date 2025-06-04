<!-- <template>
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
</script> -->

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="brand-section">
          <div class="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="brand-title">TaskFlow</h1>
          <p class="brand-subtitle">Welcome back! Please sign in to continue</p>
        </div>

        <div v-if="message" class="alert" :class="message.includes('successful') ? 'alert-success' : 'alert-danger'">
          {{ message }}
        </div>

        <b-form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email Address</label>
            <b-form-input 
              v-model="email" 
              type="email" 
              class="form-control" 
              placeholder="Enter your email" 
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <b-form-input 
              v-model="password" 
              type="password" 
              class="form-control" 
              placeholder="Enter your password" 
              required
            />
          </div>

          <b-button type="submit" class="btn-login">
            Log In
          </b-button>

          <div class="divider">
            <span>or</span>
          </div>

          <b-button variant="outline-light" class="btn-signup" @click="goToSignup">
            Create New Account
          </b-button>
        </b-form>

        <div class="footer-text">
          Secure login powered by TaskFlow
        </div>
      </div>
    </div>
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

<style scoped>
.login-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
  animation: backgroundMove 20s ease-in-out infinite;
}

@keyframes backgroundMove {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-20px, -10px) rotate(1deg); }
  50% { transform: translate(10px, -20px) rotate(-1deg); }
  75% { transform: translate(-10px, 10px) rotate(0.5deg); }
}

.login-container {
  position: relative;
  z-index: 10;
  max-width: 450px;
  width: 100%;
  margin: 2rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 12px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation: cardSlideIn 0.8s ease-out;
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.brand-section {
  text-align: center;
  margin-bottom: 2.5rem;
}

.brand-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.brand-icon svg {
  color: #667eea;
  width: 32px;
  height: 32px;
}

.brand-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.025em;
}

.brand-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

label {
  display: block;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.form-control {
  width: 100%;
  padding: 1rem 1.25rem !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 12px !important;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-control:focus {
  outline: none !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-1px);
}

.form-control::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.alert {
  padding: 1rem 1.25rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  border: none;
  animation: alertSlideIn 0.5s ease-out;
}

@keyframes alertSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-success {
  background: rgba(34, 197, 94, 0.9);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.alert-danger {
  background: rgba(239, 68, 68, 0.9);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-login {
  width: 100%;
  padding: 1rem 1.5rem !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 12px !important;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.btn-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-login:hover::before {
  left: 100%;
}

.btn-login:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5) !important;
}

.btn-signup {
  width: 100%;
  padding: 1rem 1.5rem !important;
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 12px !important;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-signup:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  transform: translateY(-1px);
  color: #ffffff !important;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.divider span {
  padding: 0 1rem;
  font-weight: 500;
}

.footer-text {
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 576px) {
  .login-container {
    margin: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  .brand-title {
    font-size: 1.75rem;
  }

  .brand-icon {
    width: 56px;
    height: 56px;
  }

  .brand-icon svg {
    width: 28px;
    height: 28px;
  }
}

/* Focus styles for accessibility */
.btn-login:focus,
.btn-signup:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5) !important;
  outline-offset: 2px;
}
</style>