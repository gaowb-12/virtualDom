// 创建虚拟dom
class Element{
    constructor(type,props,children){
        this.type=type
        this.props=props
        this.children=children
    }
}
// 设置属性
function setAttr(node,key,value){
    switch(key){
        case 'value':
            if(node.tagName.toUpperCase()=="INPUT"||
            node.tagName.toUpperCase()=="TEXTAREA")
                node.value=value
            else
                node.setAttribute(key,value)
            break;
        case 'style':
            node.style.cssText=value;
            break;
        default :
            node.setAttribute(key,value)
            break;
    }
}
// 返回虚拟dom
function createElement(type,props,children){
    return new Element(type,props,children)
}
// render方法可以将vnode转化成真实dom
function render(eleObj){
    let el=document.createElement(eleObj.type);//创建标签
    // 设置属性
    for(let key in eleObj.props){
        // 设置属性的方法
        setAttr(el,key,eleObj.props[key])
    }
    // 遍历子元素，递归
    eleObj.children.forEach(child => {
        child= (child instanceof Element)?
        render(child)
        :
        document.createTextNode(child);
        el.appendChild(child)
    });
    return el
}
// 插入页面
function renderDom(el,target){
    target.appendChild(el)
}
export {
    createElement,
    render,
    Element,
    renderDom
}