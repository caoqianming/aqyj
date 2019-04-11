// pages/main/main.js
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
    var that = this
    //获取待阅读通知数目
    if(wx.getStorageSync("sessionid")){
      this.getnoread()
      this.getyhtodonum()
      this.getzytodonum()
      this.getpxqdnum()
    }else{
      getApp().callback = () => {
      this.getnoread()
      this.getyhtodonum()
      this.getzytodonum()
      this.getpxqdnum()
      };
    }

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
  getnoread: function(){
    wx.request({
      url: getApp().globalData.serverUrl + 'api/notice?a=noreadnum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            noread: res.data.noread,
          })
        }
      }
    });
  },
  getyhtodonum:function(){
    var that = this
    //获取隐患待办数目
    wx.request({
      url: getApp().globalData.serverUrl + 'troublehandle?a=todonum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            yhtodonum: res.data.todonum,
          })
        }
      }
    });
  },
  getzytodonum: function () {
    var that = this
    //获取作业待办数目
    wx.request({
      url: getApp().globalData.serverUrl + 'api/operation?a=todonum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            zytodonum: res.data.todonum,
          })
        }
      }
    });
  },
  getpxqdnum:function(){
    var that = this
    //获取待签到培训
    wx.request({
      url: getApp().globalData.serverUrl + 'pxhandle?a=dqdnum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            dqdnum: res.data.dqdnum,
          })
        }
      }
    });
  }
})