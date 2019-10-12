// pages/operation/operationcheck.js
var util = require('../../utils/util.js')
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
    tabs: ["作业详情","流程详情"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  tabClick: function (e) {
    var that = this
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
            //console.log(this.data.yhzt)
          }
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fromwx = options.fromwx
    if(fromwx==1){
      var pages = getCurrentPages();//页面指针数组
      var prepage = pages[pages.length - 2];//上一页面指针
      var zydata = prepage.data
      //格式化信息
      for (var i = 0; i < zydata.zyimg.length; i++) {
        zydata.zyimg[i] = this.data.serverUrl + zydata.zyimg[i];
      }
      for (var i = 0; i < zydata.zyimg2.length; i++) {
        zydata.zyimg2[i] = this.data.serverUrl + zydata.zyimg2[i];
      }
      this.setData(zydata)
    }else{
      this.getZy(options.zyid);
    }
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
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