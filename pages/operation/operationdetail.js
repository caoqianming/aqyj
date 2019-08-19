// pages/operation/operationcheck.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
  },
  getZy: function (zyid) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/operation?a=detail&zyid=' + zyid,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {},
        success: res => {
          wx.hideLoading();
          if (res.statusCode === 200) {
            var zydata = res.data
            //格式化信息
            for (var i = 0; i < zydata.zyimg.length; i++) {
              zydata.zyimg[i] = this.data.serverUrl + zydata.zyimg[i];
            }
            for (var i = 0; i < zydata.zyimg2.length; i++) {
              zydata.zyimg2[i] = this.data.serverUrl + zydata.zyimg2[i];
            }
            this.setData(zydata)
            switch (zydata.zyzt) {
            }
            //console.log(this.data.yhzt)
          }
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZy(options.zyid);
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
  zyimgPreview: function (e) {
    var current = e.target.dataset.src
console.log(this.data.zyimg)
    wx.previewImage({
      current: current,
      urls: this.data.zyimg
    })
  },
  zyimg2Preview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.zyimg2
    })
  },
})