import{t as l,c as N,a as o,m as x,T as S,p as d,b as z,d as C,e as h,N as I,o as k,s as L,i as c,R as j,f as u,g as P,r as E}from"./vendor.f007fe1f.js";const A=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}};A();const O=l("<h1>Home</h1>"),R=()=>O.cloneNode(!0),T=l("<h1>About</h1>"),H=()=>T.cloneNode(!0),D=l("<h1>Skills</h1>"),F=()=>D.cloneNode(!0),B=l("<h1>Projects</h1>"),V=()=>B.cloneNode(!0),q=l("<h1>Contact</h1>"),G=()=>q.cloneNode(!0),M=l("<h1>Not Found</h1>"),W=()=>M.cloneNode(!0),X=N`
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

`,J={colors:{primary:"red"}},K=e=>o(S,{theme:J,get children(){return[o(X,{}),x(()=>e.children)]}}),U=(e,n)=>{const a=Object.entries(e).map(([t,r])=>[t,n(r,t)]);return Object.fromEntries(a)},Y=e=>typeof e=="number",Q=e=>U(e,n=>d(n)),Z=l("<i></i>"),p={link:d`
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

  `},m=e=>{const n=t=>t.replace("/",""),a=z(()=>e.name??n(e.href));return o(I,{get href(){return e.href},get end(){return e.end},get className(){return C(p.link,p.iconToTextOnHover)},get activeClass(){return p.active},get style(){return`--hover-text: '${a()}'`},get["aria-label"](){return`nav-menu--${a()}`},get children(){const t=Z.cloneNode(!0);return h(()=>t.className=`${e.iconName||""} ${e.iconClassName||""}`),t}})},f={Home:()=>o(m,{href:"/",end:!0,name:"home",iconName:"fas fa-home"}),About:()=>o(m,{href:"/about",iconName:"fas fa-user-circle"}),Skills:()=>o(m,{href:"/skills",iconName:"fas fa-cog"}),Projects:()=>o(m,{href:"/projects",iconName:"fas fa-laptop-code",iconClassName:d`font-size: 20px;`}),Contact:()=>o(m,{href:"/contact",iconName:"fas fa-envelope"})},ee={xs:320,sm:600,md:960,lg:1200,xl:1536},w=e=>Y(e)?e:ee[e],b={up:e=>`@media (min-width: ${w(e)}px)`,down:e=>`@media (max-width: ${w(e)}px)`};let v={};const te=e=>(e in v||(v[e]=new Promise((n,a)=>{let t=document.createElement("script");t.setAttribute("src",e),t.setAttribute("type","text/javascript"),t.onload=()=>{n(!0)},t.onerror=a,document.body.appendChild(t)})),v[e]),oe=()=>{k(async()=>{const e="UA-178460557-1";await te(`https://www.googletagmanager.com/gtag/js?id=${e}`);const n=window;n.dataLayer=n.dataLayer||[];const a=n.dataLayer;function t(...s){a.push(s)}function r(s,g){t("event",s,g)}function i(){r("page_view",{page_path:location.pathname})}t("js",new Date),t("config",e),i()})},ne="modulepreload",$={},re="/",ae=function(n,a){return!a||a.length===0?n():Promise.all(a.map(t=>{if(t=`${re}${t}`,t in $)return;$[t]=!0;const r=t.endsWith(".css"),i=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${i}`))return;const s=document.createElement("link");if(s.rel=r?"stylesheet":ne,r||(s.as="script",s.crossOrigin=""),s.href=t,document.head.appendChild(s),r)return new Promise((g,_)=>{s.addEventListener("load",g),s.addEventListener("error",_)})})).then(()=>n())},ie=e=>getComputedStyle(document.body).getPropertyValue(e).trim(),se=l("<div></div>"),le=()=>{const e="particles";return k(async()=>{const n=ie("--color-highlight");await ce(e,n)}),(()=>{const n=se.cloneNode(!0);return L(n,"id",e),n.className=d`
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        z-index: -10;
        position: fixed;
        overflow: hidden;
        top: 0;
      `,n})()},ce=async(e,n)=>{await ae(()=>import("./part1cl3sLibrary.02d29de2.js"),[]),particlesJS(e,{particles:{number:{value:100,density:{enable:!0,value_area:1026}},color:{value:n},shape:{type:"circle"},opacity:{value:.3,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:1.5,random:!1,anim:{enable:!1,speed:20,size_min:.1,sync:!0}},line_linked:{enable:!0,distance:120,color:n,opacity:.6,width:1},move:{enable:!0,speed:.5,direction:"none",random:!1,straight:!1,out_mode:"bounce",attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"window",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!1,mode:"push"},resize:!0},modes:{grab:{distance:130,line_linked:{opacity:.8}}}},retina_detect:!0})},de=l("<div><nav></nav></div>"),ue=l("<div></div>"),me=l("<div><main></main></div>"),y=Q({menu:{background:"#181818",color:"var(--color-subtle)",width:"var(--menu-offset)",height:"100%",position:"fixed",top:0,zIndex:3,display:"flex",justifyContent:"center",alignItems:"center",".modern-theme &":{background:"rgba(0,0,0,.4)",borderRight:"1px solid var(--color-subtle)"},[b.down("md")]:{width:"100%",height:"var(--menu-offset)",minHeight:0,bottom:0,top:"auto",".modern-theme &":{background:"rgba(0,0,0,.8)",borderRight:"none",borderTop:"1px solid var(--color-subtle)"}}},nav:{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center",textAlign:"center",height:"210px",width:"100%",[b.down("md")]:{flexDirection:"row",minWidth:"250px",width:"42%",overflow:"hidden",textAlign:"center",height:"60px"}},content:{boxSizing:"border-box",width:"100%",height:"100%",position:"relative",paddingLeft:"var(--menu-offset)",minHeight:"100vh",display:"flex",flexDirection:"column",[b.down("md")]:{paddingLeft:0,paddingBottom:"var(--menu-offset)"}}}),fe=()=>(()=>{const e=me.cloneNode(!0),n=e.firstChild;return c(e,o(le,{}),n),c(n,o(P,{get children(){return[(()=>{const a=de.cloneNode(!0),t=a.firstChild;return c(t,o(f.Home,{}),null),c(t,o(f.About,{}),null),c(t,o(f.Skills,{}),null),c(t,o(f.Projects,{}),null),c(t,o(f.Contact,{}),null),h(r=>{const i=y.menu,s=y.nav;return i!==r._v$&&(a.className=r._v$=i),s!==r._v$2&&(t.className=r._v$2=s),r},{_v$:void 0,_v$2:void 0}),a})(),(()=>{const a=ue.cloneNode(!0);return c(a,o(j,{get children(){return[o(u,{path:"/",get element(){return o(R,{})}}),o(u,{path:"/about",get element(){return o(H,{})}}),o(u,{path:"/skills",get element(){return o(F,{})}}),o(u,{path:"/projects",get element(){return o(V,{})}}),o(u,{path:"/contact",get element(){return o(G,{})}}),o(u,{path:"/*all",get element(){return o(W,{})}})]}})),h(()=>a.className=y.content),a})()]}})),e})();var ge=()=>o(K,{get children(){return[x(()=>o(oe,{})),o(fe,{})]}});E(()=>o(ge,{}),document.getElementById("root"));
