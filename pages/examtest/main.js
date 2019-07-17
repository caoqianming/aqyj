// pages/examtest/main.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmIndex: 0,
    answerChoices:[],
    ydtm:0
  },
  tmdata: {

  },
  calydtm:function(e){
    var tms = this.tmdata.tms
    var ydtm = 0
    for (var i = 0, len = tms.length; i < len; ++i) {
      if(tms[i].userchecked && tms[i].userchecked.length !=0){
        ydtm +=1
      }
    }
    this.setData({
      ydtm:ydtm
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var answerChoices = this.data.answerChoices;
    for (var i = 0, len = answerChoices.length; i < len; ++i) {
      answerChoices[i].checked = answerChoices[i].value == e.detail.value;
    }

    this.setData({
      answerChoices: answerChoices,
    });
    this.tmdata.tms[this.data.tmIndex]['userchecked'] = e.detail.value
    this.calydtm()
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var answerChoices = this.data.answerChoices, values = e.detail.value;
    for (var i = 0, lenI = answerChoices.length; i < lenI; ++i) {
      answerChoices[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (answerChoices[i].value == values[j]) {
          answerChoices[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      answerChoices: answerChoices,
    });
    this.tmdata.tms[this.data.tmIndex]['userchecked'] = e.detail.value
    this.calydtm()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        testid:options.id
      })
      wx.showLoading({})
      wx.request({
        url: getApp().globalData.serverUrl + 'api/examtest?a=detailtm&id=' + options.id,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          if (res.statusCode === 200) {
            wx.hideLoading()
            console.log(res.data)
            let tms = res.data
            this.tmdata = tms
            console.log(tms.duration)
            let mil = tms.duration * 60 * 1000
            console.log(mil)
            this.begin(mil)
            this.showTm(0)
            this.setData({ 
              tmtotal: tms.tms.length,
              starttime: util.formatTime(new Date()) })
          }

        }
      });
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
    // wx.showModal({
    //   title: '系统提示',
    //   content: '未完成答卷,是否要提交答卷!',
    //   confirmText: "提交",
    //   cancelText: "点错了",
    //   success: function (res) {
    //     if (res.confirm) {
    //     } else {
    //       this.onShow()
    //     }
    //   }
    // })
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
  begin: function (mil) {
    var temp = formatmil(mil);
    this.setData({
      countdown: temp,
    });

    if (mil < 2000) {
      wx.showLoading({
        title: '时间到,正在交卷..',
      });
      this.handtest()
      return
    };

    getApp().globalData.timepass=setTimeout(
      () => {
        mil -= 1000;
        this.begin(mil);
      }, 1000
    );
  },
  showTm: function (index) {
    var that = this
    var currentTm = that.tmdata.tms[index]
    console.log(currentTm)
    that.setData({ 'currentTm': currentTm })
    var answer = currentTm.question__answer
    var i = 0
    var x = ['A','B','C','D','E','F']
    var answerChoices = []
    for(var key in answer){
      if(answer[key]!=''){
        answerChoices.push({'name':x[i],'value':key,'checked':false})
        i = i + 1
      }
    }
    console.log(answerChoices)
    that.setData({ 'answerChoices': answerChoices})
  },
  showChecked: function(index){
    var tm = this.tmdata.tms[index]
    let choices = this.data.answerChoices
    if(tm.userchecked){
      if (tm.question__type = 2) {
        for (var i = 0, len = choices.length; i < len; i++) {
          if (tm.userchecked.indexOf(choices[i].value) != -1) {
            choices[i].checked = true
          }
        }
      } else {
        for (var i = 0, len = choices.length; i < len; i++) {
          if (choices[i].value == tm.userchecked) {
            choices[i].checked = true
          }
        }
      }
      this.setData({
        answerChoices: choices
      })
    }
  },
  next:function(){
    var that = this
    var tmIndex = that.data.tmIndex+1
    that.showTm(tmIndex)
    that.setData({
      tmIndex:tmIndex,
    })
    that.showChecked(tmIndex)
  },
  previous: function () {
    var that = this
    var tmIndex = that.data.tmIndex - 1
    that.showTm(tmIndex)
    that.setData({
      tmIndex: tmIndex,
    })
    that.showChecked(tmIndex)
  },
  hand:function(){
    var that = this
    if (that.data.ydtm < that.tmdata.tms.length){
      wx.showModal({
        title: '警告',
        content: '答卷未完成,确定提交?',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            that.handtest()
          }
        }
      })
    }else{
      wx.showModal({
        content: '确定提交?',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            that.handtest()
          }
        }
      })
    }
  },
  handtest:function(){
    var data={
      'testid': this.data.testid,
      'starttime':this.data.starttime,
      'endtime': util.formatTime(new Date()),
      'sheet':this.tmdata.tms
    }
    wx.showLoading({
      title: '自动判卷中..',
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'api/examtestdetail?a=handtest&id=' + this.data.testid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: data,
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading()
          wx.redirectTo({
            url: 'result?' + parseParams(res.data.data),
          })
          clearTimeout(getApp().globalData.timepass)
        }
      }
    });
  }
})
function formatmil(mil) {
  var allSecond = Math.floor(mil / 1000);
  var h = Math.floor(allSecond / 3600);
  var m = Math.floor((allSecond - h * 3600) / 60);
  var s = Math.floor(allSecond - h * 3600 - m * 60);
  h = toTow(h);
  m = toTow(m);
  s = toTow(s);
  return h + ":" + m + ":" + s;
}
function toTow(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
function parseParams(data) {
  try {
    var tempArr = [];
    for (var i in data) {
      var key = encodeURIComponent(i);
      var value = encodeURIComponent(data[i]);
      tempArr.push(key + '=' + value);
    }
    var urlParamsStr = tempArr.join('&');
    return urlParamsStr;
  } catch (err) {
    return '';
  }
}