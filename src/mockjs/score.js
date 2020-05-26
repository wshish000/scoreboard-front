import Mock from 'mockjs'

import * as mUtils from '@/utils/mUtils'


let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    week: Mock.Random.integer(1,10),
    name: Mock.Random.cname(),
    situp: Mock.Random.integer(0,100),
    pullup: Mock.Random.integer(0,100),
    longrun: Mock.Random.integer(0, 100),
    longrun_min: Mock.Random.integer(0, 100),
    longrun_sec: Mock.Random.integer(0,100),
    retrace: Mock.Random.integer(0, 80),
    score: Mock.Random.integer(200, 300),
    remark: Mock.Random.cname()
  }))
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getScoreList: config => {
    const { week, name, page = 1, limit = 20 } = mUtils.param2Obj(config.url)
    let mockList = []
    if (week === '') {
      mockList = List.filter(score => {
        if (name && score.name.indexOf(name) === -1) return false
        return true
      })
    }
    if (name === ''){
      mockList = List.filter(score => {
        if (week && String(score.week).indexOf(week) === -1) return false
        return true
      })
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        scoreList: pageList
      }
    }
  },
  /**
   * 增加用户信息
   * @param number, name, job, age, height, weight , level
   * @return {{code: number, data: {message: string}}}
   */
  createScore: config => {
    const { week, name, situp, pullup, longrun , retrace } = mUtils.param2Obj(config.url)
    List.unshift({
      id: Mock.Random.guid(),
      week: week,
      name: name,
      situp: situp,
      pullup:pullup,
      longrun: longrun,
      retrace: retrace,
      score: 100
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteScore: config => {
    const { id } = mUtils.param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremoveScore: config => {
    console.log(config);
    let { ids } = mUtils.param2Obj(config.url)
    console.log(ids);
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateScore: config => {
    const { id, week, name, situp, pullup, longrun, longrun_min, longrun_sec, retrace } = mUtils.param2Obj(config.url)
    List.some(u => {
      if (u.id === id) {
        u.week = week
        u.name = name
        u.situp = situp
        u.pullup = pullup
        u.longrun = longrun
        u.longrun_sec = longrun_sec
        u.longrun_min = longrun_min
        u.retrace = retrace
        u.score = 100
        console.log("hahhahahahahah")
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}
