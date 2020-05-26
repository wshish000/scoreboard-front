const analysis = {
  state: {
    analysisSearch: {
      week:''
    },
  },
  getters:{
    analysisSearch: state => state.analysisSearch,
  },
  mutations: {
    SET_ANALYSIS_SEARCH : (state, payload) => {
      state.analysisSearch = payload;
    },
  },
  actions: {
  }
}

export default analysis
