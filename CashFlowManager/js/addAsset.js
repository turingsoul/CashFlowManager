
/*点击添加按钮操作*/
$("#assetPlus").on("click",function(){
	$("#addAsset").show(500);
	$("#asset_add1").removeAttr("readonly");
	$("#asset_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#asset_add1").focus();
})
/*取消操作*/
$("#btnAssetCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addAsset").hide(500);
	/*清空弹出框*/
	$("#asset_add1").val("");
	$("#asset_add2").val("");
	$("#assetTips").text("");
	/*恢复正常隐藏*/
	hideORshow2();
})


