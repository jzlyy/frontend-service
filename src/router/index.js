import { createRouter, createWebHistory } from 'vue-router'
import LoginPanel from '../components/login/LoginPanel.vue'
import RegisterPanel from '../components/register/RegisterPanel.vue'
import Dashboard from '../components/common/Dashboard.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPanel },
    { path: '/register', component: RegisterPanel },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && token) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router