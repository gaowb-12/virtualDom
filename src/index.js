import { createElement,render,renderDom } from "./element";
import diff from "./diff";
import patch from "./patch";
let virtualDom1=createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['a']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['c'])
])
let virtualDom2=createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['1']),
    createElement('li',{class:'item'},['b']),
    createElement('div',{class:'item'},['3'])
])
let el=render(virtualDom1)
renderDom(el,window.root)

let patches=diff(virtualDom1,virtualDom2)
// 给元素大补丁，更新视图
patch(el,patches)

// Dom diff比较两个虚拟Dom的区别，比较两个对象的区别
//dom diff 根据两个虚拟对象创建出补丁，描述改变的内容，将补丁用来更新dom
