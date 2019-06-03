// pages/examtest/sheet.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  back: function (e) {
    console.log(e.currentTarget.dataset.index);
    var tmIndex = e.currentTarget.dataset.index
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      tmIndex:tmIndex
    })
    prevPage.showTm(tmIndex)
    prevPage.showChecked(tmIndex)
    wx.navigateBack({
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var tmlist = prevPage.tmdata.tms //取上页data里的数据也可以修改
    console.log(tmlist)
    this.setData({
      tmlist:tmlist
    })

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