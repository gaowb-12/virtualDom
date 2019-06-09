(function(){
    // 创建虚拟dom
    class Element{
        constructor(tagName,key,children){
            this.tagName=tagName
            this.key=key
            this.children=children
        }
        render(){
            let element=document.createElement(this.tagName)
            element.innerHTML=this.children
            element.setAttribute("key",this.key)
            return element
        }
    }
    function el(tagName,key,children){
        return new Element(tagName,key,children)
    }

    let oldChildren=[
        el('li','A','A'),
        el('li','B','B'),
        el('li','C','C'),
        el('li','D','D'),
        el('li','F','F')
    ]
    let ul= document.createElement('ul')
    oldChildren.forEach(item=>{
        ul.appendChild(item.render())
    })
    window.key.appendChild(ul)

    let newChildren=[
        el('li','B','B'),
        el('li','C','C'),
        el('li','D','D'),
        el('li','E','E')
    ]
    const REMOVE='REMOVE'
    const INSERT='INSERT'
    console.log(diffChildren(oldChildren,newChildren))
    function diffChildren(oldChildren,newChildren){
        // 根据子元素的key进行比较
        let patches=[]
        // 拿出新数组的所有的key
        let newKeys=newChildren.map(item=>item.key)
        // 第一步把老数组在新数组中没有的元素移除掉
        let oldIndex=0
        while(oldIndex<oldChildren.length){
            // 拿到老数组的key
            let oldKey=oldChildren[oldIndex].key
            // 判断新数组中是否有老数组的key
            if(!newKeys.includes(oldKey)){
                // 移除老数组中的元素
                remove(oldIndex)
                oldChildren.splice(oldIndex,1)//数组的元素(虚拟dom)跟dom保持同步
            }
            else{
                oldIndex++
            }
        }
        
        oldIndex=0
        let newIndex=0
        while(newIndex<newChildren.length){
            let newKey=(newChildren[newIndex]||{}).key
            let oldKey=(oldChildren[oldIndex]||{}).key
            if(oldKey!=newKey){
                insert(newIndex,newKey)
                newIndex++
            }else{
                newIndex++
                oldIndex++
            }
        }
        while(oldIndex++<oldChildren.length){
            // 移除老数组中的元素
            remove(newIndex)
        }
        function remove(index){
            patches.push({type:REMOVE,index})
        }
        function insert(index,key){
            patches.push({type:INSERT,index,node:el('li',key,key)})
        }
        return patches
    }
})()