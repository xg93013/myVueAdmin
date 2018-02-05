let Mock = require('mockjs')

const storeOrder = Mock.mock({
  "rows|5-10":[
    {
      "headData":{
        "orderNum|+1":2014089234,
        "userInfo":"@cname",
        "orderCreateTime":"@date",
        "toStore|1":[
          "AMD",
          "CMD",
          "UMD",
          "Store_one",
          "store_to"
        ],
        "state|1-3":1
      },
      "orderItem|5-50": [{
        "goodsName": "@csentence(6)",
        "imgUrl": "封面url",
        "price|1-1000.2": 0,
        "goodsAmount|1-100": 0,
        "goodsDes": "商家1"
      }]
    }
  ],
  "total":100
})
const serviceOrder = Mock.mock({
  "rows|5-10": [
    {
      "orderNum|+1": 2017000,
      "serviceName|1": [
        "洗澡",
        "看病",
        "护理"
      ],
      "orderDate": "@date",
      "userInfo": "@cname",
      "price|1-1000": 1000,
      "state|1-3": 3
    }
  ],
  "total":20
})
export { storeOrder, serviceOrder }