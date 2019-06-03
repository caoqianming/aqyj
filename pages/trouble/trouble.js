//var base64 = require("../images/base64");
var sliderWidth = 96;
Page({
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl,
    allyhlist:[],
    tabs: ["我的", "待办", "全部"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  tabClick: function (e) {
    var that=this
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (that.data.activeIndex == 0) {
      that.getmyYhlist(1)
      that.data.mypage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.gettodoYhlist(1)
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallYhlist(1)
      that.data.page = 1
    }
  },
  getallYhlist: function(page){
    var that=this;
    if(page!=1){page=that.data.page}
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl +'troublehandle?a=listall&rows=10&page=' + page, 
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if(res.data.rows.length==0){
              if (page == 1) {
                this.setData({
                  alltotal: 0,
                  allyhlist: []
                })
              }
              else {
                wx.showModal({
                  content: "已经到底啦!",
                  showCancel: false,
                  confirmText: "确定",
                })
              }
            }else{
              let list
              if(page==1){
                list = res.data.rows
              }else{
                list = this.data.allyhlist.concat(res.data.rows)
              }
              this.setData({
                alltotal: res.data.total,
                allyhlist: list
              })          
            }     
          }
          wx.hideLoading();
        }
      });
  },
  getmyYhlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.mypage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'troublehandle?a=listself&rows=10&page=' + page,
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
                  myyhlist: []
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
                list = this.data.myyhlist.concat(res.data.rows)
              }
              this.setData({
                mytotal: res.data.total,
                myyhlist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  gettodoYhlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.todopage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'troublehandle?a=listtodo&rows=10&page=' + page,
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
                  todoyhlist: []
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
                list = this.data.todoyhlist.concat(res.data.rows)
              }
              this.setData({
                todototal: res.data.total,
                todoyhlist: list
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
  onShow:function(){
    var that = this;
    console.log(that.data.activeIndex)
    if(that.data.activeIndex==0){
      that.getmyYhlist(1)
      that.data.mypage=1
    }
    else if (that.data.activeIndex == 1){
      that.gettodoYhlist(1)
      that.data.todopage=1
    }
    else if (that.data.activeIndex == 2){
      that.getallYhlist(1)
      that.data.page=1
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    if (that.data.activeIndex == 0) {
      that.getmyYhlist(1)
      wx.stopPullDownRefresh();
      that.data.mypage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.gettodoYhlist(1)
      wx.stopPullDownRefresh();
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getallYhlist(1)
      wx.stopPullDownRefresh();
      that.data.page = 1
    }
  },
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数
    
    var that = this;
    if (that.data.activeIndex == 0) {
      this.data.mypage = this.data.mypage + 1;
      this.getmyYhlist();
    }
    else if (that.data.activeIndex == 1) {
      this.data.todopage = this.data.todopage + 1;
      this.gettodoYhlist();
    }
    else if (that.data.activeIndex == 2) {
      this.data.page = this.data.page + 1;
      this.getallYhlist();
    }
  },
  add:function(){
    wx.navigateTo({
      url: 'addtrouble',
    })
  }
});