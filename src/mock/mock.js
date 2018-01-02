import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { storeOrder, serviceOrder } from './data/order'
import { indexData } from './data/index'
import { loginUser } from './data/admin'

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });

        //获取主页状态信息
        mock.onGet('/api/v1/indexState').reply(config => {
            // console.log(storeOrder)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        data: indexData
                    }]);
                }, 1000);
            });
        });

        //获取订单详情
        mock.onGet('/api/v1/storeorders/findById').reply(config => {
            let orderNum = config.params.id
            let resultData
            let orderData = storeOrder.rows
            orderData.forEach(element => {
                if (element.headData.orderNum === orderNum) {
                    resultData = element
                }
            });
            console.log(resultData)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        data: resultData
                    }]);
                }, 1000);
            });
        });

        //获取订单列表
        mock.onGet('/api/v1/storeorders').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        data: storeOrder
                    }]);
                }, 1000);
            });
        });

        // 用户登录
        mock.onPost('/api/v1/users/login').reply(config => {
            let { username, password } = JSON.parse(config.data);
            let user = null
            return new Promise((resolve, reject) => {
                let hasUser = loginUser.some(u => {
                    if (u.username === username && u.password === password) {
                        user = JSON.parse(JSON.stringify(u));
                        user.password = undefined;
                        return true;
                    }
                });
    
                if (hasUser) {
                    resolve([200, { code: 200, msg: '登录成功', user }]);
                } else {
                    resolve([200, { code: 500, msg: '账号或密码错误' }]);
                }
            })
        })
    }
}