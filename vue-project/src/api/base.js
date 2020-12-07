import request from '@/utils/request';

export default {
    /**
     * test
     * @returns {AxiosPromise<any>}
     */
    test(params) {
        return request({
            url: '/api/auth/test',
            method: 'GET',
            params
        });
    },
    /**
     * test2
     * @returns {AxiosPromise<any>}
     */
    test2(params) {
        return request({
            url: '/api/auth/test2',
            method: 'POST',
            data: params
        });
    }
}