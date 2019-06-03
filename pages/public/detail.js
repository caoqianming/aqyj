// pages/suggest/detail.js
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({
  openfj: function (e) {
    var that = this
    let fileurl = that.data.serverUrl + e.currentTarget.dataset.id
    wx.showLoading({
      title: '正在下载...',
    })
    wx.downloadFile({
      url: fileurl,
      success(res) {
        wx.showLoading({
          title: '成功,正在打开...',
        })
        const filePath = res.tempFilePath
        console.log(filePath)
        var filetype
        if (fileurl.indexOf(".docx") != -1) {
          filetype = 'docx'
        }
        else if (fileurl.indexOf(".xlsx") != -1) {
          filetype = 'xlsx'
        }
        else if (fileurl.indexOf(".xls") != -1) {
          filetype = 'xls'
        }
        else if (fileurl.indexOf(".pptx") != -1) {
          filetype = 'pptx'
        }
        else if (fileurl.indexOf(".ppt") != -1) {
          filetype = 'ppt'
        }
        else if (fileurl.indexOf(".pdf") != -1) {
          filetype = 'pdf'
        }
        console.log(filetype)
        wx.openDocument({
          filePath,
          fileType: filetype,
          success(res) {
            wx.hideLoading()
            console.log('打开文档成功')
          }, fail: function (e) {
            console.log(e)
          }
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGgdetail(options.id);
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
  getGgdetail: function (id) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/notice?a=detail&id=' + id,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {
        },
        success: res => {
          wx.hideLoading();
          console.log(res.data);
          if (res.statusCode === 200) {
            var ggdata = res.data
            let material=[]
            console.log(ggdata.notice.material.length)
            for (var i = 0, len = ggdata.notice.material.length; i < len; i++) {
              let x = {}
              x['name'] = ggdata.notice.material[i].split('_').pop();
              x['value'] = ggdata.notice.material[i]
              material.push(x)
            }
            //console.log(material)
            this.setData({
              material: material,
              title: ggdata.notice.title,
              reads: ggdata.notice.reads
            })

            WxParse.wxParse('article', 'html', ggdata.notice.content, this, 0)
          }
        }
      });
  },
})