import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
let service =  axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: 'http://127.0.0.1:5000/',
  auth: {username: '', password: ''},
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  if (getToken('Token')) {
    config.auth.username = getToken('Token');
    config.auth.password = '';
    config.headers.Authorization = getToken('Token')
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
   /**
    * code:200,接口正常返回;
    */
    const res = response.data;
    console.log(res);
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
      if (res.code === 401 || res.code === 5002 || res.code === 5004) {
        console.log(res);
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            store.dispatch('LogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          })
      }
      return Promise.reject('error')
    } else { // res.code === 200,正常返回数据
        return response.data
    }
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    // return Promise.reject(error)

    if (error.response.status === 401) {
      console.log("wwwwwwwwwwwwwwwwwwwww");
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject('error')

  }
)

export default service