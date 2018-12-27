// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  try{
    console.log(event.studentID)
    return await db.collection('book').doc(event._id).update({
      data:{
        lender: parseInt(event.studentID)
      }
    })
  }catch(e){
    console.error(e)
  }
}