
/*点击添加按钮操作*/
$("#debtPlus").on("click",function(){
	$("#addDebt").show(500);
	$("#debt_add1").removeAttr("readonly");
	$("#debt_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#debt_add1").focus();
})
/*取消操作*/
$("#btnDebtCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addDebt").hide(500);
	/*清空弹出框*/
	$("#debt_add1").val("");
	$("#debt_add2").val("");
	$("#debtTips").text("");
	/*恢复正常隐藏*/
	hideORshow3();
})

/*确定操作*/
$("#btnDebtSummit").on("click",function(){
	var nodeName = $("#debt_add1").val();
	var nodeValue = $("#debt_add2").val();
	var tag = $("#select_debt").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	if(checkDebtData()){
		/*重复验证*/
		checkDebtRepeat(nodeName,nodeValue,tag,timeNow);
	}
})
/*验证填写数据的正确性
  正确返回1
  错误返回0
 * */
function checkDebtData(){
	var nodeName = $("#debt_add1").val();
	var nodeValue = $("#debt_add2").val();
	/*非空验证*/
	if(nodeName==""||nodeValue==""){
		$("#debtTips").text("内容不能为空");
		return 0;
	}
	else if(isNaN(nodeValue)==1){
		$("#debtTips").text("金额必须填写数字");
		return 0;
	}
	else if(nodeValue<0){
		$("#debtTips").text("金额必须是正数");
		return 0;
	}
	else{
		$("#debtTips").text("");
		return 1;
	}
}
/*添加操作*/
/*重复验证,无重复，则执行添加
                     有重复，则不执行添加
 * */
function checkDebtRepeat(nodeName,nodeValue,tag,timeNow){
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select DebtTag from DebtTable where DebtName = ?", [Base64.encode(nodeName)],function (ts, data) {
	    	       	if(data.rows.length!=0){
	    	       		$("#debtTips").text("名字重复");
	    	       	}
	    	       	else{
	    	       		/*添加数据进去*/
						/*初始化数据库输入表*/
						initDebtTable();
						var db = getCurrentDb();
						db.transaction(function (trans) {
					            trans.executeSql("insert into DebtTable(DebtName,DebtValue,DebtTag,CurrentTime) values(?,?,?,?) ", [Base64.encode(nodeName),Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow)], function (ts, data) {
				    	        $("#addDebt").hide(500);
				    	        $("#debt_add1").val("");
				    	        $("#debt_add2").val("");
				    	        showAllTheData();
					            }, function (ts, message) {console.log(message);});
				         });
	    	       	}
	            }, function (ts, message) {
	            });
	           
         });
}


