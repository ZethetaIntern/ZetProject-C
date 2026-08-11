import{j as e}from"./jsx-runtime-DFAAy_2V.js";import"./index-Bc2G9s8g.js";const b=({children:f,title:o,headerActions:v,footer:d,isCollapsed:r=!1,onToggleCollapse:i,dragHandleClass:y="drag-handle",showBorder:C=!0,className:N="",...j})=>e.jsxs("div",{className:`bg-[var(--bg-card)] rounded-lg shadow-sm flex flex-col overflow-hidden transition-all duration-200 ${C?"border border-[var(--border-color)]":""} ${N}`,style:{height:"100%",minHeight:"60px"},...j,children:[o&&e.jsxs("div",{className:`px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-header)] flex items-center justify-between no-select ${y}`,children:[e.jsx("div",{className:"flex items-center gap-2 font-bold text-xs text-[var(--text-primary)] tracking-wide uppercase",children:o}),e.jsxs("div",{className:"flex items-center gap-2 pointer-events-auto",children:[v,i&&e.jsx("button",{type:"button",onClick:w=>{w.stopPropagation(),i()},className:"text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none flex items-center justify-center",style:{background:"none",border:"none",cursor:"pointer",padding:0},"aria-label":r?"Expand card":"Collapse card",children:e.jsx("svg",{style:{width:"14px",height:"14px",transform:r?"rotate(-90deg)":"rotate(0deg)"},className:"transition-transform",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M19 9l-7 7-7-7"})})})]})]}),!r&&e.jsx("div",{className:"p-4 flex-grow overflow-auto relative",children:f}),!r&&d&&e.jsx("div",{className:"px-4 py-2 bg-[var(--bg-dashboard)]/60 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]",children:d})]});b.__docgenInfo={description:"",methods:[],displayName:"Card",props:{title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},headerActions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},isCollapsed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onToggleCollapse:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},dragHandleClass:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'drag-handle'",computed:!1}},showBorder:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const k={title:"UI/Card",component:b,tags:["autodocs"],argTypes:{title:{control:"text"},isCollapsed:{control:"boolean"},showBorder:{control:"boolean"}}},a={args:{title:"Card Title",children:e.jsx("div",{style:{minHeight:"100px"},children:"This is the default card body content."}),footer:"This is the card footer slot."}},t={args:{title:"Collapsed Card",isCollapsed:!0,children:e.jsx("div",{children:"This body should be hidden."})}},s={args:{title:"Loading Card Data",children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsx("div",{style:{height:"14px",backgroundColor:"var(--scrollbar-thumb)",width:"80%",borderRadius:"4px"},className:"shimmer-bg"}),e.jsx("div",{style:{height:"14px",backgroundColor:"var(--scrollbar-thumb)",width:"60%",borderRadius:"4px"},className:"shimmer-bg"}),e.jsx("div",{style:{height:"14px",backgroundColor:"var(--scrollbar-thumb)",width:"90%",borderRadius:"4px"},className:"shimmer-bg"})]})}};var l,n,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    title: 'Card Title',
    children: <div style={{
      minHeight: '100px'
    }}>This is the default card body content.</div>,
    footer: 'This is the card footer slot.'
  }
}`,...(c=(n=a.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var p,u,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'Collapsed Card',
    isCollapsed: true,
    children: <div>This body should be hidden.</div>
  }
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var h,x,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Loading Card Data',
    children: <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>\r
        <div style={{
        height: '14px',
        backgroundColor: 'var(--scrollbar-thumb)',
        width: '80%',
        borderRadius: '4px'
      }} className="shimmer-bg" />\r
        <div style={{
        height: '14px',
        backgroundColor: 'var(--scrollbar-thumb)',
        width: '60%',
        borderRadius: '4px'
      }} className="shimmer-bg" />\r
        <div style={{
        height: '14px',
        backgroundColor: 'var(--scrollbar-thumb)',
        width: '90%',
        borderRadius: '4px'
      }} className="shimmer-bg" />\r
      </div>
  }
}`,...(g=(x=s.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};const q=["Default","Collapsed","Loading"];export{t as Collapsed,a as Default,s as Loading,q as __namedExportsOrder,k as default};
