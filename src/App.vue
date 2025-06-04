
<template>
  <div>
    <b-navbar toggleable="lg" class="custom-navbar">
      <b-container>
        <b-navbar-brand to="/" class="navbar-brand-custom">
          <div class="brand-container">
            <div class="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="brand-text">TaskFlow</span>
          </div>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" class="navbar-toggle-custom">
          <span class="toggle-line"></span>
          <span class="toggle-line"></span>
          <span class="toggle-line"></span>
        </b-navbar-toggle>
        
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="isLandingPage && !authStore.isAuthenticated" class="navbar-nav-custom">
            <b-nav-item href="#features" class="nav-item-custom">
              <span class="nav-link-content">
                <span class="nav-text">Features</span>
              </span>
            </b-nav-item>
            <b-nav-item href="#how-it-works" class="nav-item-custom">
              <span class="nav-link-content">
                <span class="nav-text">How It Works</span>
              </span>
            </b-nav-item>
            <b-nav-item href="#contact-us" class="nav-item-custom">
              <span class="nav-link-content">
                <span class="nav-text">Contact Us</span>
              </span>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-if="authStore.isAuthenticated" class="navbar-nav-custom">
            <b-nav-item to="/dashboard" class="nav-item-custom">
              <span class="nav-link-content">
                <span class="nav-text">Dashboard</span>
              </span>
            </b-nav-item>
            <b-nav-item to="/tasks" class="nav-item-custom">
              <span class="nav-link-content">
                <span class="nav-text">Tasks</span>
              </span>
            </b-nav-item>
            <b-nav-item to="/history" class="nav-item-custom">
              <span class="nav-link-content">
                <span class="nav-text">History</span>
              </span>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="navbar-nav-right">
            <div v-if="authStore.isAuthenticated" class="user-section">
              <div class="user-info">
                <div class="user-avatar">
                  <span class="avatar-text">{{ authStore.user.username.charAt(0).toUpperCase() }}</span>
                  <div class="avatar-ring"></div>
                </div>
                <div class="user-details">
                  <span class="user-greeting">Welcome back,</span>
                  <span class="user-name">{{ authStore.user.username }}</span>
                </div>
              </div>
              <button class="logout-btn" @click="confirmLogout">
                <span class="btn-text">Logout</span>
                <svg
                  class="btn-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div v-if="isLandingPage && !authStore.isAuthenticated" class="auth-buttons">
              <b-button to="/login" variant="outline-light" class="me-2 login-btn">Login</b-button>
              <b-button to="/signup" variant="primary" class="signup-btn">Sign Up</b-button>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-modal
      v-model="showModal"
      title="Confirm Logout"
      header-bg-variant="dark"
      header-text-variant="white"
      centered
      size="sm"
    >
      <p>Are you sure you want to logout?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="showModal = false">Cancel</b-button>
        <b-button variant="danger" @click="confirmLogout">OK</b-button>
      </template>
    </b-modal>

    <div class="container content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const isLandingPage = computed(() => route.name === 'landing');

    return { authStore, router, isLandingPage };
  },
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    confirmLogout() {
      console.log('confirmLogout called');
      this.authStore.logout();
      console.log('After logout, isAuthenticated:', this.authStore.isAuthenticated);
      this.$router.push("/login").then(() => {
        console.log('Redirected to /login');
      }).catch(err => {
        console.error('Redirect error:', err);
        window.location.href = '/landing'; // Fallback
      });
    },
  },
  mounted() {
    if (this.$route.path !== '/landing') {
      this.authStore.loadCurrentUser();
    }
  },
};
</script>


<style scoped>
/* Unchanged from your original App.vue, with fixed typo */
.custom-navbar {
  background: linear-gradient(135deg, #0d1229 0%, #170c22 100%);
  backdrop-filter: blur(20px);
  border: none;
  padding: 1rem 0;
  position: relative;
  overflow: hidden;
}

.custom-navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(13, 6, 20, 0.9) 100%);
  backdrop-filter: blur(20px);
  z-index: -1;
}

.custom-navbar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

/* Brand Styling */
.navbar-brand-custom {
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-brand-custom:hover .brand-icon {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}

.navbar-brand-custom:hover .brand-text {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

/* Toggle Button */
.navbar-toggle-custom {
  border: none;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.toggle-line {
  width: 20px;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-toggle-custom:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Navigation Links */
.navbar-nav-custom {
  gap: 0.5rem;
  margin-left: 2rem;
}

.nav-item-custom {
  position: relative;
}

.nav-link-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-text {
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

.nav-item-custom .nav-link-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

.nav-item-custom:hover .nav-link-content::before,
.nav-item-custom.router-link-active .nav-link-content::before {
  opacity: 1;
}

.nav-item-custom:hover .nav-link-content {
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.nav-item-custom.router-link-active .nav-link-content {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
}

/* Right Side Navigation */
.navbar-nav-right {
  margin-left: auto;
  align-items: center;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  position: relative;
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  z-index: 2;
  position: relative;
}

.avatar-ring {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.user-avatar:hover .avatar-ring {
  opacity: 1;
  transform: scale(1.1);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.user-greeting {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.user-name {
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
  letter-spacing: 0.01em;
}

/* Logout Button */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.logout-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.logout-btn:hover::before {
  left: 100%;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.logout-btn:active {
  transform: translateY(0);
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-icon {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.logout-btn:hover .btn-icon {
  transform: translateX(2px);
}

/* Auth Buttons */
.auth-buttons {
  display: flex;
  gap: 0.5rem;
}

.login-btn, .signup-btn {
  border-radius: 12px;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn:hover, .signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Content Container */
.content-container {
  margin-top: 2rem;
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .navbar-nav-custom {
    margin-left: 0;
    margin-top: 1rem;
  }
  
  .user-section, .auth-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .user-info {
    justify-content: center;
  }
  
  .logout-btn {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .brand-text {
    font-size: 1.25rem;
  }
  
  .user-details {
    display: none;
  }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Focus states for accessibility */
.nav-item-custom a:focus,
.logout-btn:focus,
.navbar-brand-custom:focus,
.login-btn:focus,
.signup-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}
</style>