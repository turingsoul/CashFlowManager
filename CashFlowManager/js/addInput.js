/*文档加载结束执行*/
$(function() {
	init();
	showAllTheData();

});
/*函数初始化*/
function init(){
	
	$("#addInput").hide(0);

}

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
	var nodeName = $("#input_add1").val();
	var nodeValue = $("#input_add2").val();
	var tag = $("#select_input").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	checkInputData();
	/*重复验证*/
	/*TODO*/
	if(checkInputData()){
		/*添加数据进去*/
		/*初始化数据库输入表*/
		initInputTable();
		var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql("insert into InputTable(InputName,InputValue,InputTag,CurrentTime) values(?,?,?,?) ", [nodeName,nodeValue,tag,timeNow], function (ts, data) {
    	        $("#addInput").hide(500);alert("添加成功");showAllTheData();
	            }, function (ts, message) {console.log(message)});
         });
	}
	
	
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

function deleteTR(e){
	if(confirm("确定删除此条内容")){
			var $current = $(e);
			$current.parent().remove();
			/*获取这行的内容*/
			var toDeleteDate = $($current.parent().find("td").get(0)).text();
			deleteTheData(toDeleteDate);
		}
}
