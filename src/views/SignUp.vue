<template>
  <div class="signup-container">
    <!-- Animated background -->
    <div class="bg-animation">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="floating-particles">
        <div class="particle" v-for="n in 8" :key="n" :style="{ '--delay': n * 0.5 + 's' }"></div>
      </div>
    </div>

    <!-- Main content -->
    <div class="signup-card">
      <div class="card-header">
        <div class="logo-container">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>
        <h1 class="signup-title">Create Account</h1>
        <p class="signup-subtitle">Join us and start your journey today</p>
      </div>

      <!-- Alert Message -->
      <transition name="slide-fade">
        <div v-if="message" class="alert-message" :class="message.includes('successful') ? 'alert-success' : 'alert-error'">
          <div class="alert-icon">
            <svg v-if="message.includes('successful')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <span>{{ message }}</span>
        </div>
      </transition>

      <!-- Form -->
      <form @submit.prevent="signup" class="signup-form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <div class="input-container">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-input"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <div class="input-container">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="Enter your email"
              required
              @blur="checkEmail"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <div class="input-container">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-input"
              placeholder="Create a strong password"
              required
            />
          </div>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            class="btn-primary"
            :disabled="isExistingUser"
            :class="{ 'btn-disabled': isExistingUser }"
          >
            <span class="btn-text">Create Account</span>
            <div class="btn-gradient"></div>
          </button>

          <transition name="fade">
            <button
              v-if="isExistingUser"
              type="button"
              class="btn-secondary"
              @click="goToLogin"
            >
              <span>Already have an account? Sign In</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </button>
          </transition>
        </div>
      </form>

      <div class="card-footer">
        <p>By signing up, you agree to our <a href="#" class="link">Terms of Service</a> and <a href="#" class="link">Privacy Policy</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'SignUp',
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

<style scoped>
* {
  box-sizing: border-box;
}

.signup-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

/* Animated Background */
.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: -100px;
  animation-delay: -10s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: -75px;
  left: 30%;
  animation-delay: -5s;
}

.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particle-float 15s infinite linear;
  animation-delay: var(--delay);
}

.particle:nth-child(1) { left: 10%; top: 20%; }
.particle:nth-child(2) { left: 20%; top: 80%; }
.particle:nth-child(3) { left: 60%; top: 40%; }
.particle:nth-child(4) { left: 80%; top: 10%; }
.particle:nth-child(5) { left: 70%; top: 70%; }
.particle:nth-child(6) { left: 30%; top: 60%; }
.particle:nth-child(7) { left: 90%; top: 90%; }
.particle:nth-child(8) { left: 40%; top: 30%; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes particle-float {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
  10%, 90% { opacity: 1; }
  50% { transform: translateY(-100px) translateX(50px); }
}

/* Main Card */
.signup-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-container {
  margin-bottom: 1.5rem;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  animation: pulse 2s infinite;
}

.logo-icon svg {
  width: 28px;
  height: 28px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.signup-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.signup-subtitle {
  color: #718096;
  margin: 0;
  font-size: 1rem;
}

/* Alert Messages */
.alert-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  animation: slideDown 0.3s ease-out;
}

.alert-success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(72, 187, 120, 0.3);
}

.alert-error {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(245, 101, 101, 0.3);
}

.alert-icon {
  flex-shrink: 0;
}

.alert-icon svg {
  width: 20px;
  height: 20px;
}

/* Form */
.signup-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #a0aec0;
  z-index: 2;
  transition: color 0.3s ease;
}

.input-icon svg {
  width: 20px;
  height: 20px;
}

.form-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.form-input:focus + .input-icon,
.input-container:focus-within .input-icon {
  color: #667eea;
}

.form-input::placeholder {
  color: #a0aec0;
}

/* Buttons */
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-primary {
  position: relative;
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
}

.btn-primary:active:not(.btn-disabled) {
  transform: translateY(0);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-gradient {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover:not(.btn-disabled) .btn-gradient {
  left: 100%;
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #667eea;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-1px);
}

.btn-secondary svg {
  width: 16px;
  height: 16px;
}

/* Footer */
.card-footer {
  text-align: center;
  font-size: 0.85rem;
  color: #718096;
  line-height: 1.5;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 480px) {
  .signup-container {
    padding: 1rem;
  }
  
  .signup-card {
    padding: 2rem;
  }
  
  .signup-title {
    font-size: 1.75rem;
  }
  
  .form-input {
    padding: 0.875rem 0.875rem 0.875rem 2.75rem;
  }
  
  .btn-primary {
    padding: 0.875rem 1.5rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .signup-card {
    background: rgba(26, 32, 44, 0.95);
    color: #e2e8f0;
  }
  
  .signup-title {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .form-label {
    color: #e2e8f0;
  }
  
  .form-input {
    background: rgba(45, 55, 72, 0.8);
    border-color: #4a5568;
    color: #e2e8f0;
  }
  
  .form-input:focus {
    background: rgba(45, 55, 72, 0.95);
  }
  
  .btn-secondary {
    background: rgba(45, 55, 72, 0.8);
    border-color: #4a5568;
    color: #90cdf4;
  }
  
  .btn-secondary:hover {
    border-color: #90cdf4;
    background: rgba(56, 178, 172, 0.1);
  }
}
</style>