// pages/tranbook/transbook.js
const db = wx.cloud.database()
const app = getApp()
Page({

  addMsg() {
    //console.log(this.data.inputval);
    // this.data.bookinfo.push({
    //   msg:this.data.inputval
    // });

    var list = this.data.bookinfo;
    list.push({
      msg: this.data.inputval
    });
    this.setData({
      bookinfo: list,
      inputval: ''
    })
  },

  transBook: function (event) {
    console.log(event.currentTarget.dataset.name);
    const _ = db.command
    var stuid
    console.log(app.globalData.openid)
    db.collection("student").where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        stuid = res.data[0].studentid
        var booklender;
        var bookorder;
        db.collection("book").where({
          bookid: event.currentTarget.dataset.bookid
        }).get({
          success:res=>{
            booklender = res.data[0].lender
            bookorder = res.data[0].order
          }
        })
        wx.cloud.callFunction({
          name: "transbook",
          data: {
            order: event.currentTarget.dataset._id,
            lender: stuid,
            bookid: event.currentTarget.dataset.bookid
          },
          success: function (res) {
            console.log(res)
          },
          fail: console.error
        })
        // console.log(parseInt(stuid))
        // db.collection("book").doc(event.currentTarget.dataset._id).update({
        //   data: {
        //     lender: parseInt(stuid)
        //   }
        // })
      }
    })
    var bookid = event.currentTarget.dataset.bookid
    db.collection("record").where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        var flag = true
        for (var i = 0; i < res.data[0].isreading.length; i++) {
          console.log(res.data[0].isreading[i])
          console.log(bookid)
          if (bookid == res.data[0].isreading[i]) {
            flag = false
          }
        }
      }
    })
  },

  changeinputval(ev) {
    console.log(ev);
    this.setData({
      inputval: ev.detail.value
    })
  },

  deletemsg(ev) {
    var n = ev.target.dataset.index;
    var list = app.globalData.bookinfo;
    list.splice(n, 1);
    this.setData({
      bookinfo: list
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    inputval: '',
    bookinfo: [],
    bookid: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("student").where({
      _openid:app.globalData.openid
    }).get({
      success:res=>{
        console.log("11111"+res.data[0].studentid)
        db.collection("book").where({
          lender: parseInt(res.data[0].studentid),
        }).get({
          success: res => {
            console.log("&&&&&&&&&&&!"+res.data[0])
            this.setData({
              bookinfo: res.data
            })
            console.log(bookinfo)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    app.getBookInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})