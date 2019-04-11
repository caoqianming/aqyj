// pages/operation/operationadd.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindpxddInput: function (e) {
    this.data.pxdd = e.detail.value
  },
  bindpxmcInput: function (e) {
    this.data.pxmc = e.detail.value
  },
  bindjtnrInput: function (e) {
    this.data.jtnr = e.detail.value
  },
  bindpxscInput: function (e) {
    this.data.pxsc = e.detail.value
  },
  bindpxlxChange: function (e) {
    this.setData({
      pxlxIndex: e.detail.value,
    })
    this.data.pxlx = this.data.pxlxArray[e.detail.value].value
  },
  bindrylxChange: function (e) {
    this.setData({
      rylxIndex: e.detail.value,
    })
    this.data.rylx = this.data.rylxArray[e.detail.value].value
  },
  bindskrChange: function (e) {
    this.setData({
      skrIndex: e.detail.value,
    })
    this.data.skr = this.data.skrArray[e.detail.value].value
  },
  bindpxjbChange: function (e) {
    this.setData({
      pxjbIndex: e.detail.value,
    })
    this.data.pxjb = this.data.pxjbArray[e.detail.value].value
    //获取培训内容
    wx.request({
      url: getApp().globalData.serverUrl + 'getdickey?dicclass=' + this.data.pxjb + '&a=combobox',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          let pxnrArray = res.data
          this.setData({
            pxnrArray: pxnrArray,
          })
        }
      }
    })
  },
  bindpxnrChange: function (e) {
    this.setData({
      pxnrIndex: e.detail.value,
    })
    this.data.pxnr = this.data.pxnrArray[e.detail.value].value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //获取培训类型
    wx.request({
      url: getApp().globalData.serverUrl + 'getdickey?dicclass=8&a=combobox',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          let pxlxArray = res.data
          this.setData({
            pxlxArray: pxlxArray,
          })
        }
      }
    })
    //获取人员类型
    wx.request({
      url: getApp().globalData.serverUrl + 'getdickey?dicclass=9&a=combobox',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          let rylxArray = res.data
          this.setData({
            rylxArray: rylxArray,
          })
        }
      }
    })
    //获取培训级别
    wx.request({
      url: getApp().globalData.serverUrl + 'getdicclass?dicid=4',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          let pxjbArray = res.data
          this.setData({
            pxjbArray: pxjbArray,
          })
        }
      }
    })

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var dateTimeArray1 = obj1.dateTimeArray
    var dateTime1 = obj1.dateTime
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      dateshow1: 0
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
    let lst = getApp().globalData.selectPeopleList
    let nst = []
    let nst1 = []
    if (lst) {
      for (var i = 0; i < lst.length; i++) {
        nst.push(lst[i]['name'])
        nst1.push(lst[i]['id'])
      }
      this.setData({
        cjryname: nst.join(','),
        cjry: nst1.join(','),
        cjrs: nst1.length
      })
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
  changeDateTime1(e) {
    var dateTimeArray1 = this.data.dateTimeArray1
    var dateTime1 = this.data.dateTime1
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    //console.log(time)
    this.data.pxsj = time
    this.setData({
      dateTime1: e.detail.value,
      dateshow1: 1
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
  submit: function () {
    var that = this;
    if (!that.data.pxsj) {
      that.Tap1('请选择培训时间！')
    }
    else if (!that.data.pxdd) {
      that.Tap1('请输入培训地点！')
    } else if (!that.data.pxmc) {
      that.Tap1('请输入培训名称！')
    } else if (!that.data.pxlx) {
      that.Tap1('请选择培训类型！')
    } else if (!that.data.rylx) {
      that.Tap1('请选择人员类型！')
    } else if (!that.data.pxjb) {
      that.Tap1('请选择培训级别！')
    } else if (!that.data.pxnr) {
      that.Tap1('请选择培训内容！')
    } else if (!that.data.pxbm) {
      that.Tap1('请选择培训部门！')
    } else if (!that.data.skr) {
      that.Tap1('请选择授课人！')
    } else if (!that.data.cjry) {
      that.Tap1('请选择参加人员！')
    } else {
      if (that.isNumber(that.data.pxsc)) {
        that.addpx()
      } else {
        that.Tap1('培训时长不正确！')
      }
      //this.addpx();
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
  addpx: function () {
    // let pxlx = []
    // let x = this.data.pxlxArray
    // for (var i = 0, len = x.length; i < len; ++i) {
    //   if (x[i].checked = true) {
    //     pxlx.push(x[i].id)
    //   } 
    // }
    var pxdata = {
      trainname: this.data.pxmc,
      trainplace: this.data.pxdd,
      starttime: this.data.pxsj,
      trainlevel: this.data.pxjb,
      traintype: this.data.pxlx,
      manlevel: this.data.rylx,
      traincontent: this.data.pxnr,
      detailcontent: this.data.jtnr,
      lecturer: this.data.skr,
      trainpart: this.data.pxbm,
      participant: this.data.cjry,
      participantnum: this.data.cjrs,
      duration: this.data.pxsc
    }
    wx.showModal({
      title: '系统提示',
      content: '确认提交将发送培训通知!',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.serverUrl + 'addtrain',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 
              'Cookie': wx.getStorageSync("sessionid"),
            },
            method: 'POST',
            data: pxdata,
            success: res => {
              if (res.statusCode === 200) {
                wx.hideLoading();
                wx.navigateBack()
              }
            }
          });  
        }
      }
    })


  },
  isNumber: function (val) {

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    //var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val)) {
      return true;
    } else {
      return false;
    }

  }
})