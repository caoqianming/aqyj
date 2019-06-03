
//import API from '../../../utils/API.js'
import ArrayUtils from 'ArrayUtils.js'
//import EventBus from '../../../components/NotificationCenter/WxNotificationCenter.js'



Page({
  data: {
    currentList: [], //当前展示的列表
    selectList: [],  //已选择的元素列表
    originalList: [], //最原始的数据列表
    indexList: [],  //存储目录层级的数组，用于准确的返回上一层
    selectList: [],  //已选中的人员列表
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择分类'
    })
    this.init();
  },

  init() {
    //上次选中的列表，用于判断是不是取消选中了
    this.lastTimeSelect = []
    wx.request({
      url: getApp().globalData.serverUrl + 'api/questioncat?a=tree',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync("sessionid"),
      },
      data: {},
      success: res => {
        if (res.statusCode === 200) {
          let list = convert(res.data)
          this.setData({
            currentList: list,
            originalList: list
          })
        }
      }
    })
  },

  clickItem(res) {
    console.log(res)
    let index = res.currentTarget.id;
    let item = this.data.currentList[index]

    console.log("item", item)
    if(item.children.length!=0){
      this.setData({
        currentList: item.children
      })
      //将当前的索引存入索引目录中。索引多一个表示目录多一级
      let indexes = this.data.indexList
      indexes.push(index)
      //是目录不是具体的用户
      this.setData({
        indexList: indexes
      })
      //清空上次选中的元素列表，并设置上一层的选中状态给lastTimeSelect
      this.setLastTimeSelectList();
    }

  },


  //返回按钮
  goBack() {
    let indexList = this.data.indexList
    if (indexList.length > 0) {
      //返回时删掉最后一个索引
      indexList.pop()
      if (indexList.length == 0) {
        //indexList长度为0说明回到了最顶层
        this.setData({
          currentList: this.data.originalList,
          indexList: indexList
        })
      } else {
        //循环将当前索引的对应数组赋值给currentList
        let list = this.data.originalList
        for (let i = 0; i < indexList.length; i++) {
          let index = indexList[i]
          list = list[index].children
        }
        this.setData({
          currentList: list,
          indexList: indexList
        })
      }
      //清空上次选中的元素列表，并设置上一层的选中状态给lastTimeSelect
      this.setLastTimeSelectList();
    }
  },

  //清空上次选中的元素列表，并设置上一层的选中状态给lastTimeSelect
  setLastTimeSelectList() {
    this.lastTimeSelect = []
    this.data.currentList.forEach(item => {
      if (item.checked) {
        this.lastTimeSelect.push(item)
      }
    })
  },

  //根据部门获取下列列表
  // _getUserByGroup(item) {
  //   wx.request({
  //     url: getApp().globalData.serverUrl + 'api/partuser?a=getall&parentid=' + item.id,
  //     header: {
  //       'content-type': 'application/json', // 默认值
  //       'Cookie': wx.getStorageSync("sessionid"),
  //     },
  //     data: {},
  //     success: res => {
  //       if (res.statusCode === 200) {
  //         let list = res.data.data
  //         console.log(res.list)
  //         this.setData({
  //           currentList: list
  //         })
  //         this.addList2DataTree()
  //         this.setLastTimeSelectList();
  //       }
  //     }
  //   })
    // getApp().get(API.selectUserByGroup(), params, result => {
    //   console.log('result', result)
    //   let list = this.transformData(result.data.data, item.id)
    //   this.setData({
    //     currentList: list
    //   })
    //   this.addList2DataTree()
    //   //清空上次选中的元素列表，并设置上一层的选中状态给lastTimeSelect。写在这里防止异步请求时执行顺序问题
    //   this.setLastTimeSelectList();
    // })
  // },



  //将请求的数据转化为需要的格式
  // transformData(list, parentId) {
  //   //先将数据转化为固定的格式
  //   let newList = []
  //   for (let i = 0; i < list.length; i++) {
  //     let item = list[i]
  //     newList.push({
  //       id: item.id,
  //       name: item.realName,
  //       parentId: parentId,
  //       checked: false,
  //       isPeople: true,
  //       userType: item.userType,
  //       gender: item.gender,
  //       children: []
  //     })
  //   }
  //   return newList;
  // },

  //将当前列表挂载在原数据树上, 目前支持5层目录，如需更多接着往下写就好
  addList2DataTree() {
    let currentList = this.data.currentList;
    let originalList = this.data.originalList;
    let indexes = this.data.indexList
    switch (indexes.length) {
      case 1:
        originalList[indexes[0]].children = currentList
        break;
      case 2:
        originalList[indexes[0]].children[indexes[1]].children = currentList
        break;
      case 3:
        originalList[indexes[0]].children[indexes[1]].children[indexes[2]].children = currentList
        break;
      case 4:
        originalList[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children = currentList
        break;
      case 5:
        originalList[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children = currentList
        break;
      case 6:
        originalList[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].children = currentList
        break;
    }

    this.setData({
      originalList: originalList
    })
    console.log("originalList", originalList)
  },

  //选框变化回调
  checkChange(res) {
    console.log(res)
    let values = res.detail.value
    let selectItems = []
    //将值取出拼接成 id，name 格式
    values.forEach(value => {
      let arrs = value.split(",")
      selectItems.push({ id: arrs[0], name: arrs[1] })
    })
    console.log("selectItems", selectItems)
    console.log("lastTimeSelect", this.lastTimeSelect)

    //将本次选择的与上次选择的比对，本次比上次多说明新增了，本次比上次少说明删除了，找出被删除的那条数据，在footer中也删除
    if (selectItems.length > this.lastTimeSelect.length) {
      //将 selectList 与 selectItems 拼接并去重
      let newList = this.data.selectList.concat(selectItems)
      newList = ArrayUtils.checkRepeat(newList)
      this.setData({
        selectList: newList
      })
    } else {
      //找出取消勾选的item，从selectList中删除
      //比对出取消勾选的是哪个元素
      let diffItem = {}
      this.lastTimeSelect.forEach(item => {
        let flag = false;
        selectItems.forEach(item2 => {
          if (item.id === item2.id) {
            flag = true
          }
        })
        if (!flag) {
          diffItem = item
          console.log("diff=", item)
        }
      })
      //找出被删除的元素在 selectList 中的位置
      let list = this.data.selectList
      let delIndex = 0;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === diffItem.id) {
          delIndex = i;
          break;
        }
      }
      //从list中删除这个元素
      list.splice(delIndex, 1)
      this.setData({
        selectList: list
      })
    }
    console.log("selectList", this.data.selectList)
    //更新 currentList 选中状态并重新挂载在数据树上，以保存选择状态
    this.updateCurrentList(this.data.currentList, this.data.selectList)
  },

  //footer点击删除回调
  footerDelete(res) {
    console.log(res)
    this.setData({
      selectList: res.detail.selectList
    })

    console.log('selectList', this.data.selectList)
    this.updateCurrentList(this.data.currentList, res.detail.selectList)
  },

  //点击 footer 的确定按钮提交数据
  submitData(res) {
    let selectList = this.data.selectList
    //通过 WxNotificationCenter 发送选择的结果通知
    //EventBus.postNotificationName("SelectPeopleDone", selectList)
    //将选择结果存入 app.js 的 globalData
    getApp().globalData.selectList = selectList
    wx.setStorage({
      key: 'questioncats',
      data: selectList,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    //返回
    wx.navigateBack({
      delta: 1
    })
    console.log("selectdone", selectList)
  },

  //更新 currentList 并将更新后的列表挂载在数据树上
  updateCurrentList(currentList, selectList) {
    //let newList = []
    let selectids = []
    for (var i = 0; i < selectList.length; i++) {
      selectids.push(selectList[i]['id'])
    }
    for (var i = 0; i < currentList.length; i++) {
      if (selectids.indexOf(currentList[i]['id'].toString()) >= 0) {
        currentList[i]['checked'] = true
      } else {
        currentList[i]['checked'] = false
      }
    }
    console.log(currentList)
    this.setData({
      currentList: currentList
    })
    this.addList2DataTree()
    this.setLastTimeSelectList()
  }
})
function convert(rows) {
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
        parentId: 0,
        name: row.name,
        checked:false,
        children:[]
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
        var child = { id: row.id, name: row.name,parentId:row.parentId,checked:false,children:[] };
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
}