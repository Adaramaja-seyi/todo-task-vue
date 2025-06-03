import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: ref([]),
    }),

    actions: {
        loadTasks() {
            const authStore = useAuthStore();
            authStore.loadCurrentUser();
            if (!authStore.user) {
                this.tasks = [];
                return;
            }
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = users.find(u => u.email === authStore.user.email);
            this.tasks = currentUser?.tasks ? [...currentUser.tasks] : [];
        },

        addTask(title, description) {
            const authStore = useAuthStore();
            if (!authStore.user) return;
            const newTask = {
                id: Date.now(),
                title,
                description,
                status: 'pending',
                createdAt: new Date().toISOString(),
                completedAt: null,
            };
            this.tasks = [...this.tasks, newTask]; // Ensure reactivity
            this.updateUserTasks(authStore.user.email);
        },

        completeTask(taskId) {
            const taskIndex = this.tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = {
                    ...this.tasks[taskIndex],
                    status: 'completed',
                    completedAt: new Date().toISOString(),
                };
                const authStore = useAuthStore();
                this.updateUserTasks(authStore.user.email);
            }
        },

        deleteTask(taskId) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            const authStore = useAuthStore();
            this.updateUserTasks(authStore.user.email);
        },

        updateUserTasks(email) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email === email);
            if (userIndex !== -1) {
                users[userIndex].tasks = [...this.tasks];
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
            }
        },
    },

    getters: {
        totalTasks: (state) => state.tasks.length,
        completedTasks: (state) => state.tasks.filter(t => t.status === 'completed').length,
        pendingTasks: (state) => state.tasks.filter(t => t.status === 'pending').length,
    },
});