import request from '@/utils/axios'

//获取成绩列表
export function getScore(params) {
  return request({
    url: '/api/score/getList',
    method: 'get',
    params: params
  })
}

//获取登录用户个人数据
export function getPersonalData(){
  return request({
    url: '/api/score/getPersonalData',
    method: 'get'
  })
}

//获取最高分/最低分，以及各科目的最高分
export function getAnalysisScore() {
  return request({
    url: '/api/score/getAnalysis',
    method: 'get',
  })
}

//获取上周优秀/良好/及格/不及格人数，用于画饼状图
export function getLastWeek() {
  return request({
    url: '/api/score/getLastWeek',
    method: 'get',
  })
}

//获取上周个人成绩
export function getLastWeekScore() {
  return request({
    url: '/api/score/getLastWeekScore',
    method: 'get',
  })
}

//获取各周各科的成绩平均分，用于管理员画各科目的折线图
export function getSeveral() {
  return request({
    url: '/api/score/getSeveral',
    method: 'get',
  })
}

//获取每周的最高分与最低分，用于管理员画折线图
export function getMaxandMin() {
  return request({
    url: '/api/score/getMaxandMin',
    method: 'get',
  })
}

//获取每周的平均分数，用于管理员画折线图
export function getAverage() {
  return request({
    url: '/api/score/getAverage',
    method: 'get',
  })
}

//获取登录用户各周各科的成绩，用于登录用户画自己各科目的折线图
export function getCategoryScore(){
  return request({
    url: '/api/score/getCategoryScore',
    method: 'get'
  })
}

//获取登录用户各周的分数，用于画折线图
export function getPersonalScore() {
  return request({
    url: '/api/score/getPersonalScore',
    method: 'get',
  })
}

//手动添加用户成绩
export function addScore(params) {
  return request({
    url: '/api/score/add',
    method: 'get',
    params: params
  })
}

//删除某条成绩记录
export function removeScore(params) {
  return request({
    url: '/api/score/remove',
    method: 'get',
    params: params
  })
}

//批量删除成绩记录
export function batchremoveScore(params) {
  return request({
    url: '/api/score/batchremove',
    method: 'get',
    params: params
  })
}

//更新某条成绩记录
export function updateScore(params) {
  return request({
    url: '/api/score/edit',
    method: 'get',
    params: params
  })
}
