<template>
  <main class="container mx-auto px-4">
    <header>
      <img src="./assets/Pinialogo.svg" alt="Pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <nav class="filter">
      <button
          v-for="option in filterOptions"
          :key="option.value"
          @click="currentFilter = option.value"
          :class="{ active: currentFilter === option.value }"
      >
        {{ option.label }}
      </button>
    </nav>

    <ErrorMessage
        v-if="taskStore.error"
        :message="taskStore.error"
        @dismiss="taskStore.error = null"
    />

    <LoadingSpinner v-if="isLoading" />

    <TaskForm v-if="!isLoading" />

    <!-- Single task list container -->
    <div class="task-list" v-if="!isLoading">
      <p>{{ currentFilter === 'all' ? 'All' : 'Favorite' }} tasks: ({{ currentCount }})</p>
      <TransitionGroup
          name="task-list"
          tag="div"
          class="task-container"
      >
        <TaskDetails
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
        />
      </TransitionGroup>
      <button
          @click="confirmReset"
          class="reset-button"
      >
        Reset state
      </button>
    </div>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from './stores/TaskStore'
import { storeToRefs } from 'pinia'
import TaskDetails from '@/components/TaskDetails.vue'
import TaskForm from '@/components/TaskForm.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const taskStore = useTaskStore()
const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)

const selectedTasks = ref(new Set())


const currentFilter = ref('all')
const filterOptions = [
  { value: 'all', label: 'All tasks' },
  { value: 'favs', label: 'Favorites' }
]

// const filteredTasks = computed(() =>
//     currentFilter.value === 'all' ? taskStore.sortedTasks : favs.value
// )

const filteredTasks = computed(() =>
    taskStore.sortedTasks.filter(task => currentFilter.value === 'all' || task.isFav)
)

const currentCount = computed(() =>
    currentFilter.value === 'all' ? totalCount.value : favCount.value
)

const confirmReset = () => {
  if (confirm('Are you sure you want to reset all tasks?')) {
    for (const task of tasks.value) {
      taskStore.deleteTask(task.id)
    }
    taskStore.$reset()
  }
}

// Fetch tasks when component is mounted
taskStore.getTasks()
</script>

<style scoped>
.task-container {
  position: relative;
  padding: 0;
}

.task-list-move,
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.task-list-leave-active {
  position: absolute;
  width: 100%;
}

.reset-button {
  background-color: #ff4757;
  color: black;
  border: 2px solid #555;
  border-radius: 4px;
  cursor: pointer;
  margin: 15px 0;
  padding: 4px 8px;
  font-size: 0.9em;
  font-weight: 500;
}

.active {
  background-color: #ffcc00;
  font-weight: bold;
}

.filter {
  width: 640px;
  margin: 20px auto;
  text-align: center;
}

.filter button {
  display: inline-block;
  margin: 0 5px;
  padding: 4px 8px;
  font-size: 0.8em;
  background: #ffd654;
  border: 2px solid #555;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.filter button:hover {
  background-color: #ffcc00;
}
</style>