// pages/exercise/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  catsname:'',
  cats:'',
  start1:true,
  start2:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      that.setData({
        catsname: nst.join(','),
        cats: nst1.join(','),
      })
    }
  },
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
    var that=this
    let oldcats = this.data.cats
    let lst = getApp().globalData.selectList
    let nst = []
    let nst1 = []
    if (lst) {
      for (var i = 0; i < lst.length; i++) {
        nst.push(lst[i]['name'])
        nst1.push(lst[i]['id'])
      }
      that.setData({
        catsname: nst.join(','),
        cats: nst1.join(','),
      })
    }
    if (oldcats == '' || oldcats == this.data.cats){
      wx.getStorage({
        key: 'ydtms',
        success: function (res) {
          that.setData({
            start1: false,
            start2: true
          })
        },
      })
    }
    else{
      that.setData({
        start1: true,
        start2: false
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
  choosequestioncat:function(){
    wx.navigateTo({
      url: '/pages/questioncat/index',
    })
  },
  start1:function(){
if(this.data.catsname!=''){
wx.navigateTo({
  url: 'main',
})
}else{
  wx.showModal({
    content: '请选择题目分类!',
    showCancel: false,
  })
}
  },
  start2: function () {
    if (this.data.catsname != '') {
      wx.removeStorage({
        key: 'ydtms',
        success: function(res) {

        },
        complete:function(){
          wx.navigateTo({
            url: 'main',
          })
        }
      })
      
    } else {
      wx.showModal({
        content: '请选择题目分类!',
        showCancel: false,
      })
    }
  }
})