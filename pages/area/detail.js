// pages/area/detail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromWx: false,
    riskact:0,
    riskactlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var areaid
    if (options.id) {
      areaid = options.id
    } else {
      let q = decodeURIComponent(options.q)
      if (q) {
        // console.log("index 生命周期 onload url=" + q) 
        // console.log("index 生命周期 onload 参数 trainid=" + util.getQueryString(q, 'trainid')) 
        areaid = util.getQueryString(q, 'id')
        this.setData({
          fromWx: true
        })
      }
    }
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/area?a=detail&id=' + areaid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            name: res.data.name,
          })

        }
        wx.hideLoading();
      }
    });
    wx.request({
      url: getApp().globalData.serverUrl + 'api/riskact?a=listall2&area='+areaid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      success: res => {
        if (res.statusCode === 200) {
            this.setData({
              total: res.data.total,
              riskactlist: res.data.rows
            })
          
        }
        wx.hideLoading();
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
    let riskact = this.data.riskact
    let riskactlist = this.data.riskactlist
    console.log(riskact,riskactlist)
    for(var i=0;i<riskactlist.length;i++){
      if(riskactlist[i].id==riskact){
        riskactlist[i]['checked']=true
      }
    }
    this.setData({
      riskactlist: riskactlist
    })
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