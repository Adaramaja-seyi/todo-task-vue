
<template>
  <div>
    <b-navbar toggleable="lg" class="custom-navbar">
      <b-container>
        <b-navbar-brand to="/dashboard" class="navbar-brand-custom">
          <div class="brand-container">
            <div class="brand-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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
          <b-navbar-nav v-if="authStore.user" class="navbar-nav-custom">
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
            <div v-if="authStore.user" class="user-section">
              <div class="user-info">
                <div class="user-avatar">
                  <span class="avatar-text">{{
                    authStore.user.username.charAt(0).toUpperCase()
                  }}</span>
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
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <div class="container content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

export default {
  name: "App",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore, router };
  },
  data() {
    return {
      showModal: false,
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
        window.location.href = '/login'; // Fallback
      });
    },
  },
  mounted() {
    if (this.$route.path !== '/login') {
      this.authStore.loadCurrentUser();
    }
  },
};
</script>

<style scoped>
.custom-navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
  transition: all 0.3s ease;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  color: #4f46e5;
  display: flex;
  align-items: center;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.navbar-nav-custom {
  margin-left: 2rem;
}

.nav-item-custom {
  margin: 0 0.5rem;
}

.nav-link-content {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 0.375rem;
}

.nav-item-custom:hover .nav-link-content {
  background: #f3f4f6;
  color: #4f46e5;
}

.router-link-active .nav-link-content {
  background: #eef2ff;
  color: #4f46e5;
}

.navbar-nav-right {
  margin-left: auto;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  position: relative;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.avatar-text {
  font-size: 1rem;
  font-weight: 600;
  color: #667eea;
}

.avatar-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-greeting {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.user-name {
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 600;
  margin-top: -2px;
}

/* Logout Button */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.logout-btn:active {
  transform: translateY(0);
}

.btn-text {
  font-size: 0.875rem;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.logout-btn:hover .btn-icon {
  transform: translateX(2px);
/* .navbar-toggle-custom {
  border: none;
  padding: 0.5rem; */
}

.toggle-line {
  display: block;
  width: 24px;
  height: 2px;
  margin: 4px 0;
  background: #4b5563;
  transition: all 0.3s ease;
}

@media (max-width: 991.98px) {
  .navbar-nav-custom {
    margin: 1rem 0;
  }

  .user-section {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 12px;
  }

  .user-info {
    justify-content: center;
  }
  .user-details {
    align-items: center;
  }

  .logout-btn {
    width: 100%;
    justify-content: center;
  }
}

.content-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
