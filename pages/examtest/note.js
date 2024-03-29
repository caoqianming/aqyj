// pages/examtest/note.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testdisable:false,
    fromWx:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var examtestid
    if (options.id) {
      examtestid = options.id
    } else {
      let q = decodeURIComponent(options.q)
      if (q) {
        examtestid = util.getQueryString(q, 'id')
        this.setData({
          fromWx: true
        })
      }
    }
    wx.request({
      url: getApp().globalData.serverUrl + 'api/examtest?a=detail&id='+examtestid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      success: res => {
        if (res.statusCode === 200) {
          let ksdata = res.data
          if (ksdata.starttime != null) { 
            let st = new Date(ksdata.starttime)
            if(new Date()<st){
              this.setData({
                testdisable:true
              })
            }
            }
          if (ksdata.endtime != null) { 
            let et = new Date(ksdata.endtime)
            if (new Date() > et) {
              this.setData({
                testdisable: true
              })
            }
            }
          this.setData(res.data)
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

  },
  start: function () {
        wx.reLaunch({
          url: 'main?id='+this.data.id,
        })
  },
})