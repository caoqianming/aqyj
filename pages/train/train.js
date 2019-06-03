//var base64 = require("../images/base64");
var sliderWidth = 96;
var util = require('../../utils/util.js')
Page({
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl,
    allpxlist: [],
    tabs: ["我发布的", "我参加的", "全部"],
    activeIndex: 1,
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
      that.getfqpxlist(1)
      that.data.fqpage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.getcjpxlist(1)
      that.data.cjpage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallpxlist(1)
      that.data.page = 1
    }
  },
  getallpxlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.page }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl + 'pxhandle?a=listall&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  alltotal: 0,
                  allpxlist: []
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
                list = this.data.allpxlist.concat(res.data.rows)
              }
              this.setData({
                alltotal: res.data.total,
                allpxlist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  getfqpxlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.fqpage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl + 'pxhandle?a=listtodo&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  fqtotal: 0,
                  fqpxlist: []
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
                list = this.data.fqpxlist.concat(res.data.rows)
              }
              this.setData({
                fqtotal: res.data.total,
                fqpxlist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  getcjpxlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.cjpage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'pxhandle?a=listcj&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  cjtotal: 0,
                  cjpxlist: []
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
                list = this.data.cjpxlist.concat(res.data.rows)
              }
              this.setData({
                cjtotal: res.data.total,
                cjpxlist: list
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
      that.getfqpxlist(1)
      that.data.fqpage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.getcjpxlist(1)
      that.data.cjpage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallpxlist(1)
      that.data.page = 1
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    if (that.data.activeIndex == 0) {
      that.getfqpxlist(1)
      wx.stopPullDownRefresh();
      that.data.fqpage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.getcjpxlist(1)
      wx.stopPullDownRefresh();
      that.data.cjpage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallpxlist(1)
      wx.stopPullDownRefresh();
      that.data.page = 1
    }
  },
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数

    var that = this;
    if (that.data.activeIndex == 0) {
      this.data.fqpage = this.data.fqpage + 1;
      this.getfqpxlist();
    }
    else if (that.data.activeIndex == 1) {
      this.data.cjpage = this.data.cjpage + 1;
      this.getcjpxlist();
    }
    else if (that.data.activeIndex == 2) {
      this.data.page = this.data.page + 1;
      this.getallpxlist();
    }
  },
  open: function () {

            wx.navigateTo({
              url: 'add',
            })

  },
  check:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        let pxid = util.getQueryString(res.result, 'trainid')
        wx.navigateTo({
          url: 'check?pxid='+pxid,
        })
      }
    })
  },
});