<template>
  <form @submit.prevent="handleSubmit" class="new-task-form">
    <div class="form-group">
      <label for="newTask" class="visually-hidden">New task</label>
      <input
          id="newTask"
          type="text"
          v-model="newTask"
          :disabled="isSubmitting"
          placeholder="I need to..."
          @keyup.esc="newTask = ''"
          ref="inputRef"
      >
      <button
          type="submit"
          class="form-button"
          :disabled="isSubmitting || !newTask.trim()"
      >
        {{ isSubmitting ? 'Adding...' : 'Add' }}
      </button>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from "@/stores/TaskStore"

const taskStore = useTaskStore()
const newTask = ref('')
const isSubmitting = ref(false)
const error = ref('')
const inputRef = ref(null)

onMounted(() => {
  inputRef.value?.focus()
})

const handleSubmit = async () => {
  const trimmedTask = newTask.value.trim()

  if (!trimmedTask) {
    error.value = 'Task cannot be empty'
    return
  }

  error.value = ''
  isSubmitting.value = true

  try {
    await taskStore.addTask({
      title: trimmedTask,
      isFav: false,
      id: crypto.randomUUID()
    })

    newTask.value = ''
    inputRef.value?.focus()
  } catch (err) {
    error.value = 'Failed to add task. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.new-task-form {
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  gap: 1rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.error-message {
  color: #ff4757;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

input:disabled,
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>