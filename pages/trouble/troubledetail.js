// pages/trouble/troubledetail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl
  },
  getYhdetail: function (troubleid) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl+'troublehandle?a=detail&troubleid=' + troubleid,
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
            var yhdata = res.data
            //格式化隐患信息
            for (var i = 0; i < yhdata.yhtp.length; i++) {
              yhdata.yhtp[i] = this.data.serverUrl + yhdata.yhtp[i];
            }
            for (var i = 0; i < yhdata.zghtp.length; i++) {
              yhdata.zghtp[i] = this.data.serverUrl + yhdata.zghtp[i];
            }
            // if (yhdata.fxsj != '') { yhdata.fxsj = util.formatTime(new Date(yhdata.fxsj)) }
            // if (yhdata.zgqx != '') { yhdata.zgqx = util.formatTime(new Date(yhdata.zgqx)) }
            
            // for (var i = 0; i < yhdata.lcxq.length; i++) {
            //   yhdata.lcxq[i]['accesssj'] = util.formatTime(new Date(res.data.lcxq[i]['accesssj']));
            // }
            this.setData(yhdata)
          }
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.getYhdetail(options.troubleid);
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
  yhtpPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.yhtp
    })
  },
  zghtpPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.zghtp
    })
  }
})