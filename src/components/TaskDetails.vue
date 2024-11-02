<template>
  <div
      class="task"
      :class="{ 'task--favorite': task.isFav }"
  >
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <button
          class="icon-button"
          @click="handleDelete"
          title="Delete task"
      >
        <i class="material-icons">delete</i>
      </button>
      <button
          class="icon-button"
          @click="handleToggleFav"
          :title="task.isFav ? 'Remove from favorites' : 'Add to favorites'"
      >
        <i
            class="material-icons"
            :class="{ active: task.isFav }"
        >
          favorite
        </i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/TaskStore"

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (task) => {
      return ['id', 'title', 'isFav'].every(prop => prop in task)
    }
  }
})

const taskStore = useTaskStore()

const handleDelete = async () => {
  if (confirm(`Are you sure you want to delete "${props.task.title}"?`)) {
    await taskStore.deleteTask(props.task.id)
  }
}

const handleToggleFav = () => {
  taskStore.toggleFav(props.task.id)
}
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px;
  margin-top: 20px;
  background: #fee082;
  border-radius: 4px;
  box-shadow: 2px 4px 6px rgba(0,0,0,0.05);
  /* Add transition for background-color changes */
  transition: background-color 0.3s ease;
  /* Add transform-origin for better scaling animations */
  transform-origin: center center;
  /* Ensure the task maintains its space during animations */
  backface-visibility: hidden;
}

.task--favorite {
  border-left: 4px solid #ff005d;
  background-color: #fff0b3;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin: 0 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.icon-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.icon-button:focus {
  outline: 2px solid #16da76;
  outline-offset: 2px;
}
</style>