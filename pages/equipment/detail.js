// pages/equipment/detail.js
var util = require('../../utils/util.js')
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
    var equipmentid
    if(options.id){
      equipmentid = options.id
    }else{
      let q = decodeURIComponent(options.q)
      if (q) {
        // console.log("index 生命周期 onload url=" + q) 
        // console.log("index 生命周期 onload 参数 trainid=" + util.getQueryString(q, 'trainid')) 
        equipmentid = util.getQueryString(q, 'id')
      }
    }
    wx.request({
      url: getApp().globalData.serverUrl + 'api/equipment?a=detail&id=' + equipmentid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
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

  }
})