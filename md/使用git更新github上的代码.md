一、clone代码

1.把大神的代码clone到本地，或者clone自己github上的代码，使用指令：

git clone https://github.com/yoyoketang/yoyoketang.git

2.在本地随便建个文件夹，地址栏输入cmd打开，然后输入上面指令

image.png
二、git status查看状态

1.查看当前的git仓库状态，可以使用git status

git status

2.如果是在刚才新建的文件夹输入git status会出现下图1所示，git目录不对

3.先用cd 命令切换到yoyoketang这个repository目录

4.再输入git status可以看到On branch master，这个说明已经在master分支上了

三、更新代码

1.在yoyoketang文件夹下更新东西，比如我上传2个资料文件

2.更新后使用git add * (*是更新全部）

git add *

3.接着输入git commit -m "更新说明“，commit只是提交到缓存区域(删除时 git commit -am '删除说明')

git commit -m "更新说明“

4.如果是多人同时开发维护代码，得先git pull ,拉取当前分支最新代码

git pull

5.最后git push origin master,最后一步才是push到远程的master分支上

(最好不要上传太大文件，要不然太慢了)

6.打开github界面就能看到同步了


linux服务器上安装并连接github账户
差点忘记git的使用方法，在新的服务器上安装git

首先一步到位直接安装

sudo yum install git-all
然后设置github地址

git config --global user.name "Your Name"
git config --global user.email "email@example.com"
之后直接在服务器上生成公钥

ssh-keygen -t rsa -C "xx@xx.com"
会给出公钥地址，然后复制一下到github添加公钥的地方

cat /root/.ssh/id_rsa.pub