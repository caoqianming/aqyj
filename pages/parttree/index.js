Page({
  data: {
    value: [],
  },
  selThis(e) {
    //console.log(e.detail);
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      sdbm__partname: e.detail.name,
      sdbm: e.detail.id,
      pxbm: e.detail.id,
      pxbm__partname: e.detail.name,
      zgbm__partname: e.detail.name,
      zgbm: e.detail.id,
      newbm__partname: e.detail.name,
      newbm: e.detail.id,
    })
    wx.request({
      url: getApp().globalData.serverUrl + 'getuser?a=combobox&partid='+e.detail.id,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          prevPage.setData({
            zgrArray: res.data,
            newrArray: res.data,
            skrArray:res.data,
          })
          wx.navigateBack()
        }
      }
    });
  },
  convert(rows) {
    function exists(rows, parentId) {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].id == parentId) return true;
      }
      return false;
    }

    var nodes = [];
    // get the top level nodes
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (!exists(rows, row.parentId)) {
        nodes.push({
          id: row.id,
          name: row.name
        });
      }
    }

    var toDo = [];
    for (var i = 0; i < nodes.length; i++) {
      toDo.push(nodes[i]);
    }
    while (toDo.length) {
      var node = toDo.shift();	// the parent node
      // get the children nodes
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row.parentId == node.id) {
          var child = { id: row.id, name: row.name };
          if (node.children) {
            node.children.push(child);
          } else {
            node.children = [child];
          }
          toDo.push(child);
        }
      }
    }
    return nodes;
  },
  onLoad:function(option) {
    let strurl
    if(option.a=='zp'){
      strurl='tree3'
    }else{
      strurl='tree2'
    }
    wx.request({
      url: getApp().globalData.serverUrl + 'parthandle?a='+strurl,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          //console.log(res.data)
          var rows = res.data
          console.log(rows)
          this.setData({
            value: this.convert(rows)
          })
        }
      }
    });
  },
});
