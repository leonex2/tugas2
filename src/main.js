import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import Todo from './components/Todo.vue'
import User from './components/User.vue'
import Home from './components/Home.vue'
import App from './App.vue'


const routes = [
    { path: '/todo', component: Todo},
    { path: '/user', component: User},
    { path: '/', component: Home}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)

app.mount('#app')
