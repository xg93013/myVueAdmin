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
  // 查找订单
  findById: params => {
    return API.GET('/api/v1/storeorders/findById', params)
  },
  // 添加订单
  add: params => {
    return API.GET(`/api/v1/storeorders/add`, params)
  },
  // 更新订单
  update: params => {
    return API.GET(`/api/v1/storeorders/update`, params)
  },
  //单个删除订单
  remove: params => {
    return API.GET(`/api/v1/storeorders/remove`, params)
  },
  //批量删除
  removeBatch: params => {
    return API.GET(`/api/v1/storeorders/removeBatch`, params)
  }
}