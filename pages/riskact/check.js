// pages/risktask/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    riskact: 0,
    group: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.riskact = options.riskact
    this.getlist()
  },
  getlist: function () {
    var page = this.data.page
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/risk?a=listall&riskact=' + this.data.riskact,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.rows.length == 0) {
            if (page == 1) {
              this.setData({
                total: 0,
                alllist: []
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
              list = this.data.alllist.concat(res.data.rows)
            }
            this.setData({
              total: res.data.total,
              alllist: list
            })
          }
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
  open: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/trouble/addtrouble?type=riskcheck&index=' + e.currentTarget.dataset.index,
    })
  },
  submit: function () {
    console.log(this.data.alllist)
    let alllist = this.data.alllist
    let data = {'checks':[]}
    for (var i = 0; i < alllist.length; i++) {
      if (i.trouble != undefined){
        data.checks.push({ 'id': alllist[i].id })
      }
      else{
        data.checks.push({ 'id': alllist[i].id, 'trouble': alllist[i].trouble })
      }
    }
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/riskcheck?a=add',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: data,
      success: res => {
        if (res.statusCode === 200) {
          wx.navigateBack({
          })
        }
        wx.hideLoading();
      }
    });
  },
})