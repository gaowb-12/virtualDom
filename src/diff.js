
function diff(oldTree,newTree){
    let patches={}
    let index=0;//初始化第一次比较的位置
    // 递归树，比较后的结果放到补丁包中
    walk(oldTree,newTree,index,patches)
    return patches;
}
function diffAttr(oldAttrs,newAttrs){
    let patch={}
    // 判断老的属性和新的属性的关系
    for(let key in oldAttrs){
        if(oldAttrs[key]!=newAttrs[key]){
            patch[key]=newAttrs[key]//有可能是undefined
        }
    }
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key]=newAttrs[key]
        }
    }
    return patch;
}
function diffChildren(oldChildren,newChildren,patches){
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child,ind) => {
        // 索引不应该是index
        // index每次传递给walk时 是递增的
        walk(child,newChildren[ind],++Index,patches)
    });
}
function isString(node){
    return Object.prototype.toString.call(node)==='[object String]'
}
const ATTRS='ATTRS'
const TEXT='TEXT'
const REMOVE='REMOVE'
const REPLACE='REPLACE'
let Index=0
function walk(oldTree,newTree,index,patches){
    // 创建自己的补丁包,里面的每个对象包含了一个type
    let currentPatch=[]
    // 节点被删除
    if(!newTree){
        currentPatch.push({type:REMOVE,index})
    }
    // 节点是文本
    else if(isString(oldTree)&&isString(newTree)){
        // 判断文本是否一致
       if(oldTree!==newTree){
           currentPatch.push({type:TEXT,text:newTree})
       } 
    }
    // 如果节点类型相同
    else if(oldTree.type==newTree.type){
        // 比较属性是否有更改
        let attrs=diffAttr(oldTree.props,newTree.props)
        // 判断属性是否有更改，有过有就添加进当前比较节点的补丁包
        if(Object.keys(attrs).length>0){
            currentPatch.push({type:ATTRS,attrs})
        }
        // 如果有子节点，遍历
        
        diffChildren(oldTree.children,newTree.children,patches)
    }else{
        // 说明节点被替换了
        currentPatch.push({type:REPLACE,newTree})
    }

    //判断当前元素是否有补丁
    if(currentPatch.length>0){
        // 将元素和补丁对应起来，放到大补丁包中
        patches[index]=currentPatch
    }
}
export default diff