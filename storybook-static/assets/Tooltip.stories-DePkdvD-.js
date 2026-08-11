import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as j}from"./index-Bc2G9s8g.js";const v=({content:g,children:T,position:y="top",className:N=""})=>{const[R,t]=j.useState(!1),w=()=>{switch(y){case"bottom":return{top:"100%",left:"50%",transform:"translateX(-50%) translateY(6px)"};case"left":return{top:"50%",right:"100%",transform:"translateY(-50%) translateX(-6px)"};case"right":return{top:"50%",left:"100%",transform:"translateY(-50%) translateX(6px)"};case"top":default:return{bottom:"100%",left:"50%",transform:"translateX(-50%) translateY(-6px)"}}};return e.jsxs("div",{className:`relative inline-block ${N}`,onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),onFocus:()=>t(!0),onBlur:()=>t(!1),children:[T,R&&e.jsx("div",{role:"tooltip",className:"absolute z-[999] px-2 py-1 text-xs font-normal text-white bg-black border border-[var(--border-color)] rounded shadow-md pointer-events-none select-none max-w-xs text-center",style:{...w(),whiteSpace:"nowrap"},children:g})]})};v.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},position:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'top'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const B={title:"UI/Tooltip",component:v,tags:["autodocs"]},o={args:{content:"Tooltip text content",position:"top",children:e.jsx("button",{className:"px-4 py-2 border rounded border-[var(--border-color)]",children:"Hover Top"})}},r={args:{content:"Tooltip text content",position:"bottom",children:e.jsx("button",{className:"px-4 py-2 border rounded border-[var(--border-color)]",children:"Hover Bottom"})}},a={args:{content:"Tooltip text content",position:"left",children:e.jsx("button",{className:"px-4 py-2 border rounded border-[var(--border-color)]",children:"Hover Left"})}},s={args:{content:"Tooltip text content",position:"right",children:e.jsx("button",{className:"px-4 py-2 border rounded border-[var(--border-color)]",children:"Hover Right"})}};var n,c,l;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip text content',
    position: 'top',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Top</button>
  }
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,i,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip text content',
    position: 'bottom',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Bottom</button>
  }
}`,...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var u,m,b;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip text content',
    position: 'left',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Left</button>
  }
}`,...(b=(m=a.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var x,f,h;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip text content',
    position: 'right',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Right</button>
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const L=["Top","Bottom","Left","Right"];export{r as Bottom,a as Left,s as Right,o as Top,L as __namedExportsOrder,B as default};
