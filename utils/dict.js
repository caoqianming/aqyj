var serverUrl = getApp().globalData.serverUrl
var cookie = wx.getStorageSync("sessionid")
function getyhdj(){
  wx.request({
    url: serverUrl + 'getdickey?dicclass=18&a=combobox',
    header: {
      'content-type': 'application/json', // 默认值
      'Cookie': cookie,
    },
    data: {},
    success: res => {
      if (res.statusCode === 200) {
        return res.data
      }
    }
  });
}
module.exports = {
  getyhdj: getyhdj,
}