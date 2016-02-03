
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
/*确定操作*/
$("#btnAssetSummit").on("click",function(){
	var nodeName = $("#asset_add1").val();
	var nodeValue = $("#asset_add2").val();
	var tag = $("#select_asset").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	if(checkAssetData()){
		/*重复验证*/
		checkAssetRepeat(nodeName,nodeValue,tag,timeNow);
	}
})
/*验证填写数据的正确性
  正确返回1
  错误返回0
 * */
function checkAssetData(){
	var nodeName = $("#asset_add1").val();
	var nodeValue = $("#asset_add2").val();
	/*非空验证*/
	if(nodeName==""||nodeValue==""){
		$("#assetTips").text("内容不能为空");
		return 0;
	}
	else if(isNaN(nodeValue)==1){
		$("#assetTips").text("金额必须填写数字");
		return 0;
	}
	else if(nodeValue<0){
		$("#assetTips").text("金额必须是正数");
		return 0;
	}
	else{
		$("#assetTips").text("");
		return 1;
	}
}
/*添加操作*/
/*重复验证,无重复，则执行添加
                     有重复，则不执行添加
 * */
function checkAssetRepeat(nodeName,nodeValue,tag,timeNow){
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select AssetTag from AssetTable where AssetName = ?", [Base64.encode(nodeName)],function (ts, data) {
	    	       	if(data.rows.length!=0){
	    	       		$("#assetTips").text("名字重复");
	    	       	}
	    	       	else{
	    	       		/*添加数据进去*/
						/*初始化数据库输入表*/
						initAssetTable();
						var db = getCurrentDb();
						db.transaction(function (trans) {
					            trans.executeSql("insert into AssetTable(AssetName,AssetValue,AssetTag,CurrentTime) values(?,?,?,?) ", [Base64.encode(nodeName),Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow)], function (ts, data) {
				    	        $("#addAsset").hide(500);
				    	        $("#asset_add1").val("");
				    	        $("#asset_add2").val("");
				    	        showAllTheData();
					            }, function (ts, message) {console.log(message);});
				         });
	    	       	}
	            }, function (ts, message) {
	            });
	           
         });
}

