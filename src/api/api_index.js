import * as API from './'
export default {
  //登录
  getState: params => {
    return API.GET('/api/v1/indexState', params)
  }
}