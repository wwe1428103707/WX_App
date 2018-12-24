//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputNum: '',
    inputName: '',
    mHidden : true
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
    this.onLoad()
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

  changeInputNum(ev) {
    this.setData({
      inputNum: ev.detail.value
    })
  },

  changeInputName(ev) {
    //弹出正在注册框
    this.setData({
      inputName: ev.detail.value
    })
  },

  jumpToRegiste(){},

  bundleWXAccount() {
    this.setData({
      mHidden: false
    })
    const db = wx.cloud.database()
    //搜索数据库，查看是否存在或已被绑定
    console.log(this.data.inputName);
    console.log(this.data.inputNum);
    console.log(app.globalData.openid);
    db.collection("record").add({
      data:{
        hasread:[],
        isreading:[],
        studentid: this.data.inputNum,
      },
      success: function (res) {

      },
      fail: function (err) {
        console.log("注册失败", err)
      },
    })
    db.collection("signin").add({
      data:{
        day: 0,
        lastday : 0,
      },
      success:function(res){

      },
      fail:function(err){
        console.log("注册失败", err)
      }
    })
    db.collection("student").add({
      data:{
        "studentid": this.data.inputNum,
        "studentname": this.data.inputName,
      },
      success:function(res){
        console.log("成功")
        wx.showToast({
          title: '注册成功',
        })
      },
      fail:function(err){
        console.log("注册失败",err)
      },
    })
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
      }
    });
    this.setData({
      mHidden: true
    })
    wx.navigateBack({
      
    })
  },

  cancelRegiste(){
    //取消注册
    this.setData({
      mHidden : true,
    })
    this.onShow();
  }

})
