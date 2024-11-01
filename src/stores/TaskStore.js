import { defineStore } from 'pinia';

// You can think of state as the data of the store,
// getters as the computed properties of the store,
// and actions as the methods.

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false,
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
        }
    },
    actions: {
        async getTasks() {
            this.isLoading = true

            const res = await fetch('http://localhost:3000/tasks');
            const data = await res.json();

            this.tasks = data;
            this.isLoading = false
        },
        async addTask(task) {
            task.id = String(task.id);
            this.tasks.push(task);

            const  res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id;
            })

            const  res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id);

            task.isFav = !task.isFav;

            const  res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-Type': 'application/json'}
            })

            if (res.error) {
                console.log(res.error)
            }
        },
    }
})