// pages/operation/operationadd.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zyimg:[]
  },
  checkboxChangefxcs: function (e) {
    var x = this.data.fxcslist;
    var values = e.detail.value;
    console.log(values)
    for (var j = 0, lenJ = x.length; j < lenJ; ++j) {
      if (values.indexOf(x[j]['id'].toString()) >= 0){
          x[j].checked=true
      }else{
        x[j].checked=false
      }
    }
      this.setData({
        fxcslist:x,
        fxcs: values
      })
  },

  bindzyddInput: function (e) {
    this.data.zydd = e.detail.value
  },
  bindzynrInput: function (e) {
    this.data.zynr = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let zylx = options.zylx
    this.setData({
      zylx:zylx
    })
    console.log(zylx)
    //风险分析和控制措施
    wx.request({
      url: getApp().globalData.serverUrl + 'api/fxcs?a=listall&zylx='+zylx,
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          let fxcslist = res.data.rows
          console.log(fxcslist)
          this.setData({
            fxcslist: fxcslist,
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
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj2 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var dateTimeArray2 = obj2.dateTimeArray
    var dateTime2 = obj2.dateTime
    var time = dateTimeArray2[0][dateTime2[0]] + '-' + dateTimeArray2[1][dateTime2[1]] + '-' + dateTimeArray2[2][dateTime2[2]] + ' ' + dateTimeArray2[3][dateTime2[3]] + ':' + dateTimeArray2[4][dateTime2[4]]
    this.setData({
      dateTimeArray2: obj2.dateTimeArray,
      dateTime2: obj2.dateTime,
      dateshow2: 0
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
    if (lst){
      for (var i = 0; i < lst.length; i++) {
        nst.push(lst[i]['name'])
        nst1.push(lst[i]['id'])
      }
      this.setData({
        zyryname: nst.join(','),
        zyry: nst1
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
    this.data.kssj = time
    this.setData({
      dateTime1: e.detail.value,
      dateshow1:1
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
    var dateTimeArray2 = this.data.dateTimeArray2
    var dateTime2 = this.data.dateTime2
    var time = dateTimeArray2[0][dateTime2[0]] + '-' + dateTimeArray2[1][dateTime2[1]] + '-' + dateTimeArray2[2][dateTime2[2]] + ' ' + dateTimeArray2[3][dateTime2[3]] + ':' + dateTimeArray2[4][dateTime2[4]]
    //console.log(time)
    this.data.jssj = time
    this.setData({
      dateTime2: e.detail.value,
      dateshow2: 1
    });

  },
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2,
      dateArr = this.data.dateTimeArray2;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray2: dateArr,
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
          zyimg: that.data.zyimg.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.zyimg
    })
  },
  deleteImage: function (e) {
    var that = this;
    var zyimg = that.data.zyimg;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          zyimg.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          zyimg: zyimg
        });
      }
    })
  },
  submit:function(){
    var that = this;
    if (!that.data.kssj) {
      that.Tap1('请选择开始时间！')
    }
    else if (!that.data.jssj) {
      that.Tap1('请选择结束时间！')
    } else if (!that.data.zydd) {
      that.Tap1('请输入作业地点！')
    }else if (!that.data.sdbm) {
      that.Tap1('请输入属地部门！')
    } else if (!that.data.zyry) {
      that.Tap1('请输入作业人员！')
    } else if (!that.data.zynr) {
      that.Tap1('请输入作业内容！')
    } else if (!that.data.fxcs) {
      that.Tap1('请确认分析措施！')
    }else {
      this.upimg(0, this.data.zyimg.length);
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
        filePath: that.data.zyimg[x],
        name: 'upfile',
        success(res) {
          var obj = JSON.parse(res.data);
          that.data.zyimg[x] = obj['filepath']
          x = x + 1
          if (x < y) {
            that.upimg(x, y)
          }
          else {
            that.addzy()
          }
        }
      })
    } else {
      that.addzy()
    }
  },
  addzy: function () {
    // let fxcs = []
    // let x = this.data.fxcslist
    // for (var i = 0, len = x.length; i < len; ++i) {
    //   if (x[i].checked = true) {
    //     fxcs.push(x[i].id)
    //   } 
    // }
    var zydata = {
      zylx:this.data.zylx,
      kssj: this.data.kssj,
      jssj: this.data.jssj,
      zydd: this.data.zydd,
      zynr: this.data.zynr,
      zyry: this.data.zyry,
      zyimg: this.data.zyimg,
      sdbm:this.data.sdbm,
      fxcs: this.data.fxcs,
    }
    //console.log(gcdata.unsafe)
    wx.request({
      url: getApp().globalData.serverUrl + 'api/operation?a=add',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: zydata,
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          wx.navigateBack({
            delta: 2
          })
        }
      }
    });
  },
})