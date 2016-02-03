
$("#btnAssetCancel").on("click",function(){
	$("#addAsset").hide(500);
})
/*点击添加按钮操作*/
$("#assetPlus").on("click",function(){
	$("#addAsset").show(500);
	$("#asset_add1").removeAttr("readonly");
	$("#asset_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#asset_add1").focus();
	
})

