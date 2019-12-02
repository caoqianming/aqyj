// pages/operation/operationcheck.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
    zyimg2: [],
    zjsp:false,
    zyspryname: '',
    spry: [],
  },
  getZy: function (zyid) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/operation?a=detail&zyid=' + zyid,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {},
        success: res => {
          wx.hideLoading();
          if (res.statusCode === 200) {
            var zydata = res.data
            //格式化隐患信息
            for (var i = 0; i < zydata.zyimg.length; i++) {
              zydata.zyimg[i] = this.data.serverUrl + zydata.zyimg[i];
            }
            if (zydata.kssj != '') { zydata.kssj = util.formatTime(new Date(zydata.kssj)) }
            if (zydata.jssj != '') { zydata.jssj = util.formatTime(new Date(zydata.jssj)) }
            this.setData(zydata)
            switch (zydata.zyzt) {
            }
            //console.log(this.data.yhzt)
          }
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZy(options.zyid);
    this.setData({
      zyid:options.zyid
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
    let lst = getApp().globalData.selectPeopleList
    let nst = []
    let nst1 = []
    if (lst) {
      for (var i = 0; i < lst.length; i++) {
        nst.push(lst[i]['name'])
        nst1.push(lst[i]['id'])
      }
      this.setData({
        zyspryname: nst.join(','),
        spry: nst1,
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
  zyimgPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.zyimg
    })
  },
  submit:function(){
    var that = this;
    wx.request({
      url: that.data.serverUrl + 'api/operation?a=qrzy',
      header: {
        'content-type': 'aapplication/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: {'zyid':that.data.zyid},
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
  submit2: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: that.data.serverUrl + 'api/operation?a=spzy',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: { 'zyid': that.data.zyid },
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
  chooseImage2: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          zyimg2: that.data.zyimg2.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewImage2: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.zyimg2
    })
  },
  deleteImage2: function (e) {
    var that = this;
    var zyimg2 = that.data.zyimg2;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          zyimg2.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          zyimg2: zyimg2
        });
      }
    })
  },
  submit3: function () {
    this.upimg2(0, this.data.zyimg2.length);
  },
  //上传图片
  upimg2: function (x, y) {
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传关闭图片' + (x + 1) + '....',
      })
      wx.uploadFile({
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        url: getApp().globalData.serverUrl + 'upfile',
        filePath: that.data.zyimg2[x],
        name: 'upfile',
        success(res) {
          var obj = JSON.parse(res.data);
          that.data.zyimg2[x] = obj['filepath']
          x = x + 1
          if (x < y) {
            that.upimg2(x, y)
          }
          else {
            that.closezy()
          }
        }
      })
    } else {
      that.closezy()
    }
  },
  closezy: function () {
    var zydata = {
      zyimg2: this.data.zyimg2,
      zyid:this.data.zyid
    }
    //console.log(gcdata.unsafe)
    wx.request({
      url: getApp().globalData.serverUrl + 'api/operation?a=gbzy',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: zydata,
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          wx.navigateBack()
        }
      }
    });
  },
  zjsp: function () {
    var that=this
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/operation?a=spzy',
      header: {
        'content-type': 'application/json', // 
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: { 'zyid': that.data.zyid, 'zjsp': true, 'newsprs': that.data.spry },
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          wx.navigateBack()
        }
      }
    });
  },
  openaction: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['确认无误,审批通过', '提交上级审批'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.submit2()
          }
          else if (res.tapIndex == 1) {
            that.setData({
              'zjsp': true,
              'action':'提交上级审批'
            })
          } else if (res.tapIndex == 2) {
            wx.request({
              url: that.data.serverUrl + 'api/operation?a=spzy',
              header: {
                'content-type': 'application/json', // 
                'Cookie': wx.getStorageSync("sessionid"),
              },
              method: 'POST',
              data: { 'zyid': that.data.zyid ,'zzsp':true},
              success: res => {
                if (res.statusCode === 200) {
                  wx.hideLoading();
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            });
          } 
        }
      }
    });
  }
})