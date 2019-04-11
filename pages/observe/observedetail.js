var util = require('../../utils/util.js')
// pages/observe/observedetail.js
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
    this.getGcdetail(options.lookid);
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
  lookimgPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.lookimg
    })
  },
  getGcdetail: function (lookid) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl + 'gchandle?a=detail&lookid=' + lookid,
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
            var gcdata = res.data
            //格式化观察信息
            for (var i = 0; i < gcdata.lookimg.length; i++) {
              gcdata.lookimg[i] = this.data.serverUrl + gcdata.lookimg[i];
            }
            if (gcdata.looktime != '') { gcdata.looktime = util.formatTime(new Date(gcdata.looktime)) }
            if (gcdata.submittime != '') { gcdata.submittime = util.formatTime(new Date(gcdata.submittime)) }
            this.setData(gcdata)
          }
        }
      });
  },
})