
import { getScore } from '@/api/score'  // 导入分数信息相关接口

const score = {
  state: {
    addScoreDialog: {
      title:'新增分数信息',
      type:'add'
    },
    scoreSearch: {
      startTime:'',
      endTime:'',
      name:'',
      week:''
    },
    batchDelBtnDisabled: true
  },
  getters:{
    addScoreDialog: state => state.addScoreDialog,
    scoreSearch: state => state.scoreSearch,
    batchDelBtnDisabled: state => state.batchDelBtnDisabled,
  },
  mutations: {
    SET_DIALOG_TITLE: (state, type) => {
      if(type === 'add'){
        state.addScoreDialog.title = '新增分数信息'
        state.addScoreDialog.type = 'add'
      }else{
        state.addScoreDialog.title = '编辑分数信息'
        state.addScoreDialog.type = 'edit'
      }
    },
    SET_SEARCH : (state, payload) => {
      state.scoreSearch = payload;
    },
    SET_SEARCHBTN_DISABLED : (state, payload) => {
      state.batchDelBtnDisabled = payload;
    }
  },
  actions: {
    // 获取用户列表
    GetScore({commit},reqData) {
      return new Promise(resolve => {
        getScore(reqData).then(response => {
          const data = response.data
          resolve(data)
        })
      })
    }
  }
}

export default score
