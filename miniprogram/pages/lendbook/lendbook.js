// pages/bookinfo/bookinfo.js
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

  lendBook: function(event) {
    console.log(event.currentTarget.dataset.name);
    const _ = db.command
    var bookid
    db.collection("book").where({
      bookname: event.currentTarget.dataset.name,
    }).get({
      success: res => {
        bookid = res.data[0].bookid
        console.log(bookid)
        console.log(app.globalData.openid)
        db.collection("record").where({
          _openid: app.globalData.openid
        }).get({
          success: res => {
            console.log(res.data[0]._id)
            db.collection("record").doc(res.data[0]._id).update({
              data: {
                isreading: _.push(bookid)
              }
            })
          }
        })

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
    bookinfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection("book").where({
      lender: null,
    }).get({
      success: res => {
        this.setData({
          bookinfo: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    app.getBookInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})