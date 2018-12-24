Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRegiste: false,
    avatarUrl : '',
    learntime: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var app = getApp()
    console.log(app.globalData.isRegiste)
    this.setData({
      isRegiste: app.globalData.isRegiste, //修改个人信息页面的是否注册变量
      avatarUrl : app.globalData.avatarUrl,
    })
    console.log(this.data.isRegiste);
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

  },


  registe() {
    wx.navigateTo({
      url: '/pages/index/registe',
    })
  },

  goToInformationCenter(){
    console.log('正在前往消息中心...');
  },

  goToSetting(){
    console.log('正在前往个人设置...')
  }

})