// pages/risktask/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
    this.getlist()
  },
  getlist: function () {
    var page = this.data.page
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/riskcheck2?a=listall&riskacttask=' + this.data.id,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading()
          console.log(res.data)
          this.setData({
            total: res.data.total,
            alllist: res.data.rows
          })
        }
        wx.hideLoading();
      }
    });
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
})