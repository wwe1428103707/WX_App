//app.js
App({

  signin() {
    // var isRegiste = false;
    const db = wx.cloud.database();
    // console.log(this.globalData.openid);
    console.log(this.globalData.openid)
    db.collection('signin').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        console.log("数据库ID", res.data[0]._openid);
        console.log(this.globalData.openid)
        console.log(res)
        this.globalData.day = res.data[0].day,
          this.globalData.lastday = res.data[0].lastday,
          this.globalData._id_signin = res.data[0]._id
        // if (res.data[0]._openid == this.globalData.openid) {
        // this.globalData.isRegiste = true;
        // console.log("查询到记录");
        // console.log("ggggggg")
        // this.globalData.day = res.data[0].day;
        // this.globalData.lastday = res.data[0].lastday;
        // console.log(day)
        // console.log(lastday)
        // console.log(res.data[0].day,res.data[0].lastday)
        // }
        // else{
        //   this.globalData.isRegiste = false;
        //   console.log("未查询到记录");
        //   db.collection('signin').add({
        //     data: {
        //       day: 1,
        //       lastday: 1,
        //       isSignIn: true,
        //     },
        //     success: res => {
        //       this.globalData.isSignIn = true;
        //       wx.showToast({
        //         title: '签到成功',
        //       })
        //       console.log("数据库签到成功", res._id);
        //     },
        //     fali: err => {
        //       wx.showToast({
        //         title: '签到失败，请重试',
        //       })
        //       console.log('签到失败', err)
        //     }
        //   })
        // }
      },
      fail: err => {
        console.log("未查询到记录")
        this.globalData.isRegiste = false;
      }
    })
    // console.log(this.globalData.isRegiste)
    // if (this.globalData.isRegiste==false){
    //   db.collection('signin').add({
    //     data: {
    //       day: 1,
    //       lastday: 1,
    //       isSignIn: true,
    //     },
    //     success: res => {
    //       this.globalData.isSignIn = true;
    //       wx.showToast({
    //         title: '签到成功',
    //       })
    //       console.log("数据库签到成功", res._id);
    //     },
    //     fali: err => {
    //       wx.showToast({
    //         title: '签到失败，请重试',
    //       })
    //       console.log('签到失败', err)
    //     }
    //   })
    // }
    // else{
    //   db.collection('signin').doc(this.globalData.openid).update({
    //     data:{
    //       lastday:this.lastday+1,
    //       day:this.day+1
    //     },
    //     success:res=>{
    //       this.globalData.isSignIn = true;
    //       wx.showToast({
    //         title: '签到成功',
    //       })
    //       console.log("数据库更新到成功", res._id);
    //     },
    //     fali: err => {
    //       wx.showToast({
    //         title: '签到失败，请重试',
    //       })
    //       console.log('签到失败', err)
    //     }
    //   })

    // }
    db.collection('signin').doc(this.globalData._id_).update({
      data: {
        lastday: db.command.inc(1),
        day: db.command.inc(1)
      },
      success: res => {
        this.globalData.isSignIn = true;
        wx.showToast({
          title: '签到成功',
        })
        console.log("数据库更新到成功", res.data._openid);
      },
      fali: err => {
        wx.showToast({
          title: '签到失败，请重试',
        })
        console.log('签到失败', err)
      }
    })
  },


  onLaunch: function() {

    var code = null;

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.login({
      success: res => {
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid)
            this.globalData.openid = res.result.openid
            console.log("!!!!!!!!!" + this.globalData.openid)
          }
        })
      }
    })

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  console.log('[云函数] [login] user openid: ', res.result.openid)
                  this.globalData.openid = res.result.openid;
                  console.log(this.globalData.openid)
                  this.checkDB()
                },
                fail: err => {
                  console.error("fail get openid")
                }
              })
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.changeUserInfo(this.globalData.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              };
            }
          })
        }
      },
    })
    this.globalData = {}
  },

  globalData: {
    userInfo: null,
    nickName: null,
    avatarUrl: null,
    gender: null, //性别 0：未知、1：男、2：女,
    province: null,
    city: null,
    country: null,
    isRegiste: false,
    studentId: null,
    studentName: null,
    openid: null,
    lastday: null,
    day: null,
    isRegiste: false,
    _id: null,
    bookinfo:[],
  },

  //改变用户的信息
  changeUserInfo(userInfo) {
    this.globalData.userInfo = userInfo,
      this.globalData.nickName = userInfo.nickName,
      this.globalData.avatarUrl = userInfo.avatarUrl,
      this.globalData.gender = userInfo.gender, //性别 0：未知、1：男、2：女,
      this.globalData.province = userInfo.province,
      this.globalData.city = userInfo.city,
      this.globalData.country = userInfo.country
    console.log(this.globalData.nickName)
  },

  jumptoRegiste() {
    console.log(this.globalData.isRegiste)
    if (this.globalData.isRegiste == false) {
      wx.navigateTo({
        url: '/pages/index/registe'
      })
    }
  },

  getBookInfo(){
    const db = wx.cloud.database()
    db.collection('book').get({
      success:res=>{
        this.globalData.bookinfo = res.data
        console.log(res.data)
        return res.data
      }
    })
  },


  //检查数据库里是否已有该用户的注册信息
  checkDB() {
    //检查数据库中是否有这个用户
    const db = wx.cloud.database()
    db.collection('student').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        if (res.data[0]._openid == this.globalData.openid) {
          this.globalData.isRegiste = true;
          console.log("checkDB!", this.globalData.openid)
          console.log(this.globalData.isRegiste)
          wx.navigateBack({
            
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
    return this.globalData.isRegiste;
  }
})