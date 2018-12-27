const db=wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishasseat : false,
    seatArea : null,
    seatFloor : null,
    seatNum : null,
    mylearntime : 0,
  },

  checkSeatStatus(){
    //去数据库中检查该用户是否有座位
    var flag = true;
    if(this.data.seatNum == null){
      flag = false
    }
    this.setData({
      ishasseat : flag,
    })
    console.log(flag);
    return flag;
  },

  orderSeat(){
    console.log('正在前往预约界面');
  },

  signIn(){
    console.log("签到中...");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("signin").where({
      _openid:app.globalData.openid
    }).get({
      success:res=>{
        this.setData({
          mylearntime:(res.data[0].day*7)
        })
      }
    });
    db.collection("seat").where({
      studentId: app.globalData.studentId
    }).get({
      success:res=>{
        this.setData({
          seatArea: res.data[0].seatArea,
          seatFloor: res.data[0].seatFloor,
          seatNum: res.data[0].seatNum,
        });
        this.checkSeatStatus();
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