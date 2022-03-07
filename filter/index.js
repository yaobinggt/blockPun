let ellipsis=(value)=>{
	let len=value.length;
	if (!value) return '';
	if(value.length > 20){
		return value.substring(0,12)+ '......' +value.substring(len-12,len)
	}
}
export {
	ellipsis
}