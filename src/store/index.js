import Vue from 'vue'
import Vuex from 'vuex'
if(process.env.NODE_ENV === "development"){
    Vue.use(Vuex)
}

import user from './modules/user'
import permission from './modules/permission'

import menu from './modules/menu'
import info from './modules/info'
import score from './modules/score'
import analysis from './modules/analysis'

export default new Vuex.Store({
    modules: {
        user,
        permission,
        analysis,
        menu,
        info,
        score
    }
});

