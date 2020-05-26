import Mock from 'mockjs'

import * as mUtils from '@/utils/mUtils'


let List = []
const count = 60
let typelist = [1, 2, 3, 4, 5, 6, 7, 8]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    number: Mock.Random.cname(),
    name: Mock.Random.cname(),
    job: Mock.Random.cname(),
    age: Mock.Random.integer(0, 100),
    height: Mock.Random.integer(150, 200),
    weight: Mock.Random.integer(50, 100),
    'level|1': typelist
  }))
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getMemberList: config => {
    const { name, page = 1, limit = 20 } = mUtils.param2Obj(config.url)
    const mockList = List.filter(member => {
      if (name && member.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        memberList: pageList
      }
    }
  },
  /**
   * 增加用户信息
   * @param number, name, job, age, height, weight , level
   * @return {{code: number, data: {message: string}}}
   */
  createMember: config => {
    const { number, name, job, level, age , height, weight } = mUtils.param2Obj(config.url)
    List.unshift({
      id: Mock.Random.guid(),
      number: number,
      name: name,
      job: job,
      level:level,
      age: age,
      height: height,
      weight: weight
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
  deleteMember: config => {
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
  batchremoveMember: config => {
    console.log(config);
    // console.log(mUtils.param2Obj(config.url));
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
  updateMember: config => {
    const { id, number, name, job, level, age , height, weight } = mUtils.param2Obj(config.url)
    List.some(u => {
      if (u.id === id) {
        u.number = number
        u.name = name
        u.job = job
        u.level = level
        u.age = age
        u.height = height
        u.weight = weight
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
