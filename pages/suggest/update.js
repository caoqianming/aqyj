// pages/suggest/detail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: getApp().globalData.serverUrl,
    jyimg2:[],
    shresult:'',
    apcl:true,
    zjtr:false,
    accept: 'yes',
    action: '安排处理'
  },
  bindjyfkInput: function (e) {
    this.data.jyfk = e.detail.value
  },
  bindclcsInput: function (e) {
    this.data.clcs = e.detail.value
  },
  bindclmsInput: function (e) {
    this.data.clms = e.detail.value
  },
  bindshyjInput: function (e) {
    this.data.shyj = e.detail.value
  },
  Tap1: function (x) {
    wx.showModal({
      title: "系统提示",
      content: x,
      showCancel: false,
      confirmText: "确定"
    })
  },
  //上传隐患图片
  upimg: function (x, y) {
    var that = this
    if (x < y) {
      wx.showLoading({
        title: '上传处理图片' + (x + 1) + '....',
      })

      if (that.data.jyimg2[x].indexOf(that.data.serverUrl) == -1) {
        wx.uploadFile({
          header: {
            'content-type': 'application/json', // 默认值
            'Cookie': wx.getStorageSync("sessionid"),
          },
          url: that.data.serverUrl + 'upfile',
          filePath: that.data.jyimg2[x],
          name: 'upfile',
          success(res) {
            var obj = JSON.parse(res.data);
            that.data.jyimg2[x] = obj['filepath']
            x = x + 1
            if (x < y) {
              that.upimg(x, y)
            } else {
              that.update()
            }
          }
        })
      } else {
        var bl = that.data.jyimg2[x].replace(that.data.serverUrl, "")
        that.data.jyimg2[x] = bl
        that.update()
      }
    } else {
      that.update()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJydetail(options.jyid);
    getApp().globalData.selectPeopleList = []
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
    if (lst.length !=0) {
      for (var i = 0; i < lst.length; i++) {
        nst.push(lst[i]['name'])
        nst1.push(lst[i]['id'])
      }
      this.setData({
        clr__name: nst[0],
        clr: nst1[0],
        npgr__name:nst[0],
        npgr:nst1[0],
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
  jyimgPreview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.jyimg
    })
  },
  getJydetail: function (jyid) {
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.serverUrl + 'api/suggest?a=detail&jyid=' + jyid,
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
            var jydata = res.data
            //格式化观察信息
            for (var i = 0; i < jydata.jyimg.length; i++) {
              jydata.jyimg[i] = this.data.serverUrl + jydata.jyimg[i];
            }
            for (var i = 0; i < jydata.jyimg2.length; i++) {
              jydata.jyimg2[i] = this.data.serverUrl + jydata.jyimg2[i];
            }
            if (jydata.submittime != '') { jydata.submittime = util.formatTime(new Date(jydata.submittime)) }
            this.setData(jydata)
          }
        }
      });
  },
  submit:function(){
    if(this.data.jyzt==2){
      if (this.data.clms == '') {
        this.Tap1('处理描述未填写!')
      }else{
        this.upimg(0, this.data.jyimg2.length)
      }

       
      
      
    }else if(this.data.jyzt==3){
      this.update()
    }else if(this.data.jyzt==1){
      if(this.data.apcl== true){
        if (this.data.jyfk == '') {
          this.Tap1('建议反馈未填!')
        }
        else if(this.data.clr__name==''){
          this.Tap1('处理人未选择!')
        }
        else if(this.data.clcs==''){
          this.Tap1('处理措施未填写!')
        }else{
          this.update()
        }
      } else if(this.data.zjtr==true){
        this.update()
      }else {
        if (this.data.jyfk == '') {
          this.Tap1('建议反馈未填!')
        }else{
          this.update()
        }
      }
    }

  },
  update:function(){
    var jydata = this.data
    wx.request({
      url: this.data.serverUrl + 'api/suggest?a=update',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: jydata,
      method: 'post',
      success: res => {
        wx.hideLoading();
        console.log(res.data);
        if (res.statusCode === 200) {
          wx.navigateBack({
          })
        }
      }
    });
  },
  choosejyimg2Image: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(that.data.jyimg2.concat(res.tempFilePaths))
        if(that.data.jyimg2 ==''){
          that.data.jyimg2 = []
        }
        that.setData({
          jyimg2: that.data.jyimg2.concat(res.tempFilePaths)
        })
      }
    })
  },
  deleteImage: function (e) {
    var that = this;
    var jyimg2 = that.data.jyimg2;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    console.log(e)
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          jyimg2.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          jyimg2: jyimg2
        });
      }
    })
  },
  jyimg2Preview: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.jyimg2
    })
  },
  openaction: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['安排处理', '转交他人', '不采纳','采纳并归档'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.setData({
              'apcl': true,
              'zjtr': false,
              'accept': 'yes',
              'action': '安排处理'
            })
          }
          else if (res.tapIndex == 1) {
            that.setData({
              'apcl': false,
              'zjtr': true,
              'accept': 'yes',
              'action': '转交他人'
            })
          } else if (res.tapIndex == 2) {
            that.setData({
              'apcl': false,
              'zjtr': false,
              'accept': 'no',
              'action': '不采纳'
            })
          } else if (res.tapIndex == 3) {
            that.setData({
              'apcl': false,
              'zjtr': false,
              'accept': 'yes',
              'action': '采纳并归档'
            })
          }
        }
      }
    });
  }
})