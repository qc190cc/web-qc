# express搭建后套项目

DOS命令：cd xx/xx 进入xx/xx文件夹
         进入某个盘符d: e: f: ...


安装nodejs和配置npm

1.设置镜像地址。
 淘宝镜像：在命令行中敲入npm config set registry=https://registry.npm.taobao.org


安装express

1. 安装全局的express生成工具。命令：npm install express-generator -g
2. 执行express命令生成项目的骨架。
3. 在创建的项目目录中（注意先cd进入此目录）命令中输入npm install下载express依赖的所有插件。

构造:
–node_modules   项目中依赖的包
–public         前端资源放置的目录（只有这个文件夹是前端的部分）
–routes         学名 路由，里面放着一些后台路由文件
–views		 后台的jade格式页面
–app.js	 项目的入口文件

5.使用npm start启动服务器。或者node app.js。

*** 卸载express命令: npm uninstall -g express （装好后就不要去动） ***


访问自己的express项目
1.http://localhost:3000 or 127.0.0.1:3000
welcome to express

#本地解决跨域
  在app.js加入
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
  });

#vue项目中用axios发起请求
  request({
    baseURL: 'http://localhost:3000',
    url: '/',
    method: 'get',
    params: { a: 1 }
  });
  request({
    baseURL: 'http://localhost:3000',
    url: '/',
    method: 'post',
    data: { a: 1 }
  });