<template>
  <div 
    class="error-container" 
    role="alert"
    v-show="message"
  >
    <div class="error-content">
      <i class="material-icons error-icon">error_outline</i>
      <p class="error-text">{{ message }}</p>
    </div>
    <button 
      class="close-button" 
      @click="$emit('dismiss')"
      aria-label="Dismiss error message"
    >
      <i class="material-icons">close</i>
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})

defineEmits(['dismiss'])
</script>

<style scoped>
.error-container {
  max-width: 640px;
  margin: 20px auto;
  padding: 12px 16px;
  background: #ffe0e0;
  border: 1px solid #ff4757;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-icon {
  color: #ff4757;
}

.error-text {
  color: #333;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.close-button:focus {
  outline: 2px solid #ff4757;
  outline-offset: 2px;
}

.close-button i {
  font-size: 20px;
  color: #666;
}
</style>
