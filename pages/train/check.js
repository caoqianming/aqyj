// pages/bind/binduser.js
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
    // let pxid = options.pxid
    console.log(options)
    let pxid
    if(options.pxid){
      pxid = options.pxid
      this.setData({
        pxid: pxid,
        isfrom:1
      })
    }else{
      let q = decodeURIComponent(options.q)

      if (q) {
        // console.log("index 生命周期 onload url=" + q) 
        // console.log("index 生命周期 onload 参数 trainid=" + util.getQueryString(q, 'trainid')) 
        pxid = util.getQueryString(q, 'trainid')
        this.setData({
          pxid: pxid,
          isfrom: 0
        })
      }
    }
    
    console.log(pxid)
    
    this.getPx(pxid)
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
            if(pxdata.state==1){
              this.setData({
                disabled:true
              })
            }
            //console.log(this.data.yhzt)
          }
        }
      });
  },
  checkconfirm:function(){
    wx.request({
      url: getApp().globalData.serverUrl + 'pxhandle?a=check&trainid=' + this.data.pxid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        wx.hideLoading();
        if (res.statusCode === 200) {
          if(this.data.isfrom==1){
            wx.showToast({
              title: '签到成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack()
          }else{
            wx.showToast({
              title: '签到成功！',
            })
            wx.navigateTo({
              url: '../train/train',
            })
          }
          

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