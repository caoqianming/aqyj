//var base64 = require("../images/base64");
var sliderWidth = 96;
var util = require('../../utils/util.js')
Page({
  data: {
    serverUrl: getApp().globalData.serverUrl,
    tabs: ["培训内容", "参加人员"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  tabClick: function (e) {
    var that = this
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
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
        let tpurls = []
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
        else if (fileurl.indexOf(".png") != -1) {
          filetype = 'tp'
          tpurls.push(filePath)
          
        }
        else if (fileurl.indexOf(".jpg") != -1) {
          filetype = 'tp'
          tpurls.push(filePath)
        }
        that.openit(filePath, filetype, tpurls)
      }
    })
  },
  openit: function (filePath, filetype, tpurls){
    wx.hideLoading()
    if(filetype == 'tp'){
      wx.previewImage({
        urls: tpurls,
      })
    }else{
      wx.openDocument({
        filePath,
        fileType: filetype,
        success(res) {
          console.log('打开文档成功')
        }, fail: function (e) {
          console.log(e)
        }
      })
    }

  },
  onLoad: function (options) {
    // this.setData({
    //   icon: base64.icon20
    // });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    console.log(options.trainid)
    that.getPx(options.trainid)
  },
  onShow: function () {
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数
  },
  getPx: function (id) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
      url: this.data.serverUrl + 'pxhandle?a=detail&trainid=' + id,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        data: {},
        success: res => {
          wx.hideLoading();
          if (res.statusCode === 200) {
            var pxdata = res.data
            if (pxdata.starttime != '') { pxdata.starttime = util.formatTime(new Date(pxdata.starttime)) }
            for (var i = 0; i < pxdata.cjrydetail.length; i++) {
              let qdsj = pxdata.cjrydetail[i].qdsj
              if (qdsj != null)
              { pxdata.cjrydetail[i].qdsj = util.formatTime(new Date(qdsj));}
              
            }
            let material = []
            for (var i = 0, len = pxdata.material.length; i < len; i++) {
              let x = {}
              x['name'] = pxdata.material[i].split('_').pop();
              x['value'] = pxdata.material[i]
              material.push(x)
            }
            pxdata.material = material
            pxdata.matershow = material[0].name
            console.log(pxdata.material)
            this.setData(pxdata)
            
            //console.log(this.data.yhzt)
          }
        }
      });
  },
});