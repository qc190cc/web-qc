<template>
	<div>
		<div>index {{ number }}</div>
		<router-link to="/test">test</router-link>
	</div>
</template>
<script>
import { mixin } from '@/mixins/mixin.js'
export default {
    mixins: [mixin],
    created() {
        console.log('这里是page1');
    },
    mounted() {
        this.demo1();
    },
    methods: {
        demo1() {
            console.log('这里是page1');
        }
    }
}
</script>
