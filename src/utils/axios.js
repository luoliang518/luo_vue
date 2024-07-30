import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:500', // 设置基础URL
  timeout: 1000, // 请求超时时间
})


// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果 token 存在，则设置 Authorization 头
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      // 删除 Authorization 头（如果有的话）
      delete config.headers['Authorization'];
    }
    return config;
  },
  error => {
    ElMessage.error('请求发送失败');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.success) {
      ElMessage.success(res.message || '操作成功')
      return res
    } else {
      ElMessage.error(res.message || '请求错误')
      // return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    const message = error.response?.data?.message || '网络错误，请稍后再试'
    ElMessage.error(`请求错误：${message}`)
    // return Promise.reject(error)
  }
)

export default service
