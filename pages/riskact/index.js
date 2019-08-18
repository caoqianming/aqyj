// pages/miss/miss.js
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    serverUrl: getApp().globalData.serverUrl,
    riskactlist: [],
    tabs: ["我的记录", "全厂风险"],
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
      that.getmyriskchecklist(1)
      that.data.mypage = 1
    }
    else if (that.data.activeIndex == 1) {
      that.getriskactlist(1)
      that.data.page = 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
    this.onPullDownRefresh()
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
      that.getmyriskchecklist(1)
      that.data.mypage = 1
    } else if (that.data.activeIndex == 1){
      that.getriskactlist(1);
      this.data.page = 1;
    }
    wx.stopPullDownRefresh();
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数
    if (that.data.activeIndex == 0) {
      this.data.mypage = this.data.mypage + 1;
      this.getmyriskchecklist();
    } else if (that.data.activeIndex == 1){
      this.data.page = this.data.page + 1;
      this.getriskactlist();
    }
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  scan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        let id = res.result.split('=')[1]
        wx.navigateTo({
          url: 'detail?id='+id,
        })
      }
    })
  },
  getriskactlist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.page }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/riskact?a=listall&rows=10&page=' + page,
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
                  riskactlist: []
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
                list = this.data.riskactlist.concat(res.data.rows)
              }
              this.setData({
                total: res.data.total,
                riskactlist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
  getmyriskchecklist: function (page) {
    var that = this;
    if (page != 1) { page = that.data.mapage }
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/riskcheck?a=listself&rows=10&page=' + page,
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
                  riskchecklist: []
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
                list = this.data.riskchecklist.concat(res.data.rows)
              }
              this.setData({
                mytotal: res.data.total,
                riskchecklist: list
              })
            }
          }
          wx.hideLoading();
        }
      });
  },
})