安卓手机连接电脑,打开usb调试;
在adb文件夹目录下运行命令行工具

abd devices  // 查看当前设备列表
adb -s 设备ip tcpip 端口号 //为需要 wifi 连接的设备指定端口号
adb tcpip 5555 // 连接了一个设备 可以不用 -s,直接指定端口
adb connect 192.168.3.137:5555(设备ip:端口号) // 连接设备
adb disconnect 192.168.3.137:5555(设备ip:端口号) // 断开连接
adb usb // 恢复USB调试模式可输入

hbuilder 需设置adb路径

我们可以写一个简单的批处理程序来帮我们完成这件事
任意地方新建一个.bat文件
cd C:\Program Files\ADB(adb目录)
c    
adb connect 192.168.3.137:5555(设备ip:端口号)