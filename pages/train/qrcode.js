// pages/bind/binduser.js
var util = require('../../utils/util.js')
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
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
    let pxid = options.pxid
    this.setData({
      pxid: pxid
    })
    this.getPx(pxid)
    let text = 'https://safeyun.ctcshe.com/miniprogram/checktrain?trainid=' + pxid
    console.log(text)
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'qdQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      text: text,
      // v1.0.0+版本支持在二维码上绘制图片
      // image: {
      //   imageResource: '../../images/icon.png',
      //   dx: 70,
      //   dy: 70,
      //   dWidth: 60,
      //   dHeight: 60
      // }
    })
  },
  getPx: function (id) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: getApp().globalData.serverUrl + 'pxhandle?a=detail&trainid=' + id,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {},
        success: res => {
          wx.hideLoading();
          if (res.statusCode === 200) {
            var pxdata = res.data
            if (pxdata.starttime != '') { pxdata.starttime = util.formatTime(new Date(pxdata.starttime)) }
            this.setData(pxdata)

            //console.log(this.data.yhzt)
          }
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

  }
})