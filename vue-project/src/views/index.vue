<template>
	<div>
		<div>index {{ number }}</div>
		<router-link to="/test">test</router-link>
	</div>
</template>
<script>
import { mixin } from '@/mixins/mixin.js'
import request from '@/utils/request'
export default {
    mixins: [mixin],
    created() {
        console.log('这里是page1');
    },
    mounted() {
        console.log(process.env);
        this.demo1();
    },
    methods: {
        demo1() {
            console.log('这里是page1');
            const params = {
                test: 'test'
            }
            request({
                baseURL: 'http://47.103.205.236:3000',
                url: '/',
                method: 'get',
                params: params
            }).then(res => {
                console.log('res: ', res);
            })
        }

    }
}
</script>
