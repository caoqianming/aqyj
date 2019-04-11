// pages/miss/missdetail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWsdetail(options.missid);
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
  missimgPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.missimg
    })
  },
  getWsdetail: function (missid) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/miss?a=detail&missid=' + missid,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {
        },
        success: res => {
          wx.hideLoading();
          console.log(res.data);
          if (res.statusCode === 200) {
            var wsdata = res.data
            //格式化观察信息
            for (var i = 0; i < wsdata.missimg.length; i++) {
              wsdata.missimg[i] = this.data.serverUrl + wsdata.missimg[i];
            }
            if (wsdata.misstime != '') { wsdata.misstime = util.formatTime(new Date(wsdata.misstime)) }
            if (wsdata.submittime != '') { wsdata.submittime = util.formatTime(new Date(wsdata.submittime)) }
            this.setData(wsdata)
          }
        }
      });
  },
})