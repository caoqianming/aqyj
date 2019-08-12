// pages/suggest/suggest.js
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl,
    alllist: [],
    tabs: ["历史任务", "我的任务", "全厂待办"],
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
      that.getmylist(1)
      that.data.mypage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.gettodolist(1)
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getalllist(1)
      that.data.page = 1
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log(that.data.activeIndex)
    if (that.data.activeIndex == 0) {
      that.getmylist(1)
      that.data.mypage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.gettodolist(1)
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getalllist(1)
      this.data.page = 1;
    }

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
    var that = this;
    if (that.data.activeIndex == 0) {
      that.getmylist(1)
      wx.stopPullDownRefresh();
      that.data.mypage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.gettodolist(1)
      wx.stopPullDownRefresh();
      that.data.todopage = 1
    }
    else if (that.data.activeIndex == 2) {
      that.getalllist(1)
      wx.stopPullDownRefresh();
      that.data.page = 1
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数
    var that = this;
    if (that.data.activeIndex == 0) {
      this.data.mypage = this.data.mypage + 1;
      this.getmylist();
    }
    else if (that.data.activeIndex == 1) {
      this.data.todopage = this.data.todopage + 1;
      this.gettodolist();
    }
    else if (that.data.activeIndex == 2) {
      this.data.page = this.data.page + 1;
      this.getalllist();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getalllist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.page }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl + 'api/risktask?a=listalltodo&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
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
  getmylist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.mypage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/listtask?a=list2done&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  donetotal: 0,
                  donelist: []
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
                list = this.data.donelist.concat(res.data.rows)
              }
              this.setData({
                donetotal: res.data.total,
                donelist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  scan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        let id = res.result.split('=')[1]
        wx.navigateTo({
          url: 'check?riskact=' + id,
        })
      }
    })
  },
  gettodolist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.todopage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/risktask?a=list2todo&rows=10&page=' + page,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            console.log(res.data)
            if (res.data.rows.length == 0) {
              if (page == 1) {
                this.setData({
                  todototal: 0,
                  todolist: []
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
                list = this.data.todolist.concat(res.data.rows)
              }
              this.setData({
                todototal: res.data.total,
                todolist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
})