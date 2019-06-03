// pages/safecert/safecert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var that = this;
    that.getsafecertlist()
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
  getsafecertlist: function () {
    wx.showLoading({ title: '加载中', }),
      wx.request({
        url: getApp().globalData.serverUrl + 'api/user?a=detailself',
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        method: 'GET',
        data: {},
        success: res => {
          wx.hideLoading();
          if (res.statusCode === 200) {
            if (res.data['userprofile__cardnum'] == null || res.data['userprofile__realname'] == null | res.data['userprofile__cardnum'] == '' || res.data['userprofile__realname'] == '') {
              wx.showModal({
                title: '系统提示',
                content: '个人信息管理里身份证等信息缺失,无法查询,是否去完善?',
                confirmText: "确定",
                cancelText: "取消",
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../user/userdetail',
                    })
                  } else {
                    wx.navigateBack({

                    })
                  }
                }
              })
            }
            else {
              wx.showLoading({ title: '查询中', }),
                wx.request({
                  url: getApp().globalData.serverUrl + 'api/safecert?a=listself',
                  header: {
                    'content-type': 'application/json', // 默认值
                    'Cookie': wx.getStorageSync("sessionid"),
                  },
                  success: res => {
                    if (res.statusCode === 200) {
                      //console.log(res.data)
                      this.setData({
                        total: res.data.total,
                        safecertlist: res.data.rows
                      })
                    }
                    if (res.data.total == 0) {
                      wx.request({
                        url: getApp().globalData.serverUrl + 'api/safecert?a=addspiderself',
                        header: {
                          'content-type': 'application/json', // 默认值
                          'Cookie': wx.getStorageSync("sessionid"),
                        },
                        method: 'GET',
                        data: {},
                        success: res => {
                          wx.hideLoading();
                          if (res.statusCode === 200) {
                            wx.request({
                              url: getApp().globalData.serverUrl + 'api/safecert?a=listself',
                              header: {
                                'content-type': 'application/json', // 默认值
                                'Cookie': wx.getStorageSync("sessionid"),
                              },
                              success: res => {
                                if (res.statusCode === 200) {
                                  //console.log(res.data)
                                  this.setData({
                                    total: res.data.total,
                                    safecertlist: res.data.rows
                                  })
                                }
                                if (res.data.total == 0) {
                                  wx.showModal({
                                    title: '系统提示',
                                    content: '联网查询无证书,是否个人信息有误!',
                                    confirmText: "是",
                                    cancelText: "算了",
                                    success: function (res) {
                                      if (res.confirm) {
                                        wx.navigateTo({
                                          url: '../user/userdetail',
                                        })
                                      }
                                    }
                                  })
                                }
                              }
                            });
                          }
                        }
                      });

                    } else {
                      wx.hideLoading();
                    }
                  }
                });
            }
          }
        }
      });

  },
})