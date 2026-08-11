import{j as e}from"./jsx-runtime-DFAAy_2V.js";import"./index-Bc2G9s8g.js";const S=({children:j,variant:N="neutral",onRemove:s,count:i,className:T=""})=>{const k={success:"bg-[var(--color-up-bg)] text-[var(--color-up)] border border-[var(--color-up)]",danger:"bg-[var(--color-down-bg)] text-[var(--color-down)] border border-[var(--color-down)]",warning:"bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-[var(--color-warning)]",info:"bg-[var(--color-info-bg)] text-[var(--color-info)] border border-[var(--color-info)]",neutral:"bg-[var(--bg-dashboard)] text-[var(--text-secondary)] border border-[var(--border-color)]"};return e.jsxs("span",{className:`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold select-none ${k[N]} ${T}`,style:{gap:"0.375rem",height:"1.5rem",whiteSpace:"nowrap"},children:[j,i!==void 0&&e.jsx("span",{className:"ml-1 rounded-full bg-[var(--text-primary)] text-[var(--bg-card)] flex items-center justify-center font-bold",style:{minWidth:"1rem",height:"1rem",fontSize:"10px",padding:"0 4px"},children:i}),s&&e.jsx("button",{type:"button",onClick:q=>{q.stopPropagation(),s()},className:"ml-1 text-current hover:opacity-80 focus:outline-none flex items-center justify-center","aria-label":"Remove badge",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:e.jsx("svg",{style:{width:"12px",height:"12px"},fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M6 18L18 6M6 6l12 12"})})})]})};S.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'success' | 'danger' | 'warning' | 'info' | 'neutral'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'info'"},{name:"literal",value:"'neutral'"}]},description:"",defaultValue:{value:"'neutral'",computed:!1}},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},count:{required:!1,tsType:{name:"number"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const B={title:"UI/Badge",component:S,tags:["autodocs"]},r={args:{children:"Active Trade",variant:"success"}},a={args:{children:"High VaR Limit",variant:"danger"}},n={args:{children:"Stale Data Feed",variant:"warning"}},t={args:{children:"Real-time Subscribed",variant:"info"}},o={args:{children:"Removable Asset Filter",variant:"neutral",onRemove:()=>alert("Removed!")}};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'Active Trade',
    variant: 'success'
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,m,p;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: 'High VaR Limit',
    variant: 'danger'
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,v,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'Stale Data Feed',
    variant: 'warning'
  }
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var f,h,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'Real-time Subscribed',
    variant: 'info'
  }
}`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,w,R;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: 'Removable Asset Filter',
    variant: 'neutral',
    onRemove: () => alert('Removed!')
  }
}`,...(R=(w=o.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};const D=["Success","Danger","Warning","Info","Removable"];export{a as Danger,t as Info,o as Removable,r as Success,n as Warning,D as __namedExportsOrder,B as default};
