/*读取是否第一次使用*/
	function showAllTheData() {
            var db = getCurrentDb();//获取当前数据库
            db.transaction(function (trans) {
                trans.executeSql("select * from UserTable ", [], function (ts, data) {/*读取用户表*/
                	var rowLength  = data.rows.length;   //判断是否有数据
                    if(rowLength!=0){/*有数据*/
                    	/*读取数据库用户信息表*/
                    	getMaster();
                    	$("body").append("<input / type='password' placeholder='密码' id='checkpassword'>");
                    	$("body").append("<input type='button' id ='check' value='提交' onclick='checkInfo();'>");
                    }
                      else{/*没数据*/
                      	console.log(rowLength);
                      	/*第一次使用，请求用户输入数据*/
                        $("body").append("<h>欢迎使用CashFlowManager</h><br>")
                      	$("body").append("<input / placeholder='昵称' id='nickname'><br>")
                    	$("body").append("<input / placeholder='密码' id='password'>");
                    	$("body").append("<input type='button' id ='submit' value='提交' onclick='initInfo();'>");
                      }
                    
                    
                    
                }, function(ts, message) {alert(message);var tst = message;});
            });
    }
	/*首次使用添加用户信息*/
	function initInfo(){
		var nickname = $("#nickname").val();
		var password = md5($("#password").val());
		console.log("nickname:"+nickname);
		/*新增用户*/
		var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql("insert into UserTable(Nickname,Password) values(?,?) ", [nickname,password], function (ts, data) {
    	         }, function (ts, message) {alert(message);});
         });	
	}
	/*获取用户信息*/
	function getMaster(){
		var result = [];
		var db = getCurrentDb();
        db.transaction(function (trans) {
	            trans.executeSql("select * from UserTable ", [], function (ts, data) {
            	var userName  = data.rows.item(0).Nickname;
            	var passWord = data.rows.item(0).Password;
        		result[0]=userName;
        		result[1]=passWord;
        		$("body").prepend("<h1>"+result[0]+"你好，请输入密码</h1>");
            }, function(ts, message) {alert(message);var tst = message;});
        });
	}
	function checkInfo(){
		var result = [];
		var db = getCurrentDb();
        db.transaction(function (trans) {
	            trans.executeSql("select * from UserTable ", [], function (ts, data) {
            	var userName  = data.rows.item(0).Nickname;
            	var passWord = data.rows.item(0).Password;
        		result[0]=userName;
        		result[1]=passWord;
        		console.log(userName);
        		console.log(passWord);
        		var inputPassword = $("#checkpassword").val();
        		console.log(inputPassword);
        		var md5pass = md5(inputPassword);
        		console.log(md5pass);
        		if(md5pass==result[1]){
        			alert("登录成功");
        		}
        		else{
        			alert("登录失败");
        		}
            }, function(ts, message) {alert(message);var tst = message;});
        });
        
	}
	
		
	
	 