// pages/inspect/detail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromWx:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var riskactid
    if (options.id) {
      riskactid = options.id
    } else {
      let q = decodeURIComponent(options.q)
      if (q) {
        // console.log("index 生命周期 onload url=" + q) 
        // console.log("index 生命周期 onload 参数 trainid=" + util.getQueryString(q, 'trainid')) 
        riskactid = util.getQueryString(q, 'id')
        this.setData({
          fromWx: true
        })
      }
    }
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/riskact?a=detail&id=' + riskactid,
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading()
          this.setData(res.data.data)
        }
      }
    })
  },
check:function(){
wx.redirectTo({
  url: 'check?riskact='+this.data.id,
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