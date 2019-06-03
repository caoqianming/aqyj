// pages/examtest/detail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  detaildata:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detailid = options.detailid
    this.data.detailid = detailid
    wx.showLoading({
      title: '加载中..',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/examtestdetail?a=detail&id='+detailid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading()
          var data = res.data
          data.starttime = util.formatTime2(new Date(data.starttime))
          this.detaildata = data
          this.setData({
            starttime:data.starttime,
            took:data.took,
            tmIndex:0,
            tmtotal: data['testdetail'].length,
            currentTm:data['testdetail'][0]
          }
          )
          this.showanswer()
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
  next:function(){
    var that=this
    var tmIndex = that.data.tmIndex +1
    that.setData({
      tmIndex:tmIndex,
      currentTm:that.detaildata.testdetail[tmIndex]
    })
    that.showanswer()
  },
  previous: function () {
    var that = this
    var tmIndex = that.data.tmIndex - 1
    that.setData({
      tmIndex: tmIndex,
      currentTm: that.detaildata.testdetail[tmIndex]
    })
    that.showanswer()
  },
  showanswer: function () {
    var that = this
    var currentTm = that.data.currentTm
    console.log(currentTm)
    var answer = currentTm.question__answer
    var sorder = Object.keys(answer).sort();
    var answerChecked=[]
    for (var x = 0; x < sorder.length; x++) {
      if (answer[sorder[x]] != '') {
        if(currentTm.userchecked!=undefined){
          var ii = currentTm.userchecked.indexOf(sorder[x])
        }else{
          ii=1
        }
        if ( ii!= -1 && currentTm.question__right.indexOf(sorder[x]) != -1){
          answerChecked.push({ 'name': sorder[x] + ':' + answer[sorder[x]], 'right': true, 'checked': true })
        } else if (ii != -1){
          answerChecked.push({ 'name': sorder[x] + ':' + answer[sorder[x]], 'right': false, 'checked': true })
        } else if (currentTm.question__right.indexOf(sorder[x]) != -1){
          answerChecked.push({ 'name': sorder[x] + ':' + answer[sorder[x]], 'right': true, 'checked': false })
        }else{
          answerChecked.push({ 'name': sorder[x] + ':' + answer[sorder[x]], 'right': false, 'checked': false })
        }

      }

    }
    that.setData({ 'answerChecked': answerChecked })
  },
})