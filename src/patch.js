import { render,Element } from "./element";
let allPatches
let index=0;//默认那个节点需要补丁
function patch(node,patches){
    allPatches=patches
    
    walk(node)
    //给某个元素打补丁
}
function walk(node){
    let currentPatch=allPatches[index++]
    let childNodes=node.childNodes
    childNodes.forEach(child => {
        walk(child)
    });
    if(currentPatch){
        doPatch(node,currentPatch)
    }
}
function doPatch(node,patches){
    patches.forEach(patch => {
        switch(patch.type){
            case 'ATTRS':
                break;
            case 'TEXT':
            node.textContent=patch.text
                break;
            case 'REPLACE':
                //判断节点是元素节点还是文本节点
                let newNode=(patch.newTree instanceof Element)?
                render(patch.newTree):document.createTextNode(patch.newTree)
                node.parentNode.replaceChild(newNode,node)
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node)
                break;
            default :
                break;
        }
    });
}
export default patch