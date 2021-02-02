#一 安装MySQL
	url： https://dev.mysql.com/downloads/mysql/
###解压后的目录并没有的my.ini文件，没关系可以自行创建在安装根目录下添加的my.ini（新建文本文件，将文件类型改为的.ini），写入基本配置：
	[mysqld]
	# 设置3306端口
	port=3306
	# 设置mysql的安装目录
	basedir=C:\Program Files\MySQL
	# 设置mysql数据库的数据的存放目录
	datadir=C:\Program Files\MySQL\Data
	# 允许最大连接数
	max_connections=200
	# 允许连接失败的次数。
	max_connect_errors=10
	# 服务端使用的字符集默认为utf8mb4
	character-set-server=utf8mb4
	# 创建新表时将使用的默认存储引擎
	default-storage-engine=INNODB
	# 默认使用“mysql_native_password”插件认证
	#mysql_native_password
	default_authentication_plugin=mysql_native_password
	[mysql]
	# 设置mysql客户端默认字符集
	default-character-set=utf8mb4
	[client]
	# 设置mysql客户端连接服务端时默认使用的端口
	port=3306
	default-character-set=utf8mb4
路径要和实际存放的路径一致
###初始化MySQL
尽量使用管理员身份运行CMD

打开后进入mysql的bin目录

	mysqld --initialize --console

[注意] [MY-010454] [服务器]为root @ localhost生成临时密码：9P0gYk-？0，kT其中root @ localhost：后面的9P0gYk-？0，kT就是初始密码（不含首位空格）。在没有更改密码前，需要记住这个密码，后续登录需要用到。复制密码先保存起来!!!

#二 安装MySQL服务
执行命令

	mysqld --install

如果出现

	The service already exists!
	The current server installed: "c:\***" MySQL
说明mysql的服务还在把它删掉    
	
用SC命令删除的MySQL
	
	sc delete mysql

再执行上面安装服务


#三 启动MySQL服务
在mysql目录执行命令

	net start mysql


#四 连接MySQL + 修改密码
Navicat，小海豚等数据库图形化工具
用安装时root @ localhost：后面的初始密码新建连接

在mysql的bin目录下 进行数据库连接

	mysql -u root -p

	ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';

	exit;（退出mysql）


show databases; // 查看所有db(须有标点符号)
show create database 数据库名; // 查看数据库的详细创建信息
use 数据库名; // 进入对应数据库
show tables; // 查看数据库的所有表
desc table_name; // 查看表结构
ALTER TABLE user CHANGE upassword password VARCHAR(40) // 修改字段名称 ALTER TABLE 表名 CHANGE 旧字段名 新字段名 新数据类型;
<!-- 
	创建一张表 
	如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL会报错。
	AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。
	PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
	ENGINE 设置存储引擎，CHARSET 设置编码。
-->
CREATE TABLE IF NOT EXISTS `user`(
   `user_id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `upassword` VARCHAR(40),
   `creat_time` VARCHAR(40),
   PRIMARY KEY ( `user_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;