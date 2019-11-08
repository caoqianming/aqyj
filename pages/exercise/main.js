// pages/examtest/main.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmIndex: 0,
    answerChoices: [],
    answerP: false
  },
  tmdata: {
    tms: [],
    ydtms: []
  },
  radioChange: function(e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value);
    var answerChoices = this.data.answerChoices;
    for (var i = 0, len = answerChoices.length; i < len; ++i) {
      answerChoices[i].checked = answerChoices[i].value == e.detail.value;
    }

    this.setData({
      answerChoices: answerChoices,
    });
    this.tmdata.tms[this.data.tmIndex]['userchecked'] = e.detail.value
    this.setData({
      currentTm: this.tmdata.tms[this.data.tmIndex]
    })
    this.showanswer()
  },
  checkboxChange: function(e) {
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var answerChoices = this.data.answerChoices,
      values = e.detail.value;
    for (var i = 0, lenI = answerChoices.length; i < lenI; ++i) {
      answerChoices[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (answerChoices[i].value == values[j]) {
          answerChoices[i].checked = true;
          break;
        }
      }
    }
    this.tmdata.tms[this.data.tmIndex]['userchecked'] = e.detail.value
    this.setData({
      answerChoices: answerChoices,
      currentTm: this.tmdata.tms[this.data.tmIndex]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'questioncats',
      success: function(res) {
        let lst = res.data
        let nst = []
        let nst1 = []
        if (lst) {
          for (var i = 0; i < lst.length; i++) {
            nst.push(lst[i]['name'])
            nst1.push(lst[i]['id'])
          }
        }
        that.setData({
          tmlxs: nst1
        })
        wx.getStorage({
          key: 'ydtms',
          success: function(res) {
            that.tmdata.ydtms = res.data
            that.getTms()
          },
          fail: function() {
            that.getTms()
          }
        })

      },
    })

  },
  getTms: function(callback) {
    var that = this
    wx.showLoading({})
    wx.request({
      url: getApp().globalData.serverUrl + 'api/question?a=exercise',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      method: 'POST',
      data: {
        'tmlx': that.data.tmlxs,
        'ydtms': that.tmdata.ydtms
      },
      success: res => {
        if (res.statusCode === 200) {
          wx.hideLoading()
          //console.log(res.data)
          let tms = res.data.rows
          if(tms.length==0){

            wx.showModal({
              title: '提示',
              content: '无更多新题,返回重新开始',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    
                  })
                }
              }
            })

          }else{
            that.tmdata.tms = that.tmdata.tms.concat(tms)
            that.showTm(that.data.tmIndex) //展示题目和答案
            that.setData({
              tmtotal: res.data.total,
            })
          }
          
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
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.setStorage({
      key: 'ydtms',
      data: this.tmdata.ydtms,
    })
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
  showTm: function(index) {
    var that = this
    var currentTm = that.tmdata.tms[index]
    //console.log(currentTm)
    that.setData({
      'currentTm': currentTm
    })
    var answer = currentTm.answer
    var sorder = Object.keys(answer).sort();
    var answerChoices = []
    //对正确答案进行排序
    for (var i = 0; i < sorder.length; i++) {
      answerChoices.push({
        'name': sorder[i],
        'value': sorder[i],
        'checked': false
      })
    }
    //console.log(answerChoices)
    that.setData({
      'answerChoices': answerChoices
    })
    
    if (that.tmdata.ydtms.indexOf(currentTm.id)!=-1){ //如果未答过
      that.showChecked(index)
      that.showanswer()
    }
    that.tmdata.ydtms.push(currentTm.id)
  },
  showChecked: function(index) {
    let tm = this.tmdata.tms[index]
    //console.log(tm)
    let choices = this.data.answerChoices
    if (tm.userchecked) {
      if (tm.question__type == 2) {
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
        answerChoices: choices,
        answerP: true
      })
    }
  },
  showanswer: function() {
    let answerChoices = this.data.answerChoices
    let currentTm = this.data.currentTm
    console.log(answerChoices,currentTm)

      for (var i = 0; i < answerChoices.length; i++) {
        if (currentTm.type == 2) {
          if (currentTm.right.indexOf(answerChoices[i].value) != -1) {
            answerChoices[i].right = true
          }
        } else {
          if (answerChoices[i].value == currentTm.right) {
            answerChoices[i].right = true
          }
        }
      }
      if (currentTm.type == 2) {
        if(currentTm.userchecked==undefined){currentTm.userchecked=[]}
        var answerright = this.judgeResultFun(currentTm.userchecked, currentTm.right)
        this.setData({
          answerright: answerright
        })

      } else {
        if(currentTm.userchecked==undefined){currentTm.userchecked=''}
        var answerright = currentTm.right == currentTm.userchecked
        this.setData({
          answerright: answerright
        })
      }
      this.setData({
        answerP: true,
        answerChoices: answerChoices
      })
    
  },
  next: function() {
    var that = this
    var tmIndex = that.data.tmIndex + 1
    that.setData({
      tmIndex: tmIndex,
      answerP: false
    })
    if (tmIndex + 1 > that.tmdata.tms.length) {
      that.getTms()
    } else {
      that.showTm(tmIndex)
    }
    
  },
  previous: function() {
    var that = this
    var tmIndex = that.data.tmIndex - 1
    that.setData({
      tmIndex: tmIndex,
      answerP: false
    })
    that.showTm(tmIndex)
  },
  judgeResultFun: function(arr1, arr2) {
    let flag = true
    if (arr1.length !== arr2.length) {
      flag = false
    } else {
      arr1.forEach(item => {
        if (arr2.indexOf(item) === -1) {
          flag = false
        }
      })
    }
    return flag;
  }
})