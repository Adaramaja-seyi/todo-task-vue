<template>
  <div class="container mt-5">
    <h2 class="mb-4">Tasks</h2>
    <b-card class="mb-4 shadow-sm">
      <b-form @submit.prevent="addTask">
        <b-form-group label="Task Title" label-for="task-title" class="mb-3">
          <b-form-input id="task-title" v-model="newTask.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Task Description" label-for="task-description" class="mb-3">
          <b-form-textarea id="task-description" v-model="newTask.description"></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">Add Task</b-button>
      </b-form>
    </b-card>
    <b-list-group>
      <b-list-group-item
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="d-flex justify-content-between align-items-center shadow-sm mb-2"
      >
        <div>
          <h5>{{ task.title }}</h5>
          <p>{{ task.description || 'No description' }}</p>
          <small>Status: {{ task.status }} | Created: {{ new Date(task.createdAt).toLocaleString() }}</small>
        </div>
        <div>
          <b-button
            v-if="task.status === 'pending'"
            variant="success"
            class="me-2"
            @click="taskStore.completeTask(task.id)"
          >
            Complete
          </b-button>
          <b-button variant="danger" @click="taskStore.deleteTask(task.id)">Delete</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/tasks';

export default {
  name: 'Tasks',
  setup() {
    const taskStore = useTaskStore();
    return { taskStore };
  },
  data() {
    return {
      newTask: {
        title: '',
        description: '',
      },
    };
  },
  methods: {
    addTask() {
      if (this.newTask.title) {
        this.taskStore.addTask(this.newTask.title, this.newTask.description);
        this.newTask = { title: '', description: '' };
      }
    },
  },
  mounted() {
    this.taskStore.loadTasks();
  },
};
</script>