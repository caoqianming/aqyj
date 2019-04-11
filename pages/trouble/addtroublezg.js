// pages/trouble/addtroublezg.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
    yhpgArray: [],
    yhpgIndex: null,
    yhlxArray: [],
    yhlxIndex: null,
    yhlbArray: [],
    yhlbIndex: null,
  },
  yhdic: {
  },
  yhdata:{

  },
  bindyhlxChange: function (e) {
    this.setData({
      yhlxIndex: e.detail.value,
    })
    this.data.yhlx = this.data.yhlxArray[e.detail.value].value
    if (this.data.yhlx == 16) {
      this.data.yhlbArray = this.yhdic.yhlb1;
      this.setData({
        yhlbArray: this.yhdic.yhlb1,
      })
    } else {
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
  bindzgmsInput: function(e) {
    this.data.zgms = e.detail.value
  },
  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        //console.log(res)
        that.setData({
          zghtp: that.data.zghtp.concat(res.tempFilePaths)
        })
      }
    })
  },
  submit: function() {
    var that = this
    //整改图片给data
    that.data.zghtp = that.data.zghtp
    if (that.data.yhpg == '') {
      that.Tap1('请选择隐患评估！')
    } else if (that.data.yhlx == '') {
      that.Tap1('请输入隐患类型！')
    } else if (that.data.yhlb == '') {
      that.Tap1('请输入隐患类别！')
    } else if (that.data.zgms == '') {
      that.Tap1('请输入隐患描述！')
    } else {
      that.upimg(0, that.data.yhtp.length)
    }
  },
  Tap1: function(x) {
    wx.showModal({
      title: "系统提示",
      content: x,
      showCancel: false,
      confirmText: "确定"
    })
  },
  //上传图片
  upimg: function(x, y) { //x=0,y是图片列表长度
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传隐患图片' + (x+1) + '....',
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
          that.data.yhtp[x] = obj['filepath']
          x = x + 1
          if (x < y) {
            that.upimg(x, y)
          } else {
            var zghtp = that.data.zghtp
            that.upimg2(0, zghtp.length)
          }
        }
      })
    } else{
      var zghtp = that.data.zghtp
      that.upimg2(0, zghtp.length)
    }
  },
  //上传整改图片
  upimg2: function(x, y) {
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传整改图片' + (x + 1) + '....',
      })
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
      'yyfx': this.data.yyfx,
      'zgcs': this.data.zgcs,
      'zgms': this.data.zgms,
      'zghtp': this.data.zghtp,
    }
  },
  addtrouble: function() {
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
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.zghtp
    })
  },
  onLoad: function(options) {
    var that = this
    var pages = getCurrentPages();
    this.data = pages[pages.length - 2].data;//获取前一个界面数据
    //console.log(that.data)
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

  }
})