/*
	 * * * * *                               * * * * * * * * * * * * * 
	 * * * * *          *  *   *  *          * * * * * * * * * * * * * 
	 * * * * *           *       *           * * * * * * * ** * * * * 
	 * * * * *             * * *             * * * * * * * * ** * * * 
	 * 
	 * 初始化数据库  initdatabase*/ 
	function getCurrentDb() {
        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
        //如果数据库不存在那么创建之
        var db = openDatabase("richdad", "1.0", "现金流个人管理软件", 1024 * 1024);
        return db;
    }
	function getCurrentDb1() {
        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
        //如果数据库不存在那么创建之
        var db = openDatabase("richdad1", "1.0", "现金流个人管理软件", 1024 * 1024);
        return db;
    }
	/*初始化用户表 init usertable*/
	function initUserTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists UserTable(Nickname text null,Password text null)", [], function (trans, result) {
                }, function (trans, message) {//消息的回调函数alert(message);});
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化收入表*/
	function initInputTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists InputTable(InputName text null,InputValue text null,InputTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*读取收入表*/
	/*
	 * 
	 * 读取数据库中的信息
	 */
	  function showAllTheData() {
	  	    
            $("#first tr").detach();
            var db = getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("select * from InputTable ", [], function (ts, data) {
                	var a  = new Array(data.rows.length);
                	var b = new Array(data.rows.length);
                    if (data){
                        for (var i = 0; i < data.rows.length; i++) {
                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
                             a[i] = data.rows.item(i).InputName;
                             b[i] = data.rows.item(i).InputValue;
                        }
                        /*将数据显示出来*/
                       for(var i=0;i<data.rows.length;i++){
                       		$("#first").append("<tr ondblclick='inputUpdate(this)'><td>"+a[i]+"</td><td>"+b[i]+"</td><td class='delete' onclick='deleteTR(this)'>x</td></tr>");
                       }
                       /*getSum1();*/
                    }
                    
                }, function(ts, message) {alert(message);var tst = message;});
            });
        }
	  
	  /*删除收入表指定信息*/
	   function deleteTheData(e) {
            var db = getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("delete from InputTable where InputName = ?", [e], function (ts, data) {
                	/*删除完毕，刷新数据*/
                	showAllTheData();
                }, function(ts, message) {alert(message);var tst = message;});
            });
        }
	   /*根据名字查询flag*/
	  
	function currentTime(){
		 var d = new Date(),str = '';
		 str += d.getFullYear()+',';
		 str  += d.getMonth() + 1+',';
		 str  += d.getDate();
	     return str;
	}
	
	
	
	
