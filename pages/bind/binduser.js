// pages/bind/binduser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  usernameChange: function (e) {
    this.data.username = e.detail.value
  },
  passwordChange: function (e) {
    this.data.password = e.detail.value
  },
  denglu: function(){
    var that=this
    console.log(that.data)
    wx.request({
      url: getApp().globalData.serverUrl + 'bindmp',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 
      },
      method: 'POST',
      data:that.data,
      success: res => {
        if (res.statusCode === 200) {
          if (res.data.code == 1) {
            wx.showToast({})
            getApp().mplogin()
            wx.switchTab({
              url: '/pages/main/main',
            })
          }else{
            wx.showModal({
              content: '账户或密码不正确！',
              showCancel: false,
              confirmText: "确定"
            })
          }
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mpopenid:wx.getStorageSync('mpopenid')
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
    wx.hideHomeButton()
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
  intro:function(){
    let fileurl = getApp().globalData.serverUrl + 'media/安全生产管理系统-国检集团.docx'
    wx.showLoading({
      title: '下载中...',
    })
    console.log(fileurl)
    wx.downloadFile({
      url: fileurl,
      success(res) {
        const filePath = res.tempFilePath
        console.log(filePath)
        var filetype
        if (fileurl.indexOf(".docx") != -1) {
          filetype = 'docx'
        }
        wx.openDocument({
          filePath,
          fileType: filetype,
          success(res) {
            wx.hideLoading()
            console.log('打开文档成功')
          }, fail: function (e) {
            console.log(e)
          }
        })
      }
    })
  }
})