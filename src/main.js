import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import axios from './utils/axios'
const app = createApp(App)

// 将 axios 挂载到全局
app.config.globalProperties.$axios = axios

app.use(ElementPlus).use(store).use(router).mount('#app')
