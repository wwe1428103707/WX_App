Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  transBook(){
    wx.navigateTo({
      url: '/pages/tranbook/transbook',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  readrecord(){
    wx.navigateTo({
      url: '/pages/readrecord/readrecord',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  lendBook(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/lendbook/lendbook',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bookInfo(){
    console.log('查看馆藏信息...')
    wx.navigateTo({
      url: '/pages/bookinfo/bookinfo',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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