// pages/miss/addmiss.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    misstime: '',
    missqy:'',
    missplace: '',
    missimg: [],
  },
  bindmissplaceInput: function (e) {
    this.data.missplace = e.detail.value
  },
  binddescriptionInput: function (e) {
    this.data.description = e.detail.value
  },
  bindpreventInput: function (e) {
    this.data.prevent = e.detail.value
  },
  bindlessonInput: function (e) {
    this.data.lesson = e.detail.value
  },
  submit: function () {
    var that = this
    if (that.data.missplace == '') {
      that.Tap1('请输入发生地点！')
    } else if (that.data.description == '') {
      that.Tap1('请输入简要描述！')
    } else {
      that.upimg(0, that.data.missimg.length)
    }
  },
  Tap1: function (x) {
    wx.showModal({
      title: "系统提示",
      content: x,
      showCancel: false,
      confirmText: "确定"
    })
  },
  //上传图片
  upimg: function (x, y) {
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传现场图片' + (x + 1) + '....',
      })
      wx.uploadFile({
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        url: getApp().globalData.serverUrl + 'upfile',
        filePath: that.data.missimg[x],
        name: 'upfile',
        success(res) {
          var obj = JSON.parse(res.data);
          that.data.missimg[x] = obj['filepath']
          x = x + 1
          if (x < y) {
            that.upimg(x, y)
          }
          else {
            that.addobserve()
          }
        }
      })
    } else {
      that.addobserve()
    }
  },
  addobserve: function () {
    var wsdata = {
      misstime: this.data.misstime,
      missqy:this.data.missqy,
      missplace: this.data.missplace,
      description: this.data.description,
      missimg: this.data.missimg,
      prevent: this.data.prevent,
      lesson: this.data.lesson,
    }
    //console.log(wsdata.unsafe)
    wx.request({
      url: getApp().globalData.serverUrl + 'api/miss?a=add',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: wsdata,
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          wx.navigateBack()
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var dateTimeArray1 = obj1.dateTimeArray
    var dateTime1 = obj1.dateTime
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
    });
    this.data.misstime = time
    //拉取地图权限
    if (getApp().globalData.rights.indexOf('30') != -1) {
      this.setData({
        mapright: true
      })
    } else {
      this.setData({
        mapright: false
      })
    }
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

  },
  changeDateTime1(e) {
    var dateTimeArray1 = this.data.dateTimeArray1
    var dateTime1 = this.data.dateTime1
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    //console.log(time)
    this.data.misstime = time
    this.setData({
      dateTime1: e.detail.value,
    });

  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          missimg: that.data.missimg.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.missimg
    })
  },
  deleteImage: function (e) {
    var that = this;
    var missimg = that.data.missimg;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          missimg.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          missimg: missimg
        });
      }
    })
  },

})