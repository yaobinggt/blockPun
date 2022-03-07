import Vue from 'vue'
import Vuex from 'vuex'

import token from '@/store/modules/token.js'
import wallet from '@/store/modules/wallet.js'


Vue.use(Vuex)


const store = new Vuex.Store({
    modules:{
		token,
		wallet
	}
})

export default store
