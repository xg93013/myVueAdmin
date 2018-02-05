import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/Login.vue'
import notfound from '@/views/404.vue'
import home from '@/views/Home.vue'
import index from '@/components/index/index.vue'
import storeOrder from '@/components/orderMan/storeOrder.vue'
import serviceOrder from '@/components/orderMan/serviceOrder.vue'
import storeOrderDetail from '@/components/orderMan/storeOrderDetail.vue'
import userMan from '@/components/userMan/userMan.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    {
      path:"/login",
      name:"login",
      component:login,
      hidden: true
    },
    {
      path: "/",
      redirect: "/login",
      hidden: true
    },
    {
      path:"/",
      name:"HOME",
      component:home,
      iconCls: 'el-icon-menu',
      leaf:true,
      children: [
        { path: '/index', component: index, name: '主页' }
      ]
    },
    {
      path:"/",
      name:"订单管理",
      iconCls: 'el-icon-message',
      component:home,
      children: [
        { path: '/serviceOrder', component: serviceOrder, name: '服务订单' },
        { path: '/storeOrderDetail', component: storeOrderDetail, name: '订单详情', hidden: true},
        { path: '/storeOrder', component: storeOrder, name: '商城订单' }
      ]
    },
    {
      path:"/",
      name:"用户管理",
      iconCls: 'el-icon-setting',
      component:home,
      children: [
        { path: '/userMan', component: userMan, name: '资料修改' }
      ]
    },
    {
      path:"/404",
      name:"404",
      component:notfound,
      hidden: true
    },
  ]
})
