import{t as l,c as N,a as t,m as y,T as _,p as d,b as z,d as j,e as g,N as I,o as x,s as C,i as c,R as S,f as u,g as L,r as A}from"./vendor.f007fe1f.js";const P=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}};P();const H=l("<h1>Home</h1>"),E=()=>H.cloneNode(!0),O=l("<h1>About</h1>"),T=()=>O.cloneNode(!0),R=l("<h1>Skills</h1>"),F=()=>R.cloneNode(!0),B=l("<h1>Projects</h1>"),D=()=>B.cloneNode(!0),M=l("<h1>Contact</h1>"),G=()=>M.cloneNode(!0),q=l("<h1>Not Found</h1>"),X=()=>q.cloneNode(!0),J=N`
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

`,K={colors:{primary:"red"}},U=e=>t(_,{theme:K,get children(){return[t(J,{}),y(()=>e.children)]}}),V=(e,n)=>{const a=Object.entries(e).map(([o,r])=>[o,n(r,o)]);return Object.fromEntries(a)},W=e=>typeof e=="number",Y=e=>V(e,n=>d(n)),Q=l("<i></i>"),h={link:d`
    color: inherit;
    text-decoration: none;
    position: relative;
    display: inline-block;
    font-size: 22px;
    height: 51px;
    line-height: 51px;
    width: 100%;
    font-family: 'Inconsolata', monospace;
  `,active:d`
    color: var(--color-highlight, orange);
  `,iconToTextOnHover:d`
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

  `},f=e=>{const n=o=>o.replace("/",""),a=z(()=>e.name??n(e.href));return t(I,{get href(){return e.href},get end(){return e.end},get className(){return j(h.link,h.iconToTextOnHover)},get activeClass(){return h.active},get style(){return`--hover-text: '${a()}'`},get["aria-label"](){return`nav-menu--${a()}`},get children(){const o=Q.cloneNode(!0);return g(()=>o.className=`${e.iconName||""} ${e.iconClassName||""}`),o}})},m={Home:()=>t(f,{href:"/",end:!0,name:"home",iconName:"fas fa-home"}),About:()=>t(f,{href:"/about",iconName:"fas fa-user-circle"}),Skills:()=>t(f,{href:"/skills",iconName:"fas fa-cog"}),Projects:()=>t(f,{href:"/projects",iconName:"fas fa-laptop-code",iconClassName:d`font-size: 20px;`}),Contact:()=>t(f,{href:"/contact",iconName:"fas fa-envelope"})},Z={xs:320,sm:600,md:960,lg:1200,xl:1536},w=e=>W(e)?e:Z[e],p={up:e=>`@media (min-width: ${w(e)}px)`,down:e=>`@media (max-width: ${w(e)}px)`};let b={};const k=e=>(e in b||(b[e]=new Promise((n,a)=>{let o=document.createElement("script");o.setAttribute("src",e),o.setAttribute("type","text/javascript"),o.onload=()=>{n(!0)},o.onerror=a,document.body.appendChild(o)})),b[e]),ee=()=>{x(async()=>{const e="UA-178460557-1";await k(`https://www.googletagmanager.com/gtag/js?id=${e}`);const n=window;n.dataLayer=n.dataLayer||[];const a=n.dataLayer;function o(...s){a.push(s)}function r(s,$){o("event",s,$)}function i(){r("page_view",{page_path:location.pathname})}o("js",new Date),o("config",e),i()})},te=l("<div></div>"),oe=()=>{const e="particles";return x(async()=>{await ne(e,"blue")}),(()=>{const n=te.cloneNode(!0);return C(n,"id",e),n.className=d`
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        z-index: -10;
        position: fixed;
        overflow: hidden;
        top: 0;
      `,n})()},ne=async(e,n)=>{await k("other/js/part1cl3sLibrary.js"),particlesJS(e,{particles:{number:{value:100,density:{enable:!0,value_area:1026}},color:{value:n},shape:{type:"circle"},opacity:{value:.3,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:1.5,random:!1,anim:{enable:!1,speed:20,size_min:.1,sync:!0}},line_linked:{enable:!0,distance:120,color:n,opacity:.6,width:1},move:{enable:!0,speed:.5,direction:"none",random:!1,straight:!1,out_mode:"bounce",attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"window",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!1,mode:"push"},resize:!0},modes:{grab:{distance:130,line_linked:{opacity:.8}}}},retina_detect:!0})},re=l("<div><nav></nav></div>"),ae=l("<div></div>"),ie=l("<div><main></main></div>"),v=Y({menu:{background:"#181818",color:"var(--color-subtle)",width:"var(--menu-offset)",height:"100%",position:"fixed",top:0,zIndex:3,display:"flex",justifyContent:"center",alignItems:"center",".modern-theme &":{background:"rgba(0,0,0,.4)",borderRight:"1px solid var(--color-subtle)"},[p.down("md")]:{width:"100%",height:"var(--menu-offset)",minHeight:0,bottom:0,top:"auto",".modern-theme &":{background:"rgba(0,0,0,.8)",borderRight:"none",borderTop:"1px solid var(--color-subtle)"}}},nav:{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center",textAlign:"center",height:"210px",width:"100%",[p.down("md")]:{flexDirection:"row",minWidth:"250px",width:"42%",overflow:"hidden",textAlign:"center",height:"60px"}},content:{boxSizing:"border-box",width:"100%",height:"100%",position:"relative",paddingLeft:"var(--menu-offset)",minHeight:"100vh",display:"flex",flexDirection:"column",[p.down("md")]:{paddingLeft:0,paddingBottom:"var(--menu-offset)"}}}),le=()=>(()=>{const e=ie.cloneNode(!0),n=e.firstChild;return c(e,t(oe,{}),n),c(n,t(L,{get children(){return[(()=>{const a=re.cloneNode(!0),o=a.firstChild;return c(o,t(m.Home,{}),null),c(o,t(m.About,{}),null),c(o,t(m.Skills,{}),null),c(o,t(m.Projects,{}),null),c(o,t(m.Contact,{}),null),g(r=>{const i=v.menu,s=v.nav;return i!==r._v$&&(a.className=r._v$=i),s!==r._v$2&&(o.className=r._v$2=s),r},{_v$:void 0,_v$2:void 0}),a})(),(()=>{const a=ae.cloneNode(!0);return c(a,t(S,{get children(){return[t(u,{path:"/",get element(){return t(E,{})}}),t(u,{path:"/about",get element(){return t(T,{})}}),t(u,{path:"/skills",get element(){return t(F,{})}}),t(u,{path:"/projects",get element(){return t(D,{})}}),t(u,{path:"/contact",get element(){return t(G,{})}}),t(u,{path:"/*all",get element(){return t(X,{})}})]}})),g(()=>a.className=v.content),a})()]}})),e})();var se=()=>t(U,{get children(){return[y(()=>t(ee,{})),t(le,{})]}});A(()=>t(se,{}),document.getElementById("root"));
