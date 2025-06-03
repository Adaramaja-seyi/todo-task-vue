<template>
  <div class="container mt-5">
    <h2 class="mb-4">Dashboard</h2>
    <b-row class="mb-4">
      <b-col md="4">
        <b-card class="text-center shadow-sm" body-class="bg-info text-white">
          <h4>Total Tasks</h4>
          <p class="display-6">{{ taskStore.totalTasks }}</p>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card class="text-center shadow-sm" body-class="bg-success text-white">
          <h4>Completed Tasks</h4>
          <p class="display-6">{{ taskStore.completedTasks }}</p>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card class="text-center shadow-sm" body-class="bg-warning text-dark">
          <h4>Pending Tasks</h4>
          <p class="display-6">{{ taskStore.pendingTasks }}</p>
        </b-card>
      </b-col>
    </b-row>
    <b-card title="Task Analytics" class="shadow-sm">
      <div style="height: 300px;">
        <Bar :key="chartKey" :data="chartData" :options="chartOptions" />
      </div>
    </b-card>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/tasks';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ref, watch } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'Dashboard',
  components: { Bar },
  setup() {
    const taskStore = useTaskStore();
    return { taskStore };
  },
  data() {
    return {
      chartKey: 0,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Tasks',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Task Status',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: ['Pending', 'Completed'],
        datasets: [
          {
            label: 'Tasks',
            data: [this.taskStore.pendingTasks, this.taskStore.completedTasks],
            backgroundColor: ['#007bff', '#28a745'],
            borderColor: ['#0056b3', '#1e7e34'],
            borderWidth: 1,
          },
        ],
      };
    },
  },
  mounted() {
    this.taskStore.loadTasks();
  },
  created() {
    watch(
      () => [this.taskStore.pendingTasks, this.taskStore.completedTasks],
      () => {
        this.chartKey += 1; // Force chart re-render
      },
      { deep: true }
    );
  },
  updated() {
    console.log('Dashboard updated with new task data');
  },
};
</script>