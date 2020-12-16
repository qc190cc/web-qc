<template>
	<div>
		<div>test</div>
		<router-link to="/">index</router-link>
		<div class="bottom">
			底部
		</div>
	</div>
</template>
<script>
export default {
    mounted() {
        this.observer();
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
