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
    db.collection("book").where({
      bookid: event.bookid
    }).get({
      success: res => {
        db.collection("book").doc(res.data[0]._id).update({
            data: {
              lender: res.data[0].order
            }
          }),
          db.collection("record").where({
            studentid: event.lender
          }).get({
            success: res => {
              var i = 0;
              var array = [];
              for (i = 0; i < res.data[0].isreading.length; i++) {
                if (res.data[0].isreading.length == event.bookid) {
                  array.push(null);
                } else {
                  db.collection("record").where({
                    studentid: event.lender
                  }).get({
                    success: res => {
                      array.push(res.data[0].isreading[i])
                    }
                  })
                }
              }
              db.collection("record").doc(res.data[0]._id).update({
                data: {
                  isreading: array,
                  hasread: _.push(event.bookid)
                }
              })
            }
          })
        db.collection("record").where({
          studentid: event.order
        }).get({
          success: res => {
            db.collection("record").doc(res.data[0]._id).update({
              data: {
                isreading: _.push(event.bookid)
              }
            })
          }
        })
      }
    })
  } catch (e) {
    console.error(e)
  }
}