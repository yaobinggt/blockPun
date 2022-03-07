export default {
	state:{
		walletList:[],
		defaultWallet:null
	},
	mutations:{
		saveWallet(state,info){
			console.log(info)
			state.walletList=info;
			uni.setStorage({
			   key: 'wallet_list',
			   data: info
			});
		},
		saveDefault(state,info){
			console.log(info);
			state.defaultWallet=info;
			uni.setStorage({
			   key: 'default_wallet',
			   data: info
			});
		}
	}
}