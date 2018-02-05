let Mock = require('mockjs')
const indexData = Mock.mock({
  "headData": 
  {
    // {value:'@integer(0, 20)', name:'用户已付款'},
    // {value:'@integer(0, 20)', name:'用户未付款'},
    // {value:'@integer(0, 20)', name:'待处理'},
    // {value:'@integer(0, 20)', name:'已完成'}
    noPayNum: '@integer(0, 20)',
    payNum: '@integer(0, 20)',
    waitDealNum: '@integer(0, 20)',
    finishNum: '@integer(0, 20)'
  }
})
export { indexData }