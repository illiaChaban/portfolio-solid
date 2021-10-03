import{t as i,p as s,i as l,c as d,a,r as p}from"./vendor.f5afba90.js";const f=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}};f();const m="_App_1a79n_1";var g={App:m};const h=i("<button></button>"),b=s({minHeight:"40px",minWidth:"70px",background:"blue",color:"white","&:hover":{background:"yellow"},"@media (min-width: 700px)":{background:"green"}});s`
  background: red;
  
  &:hover {
    background: black;
  }
  @media (min-width: 700px) {
    background: green;
  }
`;const y=(...r)=>r.join(" "),v=r=>(()=>{const o=h.cloneNode(!0);return l(o,()=>r.children),d(()=>o.className=y(b)),o})(),$=i("<div></div>"),k=()=>(()=>{const r=$.cloneNode(!0);return l(r,a(v,{children:"Hello"})),d(()=>r.className=g.App),r})();p(()=>a(k,{}),document.getElementById("root"));
