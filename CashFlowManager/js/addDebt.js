
$("#btnDebtCancel").on("click",function(){
	$("#addDebt").hide(500);
})
/*点击添加按钮操作*/
$("#debtPlus").on("click",function(){
	$("#addDebt").show(500);
	$("#debt_add1").removeAttr("readonly");
	$("#debt_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#debt_add1").focus();
	
})
