Page({
  data: {
    value: [],
  },
  selThis(e) {
    //console.log(e.detail);
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      yhqy:e.detail.id,
      yhqy__name:e.detail.name,
      missqy:e.detail.id,
      missqy__name:e.detail.name,
      zyqy__name:e.detail.name,
      zyqy:e.detail.id,
      jyqy:e.detail.id,
      jyqy__name:e.detail.name
    })
    wx.navigateBack()
  },
  onLoad: function (option) {
    wx.request({
      url: getApp().globalData.serverUrl + 'api/area?a=tree',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          var data = res.data
          console.log(data)
          this.setData({
            value: data
          })
        }
      }
    });
  },
});
