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
      "orderItem|5-10": [{
        "goodsName": "@csentence(6)",
        "imgUrl": "封面url",
        "price": "872",
        "goodsAmount":"1",
        "goodsDes": "商家1"
      }]
    }
  ],
  "total":100
})
const serviceOrder = Mock.mock({
  "rows": [
    {
      "orderNum|+1": 2017000,
      "goodsName": "商品名称goodsname",
      "orderDate": "@date",
      "userInfo": "@cname",
      "price|1-1000": 1000,
      "state|1-3": 3
    }
  ],
  "total":20
})
export { storeOrder, serviceOrder }