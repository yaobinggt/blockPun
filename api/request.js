import store from '@/store/index.js';
export default{
	config:{
		baseURL:"https://app.xxx.network",
		//请求拦截器
		beforeRequest(options={}){
			return new Promise((resolve,reject)=>{
				options.url= this.baseURL + options.url
				options.method=options.method || 'POST'
				options.header={
					'Api-Version':'1.0.0',
					'Device-Type':'android',
					//'Token':store.state.token.$token
					// 'Token':store.state.token.$token || 'a63a0465b9dd87fb27b2d991506ab1f1ad66c8722a534775c857b1a649b890bc ',
					//'Token':'41c0fce3eb1c089760f8f1532c726bbc1f980b8d629692b5736f09a7547bd45b',
					'Token':uni.getStorageSync('token')
				}
				resolve(options)
			})
		},
		//响应拦截器
		handleResquest([error,res]){
			return new Promise((resolve,reject)=>{
				// //错误提示处理
				if(res.data.code == 0){
					let msg = res.data.msg || '请求失败'
					uni.showToast({
					    title: msg,
						icon:"none"
					});
					return;
				}
				console.log(res)
				resolve(res.data.data)
			})
		}
	},
	request(options={}){
		return this.config.beforeRequest(options).then(opt=>uni.request(opt)).then(this.config.handleResquest)
	},
	//POST请求
	post(url,data = {},options = {}){
		options.url = url;
		options.method = 'POST';
		
		// let commonData={
		// 	timestamp:parseInt(new Date()/1000).toString(),
		// };
		
		
		let copyData=Object.assign({},data)
		
		options.data = copyData
		return this.request(options)
	},
}