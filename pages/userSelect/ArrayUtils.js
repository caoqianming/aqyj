export default { /**
     * 给数组去重
     */ checkRepeat(list) { 
       let noRepList = [list[0]] 
       for (let i = 0; i < list.length; i++) { 
         let repeat = false 
         for (let j = 0; j < noRepList.length; j++)
          { if (noRepList[j].id === list[i].id) { 
            repeat = true 
            break } } 
            if (!repeat) { noRepList.push(list[i]) } } 
            return noRepList 
            }, //删除list中id为 delId 的元素 
        deleteItemById(list, delId){ 
          for (let i = 0; i < list.length; i++) { 
            if (list[i].id == delId) { 
            list.splice(i, 1) 
            return list; } 
            } 
            return list; 
            } 
      }