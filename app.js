//app.js
App({
  onLaunch: function () {
    var that = this
    that.mplogin()
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
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.code == 1) {
              //console.log(res.header["Set-Cookie"])
              //console.log(res)
              wx.setStorageSync('userid', res.data.userid)
              wx.setStorageSync('username', res.data.username)
              wx.setStorageSync('sessionid', res.header["Set-Cookie"])
              wx.setStorageSync('mpopenid', res.data.mpopenid)
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
              // //获取隐患待办数目
              // wx.request({
              //   url: that.globalData.serverUrl + 'troublehandle?a=todonum',
              //   header: {
              //     'content-type': 'application/json', // 默认值
              //     'Cookie': wx.getStorageSync("sessionid"),
              //   },
              //   data: {},
              //   success: res => {
              //     if (res.statusCode === 200) {
              //       //console.log(res.data)
              //       that.globalData.yhtodonum = res.data.todonum
              //       if (that.globalData.yhtodonum > 0) {
              //         wx.setTabBarBadge({
              //           index: 1,
              //           text: '新'
              //         })
              //       }
              //     }
              //   }
              // });
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
  globalData: {
    userInfo: null,
    //serverUrl: 'https://safeyun.ctcshe.com/',
    serverUrl: 'http://127.0.0.1:8000/',
    //serverUrl: 'http://192.168.0.102:8000/',
    //serverUrl:'http://10.7.100.250:8000/',
    isaqy: 0
  },

})