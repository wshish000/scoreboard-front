import request from '@/utils/axios'

//登录
export function login(params) {
  return request({
    url: '/api/tokens',
    method: 'post',
    auth:params

  })
}

//登出
export function logout(params) {
  return request({
    url: '/auth/logout',
    method: 'get',
  })
}

//获取登录用户的信息
export function getUserInfo(params) {
  return request({
    url: '/api/info/getInfo',
    method: 'get',
  })
}
