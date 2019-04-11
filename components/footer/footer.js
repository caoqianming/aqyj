Component({ 
  /**
   * 组件的属性列表
   */ 
  properties: { 
    list: { type: Array } 
    }, 
    /**
   * 组件的初始数据
   */ 
  data: {}, 
  /**
   * 组件的方法列表
   */ 
  methods: {
    delete(res) { 
      console.log(res) 
      let index = res.currentTarget.id 
      let list = this.data.list 
      list.splice(index, 1) 
      this.setData({ list: list }) 
      this.triggerEvent(
        "delete", 
      { 
        selectList: list }) 
      }, /**
     * 点击确定按钮
     */ 
    confirm() { 
      this.triggerEvent("submit", "") 
      }
  }
})