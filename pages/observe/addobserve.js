var dateTimePicker = require('../../utils/dateTimePicker.js');
// pages/observe/addobserve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookeder: '',
    looktime: '',
    lookplace: '',
    actname: '',
    lookimg: [],
  },
  bindlookederInput: function (e) {
    this.data.lookeder = e.detail.value
  },
  bindlookplaceInput: function (e) {
    this.data.lookplace = e.detail.value
  },
  bindactnameInput: function (e) {
    this.data.actname = e.detail.value
  },
  bindotherunsafeInput: function (e) {
    this.data.otherunsafe = e.detail.value
  },
  bindsafecontentInput: function (e) {
    this.data.safecontent = e.detail.value
  },
  checkboxChange24: function (e) {
    var x = this.data.unsafe24;
    var checkboxItems = this.data.unsafe24.child, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    x.child = checkboxItems
    this.setData({
      unsafe24: x
    });
  },
  checkboxChange25: function (e) {
    var x = this.data.unsafe25;
    var checkboxItems = this.data.unsafe25.child, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    x.child = checkboxItems
    this.setData({
      unsafe25: x
    });
  },
  checkboxChange26: function (e) {
    var x = this.data.unsafe26;
    var checkboxItems = this.data.unsafe26.child, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    x.child = checkboxItems
    this.setData({
      unsafe26: x
    });
  },
  checkboxChange27: function (e) {
    var x = this.data.unsafe27;
    var checkboxItems = this.data.unsafe27.child, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    x.child = checkboxItems
    this.setData({
      unsafe27: x
    });
  },
  checkboxChange28: function (e) {
    var x = this.data.unsafe28;
    var checkboxItems = this.data.unsafe28.child, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    x.child = checkboxItems
    this.setData({
      unsafe28: x
    });
  },
  checkboxChange29: function (e) {
    var x = this.data.unsafe29;
    var checkboxItems = this.data.unsafe29.child, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    x.child = checkboxItems
    this.setData({
      unsafe29: x
    });
  },
  checkboxChange30: function (e) {
    var x = this.data.unsafe30;
    var checkboxItems = this.data.unsafe30.child, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    x.child = checkboxItems
    this.setData({
      unsafe30: x
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
    this.data.looktime = time
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var dateTime2 = obj1.dateTime
    this.setData({
      dateTime2: obj1.dateTime,
    });
    this.data.looktime2 = time
    //获取观察字典
    wx.request({
      url: getApp().globalData.serverUrl + 'gchandle?a=getdics',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data.data)
          this.setData({
            unsafe24: res.data.data[0],
            unsafe25: res.data.data[1],
            unsafe26: res.data.data[2],
            unsafe27: res.data.data[3],
            unsafe28: res.data.data[4],
            unsafe29: res.data.data[5],
            unsafe30: res.data.data[6],
          })
        }
      }
    });
  },
  submit: function () {
    var that = this
    if (that.data.lookeder == '') {
      that.Tap1('请填写被观察对象！')
    } else if (that.data.lookplace == '') {
      that.Tap1('请输入观察地点！')
    } else if (that.data.actname == '') {
      that.Tap1('请输入作业名称！')
    } else {
      that.upimg(0, that.data.lookimg.length)
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
        filePath: that.data.lookimg[x],
        name: 'upfile',
        success(res) {
          var obj = JSON.parse(res.data);
          that.data.lookimg[x] = obj['filepath']
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
    var gcdata = {
      lookeder: this.data.lookeder,
      looktime: this.data.looktime,
      looktime2:this.data.looktime2,
      lookplace: this.data.lookplace,
      actname: this.data.actname,
      lookimg: this.data.lookimg,
      otherunsafe: this.data.otherunsafe,
      safecontent: this.data.safecontent,
      unsafe: this.getunsafe(),
    }
    //console.log(gcdata.unsafe)
    wx.request({
      url: getApp().globalData.serverUrl + 'gchandle?a=add',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: gcdata,
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          wx.navigateBack()
        }
      }
    });
  },
  getunsafe: function () {
    var x = []
    var that = this.data;
    var items = [that.unsafe24.child, that.unsafe25.child, that.unsafe26.child, that.unsafe27.child, that.unsafe28.child, that.unsafe29.child, that.unsafe30.child]
    for (var i = 0, lenI = items.length; i < lenI; i++) {
      var y = items[i]
      for (var m = 0, lenI = y.length; m < lenI; m++) {
        if (y[m].checked) {
          x.push(y[m].value)
        }
      }
    }
    return x
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
    this.data.looktime = time
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
  changeDateTime2(e) {
    var dateTimeArray1 = this.data.dateTimeArray1
    var dateTime2 = this.data.dateTime2
    var time = dateTimeArray1[0][dateTime2[0]] + '-' + dateTimeArray1[1][dateTime2[1]] + '-' + dateTimeArray1[2][dateTime2[2]] + ' ' + dateTimeArray1[3][dateTime2[3]] + ':' + dateTimeArray1[4][dateTime2[4]]
    //console.log(time)
    this.data.looktime2 = time
    this.setData({
      dateTime2: e.detail.value,
    });

  },
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime2: arr
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
          lookimg: that.data.lookimg.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.lookimg
    })
  },
  deleteImage: function (e) {
    var that = this;
    var lookimg = that.data.lookimg;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          lookimg.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          lookimg: lookimg
        });
      }
    })
  },
})