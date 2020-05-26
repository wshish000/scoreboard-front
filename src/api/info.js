import request from '@/utils/axios'

//获取用户列表
export function getMember(params) {
  return request({
    // url: '/info/getList',
    url: '/api/info/getList',
    method: 'get',
    params: params
  })
}

//获取登录用户的具体信息
export function getPersonalInfo(){
  return request({
    url: '/api/info/getPersonalInfo',
    method: 'get',
  })

}

//添加用户
export function addMember(params) {
  return request({
    url: 'api/info/add',
    method: 'get',
    params: params
  })
}

//删除某用户
export function removeMember(params) {
  return request({
    url: '/api/info/remove',
    method: 'get',
    params: params
  })
}

//批量删除用户
export function batchremoveMember(params) {
  return request({
    url: '/api/info/batchremove',
    method: 'get',
    params: params
  })
}

//更新某用户
export function updateMember(params) {
  return request({
    url: '/api/info/edit',
    method: 'get',
    params: params
  })
}

//某用户重设自己密码
export function updatePassword(params) {
  return request({
    url: '/api/info/reset_password',
    method: 'get',
    params: params
  })
}

//管理员重置某用户密码
export function changePassword(params) {
  return request({
    url: '/api/info/changePassword',
    method: 'get',
    params: params
  })
}

//管理员改变某用户的角色
export function changeRole(params) {
  return request({
    url: '/api/info/changeRole',
    method: 'get',
    params: params
  })
}
