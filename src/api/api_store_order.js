import * as API from './'
export default {
  // 商城订单
  //查询获取订单列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/storeorders', params)
  },

  //查询获取一条订单信息
  // restful风格
  // findById: id => {
  //   return API.GET(`/api/v1/storeorders/${id}`)
  // },
  findById: params => {
    return API.GET('/api/v1/storeorders/findById', params)
  },

  add: params => {
    return API.POST(`/api/v1/storeorders`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/storeorders/${id}`, params)
  },

  //单个删除订单
  remove: id => {
    return API.DELETE(`/api/v1/storeorders/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/storeorders/batch/${ids}`)
  }
}