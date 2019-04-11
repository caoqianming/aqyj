// pages/trouble/troubledetail.js
var util = require('../../utils/util.js')
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
    troubleid: '',
    yhzt:0,
    yhdj: '',
    jclx: '',
    fxsj: '',
    yhdd: '',
    yhms: '',
    yhpg: '',
    yhlx: '',
    yhlb: '',
    yyfx: '',
    zgcs: '',
    zgbm: '',
    zgr: '',
    zgqx: '',
    zgms: '',
    yhtp: [],
    zghtp: [],
    zppg: 'no',
    newr:''
  },
  yhlbArray:{},
  bindfcyjInput: function (e) {
    this.data.fcyj = e.detail.value
  },
  bindpgyjInput: function (e) {
    this.data.pgyj = e.detail.value
  },
  bindshyjInput: function (e) {
    this.data.shyj = e.detail.value
  },
  bindyhmsInput: function (e) {
    this.data.yhms = e.detail.value
  },
  bindyhddInput: function (e) {
    this.data.yhdd = e.detail.value
  },
  shChange: function(e){
    if (e.detail.value == false) { this.data.shresult='reject'}
    else { this.data.shresult = ''}
  },
  zppg: function (e) {
    if (e.detail.value == true) {
      this.setData({
        zppg: 'yes',
      }) }
    else { 
      this.setData({
        zppg:'no',
      })
      }
  },
  bhct: function (e) {
    if (e.detail.value == false) {
      this.setData({
        shresult:'pass',
        zppg: 'no',
        zppg_d: false,
      })
    }
    else {
      this.setData({
        shresult: 'reject',
        zppg_c: false,
        zppg_d:true
      })
    }
  },
  bindyhpgChange: function (e) {
    this.setData({
      yhpgIndex: e.detail.value,
      yhpg: this.data.yhpgArray[e.detail.value].value
    })
  },
  bindyhlxChange: function (e) {
    this.setData({
      yhlxIndex: e.detail.value,
      yhlx: this.data.yhlxArray[e.detail.value].value
    })
    if(this.data.yhlx==16){
      this.setData({
        yhlbArray: this.yhlbArray.data1,
      })
    }else{
      this.setData({
        yhlbArray: this.yhlbArray.data2,
      })
    }
  },
  bindyhlbChange: function (e) {
    this.setData({
      yhlbIndex: e.detail.value,
      yhlb: this.data.yhlbArray[e.detail.value].value
    })
  },
  bindzgrChange: function (e) {
    this.setData({
      zgrIndex: e.detail.value,
      zgr: this.data.zgrArray[e.detail.value].value
    })
  },
  bindnewrChange: function (e) {
    this.setData({
      newrIndex: e.detail.value,
      newr: this.data.newrArray[e.detail.value].value
    })
  },
  bindyyfxInput: function (e) {
    this.data.yyfx = e.detail.value
  },
  bindzgcsInput: function (e) {
    this.data.zgcs = e.detail.value
  },
  
  getYh: function (troubleid) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'getyh?troubleid=' + troubleid,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {},
        success: res => {
          wx.hideLoading();
          if (res.statusCode === 200) {
            var yhdata = res.data
            //格式化隐患信息
              for (var i = 0; i < yhdata.yhtp.length; i++) {
                yhdata.yhtp[i] = this.data.serverUrl + yhdata.yhtp[i];
              }
              for (var i = 0; i < yhdata.zghtp.length; i++) {
                yhdata.zghtp[i] = this.data.serverUrl + yhdata.zghtp[i];
              }
            if (yhdata.fxsj != '') { yhdata.fxsj = util.formatTime(new Date(yhdata.fxsj)) }
            if (yhdata.zgqx != '') { yhdata.zgqx = util.formatTime(new Date(yhdata.zgqx)) }
            this.setData(yhdata)
            switch (yhdata.yhzt) {
              case 1:
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
                //现场管理类
                wx.request({
                  url: this.data.serverUrl + 'getdickey?dicclass=16&a=combobox',
                  header: {
                    'content-type': 'application/json', // 默认值
                    'Cookie': wx.getStorageSync("sessionid"),
                  },
                  data: {},
                  success: res => {
                    if (res.statusCode === 200) {
                      //console.log(res.data)
                      this.yhlbArray.data1 = res.data;
                    }
                  }
                });
                //基础管理类
                wx.request({
                  url: this.data.serverUrl + 'getdickey?dicclass=17&a=combobox',
                  header: {
                    'content-type': 'application/json', // 默认值
                    'Cookie': wx.getStorageSync("sessionid"),
                  },
                  data: {},
                  success: res => {
                    if (res.statusCode === 200) {
                      //console.log(res.data)
                      this.yhlbArray.data2 = res.data;
                    }
                  }
                });
                break;
              case 3:
                break;
              case 7:
                break;
            }
            //console.log(this.data.yhzt)
          }
        }
      });
  },
  submit: function () {
    var that = this
    if(that.data.yhzt==3){
      if(that.data.zgms==''){
        that.Tap1('请输入整改描述！')
      } else { 
        that.upimg2(0,that.data.zghtp.length)
        }
    }
    else if (that.data.yhzt == 5){
      if (that.data.shresult == 'reject') {
        if(that.data.fcyj==''){
          that.Tap1('请输入复查意见！')
        }else{
          that.Tap2()
        }
      }else{
        that.accesstrouble()
      }
    }
    else if(that.data.yhzt==1){
      if (that.data.shresult=='reject') {
        that.accesstrouble()
      }
      else if (that.data.zppg == 'no') {
        if (that.data.yhpg == '') {
          that.Tap1('请选择隐患评估！')
        } else if (that.data.yhlx == '') {
          that.Tap1('请输入隐患类型！')
        } else if (that.data.yhlb == '') {
          that.Tap1('请输入隐患类别！')
        } else if (that.data.zgbm == '') {
          that.Tap1('请选择整改部门！')
        } else if (that.data.zgr == '') {
          that.Tap1('请选择整改人！')
        } else if (that.data.zgqx == '') {
          that.Tap1('请选择整改期限！')
        } else {
          that.accesstrouble()
        }
      } else if (that.data.zppg == 'yes'){
        if (that.data.newr == '') {
          that.Tap1('请选择其他评估人！')
        }else{
          that.accesstrouble()
        }
      }
    }
    else if (that.data.yhzt == 7) {
      if (that.data.yyfx == '') {
        that.Tap1('请填写原因分析！')
      } else if (that.data.zgcs == '') {
        that.Tap1('请填写整改措施！')
      } else {
        that.accesstrouble()
      }
    }
    else if (that.data.yhzt == 0){
      that.upimg(0, that.data.yhtp.length)
    }
    else{
      that.accesstrouble()
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
  Tap2:function(){
    var that=this
    wx.showModal({
      title: '系统提示',
      content: '您确定要驳回该条隐患吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          that.accesstrouble()
        } 
      }
    });
  },
  bindzgmsInput: function (e) {
    this.data.zgms = e.detail.value
  },
  //上传整改图片
  upimg2: function (x, y) {
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传整改图片' + (x + 1) + '....',
      })
      if (that.data.zghtp[x].indexOf(that.data.serverUrl) == -1){
        wx.uploadFile({
          header: {
            'content-type': 'application/json', // 默认值
            'Cookie': wx.getStorageSync("sessionid"),
          },
          url: that.data.serverUrl + 'upfile',
          filePath: that.data.zghtp[x],
          name: 'upfile',
          success(res) {
            var obj = JSON.parse(res.data);
            that.data.zghtp[x] = obj['filepath']
            x = x + 1
            if (x < y) {
              that.upimg2(x, y)
            } else {
              that.accesstrouble()
            }
          }
        })
      }else{
        that.data.zghtp[x].replace(that.data.serverUrl, "")
        var bl = that.data.zghtp[x].replace(that.data.serverUrl, "")
        that.data.zghtp[x] = bl
        that.accesstrouble()
      }
    } else {
      that.accesstrouble()
    }
  },
  //上传隐患图片
  upimg: function (x, y) {
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传隐患图片' + (x + 1) + '....',
      })
      
      if (that.data.yhtp[x].indexOf(that.data.serverUrl) == -1) {
        wx.uploadFile({
          header: {
            'content-type': 'application/json', // 默认值
            'Cookie': wx.getStorageSync("sessionid"),
          },
          url: that.data.serverUrl + 'upfile',
          filePath: that.data.yhtp[x],
          name: 'upfile',
          success(res) {
            var obj = JSON.parse(res.data);
            that.data.yhtp[x] = obj['filepath']
            x = x + 1
            if (x < y) {
              that.upimg(x, y)
            } else {
              that.addtrouble()
            }
          }
        })
      } else {
        var bl=that.data.yhtp[x].replace(that.data.serverUrl, "")
        that.data.yhtp[x] = bl
        that.addtrouble()
      }
    } else {
      that.addtrouble()
    }
  },
  addtrouble: function () {
    var that=this;
    wx.request({
      url: that.data.serverUrl + 'addyh',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: that.data,
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          })
        }
      }
    });
  },
  accesstrouble: function(){
    var that=this
    //console.log(that.data.zghtp)
    wx.request({
      url: that.data.serverUrl + 'accessyh',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: that.data,
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.getYh(options.troubleid);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var dateTimeArray1 = obj1.dateTimeArray
    var dateTime1 = obj1.dateTime
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      dateshow:0
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
    this.setData({
      zgqx:time,
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
      dateshow:1
    });
  },
  yhtpPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.yhtp
    })
  },
  zghtpPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.zghtp
    })
  },
  deleteImage: function (e) {
    var that = this;
    var zghtp = that.data.zghtp;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          zghtp.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          zghtp: zghtp
        });
      }
    })
  },
  deleteyhImage: function (e) {
    var that = this;
    var yhtp = that.data.yhtp;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          yhtp.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          yhtp: yhtp
        });
      }
    })
  },
  choosezgImage: function(){
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //console.log(that.data.zghtp == '')
        if(that.data.zghtp==''){
          that.data.zghtp=[]
        }
        that.setData({
          zghtp: that.data.zghtp.concat(res.tempFilePaths)
        })
      }
    })
  },
  chooseyhImage: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //console.log(that.data.zghtp == '')
        if (that.data.yhtp == '') {
          that.data.yhtp = []
        }
        that.setData({
          yhtp: that.data.yhtp.concat(res.tempFilePaths)
        })
      }
    })
  }
})