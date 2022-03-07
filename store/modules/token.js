export default{
	state:{
		$token:null
	},
	mutations:{
		// initToken({state}){
		// 	let token=uni.getStorageSync('token');
		// 	if($token){
		// 		state.$token=token;
		// 	}
		// },
		saveToken(state,info){
			console.log(info)
			state.$token=info;
			uni.setStorageSync('token', info);
		}
	}
}