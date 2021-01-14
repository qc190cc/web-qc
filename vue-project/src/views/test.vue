<template>
	<div>
		<div>test{{ number }}</div>
		<router-link to="/">index</router-link>
		<div class="test">
			<div>水电费打发但是发多少</div>
			<div class="test2">
				sdgfdag大商股份十多个但是感受到根深蒂固水电费大师傅水电费打算发多少
			</div>
		</div>
		<div class="bottom">
			底部
			<div>底部<span>底部</span></div>
		</div>
	</div>
</template>
<script>
import { mixin } from '@/mixins/mixin.js'
import * as test2 from '@/mixins/test2.js'
console.log('test2: ', test2);
export default {
    mixins: [mixin],
    mounted() {
        this.observer();
        this.number += 1;
    },
    methods: {
        observer() {
            // 选择一个需要观察的节点
            const targetNode = document.querySelector('.bottom');
            // 设置observer的配置选项
            const config = { attributes: true, childList: true, subtree: true };
            // 创建一个observer示例与回调函数相关联
            const observer = new MutationObserver(e => {
                console.log('e: ', e);
            });
            // 使用配置文件对目标节点进行观测
            observer.observe(targetNode, config);
        }
    }
}
</script>
<style lang="less" scoped>
.test{
    border: 1px solid;
    display: inline-block;
    div{
        display: inline-block;
    }
    .test2{
        width: 100%;
        border: 1px dashed;
    }
}
.bottom{
	width: 200px;
	height: 200px;
	border: 1px solid;
}
.float{
	width: 100%;
	height: 100%;
	display: none;
	background: rgba(0,0,0,.5);
	position: fixed;
	top: 0;
	left: 0;
}
</style>
