// pages/suggest/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jyimg: [],
    jyqy:'',
    jydd:'',
    dqxz:'',
    jynr:'',
    qwxg:'',
    jylb:0,
    serverUrl: getApp().globalData.serverUrl,
  },
  ohShitfadeOut() {

    var fadeOutTimeout = setTimeout(() => {

      this.setData({ popErrorMsg: '' });

      clearTimeout(fadeOutTimeout);

    }, 3000);

  }, 
  bindjylbChange: function (e) {
    this.setData({
      jylbIndex: e.detail.value,
    })
    this.data.jylb = this.data.jylbArray[e.detail.value].value
  },
  binddqxzInput: function (e) {
    this.data.dqxz = e.detail.value
  },
  bindjynrInput: function (e) {
    this.data.jynr = e.detail.value
  },
  bindqwxgInput: function (e) {
    this.data.qwxg = e.detail.value
  },
  bindjyddInput: function (e) {
    this.data.jydd = e.detail.value
  },
  submit: function () {
    var that = this
    if (that.data.dqxz == '') {
      this.setData({
        popErrorMsg: '请输入当前现状！',
      });
      this.ohShitfadeOut();
    } else if (that.data.jynr == '') {
      this.setData({
        popErrorMsg: '请输入建议内容！',
      });
      this.ohShitfadeOut();
    } else if (that.data.jylb == 0) {
      this.setData({
        popErrorMsg: '请选择建议类别！',
      });
      this.ohShitfadeOut();
    }else if (that.data.qwxg == '') {
      this.setData({
        popErrorMsg: '请输入期望效果！',
      });
      this.ohShitfadeOut();
    } else {
      that.upimg(0, that.data.jyimg.length)
    }
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
        filePath: that.data.jyimg[x],
        name: 'upfile',
        success(res) {
          var obj = JSON.parse(res.data);
          that.data.jyimg[x] = obj['filepath']
          x = x + 1
          if (x < y) {
            that.upimg(x, y)
          }
          else {
            that.addsuggest()
          }
        }
      })
    } else {
      that.addsuggest()
    }
  },
  addsuggest: function () {
    var jydata = {
      dqxz: this.data.dqxz,
      jynr: this.data.jynr,
      qwxg: this.data.qwxg,
      jyimg: this.data.jyimg,
      jylb:this.data.jylb,
      jyqy:this.data.jyqy,
      jydd:this.data.jydd,
    }
    //console.log(wsdata.unsafe)
    wx.request({
      url: getApp().globalData.serverUrl + 'api/suggest?a=add',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: jydata,
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
    //获取建议类别
    wx.request({
      url: this.data.serverUrl + 'getdickey?dicclass=32&a=combobox',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          this.data.jylbArray = res.data;
          this.setData({
            jylbArray: res.data,
          })
        }
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
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.jyimg
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
          jyimg: that.data.jyimg.concat(res.tempFilePaths)
        })
      }
    })
  },
  deleteImage: function (e) {
    var that = this;
    var jyimg = that.data.jyimg;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          jyimg.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          jyimg: jyimg
        });
      }
    })
  },
})