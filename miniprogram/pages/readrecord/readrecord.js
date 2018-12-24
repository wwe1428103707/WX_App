// pages/readrecord/readrecord.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasreadbookinfo: [],
    readingbookinfo: [],
    readingbookid:[],
    hasreadbookid:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("record").where({
      _openid: app.globalData.openid
    }).get({
      success:res=>{
        // console.log("+++++++++", res.data[0].hasread)
        // this.setdata({
        //   hasreadbookid: res.data[0].hasread,
        //   readingbookid:res.data[0].isreading
        // })
        // this.data.readingbookid = res.data[0].isreading;
        // this.data.hasreadbookid = res.data[0].hasread;
        this.setData({
          readingbookid : res.data[0].isreading,
          hasreadbookid : res.data[0].hasread
        })
        console.log(this.data.hasreadbookid)
        for (var i = 0; i < this.data.hasreadbookid.length; i++) {
          db.collection("book").where({
            bookid: this.data.hasreadbookid[i]
          }).get({
            success: res => {
              console.log("++++++++", res.data[0].bookname)
              var list = this.data.hasreadbookinfo;
              list.push(res.data[0].bookname);
              this.setData({
                hasreadbookinfo: list
              })
            }
          })
        };
        for (var i = 0; i < this.data.readingbookid.length; i++) {
          db.collection("book").where({
            bookid: this.data.readingbookid[i]
          }).get({
            success: res => {
              var list = this.data.readingbookinfo;
              list.push(res.data[0].bookname);
              this.setData({
                readingbookinfo: list
              })
            }
          })
        };
        // for(var i=0;i<res.data[0].hasread.length;i++){
        //   console.log("-----------------")
        //   console.log(res.data[0].hasread[i])
        //   wx.database().collection("book").where({
        //     bookid: res.data[0].hasread[i]
        //   }).get({
        //     success:rres=>{
        //       console.log(rres.data)
        //       var list = this.data.hasreadbookinfo;
        //       list.push({
        //         msg:rres.data[0].bookname
        //       })
        //       this.setdata({
        //         hasreadbookinfo:list
        //       })
        //     },
        //     fail:err=>{
        //       console.log(err)
        //     }
        //   })
        // };
        // for (var i = 0; i < res.data[0].isreading.length; i++) {
        //   wx.database().collection("book").where({
        //     bookid: res.data[0].isreading[i]
        //   }).get({
        //     success: rres => {
        //       var list = this.data.readingbookinfo;
        //       list.push({
        //         msg: rres.data[0].bookname
        //       })
        //       this.setdata({
        //         readingbookinfo: list
        //       })
        //     }
        //   })
        // };
      }
    });
    console.log("+++++++++++++++++++",this.data.hasreadbookid)
    // for (var i = 0; i < this.data.hasreadbookid.length;i++){
    //   db.collection("book").where({
    //     bookid: this.data.hasreadbookid[i]
    //   }).get({
    //     success:res=>{
    //       console.log("++++++++",res.data[0].bookname)
    //       var list = this.data.hasreadbookinfo;
    //       list.push(res.data[0].bookname);
    //       this.setData({
    //         hasreadbookinfo:list
    //       })
    //     }
    //   })
    // };
    // for (var i = 0; i < this.data.readingbookid.length; i++) {
    //   db.collection("book").where({
    //     bookid: this.data.readingbookid[i]
    //   }).get({
    //     success: res => {
    //       var list = this.data.readingbookinfo;
    //       list.push(res.data[0].bookname);
    //       this.setData({
    //         readingbookinfo: list
    //       })
    //     }
    //   })
    // };
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