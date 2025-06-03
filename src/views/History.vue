
<template>
  <div class="container mt-5">
    <h2 class="mb-4">History</h2>
    <BCard class="mb-4 shadow-sm">
      <BFormGroup label="Filter by Date Range">
        <BRow>
          <BCol md="6">
            <BFormDatepicker
              v-model="startDate"
              placeholder="Start Date"
              class="mb-3"
            ></BFormDatepicker>
          </BCol>
          <BCol md="6">
            <BFormDatepicker
              v-model="endDate"
              placeholder="End Date"
              class="mb-3"
            ></BFormDatepicker>
          </BCol>
        </BRow>
      </BFormGroup>
    </BCard>
    <BListGroup>
      <BListGroupItem
        v-for="task in filteredTasks"
        :key="task.id"
        class="shadow-sm mb-2"
      >
        <h5>{{ task.title }}</h5>
        <p>{{ task.description || 'No description' }}</p>
        <small>Completed: {{ new Date(task.completedAt).toLocaleString() }}</small>
      </BListGroupItem>
      <BAlert v-if="!filteredTasks.length" show variant="info">
        No completed tasks found.
      </BAlert>
    </BListGroup>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/tasks'

export default {
  name: 'History',
  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
    }
  },
  computed: {
    completedTasks() {
      return this.taskStore.tasks.filter(t => t.status === 'completed')
    },
    filteredTasks() {
      if (!this.startDate || !this.endDate) return this.completedTasks
      const start = new Date(this.startDate).getTime()
      const end = new Date(this.endDate).getTime()
      return this.completedTasks.filter(task => {
        const completedAt = new Date(task.completedAt).getTime()
        return completedAt >= start && completedAt <= end
      })
    },
  },
  mounted() {
    this.taskStore.loadTasks()
  },
}
</script>