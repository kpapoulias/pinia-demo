<template>
  <main>
    
    <!--heading-->
    <header>
      <img src="./assets/Pinialogo.svg" alt="Pinia logo">
      <h1>Pinia Tasks</h1>
    </header>


    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorites</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>All tasks: ( {{ totalCount }} )</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>Favorite tasks: ( {{ favCount }} )</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="filter">
      <button @click="taskStore.$reset()">Reset state</button>
    </div>

  </main>
</template>

<script>
import { useTaskStore } from './stores/TaskStore'
import TaskDetails from '@/components/TaskDetails.vue'
import TaskForm from "@/components/TaskForm.vue";
import {ref} from "vue";
import {storeToRefs} from "pinia";

export default {
  components: {TaskForm, TaskDetails },
  setup () {
    const taskStore = useTaskStore()

    const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)

    // fetch data
    taskStore.getTasks()

    const filter = ref('all')

    return { taskStore, filter, tasks, isLoading, favs, totalCount, favCount}
  }
}
</script>