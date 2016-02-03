
/*取消添加面板*/
$("#btnOutputCancel").on("click",function(){
	$("#addOutput").hide(500);
})
/*点击添加按钮操作*/
$("#outputPlus").on("click",function(){
	$("#addOutput").show(500);
	$("#output_add1").removeAttr("readonly");
	$("#otuput_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#output_add1").focus();
	
})
