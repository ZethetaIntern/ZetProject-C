import{j as w}from"./jsx-runtime-DFAAy_2V.js";import"./index-Bc2G9s8g.js";const g=({variant:a="rect",width:x,height:n,className:h=""})=>{const f={width:x,height:n},v=()=>a==="circle"?"rounded-full":a==="text"?"rounded h-3 w-3/4":"rounded-md";return w.jsx("div",{className:`shimmer-bg ${v()} ${h}`,style:{...f,backgroundColor:"var(--bg-card)",border:"1px solid var(--border-color)",minHeight:n||(a==="text"?"12px":"24px")},"aria-hidden":"true"})};g.__docgenInfo={description:"",methods:[],displayName:"Skeleton",props:{variant:{required:!1,tsType:{name:"union",raw:"'text' | 'rect' | 'circle'",elements:[{name:"literal",value:"'text'"},{name:"literal",value:"'rect'"},{name:"literal",value:"'circle'"}]},description:"",defaultValue:{value:"'rect'",computed:!1}},width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},height:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const S={title:"UI/Skeleton",component:g,tags:["autodocs"]},e={args:{variant:"text",width:"100%"}},r={args:{variant:"rect",width:"150px",height:"80px"}},t={args:{variant:"circle",width:"50px",height:"50px"}};var s,i,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    width: '100%'
  }
}`,...(o=(i=e.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'rect',
    width: '150px',
    height: '80px'
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,m,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'circle',
    width: '50px',
    height: '50px'
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const T=["Text","Rectangular","Circular"];export{t as Circular,r as Rectangular,e as Text,T as __namedExportsOrder,S as default};
