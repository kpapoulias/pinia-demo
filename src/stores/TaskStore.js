import { defineStore } from 'pinia';

// You can think of state as the data of the store,
// getters as the computed properties of the store,
// and actions as the methods.

const API_BASE_URL = 'http://localhost:3000/tasks'


export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false,
        error: null
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav);
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.isFav ? p + 1 : p
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        },
        sortedTasks: (state) =>
            [...state.tasks].sort((a, b) => a.title.localeCompare(b.title))

    },
    actions: {
        async getTasks() {
            this.isLoading = true
            this.isError = null

            try {
                const response = await fetch(API_BASE_URL)
                if (!response.ok) throw new Error('Failed to fetch tasks')

                const data = await response.json()
                this.tasks = data
            } catch (err) {
                this.error = err.message
                console.error('Error fetching tasks:', err)
            } finally {
                this.isLoading = false
            }
        },
        async addTask(task) {
            try {
                const response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...task, id: String(task.id) })
                })

                if (!response.ok) throw new Error('Failed to add task')

                const savedTask = await response.json()
                this.tasks.push(savedTask)
            } catch (err) {
                this.error = err.message
                console.error('Error adding task:', err)
            }
        },
        async deleteTask(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE'
                })

                if (!response.ok) throw new Error('Failed to delete task')

                this.tasks = this.tasks.filter(t => t.id !== id)
            } catch (err) {
                this.error = err.message
                console.error('Error deleting task:', err)
            }
        },
        async toggleFav(id) {
            try {
                const task = this.tasks.find(t => t.id === id)
                if (!task) throw new Error('Task not found')

                const updatedIsFav = !task.isFav

                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isFav: updatedIsFav })
                })

                if (!response.ok) throw new Error('Failed to update task')

                task.isFav = updatedIsFav
            } catch (err) {
                this.error = err.message
                console.error('Error updating task:', err)
            }
        },
    }
})