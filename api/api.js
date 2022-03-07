import  api from './request.js'
export default{
	getencode(data){
		return api.post('/pun/encode',data)
	},
	//获取token
	getToken(data){
		return api.post('/pun/getToken',data)
	},
	//创建钱包
	createWallet(data){
		return api.post('/pun/createWallet',data)
	},
	//获取钱包列表
	getWalletList(data){
		return api.post('/pun/walletList',data)
	},
	//获取钱包详情
	getWalletInfo(data){
		return api.post('/pun/walletInfo',data)
	},
	//设置默认钱包
	getSetWallet(data){
		return api.post('/pun/setWallet',data)
	},
	//修改钱包信息
	getWalletUp(data){
		return api.post('/pun/walletUp',data)
	},
	//删除钱包
	delWallet(data){
		return api.post('/pun/delWallet',data)
	},
	//获取助记词和私钥
	getWordsKey(data){
		return api.post('/pun/walletWordsPri',data)
	},
	//恢复钱包
	recoverWallet(data){
		return api.post('/pun/recoverWallet',data)
	},
	//钱包助记词备份成功提交
	walletWords(data){
		return api.post('/pun/walletWords',data)
	},
	//获取联系人
	adressBook(data){
		return api.post('/pun/adressBook',data)
	},
	//新建联系人
	adressBind(data){
		return api.post('/pun/adressBind',data)
	},
	//删除联系人
	delBook(data){
		return api.post('/pun/delBook',data)
	},
	//获取比例信息
	getRatio(data){
		return api.post('/pun/proportion',data)
	},
	//节点预售
	presaleNode(data){
		return api.post('/pun/presaleNode',data)
	},
	//new节点预售
	buyNode(data){
		return api.post('/pun/buyNode',data)
	},
	//领取节点挖矿
	nodeCharge(data){
		return api.post('/pun/nodeCharge',data)
	},
	//交易记录
	transferPunList(data){
		return api.post('/pun/transferPunList',data)
	},
	//交易记录
	bscWalletTransferList(data){
		return api.post('/pun/bscWalletTransferList',data)
	},
	//pun钱包转账手续费
	transferPunGas(data){
		return api.post('/pun/transferPunGas',data)
	},
	//bsc钱包转账手续费
	presaleEstimate(data){
		return api.post('/pun/presaleEstimate',data)
	},
	//pun钱包转账
	transferPun(data){
		return api.post('/pun/transferPun',data)
	},
	//BSC钱包转账
	bscWalletTransfer(data){
		return api.post('/pun/bscWalletTransfer',data)
	},
	//pun转账详情
	transferPunInfo(data){
		return api.post('/pun/transferPunInfo',data)
	},
	//共识计划 
	consensusPlan(data){
		return api.post('/pun/consensusPlan',data)
	},
	//获取版本信息
	appUpdate(data){
		return api.post('/pun/appUpdate',data)
	},
	//获取节点交易列表
	presaleNodeList(data){
		return api.post('/pun/presaleNodeList',data)
	},
	//BSC交易详情
	bscWalletTransferInfo(data){
		return api.post('/pun/bscWalletTransferInfo',data)
	},
	//个人中心---获取节点挖矿信息
	nodeInfo(data){
		return api.post('/pun/nodeInfo',data)
	},
	//节点列表&节点搜索
	pposlist(data){
		return api.post('/pun/pposlist',data)
	},
	//节点详情
	pposInfo(data){
		return api.post('/pun/pposinfo',data)
	},
	//节点参与委托
	pposEntrust(data){
		return api.post('/pun/pposEntrust',data)
	},
	//当前地址
	walletNode(data){
		return api.post('/pun/walletNode',data)
	},
	//ppos质押记录
	pledgeRecord(data){
		return api.post('/pun/pledgeRecord',data)
	},
	//ppos解压
	liftPledge(data){
		return api.post('/pun/liftPledge',data)
	},
	//ppos质押
	nodepledge(data){
		return api.post('/pun/nodepledge',data)
	},
	//ppos质押奖励
	rewardPledge(data){
		return api.post('/pun/pposPledge',data)
	},
	//ppos委托奖励
	rewardEntrust(data){
		return api.post('/pun/pposReceiveentrustment',data)
	},
	//ppos产币奖励
	rewardMonetary(data){
		return api.post('/pun/pposDividend',data)
	},
	//ppos质押奖励领取
	drawPledge(data){
		return api.post('/pun/outpposPledge',data)
	},
	//ppos委托奖励领取
	drawEntrust(data){
		return api.post('/pun/outpposReceiveentrustment',data)
	},
	//ppos产币奖励领取
	drawMonetary(data){
		return api.post('/pun/outpposDividend',data)
	},
	//ppos质押奖励领取记录
	recordPledge(data){
		return api.post('/pun/outpposPledgeRecord',data)
	},
	//ppos委托奖励领取记录
	recordEntrust(data){
		return api.post('/pun/outpposReceiveentrustmentRecord',data)
	},
	//ppos产币奖励领取记录
	recordMonetary(data){
		return api.post('/pun/outpposDividendRecord',data)
	},
	
	//我的委托
	userEntrust(data){
		return api.post('/pun/userReceiveentrustment',data)
	},
	//我的委托记录
	entrustRecord(data){
		return api.post('/pun/entrustRecord',data)
	},
	//委托解除
	liftEntrust(data){
		return api.post('/pun/liftEntrust',data)
	},
	//我的委托奖励领取
	userDrawEntrust(data){
		return api.post('/pun/outuserReceiveentrustment',data)
	},
	//我的委托奖励领取记录
	userRecordEntrustt(data){
		return api.post('/pun/outuserReceiveentrustmentRecord',data)
	},
	//pun映射
	redeem(data){
		return api.post('/pun/redeem',data)
	},
	//pun映射bsc钱包规则
	redeemRole(data){
		return api.post('/pun/redeemRole',data)
	},
	//获取当前默认钱包的PUN余额
	punBalance(data){
		return api.post('/pun/checkwalletBalance',data)
	},
	//薄饼交易
	pancake(data){
		return api.post('/pun/pancake',data)
	},
}