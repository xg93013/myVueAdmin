export const MyStorage = {
  setStorage (key, value) {
    let curTime = new Date().getTime()
    localStorage.setItem(key,JSON.stringify({data:value, time:curTime}))
  },
  getStorage (key, exp) {
    let data = localStorage.getItem(key)
    let dataObj = JSON.parse(data)
    if (new Date().getTime() - dataObj.time > exp){
      return { code:-1, msg:'信息已经过期', data:""}
    } else {
      return { code:1, msg:'信息存在', data:JSON.parse(dataObj.data) }
    }
  },
  removeStorage (key) {
    localStorage.removeItem(key)
  }
}