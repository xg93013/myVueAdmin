let Mock = require('mockjs')
const indexData = Mock.mock({
  "headData": {
    "processOrder": '@integer(0, 20)',
    "nonePayOrder": '@integer(0, 20)',
    "waitDealOrder": '@integer(0, 20)',
    "successOrder": '@integer(0, 20)'
  }
})
export { indexData }