<template>
  <div class="loading-container" role="status">
    <div class="spinner"></div>
    <span class="loading-text">Loading tasks...</span>
  </div>
</template>

<script setup>
// No props or logic needed
</script>

<style scoped>
.loading-container {
  max-width: 640px;
  margin: 30px auto;
  padding: 20px;
  background: #ffe9a0;
  border-radius: 4px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #16da76;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #3a3a3a;
  font-size: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
