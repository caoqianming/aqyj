//app.js
App({
  onLaunch: function () {
    var that = this
    that.mplogin()
    setInterval(that.reflesh,20*60*1000)
  },
  mplogin: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.serverUrl + 'mplogin',
          data: {
            code: res.code
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.data.code == 1) {
              //console.log(res.header["Set-Cookie"])
              console.log(res)
              wx.setStorageSync('userid', res.data.userid)
              wx.setStorageSync('username', res.data.username)
              if (res.header.hasOwnProperty('Set-Cookie')){
                wx.setStorageSync('sessionid', res.header["Set-Cookie"])
              }else{
                wx.setStorageSync('sessionid', res.header["set-cookie"])
              }
              wx.setStorageSync('mpopenid', res.data.mpopenid)
              //console.log(res.header["Set-Cookie"])
              //console.log(wx.getStorageSync("sessionid"))
              if (that.callback) { //这个函数名字和你定义的一样即可
                that.callback() //执行定义的回调函数
              }
              
              //获取是否是安全员
              wx.request({
                url: that.globalData.serverUrl + 'api/user?a=checkaqy',
                header: {
                  'content-type': 'application/json', // 默认值
                  'Cookie': wx.getStorageSync("sessionid"),
                },
                data: {},
                success: res => {
                  if (res.data.code == 1) {
                    //console.log(res.data)
                    that.globalData.isaqy = 1
                  }
                  console.log(that.globalData.isaqy)
                }
              });
              //拉取权限
              wx.request({
                url: getApp().globalData.serverUrl + 'api/rights?a=have',
                header: {
                  'content-type': 'application/json', // 默认值
                  'Cookie': wx.getStorageSync("sessionid"),
                },
                data: {},
                success: res => {
                  if (res.statusCode === 200) {
                    console.log(res.data.rights)
                    that.globalData.rights = res.data.rights
                  }

                }
              });
            } else {
              wx.setStorageSync('mpopenid', res.data.mpopenid)
              wx.reLaunch({
                url: '/pages/bind/binduser?mpopenid=' + res.data.mpopenid,
              })
            }
          },
        })
      }
    })
  },
  reflesh: function(){//刷新session
    var that = this
    wx.request({
      url: that.globalData.serverUrl + 'api/check_session',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
      }
    });
  },
  globalData: {
    userInfo: null,
    serverUrl: 'https://safeyun.ctcshe.com/',
    //serverUrl: 'http://127.0.0.1:8000/',
    //serverUrl: 'http://192.168.0.102:8000/',
    //serverUrl:'http://10.7.100.250:8000/',
    isaqy: 0,
    timepass:null //定时器
  },

})