import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
api.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        // 处理未授权错误
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return Promise.reject(error)
})

export default {
    // 用户注册
    register(user) {
        return api.post('/register', {
            username: user.username,
            email: user.email,
            password: user.password
        })
    },

    // 用户登录
    login(identifier, password) {
        return api.post('/login', {
            identifier,
            password
        })
    },

    // 获取用户资料
    getProfile() {
        return api.get('/profile')
    },

    // 更新密码
    updatePassword(oldPassword, newPassword) {
        return api.put('/password', {
            old_password: oldPassword,
            new_password: newPassword
        })
    },

    // 刷新Token
    refreshToken(token) {
        return api.post('/refresh-token', { token })
    },

    // 用户登出
    logout() {
        return api.post('/logout')
    }
}