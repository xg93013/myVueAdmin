import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import Mock from './mock/mock'
import { MyStorage } from '@/assets/js/LocalStorage.js'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
Vue.component('chart', ECharts)
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        MyStorage.removeStorage('access-user')
        next()
    } else {
        // next({path: '/login'})
        // 设置storage过期时间
        // console.log(MyStorage.getStorage("access-user", 1000*60*20 ))
        let user = MyStorage.getStorage("access-user", 1000*60*20 )
        console.log(user)
        if (user.code === -1) {
            next({path: '/login'})
        } else {
            next()
        }
    }
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})