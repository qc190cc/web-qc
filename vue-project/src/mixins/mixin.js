// 抛出混入对象，方便外部访问
export const mixin = {
    data() {
        return {
            number: 1
        }
    },
    created() {
        console.log('mixin混入对象')
    },
    methods: {
        demo1() {
            console.log('mixin混入对象')
        }
    }
}
