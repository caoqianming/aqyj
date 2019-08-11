// pages/trouble/addtrouble.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    yhtype:null,
    date: '2018-10-01',
    time: '12:00',
    mapright:false,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    serverUrl: getApp().globalData.serverUrl,
    yhdjArray: [],
    yhdjIndex: null,
    jclxArray: [],
    jclxIndex: null,
    troubleid: '',
    yhdj: '',
    jclx: '',
    fxsj: '',
    yhqy:'',
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
    isaqyzg:0
  },
  yhdata:{

  },
  bindyhdjChange: function (e) {
    //console.log('picker account 发生选择改变，携带值为', this.data.yhdjArray[e.detail.value].value);
    this.setData({
      yhdjIndex: e.detail.value,
    })
    this.data.yhdj = this.data.yhdjArray[e.detail.value].value;
  },
  bindjclxChange: function (e) {
    this.setData({
      jclxIndex: e.detail.value,  
    })
    this.data.jclx = this.data.jclxArray[e.detail.value].value
  },
  bindyhddInput: function (e) {
    this.data.yhdd = e.detail.value
  },
  bindyhmsInput: function (e) {
    this.data.yhms = e.detail.value
  },
  deleteImage: function (e) {
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
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          yhtp: that.data.yhtp.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.yhtp
    })
  },
  //上传图片
  upimg:function(x,y){
    var that=this
    if(x<y){
      wx.showLoading({
        title: '上传隐患图片'+x+'....',
      })
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
          if(x<y){
            that.upimg(x, y)
          }
          else{
            that.addtrouble()
          }
        }
      })
    }else{
      that.addtrouble()
    }
  },
  getyhdata: function(){
    this.yhdata = {
      'yhdj':this.data.yhdj,
      'jclx':this.data.jclx,
      'fxsj':this.data.fxsj,
      'yhqy':this.data.yhqy,
      'yhdd':this.data.yhdd,
      'yhms':this.data.yhms,
      'yhtp':this.data.yhtp,
    }
  },
  open: function () {
    var that = this
    if(getApp().globalData.isaqy==1){
      wx.showActionSheet({
        itemList: ['提交', '指派整改', '现场已完成整改'],
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              if (that.data.jclx == '') {
                that.Tap1('请选择检查类型！')
              }
              else if (that.data.yhdd == '') {
                that.Tap1('请输入隐患地点！')
              } else {
                that.upimg(0, that.data.yhtp.length)
              }
            }
            else if (res.tapIndex == 1) {
              if (that.data.jclx == '') {
                that.Tap1('请选择检查类型！')
              }
              else if (that.data.yhdd == '') {
                that.Tap1('请输入隐患地点！')
              } else {
                wx.navigateTo({ url: 'addtroublezp' })
              }

            } else {
              if (that.data.jclx == '') {
                that.Tap1('请选择检查类型！')
              }
              else if (that.data.yhdd == '') {
                that.Tap1('请输入隐患地点！')
              }
              else {
                wx.navigateTo({ url: 'addtroublezg' }
                )
              }
            }
          }
        }
      });
    }else{
      wx.showActionSheet({
        itemList: ['提交', '现场已完成整改'],
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              if (that.data.jclx == '') {
                that.Tap1('请选择检查类型！')
              }
              else if (that.data.yhdd == '') {
                that.Tap1('请输入隐患地点！')
              } else {
                that.upimg(0, that.data.yhtp.length)
              }
            }
            else {
              if (that.data.jclx == '') {
                that.Tap1('请选择检查类型！')
              }
              else if (that.data.yhdd == '') {
                that.Tap1('请输入隐患地点！')
              }
              else {
                wx.navigateTo({ url: 'addtroublezg' }
                )
              }
            }
          }
        }
      });
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
  addtrouble: function(){
    this.getyhdata();
    wx.request({
      url: this.data.serverUrl + 'addyh',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method:'POST',
      data: this.yhdata,
      success: res => {
        if (res.statusCode === 200) {
          if(this.data.yhtype=='inspect'){
            let inspectdata = this.data.inspectdata
            inspectdata.equipment = inspectdata.equipment.id
            inspectdata.trouble = res.data.trouble
            wx.request({
              url: this.data.serverUrl + 'api/inspect?a=add',
              header: {
                'content-type': 'application/json', // 
                'Cookie': wx.getStorageSync("sessionid"),
              },
              method: 'POST',
              data: inspectdata,
              success: res => {
                if (res.statusCode === 200) {
                  wx.hideLoading();
                  wx.navigateBack({
                    delta: 2
                  })

                }
              }
            });
          }
          else if (this.data.yhtype == 'risktask') {
            let data = {'risktask':null,'trouble':null}
            data.risktask = this.data.risktaskdata.id
            data.trouble = res.data.trouble
            wx.request({
              url: this.data.serverUrl + 'api/risktask?a=checktrouble',
              header: {
                'content-type': 'application/json', // 
                'Cookie': wx.getStorageSync("sessionid"),
              },
              method: 'POST',
              data: data,
              success: res => {
                if (res.statusCode === 200) {
                  wx.hideLoading();
                  wx.navigateBack({
                    delta: 2
                  })

                }
              }
            });
          }
          else{
            wx.hideLoading();
            wx.navigateBack()
          }
          
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
    this.data.fxsj=time
    //获取隐患等级
    wx.request({
      url: this.data.serverUrl + 'getdickey?dicclass=18&a=combobox',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.data.yhdjArray = res.data;
          this.data.yhdj = res.data[1].value;
          this.setData({
            yhdjArray: res.data,
            yhdjIndex: 1,
          })
        }
      }
    });
    //获取检查类型
    wx.request({
      url: this.data.serverUrl + 'getdickey?dicclass=14&a=combobox',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.data.jclxArray = res.data;
          this.setData({
            jclxArray: res.data,
          })
        }
      }
    });
    //拉取权限
    if (getApp().globalData.rights.indexOf('30') != -1) {
      this.setData({
        mapright: true
      })
    } else {
      this.setData({
        mapright: false
      })
    }
    if(options.type=='inspect'){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var inspectdata = prevPage.data
      console.log(inspectdata)
      this.data.inspectdata = inspectdata
      this.setData({
        yhtype:'inspect',
        yhqy:inspectdata.equipment.area__id,
        yhqy__name:inspectdata.equipment.area__name,
        yhdd: inspectdata.equipment.place,
        equipmentname: inspectdata.equipment.name,
      })
    }
    else if (options.type == 'risktask'){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var risktaskdata = prevPage.data.alllist[options.index]
      console.log(risktaskdata)
      this.data.risktaskdata = risktaskdata
      this.setData({
        yhtype: 'risktask',
        yhqy: risktaskdata.risk__riskact__area__id,
        yhqy__name: risktaskdata.risk__riskact__area__name,
        yhdd: risktaskdata.risk__riskact__place,
        riskstep: risktaskdata.risk__step,
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
    this.data.fxsj=time
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
  }
})