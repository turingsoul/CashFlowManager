/*函数初始化*/
function init(){
	$("#addInput").hide(0);
}
init();
$("#inputPlus").on("click",function(){
	$("#addInput").show(500);
})
$("#btnInputCancel").on("click",function(){
	$("#addInput").hide(500);
})
