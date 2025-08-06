import { createRouter, createWebHistory } from 'vue-router'
import LoginPanel from '../components/LoginPanel.vue'
import RegisterPanel from '../components/RegisterPanel.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPanel },
    { path: '/register', component: RegisterPanel }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router