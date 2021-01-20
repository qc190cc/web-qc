# express文件上传模块 #

	1. npm install multiparty (安装multiparty模块)
	2. 然后在服务器public下面手动创建userupload文件夹
 
    3.	配置路由页面		
    var multiparty = require('multiparty');
	var util = require("util");
	//配置在路由页面上面

	/* 上传*/
	router.post('/upFile', function(req, res){
	    //生成multiparty对象，并配置上传目标路径
	    var form = new multiparty.Form({uploadDir: './public/userupload/'}); 
		 //文件路径可以修改，如果修改记得和下面的路径保持一致
	
	    //上传完成后处理
	    form.parse(req, function(err, fields, files) {
	
	    var filesTmp = JSON.stringify(files,null,2);
	
	    if(err){
	        console.log('parse error: ' + err);
	    }else{
	        console.log('parse files: ' + filesTmp);
	        var files = files.inputFile;
	    }

		//发送第一张图片的信息
		let str = files[0].path;
	    let newPath = str.replace(/public/, '');
	        
	    res.send(newPath);    //发送消息回去
	    });
	});




	4. 
	//页面部分写法
    <input type="file" id="xxx" name="inputFile" multiple='mutiple' />	
	//这里的name不要修改，固定inputFile！！！！mutiple是可以批量上传文件
    <input type="submit" value="上传"/>


## ajaxfileupload（上传的ajax） ##

	$.ajaxFileUpload({ //上传的AJAX
	    url: "/upFile",
	    fileElementId: "input元素的id",
	    dataType: "json",
	    success: function(data) {
	        //ok
	    }
	});