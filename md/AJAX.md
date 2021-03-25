# AJAX
- 一种创建快速动态网页的技术
- 异步JavaScript和XML
- 可以局部刷新
- AJAX只会发送字符串，服务器在检测到数据不是字符串的时候会自动转换
### 语法
- **XMLHttpRequest()**
		
		//原生
		loadBtn.onclick = () => {
            let req = new XMLHttpRequest();
            req.open('post', '/load', true);
            req.send();
            //监听响应的事件句柄
            req.onreadystatechange = () => {
                //status：服务器返回的状态码，200为成功
                //readyState：HTTPRequest的请求状态，4为响应完毕
                if (req.status == 200 && req.readyState==4) {
                    //responseText:服务器响应的内容
                   console.log(req.responseText)
                }
            }
        }
		//jQurey

 		$("#loadBtn").click(function () {
            $.ajax({
                type: 'POST', //请求类型	
                url: '/load', //请求地址
				//发送的请求数据
                data: { text: event.target.value },
				//服务器响应的数据
                success: function (data) { 
                   console.log(data)
                    }
                }
            })
        })

		