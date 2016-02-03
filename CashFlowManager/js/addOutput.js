
/*点击添加按钮操作*/
$("#outputPlus").on("click",function(){
	$("#addOutput").show(500);
	$("#output_add1").removeAttr("readonly");
	$("#otuput_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#output_add1").focus();
})
/*取消操作*/
$("#btnOutputCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addOutput").hide(500);
	/*清空弹出框*/
	$("#output_add1").val("");
	$("#output_add2").val("");
	$("#outputTips").text("");
	/*恢复正常隐藏*/
	hideORshow1();
})
/*确定操作*/
$("#btnOutputSummit").on("click",function(){
	var nodeName = $("#output_add1").val();
	var nodeValue = $("#output_add2").val();
	var tag = $("#select_output").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	if(checkOutputData()){
		/*重复验证*/
		checkOutputRepeat(nodeName,nodeValue,tag,timeNow);
	}
})
/*验证填写数据的正确性
  正确返回1
  错误返回0
 * */
function checkOutputData(){
	var nodeName = $("#output_add1").val();
	var nodeValue = $("#output_add2").val();
	/*非空验证*/
	if(nodeName==""||nodeValue==""){
		$("#outputTips").text("内容不能为空");
		return 0;
	}
	else if(isNaN(nodeValue)==1){
		$("#outputTips").text("金额必须填写数字");
		return 0;
	}
	else if(nodeValue<0){
		$("#outputTips").text("金额必须是正数");
		return 0;
	}
	else{
		$("#outputTips").text("");
		return 1;
	}
}
/*添加操作*/
/*重复验证,无重复，则执行添加
                     有重复，则不执行添加
 * */
function checkOutputRepeat(nodeName,nodeValue,tag,timeNow){
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select OutputTag from OutputTable where OutputName = ?", [Base64.encode(nodeName)],function (ts, data) {
	    	       	if(data.rows.length!=0){
	    	       		$("#outputTips").text("名字重复");
	    	       	}
	    	       	else{
	    	       		/*添加数据进去*/
						/*初始化数据库输入表*/
						initOutputTable();
						var db = getCurrentDb();
						db.transaction(function (trans) {
					            trans.executeSql("insert into OutputTable(OutputName,OutputValue,OutputTag,CurrentTime) values(?,?,?,?) ", [Base64.encode(nodeName),Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow)], function (ts, data) {
				    	        $("#addOutput").hide(500);
				    	        $("#output_add1").val("");
				    	        $("#output_add2").val("");
				    	        showAllTheData();
					            }, function (ts, message) {console.log(message);});
				         });
	    	       	}
	            }, function (ts, message) {
	            });
	           
         });
}
/*删除一行*/
function deleteOutputTr(e){
	if(confirm("确定删除此条内容")){
			var $current = $(e);
			$current.parent().remove();
			/*获取这行的内容*/
			var toDeleteDate = $($current.parent().find("td").get(0)).text();
			/*数据库删除*/
			deleteOutputData(toDeleteDate);
		}
}