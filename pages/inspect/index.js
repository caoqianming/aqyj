// pages/observe/observe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl,
    xjlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    that.getXjlist(1)
    this.data.page = 1;
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
  check: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        if (res.result.indexOf("equipment") != -1) {
          let id = res.result.split('=')[1]
          wx.navigateTo({
            url: 'add?id=' + id,
          })
        } else {
          wx.showModal({
            title: "系统提示",
            content: '请扫设备二维码!',
            showCancel: false,
            confirmText: "确定"
          })
        }      
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  /**
   * 页面上拉触底事件的处理函数
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPullDownRefresh: function () {
    var that = this;
    that.getXjlist(1);
    wx.stopPullDownRefresh();
    this.data.page = 1;
  },
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数
    this.data.page = this.data.page + 1;
    this.getXjlist();

  },
  getXjlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.page }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/inspect?a=listall&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  total: 0,
                  xjlist: []
                })
              }
              else {
                wx.showModal({
                  content: "已经到底啦!",
                  showCancel: false,
                  confirmText: "确定",
                })
              }
            } else {
              let list
              if (page == 1) {
                list = res.data.rows
              } else {
                list = this.data.xjlist.concat(res.data.rows)
              }
              this.setData({
                total: res.data.total,
                xjlist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
})