let W=M;const S={},w=1,E=2,O={owned:null,cleanups:null,context:null,owner:null};var h=null;let x=null,y=null,p=null,a=null,T=0;function Z(e,l){l&&(h=l);const t=h,s=e.length===0?O:{owned:null,cleanups:null,context:null,owner:t};h=s;let f;try{j(()=>f=e(()=>B(s)),!0)}finally{h=t}return f}function N(e,l,t){P(K(e,l,!1,w))}function $(e){if(y)return e();let l;const t=y=[];try{l=e()}finally{y=null}return j(()=>{for(let s=0;s<t.length;s+=1){const f=t[s];if(f.pending!==S){const o=f.pending;f.pending=S,D(f,o)}}},!1),l}function U(e){let l;return l=e(),l}function D(e,l,t){if(e.comparator&&e.comparator(e.value,l))return l;if(y)return e.pending===S&&y.push(e),e.pending=l,l;let s=!1;return e.value=l,e.observers&&e.observers.length&&j(()=>{for(let f=0;f<e.observers.length;f+=1){const o=e.observers[f];s&&x.disposed.has(o),o.pure?p.push(o):a.push(o),o.observers&&(s&&!o.tState||!s&&!o.state)&&_(o),s||(o.state=w)}if(p.length>1e6)throw p=[],new Error},!1),l}function P(e){if(!e.fn)return;B(e);const l=h,t=T;h=e,J(e,e.value,t),h=l}function J(e,l,t){let s;try{s=e.fn(l)}catch(f){q(f)}(!e.updatedAt||e.updatedAt<=t)&&(e.observers&&e.observers.length?D(e,s):e.value=s,e.updatedAt=t)}function K(e,l,t,s=w,f){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:l,owner:h,context:null,pure:t};return h===null||h!==O&&(h.owned?h.owned.push(o):h.owned=[o]),o}function I(e){const l=x;if(e.state!==w)return e.state=0;if(e.suspense&&U(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<T);)(e.state||l)&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===w||l)P(e);else if(e.state===E||l){const f=p;p=null,R(e),p=f}}function j(e,l){if(p)return e();let t=!1;l||(p=[]),a?t=!0:a=[],T++;try{e()}catch(s){q(s)}finally{X(t)}}function X(e){p&&(M(p),p=null),!e&&(a.length?$(()=>{W(a),a=null}):a=null)}function M(e){for(let l=0;l<e.length;l++)I(e[l])}function R(e){e.state=0;for(let l=0;l<e.sources.length;l+=1){const t=e.sources[l];t.sources&&(t.state===w||x?I(t):t.state===E&&R(t))}}function _(e){const l=x;for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];(!s.state||l)&&(s.state=E,s.pure?p.push(s):a.push(s),s.observers&&_(s))}}function B(e){let l;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),f=t.observers;if(f&&f.length){const o=f.pop(),i=t.observerSlots.pop();s<f.length&&(o.sourceSlots[i]=s,f[s]=o,t.observerSlots[s]=i)}}if(e.owned){for(l=0;l<e.owned.length;l++)B(e.owned[l]);e.owned=null}if(e.cleanups){for(l=0;l<e.cleanups.length;l++)e.cleanups[l]();e.cleanups=null}e.state=0,e.context=null}function q(e){throw e}function ie(e,l){return U(()=>e(l))}function G(e,l,t){let s=t.length,f=l.length,o=s,i=0,n=0,u=l[f-1].nextSibling,r=null;for(;i<f||n<o;){if(l[i]===t[n]){i++,n++;continue}for(;l[f-1]===t[o-1];)f--,o--;if(f===i){const c=o<s?n?t[n-1].nextSibling:t[o-n]:u;for(;n<o;)e.insertBefore(t[n++],c)}else if(o===n)for(;i<f;)(!r||!r.has(l[i]))&&e.removeChild(l[i]),i++;else if(l[i]===t[o-1]&&t[n]===l[f-1]){const c=l[--f].nextSibling;e.insertBefore(t[n++],l[i++].nextSibling),e.insertBefore(t[--o],c),l[f]=t[o]}else{if(!r){r=new Map;let g=n;for(;g<o;)r.set(t[g],g++)}const c=r.get(l[i]);if(c!=null)if(n<c&&c<o){let g=i,m=1,L;for(;++g<f&&g<o&&!((L=r.get(l[g]))==null||L!==c+m);)m++;if(m>c-n){const V=l[i];for(;n<c;)e.insertBefore(t[n++],V)}else e.replaceChild(t[n++],l[i++])}else i++;else e.removeChild(l[i++])}}}function ne(e,l,t){let s;return Z(f=>{s=f,Y(l,e(),l.firstChild?null:void 0,t)}),()=>{s(),l.textContent=""}}function fe(e,l,t){const s=document.createElement("template");s.innerHTML=e;let f=s.content.firstChild;return t&&(f=f.firstChild),f}function Y(e,l,t,s){if(t!==void 0&&!s&&(s=[]),typeof l!="function")return A(e,l,s,t);N(f=>A(e,l(),f,t),s)}function A(e,l,t,s,f){for(;typeof t=="function";)t=t();if(l===t)return t;const o=typeof l,i=s!==void 0;if(e=i&&t[0]&&t[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(l=l.toString()),i){let n=t[0];n&&n.nodeType===3?n.data=l:n=document.createTextNode(l),t=C(e,t,s,n)}else t!==""&&typeof t=="string"?t=e.firstChild.data=l:t=e.textContent=l;else if(l==null||o==="boolean")t=C(e,t,s);else{if(o==="function")return N(()=>{let n=l();for(;typeof n=="function";)n=n();t=A(e,n,t,s)}),()=>t;if(Array.isArray(l)){const n=[];if(F(n,l,f))return N(()=>t=A(e,n,t,s,!0)),()=>t;if(n.length===0){if(t=C(e,t,s),i)return t}else Array.isArray(t)?t.length===0?H(e,n,s):G(e,t,n):t==null||t===""?H(e,n):G(e,i&&t||[e.firstChild],n);t=n}else if(l instanceof Node){if(Array.isArray(t)){if(i)return t=C(e,t,s,l);C(e,t,null,l)}else t==null||t===""||!e.firstChild?e.appendChild(l):e.replaceChild(l,e.firstChild);t=l}}return t}function F(e,l,t){let s=!1;for(let f=0,o=l.length;f<o;f++){let i=l[f],n;if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))s=F(e,i)||s;else if((n=typeof i)==="string")e.push(document.createTextNode(i));else if(n==="function")if(t){for(;typeof i=="function";)i=i();s=F(e,Array.isArray(i)?i:[i])||s}else e.push(i),s=!0;else e.push(document.createTextNode(i.toString()))}return s}function H(e,l,t){for(let s=0,f=l.length;s<f;s++)e.insertBefore(l[s],t)}function C(e,l,t,s){if(t===void 0)return e.textContent="";const f=s||document.createTextNode("");if(l.length){let o=!1;for(let i=l.length-1;i>=0;i--){const n=l[i];if(f!==n){const u=n.parentNode===e;!o&&!i?u?e.replaceChild(f,n):e.insertBefore(f,t):u&&e.removeChild(n)}else o=!0}}else e.insertBefore(f,t);return[f]}let k={data:""},z=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||k,ee=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,te=/\/\*[^]*?\*\/|\s\s+|\n/g,d=(e,l)=>{let t,s="",f="",o="";for(let i in e){let n=e[i];typeof n=="object"?(t=l?l.replace(/([^,])+/g,u=>i.replace(/([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,u):u?u+" "+r:r)):i,f+=i[0]=="@"?i[1]=="f"?d(n,i):i+"{"+d(n,i[1]=="k"?"":l)+"}":d(n,t)):i[0]=="@"&&i[1]=="i"?s=i+" "+n+";":(i=i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=d.p?d.p(i,n):i+":"+n+";")}return o[0]?(t=l?l+"{"+o+"}":o,s+t+f):s+f},b={},v=e=>{let l="";for(let t in e)l+=t+(typeof e[t]=="object"?v(e[t]):e[t]);return l},le=(e,l,t,s,f)=>{let o=typeof e=="object"?v(e):e,i=b[o]||(b[o]=(n=>{let u=0,r=11;for(;u<n.length;)r=101*r+n.charCodeAt(u++)>>>0;return"go"+r})(o));if(!b[i]){let n=typeof e=="object"?e:(u=>{let r,c=[{}];for(;r=ee.exec(u.replace(te,""));)r[4]&&c.shift(),r[3]?c.unshift(c[0][r[3]]=c[0][r[3]]||{}):r[4]||(c[0][r[1]]=r[2]);return c[0]})(e);b[i]=d(f?{["@keyframes "+i]:n}:n,t?"":"."+i)}return((n,u,r)=>{u.data.indexOf(n)==-1&&(u.data=r?n+u.data:u.data+n)})(b[i],l,s),i},se=(e,l,t)=>e.reduce((s,f,o)=>{let i=l[o];if(i&&i.call){let n=i(t),u=n&&n.props&&n.props.className||/^go/.test(n)&&n;i=u?"."+u:n&&typeof n=="object"?n.props?"":d(n,""):n}return s+f+(i??"")},"");function Q(e){let l=this||{},t=e.call?e(l.p):e;return le(t.unshift?t.raw?se(t,[].slice.call(arguments,1),l.p):t.reduce((s,f)=>f?Object.assign(s,f.call?f(l.p):f):s,{}):t,z(l.target),l.g,l.o,l.k)}Q.bind({g:1});Q.bind({k:1});export{ie as a,N as c,Y as i,Q as p,ne as r,fe as t};
