import * as API from './'
export default {
  // 商城订单
  //查询获取订单列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/serviceorders', params)
  },
  // 查找订单
  findById: params => {
    return API.GET('/api/v1/serviceorders/findById', params)
  },
  // 添加订单
  add: params => {
    return API.GET(`/api/v1/serviceorders/add`, params)
  },
  // 更新订单
  update: params => {
    return API.GET(`/api/v1/serviceorders/update`, params)
  },
  //单个删除订单
  remove: params => {
    return API.GET(`/api/v1/serviceorders/remove`, params)
  },
  //批量删除
  removeBatch: params => {
    return API.GET(`/api/v1/serviceorders/removeBatch`, params)
  }
}