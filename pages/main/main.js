// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yhtodonum: 0,
    zytodonum: 0,
    noread: 0,
    dqdnum: 0,
    dknum: 0,
    gcnoread: 0,
    wsnoread: 0,
    jytodonum: 0,
    tasknum: 0,
    serverUrl: getApp().globalData.serverUrl,
    // Banner数据
    images: [],
    // 是否显示面板指示点
    indicatorDots: true,
    // 滑动方向是否为纵向
    vertical: false,
    // 自动切换
    autoplay: true,
    // 采用衔接滑动
    circular: true,
    // 自动切换时间间隔2s
    interval: 4000,
    // 滑动动画时长0.5s
    duration: 1000,
    // 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    previousMargin: 0,
    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    nextMargin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let images = [
      that.data.serverUrl + 'media/banner/1.jpg',
      that.data.serverUrl + 'media/banner/2.jpg',
      that.data.serverUrl + 'media/banner/3.jpg',
      that.data.serverUrl + 'media/banner/4.jpg',
      that.data.serverUrl + 'media/banner/5.jpg',
    ]
    that.setData({
      images: images
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
    var that = this
    //获取待阅读通知数目
    if (wx.getStorageSync("sessionid")) {
      this.getnoread()
      this.getyhtodonum()
      this.getzytodonum()
      this.getpxqdnum()
      this.getdknum() //待考
      this.getgcnoreadnum()
      this.getwsnoreadnum()//未遂未读
      this.getjytodonum()
      this.gettasknum()
    } else {
      getApp().callback = () => {
        this.getnoread()
        this.getyhtodonum()
        this.getzytodonum()
        this.getpxqdnum()
        this.getdknum()
        this.getgcnoreadnum()
        this.getjytodonum()
        this.gettasknum()
      };
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
  getnoread: function () {
    wx.request({
      url: this.data.serverUrl + 'api/notice?a=noreadnum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            noread: res.data.noread,
          })
        }
      }
    });
  },
  getyhtodonum: function () {
    var that = this
    //获取隐患待办数目
    wx.request({
      url: this.data.serverUrl + 'troublehandle?a=todonum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            yhtodonum: res.data.todonum,
          })
        }
      }
    });
  },
  getzytodonum: function () {
    var that = this
    //获取作业待办数目
    wx.request({
      url: this.data.serverUrl + 'api/operation?a=todonum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            zytodonum: res.data.todonum,
          })
        }
      }
    });
  },
  getpxqdnum: function () {
    var that = this
    //获取待签到培训
    wx.request({
      url: this.data.serverUrl + 'pxhandle?a=dqdnum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            dqdnum: res.data.dqdnum,
          })
        }
      }
    });
  },
  getdknum: function () {
    var that = this
    //获取待考
    wx.request({
      url: this.data.serverUrl + 'api/examtestdetail?a=dknum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            dknum: res.data.dknum,
          })
        }
      }
    });
  },
  getgcnoreadnum: function () {
    var that = this
    //获取待考
    wx.request({
      url: this.data.serverUrl + 'gchandle?a=noreadnum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            gcnoread: res.data.noread,
          })
        }
      }
    });
  },
  getwsnoreadnum: function () {
    var that = this
    //获取待考
    wx.request({
      url: this.data.serverUrl + 'api/miss?a=noreadnum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            wsnoread: res.data.noread,
          })
        }
      }
    });
  },
  getjytodonum: function () {
    var that = this
    //获取待考
    wx.request({
      url: this.data.serverUrl + 'api/suggest?a=todonum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            jytodonum: res.data.todonum,
          })
        }
      }
    });
  },
  gettasknum: function () {
    var that = this
    //获取待考
    wx.request({
      url: this.data.serverUrl + 'api/riskacttask?a=todonum',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.setData({
            tasknum: res.data.todonum,
          })
        }
      }
    });
  },
  taptest: function () {
    if (getApp().globalData.rights != undefined) {
      if (getApp().globalData.rights.indexOf('25') != -1) {//考试功能
        wx.navigateTo({
          url: '/pages/examtest/index',
        })
      } else {
        wx.showModal({
          content: '该功能如需开通,请查看公告或联系管理员!',
          showCancel: false
        })
      }
    } else {
      wx.showModal({
        content: '加载中,请稍后。。',
        showCancel: false
      })
    }
  },
  tapexercise: function () {
    if (getApp().globalData.rights != undefined) {
      if (getApp().globalData.rights.indexOf('25') != -1) {//考试功能
        wx.navigateTo({
          url: '/pages/exercise/index',
        })
      } else {
        wx.showModal({
          content: '该功能如需开通,请查看公告或联系管理员!',
          showCancel: false
        })
      }
    }
    else {
      wx.showModal({
        content: '加载中,请稍后。。',
        showCancel: false
      })
    }
  },
  tapinspect: function () {
    if (getApp().globalData.rights != undefined) {
      if (getApp().globalData.rights.indexOf('35') != -1) {//设备巡检
        wx.navigateTo({
          url: '/pages/inspect/index',
        })
      } else {
        wx.showModal({
          content: '该功能如需开通,请查看公告或联系管理员!',
          showCancel: false
        })
      }
    }
    else {
      wx.showModal({
        content: '加载中,请稍后。。',
        showCancel: false
      })
    }
  },

})