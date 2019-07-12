// pages/inspect/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
    state:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      state: e.detail.value,
    });
  },
  bindcontentInput: function (e) {
    this.data.content = e.detail.value
  },
  onLoad: function (options) {
    let id = options.id
    wx.request({
      url: this.data.serverUrl + 'api/equipment?a=detail&id=' + id,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      success: res => {
        if (res.statusCode === 200) {
          console.log(res.data)
          this.setData({
            equipment:res.data
          })
          wx.request({
            url: this.data.serverUrl + 'api/risk?a=steps&type=equipment',
            header: {
              'content-type': 'application/json', // 默认值
              'Cookie': wx.getStorageSync("sessionid"),
            },
            method:'post',
            data:{'name':res.data.name,'id':res.data.id,'areaid':res.data.area__id},
            success: res => {
              if (res.statusCode === 200) {
                if(res.data.code==1){
                  this.setData({
                    steps:res.data.steps
                  })
                }
              }
              wx.hideLoading();
            }
          });
        }
      }
    });
  },
submit:function(){
  let data={
    equipment:this.data.equipment.id,
    state:this.data.state,
    content:this.data.content
  }
  wx.showLoading({
    title: '提交中',
  })
  wx.request({
    url: this.data.serverUrl + 'api/inspect?a=add',
    header: {
      'content-type': 'application/json', // 默认值
      'Cookie': wx.getStorageSync("sessionid"),
    },
    method:'POST',
    data:data,
    success: res => {
      if (res.statusCode === 200) {
        console.log(res.data)
        wx.navigateBack({
          
        })
      }
      wx.hideLoading();
    }
  });
},
  submit2: function () {
    wx.navigateTo({
      url: '/pages/trouble/addtrouble?type=inspect',
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