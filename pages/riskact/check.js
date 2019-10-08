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
            this.setData({
              total: res.data.total,
              alllist: res.data.rows
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
    let data = {'checks':[],'riskact':this.data.riskact}
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
      url: getApp().globalData.serverUrl + 'api/riskcheck2?a=add',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: data,
      success: res => {
        if (res.statusCode === 200) {
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面

          //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            riskact: this.data.riskact
          });
          wx.navigateBack({
          })
        }
        wx.hideLoading();
      }
    });
  },
})