
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    users: JSON.parse(localStorage.getItem('users')) || [],
  }),
  actions: {
    signup(username, email, password) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!username.trim()) {
        return { success: false, message: 'Username is required.' };
      }
      if (!email) {
        return { success: false, message: 'Email is required.' };
      }
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email format.' };
      }
      if (!password) {
        return { success: false, message: 'Password is required.' };
      }
      if (!passwordRegex.test(password)) {
        return { success: false, message: 'Password must be at least 8 characters, with one uppercase, one lowercase, one number, and one special character (@$!%*?&).' };
      }

      const existingUser = this.users.find(u => u.email === email);
      if (existingUser) {
        return { success: false, message: 'Account already exists. Please log in.' };
      }

      const newUser = {
        username,
        email,
        password,
        tasks: [],
      };

      this.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
      return { success: true, message: 'Sign-up successful! Redirecting to login...' };
    },

    login(email, password) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!email) {
        return { success: false, message: 'Email is required.' };
      }
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email format.' };
      }
      if (!password) {
        return { success: false, message: 'Password is required.' };
      }
      if (!passwordRegex.test(password)) {
        return { success: false, message: 'Invalid password format.' };
      }

      const user = this.users.find(u => u.email === email && u.password === password);
      if (user) {
        this.user = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, message: 'Login successful! Redirecting...' };
      }
      return { success: false, message: 'Incorrect email or password.' };
    },

    loadCurrentUser() {
      console.log('loadCurrentUser called');
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      } else {
        this.user = null;
      }
    },

    logout() {
      console.log('Before logout:', this.user, localStorage.getItem('currentUser'));
      this.user = null;
      localStorage.removeItem('currentUser');
      console.log('After logout:', this.user, localStorage.getItem('currentUser'));
      return { success: true, message: 'Logout successful!' };
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});