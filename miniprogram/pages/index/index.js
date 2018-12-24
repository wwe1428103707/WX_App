//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputNum:'',
    inputName:'',
    ishasseat: true,
    seatArea: null,
    seatFloor: null,
    seatNum: null,
    isRegiste : null,
  },

  signIn(){
    app.signin();
  },

  checkSeatStatus() {
    //去数据库中检查该用户是否有座位
    var flag = true;
    this.setData({
      ishasseat: flag,
    })
    console.log(flag);
    return flag;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkSeatStatus();
    this.changeRegiste();
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
    
  },

  changeInputNum(ev){
    this.setData({
      inputNum:ev.detail.value
    })
  },

  changeInputName(ev){
    this.setData({
      inputName:ev.detail.value
    })
  },

  bundleWXAccount(){
    //搜索数据库，查看是否存在或已被绑定
    console.log(this.data.inputName);
    console.log(this.data.inputNum);
    wx.getUserInfo({
      success: function(res){
        console.log(res.userInfo)
      }
    });
  },

  changeRegiste(){

  }

})
