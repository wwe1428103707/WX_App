// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  // const wxContext = cloud.getWXContext()
  // const order = event.order,
  // const lender = event.lender,
  // const bookid = event.bookid

  try {
    console.log(event.order)
    return await db.collection("book").doc(event._id).update({
        data: {
          lender: event.order,
          order:null
        }
      })
  } catch (e) {
    console.error(e)
  }
}