//var base64 = require("../images/base64");
var sliderWidth = 96;
Page({
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl,
    allyhlist: [],
    tabs: ["待考", "已考"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  tabClick: function (e) {
    var that = this
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (that.data.activeIndex == 0) {
      that.gettodokslist(1)
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.getyklist(1)
      that.data.page = 1
    }
  },
  getyklist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.page }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl + 'api/examtestdetail?a=listyk&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  yktotal: 0,
                  yklist: []
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
                list = this.data.yklist.concat(res.data.rows)
              }
              this.setData({
                yktotal: res.data.total,
                yklist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  gettodokslist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.todopage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/examtestdetail?a=listdk&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  todototal: 0,
                  todokslist: []
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
                list = this.data.todokslist.concat(res.data.rows)
              }
              this.setData({
                todototal: res.data.total,
                todokslist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  onLoad: function () {
    // this.setData({
    //   icon: base64.icon20
    // });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    console.log(that.data.activeIndex)
    if (that.data.activeIndex == 0) {
      that.gettodokslist(1)
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.getyklist(1)
      that.data.page = 1
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    if (that.data.activeIndex == 0) {
      that.gettodokslist(1)
      wx.stopPullDownRefresh();
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.getyklist(1)
      wx.stopPullDownRefresh();
      that.data.page = 1
    }
  },
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数

    var that = this;
    if (that.data.activeIndex == 0) {
      this.data.todopage = this.data.todopage + 1;
      this.gettodokslist();
    }
    else if (that.data.activeIndex == 1) {
      this.data.page = this.data.page + 1;
      this.getyklist();
    }
  },
});