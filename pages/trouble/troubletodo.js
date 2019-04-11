//var base64 = require("../images/base64");

Page({
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl
  },
  getYhlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.page }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'troublehandle?a=listtodo&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {},
        success: res => {
          if (res.statusCode === 200) {
            //console.log(res.data)
            let list
            if (page == 1) {
              list = res.data.rows
            } else {
              list = this.data.yhlist.concat(res.data.rows)
            }
            this.setData({
              total: res.data.total,
              yhlist: list
            }) 
          }
          wx.hideLoading();
        }
      });
  },
  onLoad: function () {
    // this.setData({
    //   icon: base64.icon20
    // });
  },
  onShow: function () {
    var that = this;
    that.getYhlist(1)
    this.data.page = 1;
  },
  onPullDownRefresh: function () {
    var that = this;
    that.getYhlist(1);
    wx.stopPullDownRefresh();
    this.data.page = 1;
  },
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数
    this.data.page = this.data.page + 1;
    this.getYhlist();
    wx.stopPullDownRefresh();

  },
});