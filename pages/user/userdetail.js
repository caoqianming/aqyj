
// pages/user/userdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
    genderarray: ['男','女'],
    genderIndex:0,
    userprofile__realname:'',
    userprofile__cardnum:''
  },
  bindrealnameInput: function (e) {
    this.data.userprofile__realname = e.detail.value
  },
  bindcardnumInput: function (e) {
    this.data.userprofile__cardnum = e.detail.value
  },
  bindGenderChange: function(e){
    this.setData({
      genderIndex: e.detail.value,
      userprofile__gender: this.data.genderarray[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getUserdetail();
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
  getUserdetail: function(){
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/user?a=detailself',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        method:'GET',
        data: {
        },
        success: res => {
          wx.hideLoading();
          if (res.statusCode === 200) {
            var userdata = res.data
            this.setData(userdata)
            //console.log(userdata)
            if (userdata['userprofile__gender'] == '女') {
              this.setData({
                genderIndex: 1
              })
            }
            console.log(this.data)
          }
        }
      });
  },
  unbind: function () {
    var userid = wx.getStorageSync('userid')
    wx.showModal({
      title: '系统提示',
      content: '确定将平台账号与本微信号解绑吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.serverUrl + 'unbindmp',
            header: {
              'content-type': 'application/json', // 
              'Cookie': wx.getStorageSync("sessionid"),
            },
            method: 'POST',
            success: res => {
              if (res.statusCode === 200) {
                
                if (res.data.code == 1) {
                  wx.removeStorageSync('sessionid')
                  wx.showToast({})
                  wx.reLaunch({
                    url: '../bind/binduser',
                  })
                }
              }
            }
          });
        }
      }
    });
  },
  save:function(){
    var userdata = {
      realname: this.data.userprofile__realname,
      cardnum: this.data.userprofile__cardnum,
      gender: this.data.userprofile__gender
    }
    console.log(userdata)
    wx.showLoading()
    wx.request({
      url: getApp().globalData.serverUrl + 'api/user?a=editself',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: userdata,
      success: res => {
        if (res.statusCode === 200) {
          if (res.data.code == 1) {
            wx.hideLoading()
            wx.navigateBack()
            wx.request({
              url: getApp().globalData.serverUrl + 'api/socert?a=addspiderself',
              header: {
                'content-type': 'application/json', // 默认值
                'Cookie': wx.getStorageSync("sessionid"),
              },
              method: 'GET',
              data: {},
              success: res => {
              }
            });
          }
        }
      }
    });
  }

})