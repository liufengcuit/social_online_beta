export default {
	autoBottom(element){
		setTimeout(()=>{
			element.scrollTop = element.scrollHeight;
		},10)
		
	}
}