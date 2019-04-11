//var base64 = require("../images/base64");
var sliderWidth = 96;
Page({
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl,
    allyhlist: [],
    tabs: ["我发起的", "待办", "全部"],
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
      that.getmyZylist(1)
      that.data.mypage = 1
      that.getzylxlist()
    }
    else if (that.data.activeIndex == 1) {
      that.gettodoZylist(1)
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallZylist(1)
      that.data.page = 1
    }
  },
  getallZylist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.page }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/operation?a=listall&rows=10&page=' + page,
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
                  allzylist: []
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
                list = this.data.allzylist.concat(res.data.rows)
              }
              this.setData({
                alltotal: res.data.total,
                allzylist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  getmyZylist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.mypage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/operation?a=listself&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  mytotal: 0,
                  myzylist: []
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
                list = this.data.myzylist.concat(res.data.rows)
              }
              this.setData({
                mytotal: res.data.total,
                myzylist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  gettodoZylist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.todopage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/operation?a=listtodo&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if(page==1){
                this.setData({
                  todototal: 0,
                  todozylist: []
                })
              }
              else{
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
                list = this.data.todozylist.concat(res.data.rows)
              }
              this.setData({
                todototal: res.data.total,
                todozylist: list
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
      that.getmyZylist(1)
      that.data.mypage = 1
      that.getzylxlist()
    }
    else if (that.data.activeIndex == 1) {
      that.gettodoZylist(1)
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallZylist(1)
      that.data.page = 1
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    if (that.data.activeIndex == 0) {
      that.getmyZylist(1)
      wx.stopPullDownRefresh();
      that.data.mypage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.gettodoZylist(1)
      wx.stopPullDownRefresh();
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallZylist(1)
      wx.stopPullDownRefresh();
      that.data.page = 1
    }
  },
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数

    var that = this;
    if (that.data.activeIndex == 0) {
      this.data.mypage = this.data.mypage + 1;
      this.getmyZylist();
    }
    else if (that.data.activeIndex == 1) {
      this.data.todopage = this.data.todopage + 1;
      this.gettodoZylist();
    }
    else if (that.data.activeIndex == 2) {
      this.data.page = this.data.page + 1;
      this.getallZylist();
    }
  },
  getzylxlist: function () {
    wx.request({
      url: getApp().globalData.serverUrl + 'getdickey?dicclass=33&a=combobox',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          let zylxlist=res.data
          let zylxtext = []
          for (var i = 0; i < zylxlist.length; i++) {
            zylxtext.push(zylxlist[i]['text'])
          }
          this.setData({
            zylxlist: zylxlist,
            zylxtext: zylxtext
          })
        }
      }
    })
  },
  open: function(){
    var that = this
    console.log(that.data.zylxlist)
    wx.showActionSheet({
      itemList: that.data.zylxtext,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          if(false){

          }else{
            wx.navigateTo({
              url: 'operationadd?zylx=' + that.data.zylxlist[res.tapIndex]['value'],
            })
          }
          
        }
      }
    });
  }
});