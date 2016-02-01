/*文档加载结束执行*/
$(function() {
	init();
	showAllTheData();

});
/*函数初始化*/
function init(){
	$("#updata_Input").hide(0);
	$("#addInput").hide(0);

}
/*点击添加按钮操作*/
$("#inputPlus").on("click",function(){
	$("#addInput").show(500);
		$("#input_add1").removeAttr("readonly");
	
	$("#input_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#input_add1").focus();
	
})
/*取消操作*/
$("#btnInputCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addInput").hide(500);
	/*清空弹出框*/
	$("#input_add1").val("");
	$("#input_add2").val("");
	$("#addTips").text("");
	/*恢复正常隐藏*/
	hideORshow();
})
/*确定操作*/
$("#btnInputSummit").on("click",function(){
	var nodeName = $("#input_add1").val();
	var nodeValue = $("#input_add2").val();
	var tag = $("#select_input").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	if(checkInputData()){
		/*重复验证*/
		checkInputRepeat(nodeName,nodeValue,tag,timeNow);
	}
	
	
})
/*确认修改操作*/
$("#btnInputUpdate").on("click",function(){
	var nodeName = $("#input_add1").val();
	var nodeValue = $("#input_add2").val();
	var tag = $("#select_input").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update InputTable set InputValue = ?,InputTag = ?,CurrentTime=? where InputName = ?", [nodeValue,tag,timeNow,nodeName], function (ts, data) {
    	        $("#addInput").hide(500);showAllTheData();
    	         $("#input_add1").val("");
    	        $("#input_add2").val("");
	            }, function (ts, message) {
	            	 $("#input_add1").val("");
    	        	 $("#input_add2").val("");
	            });
         });
	
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
/*删除一行*/
function deleteTR(e){
	if(confirm("确定删除此条内容")){
			var $current = $(e);
			$current.parent().remove();
			/*获取这行的内容*/
			var toDeleteDate = $($current.parent().find("td").get(0)).text();
			/*数据库删除*/
			deleteTheData(toDeleteDate);
		}
}
/*添加操作*/
/*重复验证,无重复，则执行添加
                     有重复，则不执行添加
 * */
function checkInputRepeat(nodeName,nodeValue,tag,timeNow){
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select InputTag from InputTable where InputName = ?", [nodeName],function (ts, data) {
	    	       	if(data.rows.length!=0){
	    	       		$("#addTips").text("名字重复");
	    	       	}
	    	       	else{
	    	       		/*添加数据进去*/
						/*初始化数据库输入表*/
						initInputTable();
						var db = getCurrentDb();
						db.transaction(function (trans) {
					            trans.executeSql("insert into InputTable(InputName,InputValue,InputTag,CurrentTime) values(?,?,?,?) ", [nodeName,nodeValue,tag,timeNow], function (ts, data) {
				    	        $("#addInput").hide(500);
				    	        $("#input_add1").val("");
				    	        $("#input_add2").val("");
				    	        showAllTheData();
					            }, function (ts, message) {console.log(message);});
				         });
	    	       	}
	            }, function (ts, message) {
	            });
	           
         });
}
/*打开更新数据弹出框*/
function inputUpdate(e){
	$("#input_add1").attr("readonly","readonly");
	
	$("#input_add1").addClass("text-get");
	/*$("#input_addinput").attr("readOnly","true");*/
	var $current = $(e);
	var nodeName = $($current.find("td").get(0)).text();
	var nodeValue = $($current.find("td").get(1)).text();
	var InputTag = 0;  //tag
	var TagContent = ""; //tagcontent
	/*根据名称查询flag*/
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql("select InputTag from InputTable where InputName = ?", [nodeName], function (ts, data) {
    	        InputTag = data.rows[0].InputTag;
    	        TagContent = findInputTagContent(InputTag);
    	        showSelect(InputTag,TagContent);
    	        /**/
	            }, function (ts, message) {console.log(message)});
         });
	$("#input_add1").val(nodeName);
	$("#input_add2").val(nodeValue);
	/*$("#select_input").value();*/
	$("#addInput").show(500);
	$("#btnInputSummit").hide(0);
	$("#btnInputUpdate").show(0);
	console.log(nodeName+nodeValue);
}
function inputDateUpdate(){
	
}
/*input的按钮隐藏*/
function hideORshow(){
	$("#btnInputSummit").show(0);
	$("#btnInputUpdate").hide(0);
}
/*查询tag对应的内容*/
function findInputTagContent(number){
	if(number ==1){
		return "工资";
	}else if(number ==2 ){
		return "利息";
	}else if(number ==3){
		return "股息";
	}else if(number ==4){
		return "劳务报酬";
	}else if(number ==5){
		return "生意";
	}else if(number ==6){
		return "住房补贴";
	}else if(number ==7){
		return "单位缴公积金";
	}else if(number ==8){
		return "其他";
	}
}
/*显示对应的select内容*/
function showSelect(a,b){
	$($("#select_input").find("input").get(0)).attr("value",a);
	$($("#select_input").find("input").get(1)).attr("value",b);
}
