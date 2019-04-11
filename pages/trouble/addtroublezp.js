// pages/trouble/addtroublezp.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    serverUrl: getApp().globalData.serverUrl,
    yhpgArray: [],
    yhpgIndex: null,
    yhlxArray: [],
    yhlxIndex: null,
    yhlbArray: [],
    yhlbIndex: null,
    zgrArray: [],
    zgrIndex: null,
  },
  yhdic:{
  },
  yhdata:{

  },
  bindyhlxChange: function(e) {
    this.setData({
      yhlxIndex: e.detail.value,
    })
    this.data.yhlx = this.data.yhlxArray[e.detail.value].value
    if (this.data.yhlx==16){
      this.data.yhlbArray = this.yhdic.yhlb1;
      this.setData({
        yhlbArray: this.yhdic.yhlb1,
      })
    }else{
      this.data.yhlbArray = this.yhdic.yhlb2;
      this.setData({
        yhlbArray: this.yhdic.yhlb2,
      })
    }
  },
  bindyhpgChange: function(e) {
    this.setData({
      yhpgIndex: e.detail.value,
    })
    this.data.yhpg = this.data.yhpgArray[e.detail.value].value;
  },
  bindyhlbChange: function(e) {
    this.setData({
      yhlbIndex: e.detail.value,
    })
    this.data.yhlb = this.data.yhlbArray[e.detail.value].value;
  },
  bindyyfxInput: function(e) {
    this.data.yyfx = e.detail.value
  },
  bindzgcsInput: function(e) {
    this.data.zgcs = e.detail.value
  },
  bindzgrChange: function(e) {
    this.setData({
      zgrIndex: e.detail.value,
    })
    this.data.zgr = this.data.zgrArray[e.detail.value].value;
  },
  submit: function(e) {
    var that = this
    //隐患图片给data
    if (that.data.yhpg == '') {
      that.Tap1('请选择隐患评估！')
    } else if (that.data.yhlx == '') {
      that.Tap1('请输入隐患类型！')
    } else if (that.data.yhlb == '') {
      that.Tap1('请输入隐患类别！')
    } else if (that.data.zgbm == '') {
      that.Tap1('请选择整改部门！')
    } else if (that.data.zgqx == '') {
      that.Tap1('请选择整改期限！')
    }else {
      var yhtp = that.data.yhtp
      that.upimg(0, yhtp.length)
    }
  },
  //上传图片
  upimg: function(x, y) { //x=0,y是图片列表长度
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传隐患图片' + (x + 1) + '....',
      })
      wx.uploadFile({
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        url: that.data.serverUrl + 'upfile',
        filePath: that.data.yhtp[x], //全局变量取值
        name: 'upfile',
        success(res) {
          var obj = JSON.parse(res.data);
          that.data.yhtp[x]=obj['filepath']
          x = x + 1
          if (x < y) {
            that.upimg(x, y)
          } else {
            that.addtrouble()
          }
        }
      })
    } else {
      that.addtrouble()
    }
  },
  getyhdata: function () {
    this.yhdata = {
      'yhdj': this.data.yhdj,
      'jclx': this.data.jclx,
      'fxsj': this.data.fxsj,
      'yhdd': this.data.yhdd,
      'yhms': this.data.yhms,
      'yhtp': this.data.yhtp,
      'yhpg': this.data.yhpg,
      'yhlx': this.data.yhlx,
      'yhlb': this.data.yhlb,
      'zgbm': this.data.zgbm,
      'zgr': this.data.zgr,
      'zgqx':this.data.zgqx,
      'yyfx':this.data.yyfx,
      'zgcs':this.data.zgcs,
    }
  },
  addtrouble: function () {
    this.getyhdata();
    wx.request({
      url: this.data.serverUrl + 'addyh',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: this.yhdata,
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
  Tap1: function(x) {
    wx.showModal({
      title: "系统提示",
      content: x,
      showCancel: false,
      confirmText: "确定"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var pages = getCurrentPages();
    this.data = pages[pages.length - 2].data;//获取前一个界面数据
    //console.log(that.data)
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    console.log(obj1)
    var dateTimeArray1 = obj1.dateTimeArray
    var dateTime1 = obj1.dateTime
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: dateTime1,
      dateshow:0
    });
    //获取隐患评估
    wx.request({
      url: this.data.serverUrl + 'getdickey?dicclass=19&a=combobox',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.data.yhpgArray = res.data;
          this.setData({
            yhpgArray: res.data,
          })
        }
      }
    });
    //获取隐患类型
    wx.request({
      url: this.data.serverUrl + 'getdicclass?dicid=15',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.data.yhlxArray = res.data;
          this.setData({
            yhlxArray: res.data,
          })
        }
      }
    });
    //获取现场管理类
    wx.request({
      url: this.data.serverUrl + 'getdickey?dicclass=16&a=combobox',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          this.yhdic.yhlb1 = res.data
        }
      }
    });
    //获取基础管理类
    wx.request({
      url: this.data.serverUrl + 'getdickey?dicclass=17&a=combobox',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          this.yhdic.yhlb2 = res.data
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  changeDateTime1(e) {
    var dateTimeArray1 = this.data.dateTimeArray1
    var dateTime1 = this.data.dateTime1
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    //console.log(time)
    this.data.zgqx = time
    this.setData({
      dateTime1: e.detail.value,
      dateshow:1
    });

  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr,
      dateshow: 1
    });
  }
})