import{t as l,c as w,a as e,m as p,T as $,b as N,p as u,d as _,e as I,f as b,N as j,i as C,o as z,g as s,R as S,h as d,j as L,r as A}from"./vendor.e3b90f19.js";const P=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=i(r);fetch(r.href,a)}};P();const T=l("<h1>Home</h1>"),R=()=>T.cloneNode(!0),E=l("<h1>About</h1>"),H=()=>E.cloneNode(!0),O=l("<h1>Skills</h1>"),F=()=>O.cloneNode(!0),M=l("<h1>Projects</h1>"),B=()=>M.cloneNode(!0),D=l("<h1>Contact</h1>"),G=()=>D.cloneNode(!0),q=l("<h1>Not Found</h1>"),K=()=>q.cloneNode(!0),U=w`
  html, body {
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  html {
    font-size: 16px;
  }

  @media (min-width: 1150px) {
    html {
      font-size: 17px;
    }
  }

  @media (max-width: 320px) {
    html {
      font-size: 14px;
    }
  }

  body {
    --menu-offset: 60px;

    --color-main: #f2f1c6;
    --color-subtle: grey;
    --color-subtle-text: #73aeb9;
    --color-highlight: #FF6138;
    
    /* --body-background-color: rgb(50,56,91);
    --body-background-color: rgb(44,49,53); */
    --body-background-color: #252627;



    margin: 0;
    color: var(--color-main);
    font-family: 'Saira', Helvetica, Courier, sans-serif;


    background: var(--body-background-color);
    background-size: cover;
    background-position: center;
    position: relative;
  }


  .c-highlight {
    color: var(--color-highlight);
  }

  .c-main {
    color: var(--color-main);
  }

  .c-subtle {
    color: var(--color-subtle);
  }

  .hide {
    display: none !important;
  }

  .invisible {
    visibility: hidden !important;
  }


  .font-bigger1 { font-size: 1.15em; }
  .font-bigger2 { font-size: 1.3em; }
  .font-bigger3 { font-size: 1.45em; }

  .overflow-hidden {
    overflow: hidden;
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  @keyframes fadeIn2 {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    animation: fadeIn .6s;
  }
  .fadeIn2 {
    animation: fadeIn2 .6s;
  }

  a {
    text-decoration: none;
    color: var(--color-highlight);
  }

  /* a:hover {
    color: var(--color-main);
  } */

  .hover-underline {
    display: inline-block;
    position: relative;
  }
  .hover-underline::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width .5s;
  }
  .hover-underline:hover::after {
    width: 100%;
  }

  .pointer {
    cursor: pointer;
  }

  .border-round {
    border-radius: 50%;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    display: flex;
    flex-direction: column
  }

  .flex-align-center {
    align-items: center;
  }

  .flex-justify-center {
    justify-content: center;
  }

  .flex-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .padding-15 {
    padding: 15px;
  }

  .h1-tags,
  .body-tags,
  .div-tags,
  .div-tags-end
  {
    position: relative;
  }

  .content .div-tags-end {
    padding-bottom: 25px;
  }

  .body-tags {
    padding: 45px 0;
  }

  .h1-tags::after,
  .h1-tags::before,
  .body-tags::after,
  .body-tags::before,
  .div-tags::after,
  .div-tags::before,
  .div-tags-end::after
  {
    color: var(--color-subtle);
    position: absolute;
    left: 0;
    font-family: 'League Script', 'Courier New', 'Inconsolata', cursive;
    font-weight: 900;
    font-size: .8rem;
    text-transform: none;
  }

  .body-tags::before {
    content: '<body>';
    top: 20px;
  }
  .body-tags::after {
    content: '</body>';
    bottom: 20px;
  }
  .body-tags::before,
  .body-tags::after
  {
    left: 2%;
  }


  .h1-tags::before {
    content: "<h1>";
    bottom: 100%;
  }
  .h1-tags::after {
    content: "</h1>";
    top: calc( 100% + .4rem);
  }

  .div-tags::before {
    content: '<div>';
    /* bottom: 100%; */
    top: 0;
  }
  .div-tags::after,
  .div-tags-end::after {
    content: '</div>';
    /* top: calc( 100% + .5rem ); */
    bottom: 0px;
  }

  /* COLOR EXPERIMENTS */
  body.modern-theme {
    --color-subtle: #7f838a;
    --color-main: #fdfbeb;
    --color-highlight: #49eeff;

    --body-background-color: #112d44; 
    
    background: -moz-linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
    background: -webkit-linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
    background: linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
  }


  @media (max-width: 960px) {
    body.modern-theme {
      --body-background-color: #122438; 
      /* fixing white background on home page on mobile after squirrel jump animation */
      background: var(--body-background-color);
    }
  }


  .h1-tags .doodle {
    color: var(--color-subtle);
    opacity: .4;
  }

  h1:focus-visible {
    outline: none;
  }

`,V={colors:{primary:"red"}},W=t=>e($,{theme:V,get children(){return[e(U,{}),p(()=>t.children)]}}),X=t=>N(t,n=>u(n)),J=l("<i></i>"),m={link:u`
    color: inherit;
    text-decoration: none;
    position: relative;
    display: inline-block;
    font-size: 22px;
    height: 51px;
    line-height: 51px;
    width: 100%;
    font-family: 'Inconsolata', monospace;
  `,active:u`
    color: var(--color-highlight, orange);
  `,iconToTextOnHover:u`
    position: relative;

    i {
      &::after {
        content: var(--hover-text, 'navigate');
        font-size: 0.7rem;
        letter-spacing: 1px;
        position: absolute;
        display: block;

        top: 50%;
        left: 50%;

        -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);

        opacity: 0;
        color: var(--color-highlight);
        text-transform: uppercase;
        font-family: 'Inconsolata', monospace;
        font-weight: 100;
      }

      &::before,
      &::after
      {
        -webkit-transition: opacity .2s ease-out;
        transition: opacity .2s ease-out;
      }

    }

    &:hover i {
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    }

  `},g=t=>{const n=o=>o.replace("/",""),i=_(()=>t.name??n(t.href));return e(j,{get href(){return t.href},get end(){return t.end},get className(){return I(m.link,m.iconToTextOnHover)},get activeClass(){return m.active},get style(){return`--hover-text: '${i()}'`},get["aria-label"](){return`nav-menu--${i()}`},get children(){const o=J.cloneNode(!0);return b(()=>o.className=`${t.iconName||""} ${t.iconClassName||""}`),o}})},f={Home:()=>e(g,{href:"/",end:!0,name:"home",iconName:"fas fa-home"}),About:()=>e(g,{href:"/about",iconName:"fas fa-user-circle"}),Skills:()=>e(g,{href:"/skills",iconName:"fas fa-cog"}),Projects:()=>e(g,{href:"/projects",iconName:"fas fa-laptop-code",iconClassName:u`font-size: 20px;`}),Contact:()=>e(g,{href:"/contact",iconName:"fas fa-envelope"})},Q={xs:320,sm:600,md:960,lg:1200,xl:1536},v=t=>C(t)?t:Q[t],y={up:t=>`@media (min-width: ${v(t)}px)`,down:t=>`@media (max-width: ${v(t)}px)`};let h={};const Y=t=>(t in h||(h[t]=new Promise((n,i)=>{let o=document.createElement("script");o.setAttribute("src",t),o.setAttribute("type","text/javascript"),o.onload=()=>{n(!0)},o.onerror=i,document.body.appendChild(o)})),h[t]),Z=()=>{z(async()=>{const t="UA-178460557-1";await Y(`https://www.googletagmanager.com/gtag/js?id=${t}`);const n=window;n.dataLayer=n.dataLayer||[];const i=n.dataLayer;function o(...c){i.push(c)}function r(c,k){o("event",c,k)}function a(){r("page_view",{page_path:location.pathname})}o("js",new Date),o("config",t),a()})},ee=l('<div id="menu"><nav id="nav"></nav></div>'),te=l('<div id="content"></div>'),oe=l("<main></main>"),x=X({menu:{background:"#181818",color:"var(--color-subtle)",width:"var(--menu-offset)",height:"100%",position:"fixed",top:0,zIndex:3,display:"flex",justifyContent:"center",alignItems:"center",".modern-theme &":{background:"rgba(0,0,0,.4)",borderRight:"1px solid var(--color-subtle)"},[y.down("md")]:{width:"100%",height:"var(--menu-offset)",minHeight:0,bottom:0,top:"auto",".modern-theme &":{background:"rgba(0,0,0,.8)",borderRight:"none",borderTop:"1px solid var(--color-subtle)"}}},nav:{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center",textAlign:"center",height:"210px",width:"100%",[y.down("md")]:{flexDirection:"row",minWidth:"250px",width:"42%",overflow:"hidden",textAlign:"center",height:"60px"}}}),ne=()=>(()=>{const t=oe.cloneNode(!0);return s(t,e(L,{get children(){return[(()=>{const n=ee.cloneNode(!0),i=n.firstChild;return s(i,e(f.Home,{}),null),s(i,e(f.About,{}),null),s(i,e(f.Skills,{}),null),s(i,e(f.Projects,{}),null),s(i,e(f.Contact,{}),null),b(o=>{const r=x.menu,a=x.nav;return r!==o._v$&&(n.className=o._v$=r),a!==o._v$2&&(i.className=o._v$2=a),o},{_v$:void 0,_v$2:void 0}),n})(),(()=>{const n=te.cloneNode(!0);return s(n,e(S,{get children(){return[e(d,{path:"/",get element(){return e(R,{})}}),e(d,{path:"/about",get element(){return e(H,{})}}),e(d,{path:"/skills",get element(){return e(F,{})}}),e(d,{path:"/projects",get element(){return e(B,{})}}),e(d,{path:"/contact",get element(){return e(G,{})}}),e(d,{path:"/*all",get element(){return e(K,{})}})]}})),n})()]}})),t})();var re=()=>e(W,{get children(){return[p(()=>e(Z,{})),e(ne,{})]}});A(()=>e(re,{}),document.getElementById("root"));
