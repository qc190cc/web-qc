import request from '@/utils/request';

export default {
    /**
     * test
     * @returns {AxiosPromise<any>}
     */
    login(params) {
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
    loginOut(params) {
        return request({
            url: '/api/auth/test2',
            method: 'POST',
            data: params
        });
    }
}