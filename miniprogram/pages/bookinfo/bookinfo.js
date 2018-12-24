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
    db.collection("book").get({
      success:res=>{
        this.setData({
          bookinfo:res.data
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