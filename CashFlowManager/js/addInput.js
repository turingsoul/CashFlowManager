/*函数初始化*/
function init(){
	$("#addInput").hide(0);
}
init();
$("#inputPlus").on("click",function(){
	$("#addInput").show(500);
})
/*取消操作*/
$("#btnInputCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addInput").hide(500);
	/*清空弹出框*/
	$("#input_add1").val("");
	$("#input_add2").val("");
	$("#addTips").text("");
})
/*确定操作*/
$("#btnInputSummit").on("click",function(){
	/*非空以及负数验证*/
	checkInputData();
	/*重复验证*/
	/*TODO*/
	
	
	
})
/*验证填写数据的正确性
  正确返回1
  错误返回0
 * */
function checkInputData(){
	var nodeName = $("#input_add1").val();
	var nodeValue = $("#input_add2").val();
	/*非空验证*/
	if(nodeName==""||nodeValue==""){
		$("#addTips").text("内容不能为空");
		return 0;
	}
	else if(isNaN(nodeValue)==1){
		$("#addTips").text("金额必须填写数字");
		return 0;
	}
	else if(nodeValue<0){
		$("#addTips").text("金额必须是正数");
		return 0;
	}
	else{
		$("#addTips").text("");
		return 1;
	}
}
