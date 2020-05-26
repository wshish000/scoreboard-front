
import { getMember } from '@/api/info'  // 导入资金信息相关接口

const info = {
  state: {
    addMemberDialog: {
      title:'新增用户信息',
      type:'add'
    },
    search: {
      startTime:'',
      endTime:'',
      name:''
    },
    searchBtnDisabled: true
  },
  getters:{
    addMemberDialog: state => state.addMemberDialog,
    search: state => state.search,
    searchBtnDisabled: state => state.searchBtnDisabled,
  },
  mutations: {
    SET_DIALOG_TITLE: (state, type) => {
      if(type === 'add'){
        state.addMemberDialog.title = '新增用户信息'
        state.addMemberDialog.type = 'add'
      }else{
        state.addMemberDialog.title = '编辑用户信息'
        state.addMemberDialog.type = 'edit'
      }
    },
    SET_SEARCH : (state, payload) => {
      state.search = payload;
    },
    SET_SEARCHBTN_DISABLED : (state, payload) => {
      state.searchBtnDisabled = payload;
    }
  },
  actions: {
    // 获取用户列表
    GetMember({commit},reqData) {
      return new Promise(resolve => {
        getMember(reqData).then(response => {
          const data = response.data
          resolve(data)
        })
      })
    }


  }
}

export default info
