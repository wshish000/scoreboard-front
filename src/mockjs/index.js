import Vue from 'vue'
import Mock from 'mockjs'
process.env.NODE_ENV === "development" ? Vue.use(Mock) : null;

import tableAPI from './money'
import salesAPI from './sales'
import userAPI from './user'
import infoAPI from './info'
import scoreAPI from './score'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})
// 资金相关
Mock.mock(/\/money\/get/, 'get', tableAPI.getMoneyList)
Mock.mock(/\/money\/remove/, 'get', tableAPI.deleteMoney)
Mock.mock(/\/money\/batchremove/, 'get', tableAPI.batchremoveMoney)
Mock.mock(/\/money\/add/, 'get', tableAPI.createMoney)
Mock.mock(/\/money\/edit/, 'get', tableAPI.updateMoney)

// Mock.mock(/\/info\/getList/, 'get', infoAPI.getMemberList)
// Mock.mock(/\/info\/remove/, 'get', infoAPI.deleteMember)
// Mock.mock(/\/info\/batchremove/, 'get', infoAPI.batchremoveMember)
// Mock.mock(/\/info\/add/, 'get', infoAPI.createMember)
// Mock.mock(/\/info\/edit/, 'get', infoAPI.updateMember)

// Mock.mock(/\/score\/getList/, 'get', scoreAPI.getScoreList)
// Mock.mock(/\/score\/remove/, 'get', scoreAPI.deleteScore)
// Mock.mock(/\/score\/batchremove/, 'get', scoreAPI.batchremoveScore)
// Mock.mock(/\/score\/add/, 'get', scoreAPI.createScore)
// Mock.mock(/\/score\/edit/, 'get', scoreAPI.updateScore)


// sales相关
Mock.mock(/\/sales\/get/, 'get', salesAPI.getSalesList)
// user相关
// Mock.mock(/\/user\/login/, 'get', userAPI.login)
// Mock.mock(/\/user\/logout/, 'get', userAPI.logout)
// Mock.mock(/\/user\/info\/get/, 'get', userAPI.getUserInfo)
// Mock.mock(/\/user\/list\/get/, 'get', userAPI.getUserList)

export default Mock;
