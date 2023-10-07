"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6388],{76:(B,x,h)=>{h.d(x,{GW:()=>w,dk:()=>_,oK:()=>a});var a=(()=>{return(g=a||(a={})).Prompt="PROMPT",g.Camera="CAMERA",g.Photos="PHOTOS",a;var g})(),w=(()=>{return(g=w||(w={})).Rear="REAR",g.Front="FRONT",w;var g})(),_=(()=>{return(g=_||(_={})).Uri="uri",g.Base64="base64",g.DataUrl="dataUrl",_;var g})()},6388:(B,x,h)=>{h.d(x,{V1:()=>_,dk:()=>w.dk});var a=h(7423),w=h(76);const _=(0,a.fo)("Camera",{web:()=>h.e(3954).then(h.bind(h,3954)).then(g=>new g.CameraWeb)})},7423:(B,x,h)=>{h.d(x,{Uw:()=>M,fo:()=>Z,xz:()=>A});var a=h(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var L=(()=>{return(r=L||(L={})).Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE",L;var r})();class A extends Error{constructor(e,t,o){super(e),this.message=e,this.code=t,this.data=o}}const J=r=>{var e,t,o,s,n;const l=r.CapacitorCustomPlatform||null,i=r.Capacitor||{},f=i.Plugins=i.Plugins||{},c=r.CapacitorPlatforms,O=(null===(e=null==c?void 0:c.currentPlatform)||void 0===e?void 0:e.getPlatform)||(()=>null!==l?l.name:(r=>{var e,t;return null!=r&&r.androidBridge?"android":null!==(t=null===(e=null==r?void 0:r.webkit)||void 0===e?void 0:e.messageHandlers)&&void 0!==t&&t.bridge?"ios":"web"})(r)),re=(null===(t=null==c?void 0:c.currentPlatform)||void 0===t?void 0:t.isNativePlatform)||(()=>"web"!==O()),oe=(null===(o=null==c?void 0:c.currentPlatform)||void 0===o?void 0:o.isPluginAvailable)||(d=>{const u=D.get(d);return!!(null!=u&&u.platforms.has(O())||K(d))}),K=(null===(s=null==c?void 0:c.currentPlatform)||void 0===s?void 0:s.getPluginHeader)||(d=>{var u;return null===(u=i.PluginHeaders)||void 0===u?void 0:u.find(U=>U.name===d)}),D=new Map,ce=(null===(n=null==c?void 0:c.currentPlatform)||void 0===n?void 0:n.registerPlugin)||((d,u={})=>{const U=D.get(d);if(U)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),U.proxy;const E=O(),$=K(d);let b;const de=function(){var m=(0,a.Z)(function*(){return!b&&E in u?b=b="function"==typeof u[E]?yield u[E]():u[E]:null!==l&&!b&&"web"in u&&(b=b="function"==typeof u.web?yield u.web():u.web),b});return function(){return m.apply(this,arguments)}}(),H=m=>{let v;const P=(...y)=>{const C=de().then(p=>{const k=((m,v)=>{var P,y;if(!$){if(m)return null===(y=m[v])||void 0===y?void 0:y.bind(m);throw new A(`"${d}" plugin is not implemented on ${E}`,L.Unimplemented)}{const C=null==$?void 0:$.methods.find(p=>v===p.name);if(C)return"promise"===C.rtype?p=>i.nativePromise(d,v.toString(),p):(p,k)=>i.nativeCallback(d,v.toString(),p,k);if(m)return null===(P=m[v])||void 0===P?void 0:P.bind(m)}})(p,m);if(k){const T=k(...y);return v=null==T?void 0:T.remove,T}throw new A(`"${d}.${m}()" is not implemented on ${E}`,L.Unimplemented)});return"addListener"===m&&(C.remove=(0,a.Z)(function*(){return v()})),C};return P.toString=()=>`${m.toString()}() { [capacitor code] }`,Object.defineProperty(P,"name",{value:m,writable:!1,configurable:!1}),P},F=H("addListener"),V=H("removeListener"),fe=(m,v)=>{const P=F({eventName:m},v),y=function(){var p=(0,a.Z)(function*(){const k=yield P;V({eventName:m,callbackId:k},v)});return function(){return p.apply(this,arguments)}}(),C=new Promise(p=>P.then(()=>p({remove:y})));return C.remove=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield y()}),C},S=new Proxy({},{get(m,v){switch(v){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return $?fe:F;case"removeListener":return V;default:return H(v)}}});return f[d]=S,D.set(d,{name:d,proxy:S,platforms:new Set([...Object.keys(u),...$?[E]:[]])}),S});return i.convertFileSrc||(i.convertFileSrc=d=>d),i.getPlatform=O,i.handleError=d=>r.console.error(d),i.isNativePlatform=re,i.isPluginAvailable=oe,i.pluginMethodNoop=(d,u,U)=>Promise.reject(`${U} does not have an implementation of "${u}".`),i.registerPlugin=ce,i.Exception=A,i.DEBUG=!!i.DEBUG,i.isLoggingEnabled=!!i.isLoggingEnabled,i.platform=i.getPlatform(),i.isNative=i.isNativePlatform(),i},j=(r=>r.Capacitor=J(r))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Z=j.registerPlugin;class M{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){var o=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const l=function(){var f=(0,a.Z)(function*(){return o.removeListener(e,t)});return function(){return f.apply(this,arguments)}}(),i=Promise.resolve({remove:l});return Object.defineProperty(i,"remove",{value:(f=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield l()}),function(){return f.apply(this,arguments)})}),i;var f}removeAllListeners(){var e=this;return(0,a.Z)(function*(){e.listeners={};for(const t in e.windowListeners)e.removeWindowListener(e.windowListeners[t]);e.windowListeners={}})()}notifyListeners(e,t){const o=this.listeners[e];o&&o.forEach(s=>s(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:o=>{this.notifyListeners(t,o)}}}unimplemented(e="not implemented"){return new j.Exception(e,L.Unimplemented)}unavailable(e="not available"){return new j.Exception(e,L.Unavailable)}removeListener(e,t){var o=this;return(0,a.Z)(function*(){const s=o.listeners[e];if(!s)return;const n=s.indexOf(t);o.listeners[e].splice(n,1),o.listeners[e].length||o.removeWindowListener(o.windowListeners[e])})()}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const I=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),G=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Q extends M{getCookies(){return(0,a.Z)(function*(){const e=document.cookie,t={};return e.split(";").forEach(o=>{if(o.length<=0)return;let[s,n]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=G(s).trim(),n=G(n).trim(),t[s]=n}),t})()}setCookie(e){return(0,a.Z)(function*(){try{const t=I(e.key),o=I(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,n=(e.path||"/").replace("path=",""),l=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${o||""}${s}; path=${n}; ${l};`}catch(t){return Promise.reject(t)}})()}deleteCookie(e){return(0,a.Z)(function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}})()}clearCookies(){return(0,a.Z)(function*(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})()}clearAllCookies(){var e=this;return(0,a.Z)(function*(){try{yield e.clearCookies()}catch(t){return Promise.reject(t)}})()}}Z("CapacitorCookies",{web:()=>new Q});const X=function(){var r=(0,a.Z)(function*(e){return new Promise((t,o)=>{const s=new FileReader;s.onload=()=>{const n=s.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},s.onerror=n=>o(n),s.readAsDataURL(e)})});return function(t){return r.apply(this,arguments)}}();class te extends M{request(e){return(0,a.Z)(function*(){const t=((r,e={})=>{const t=Object.assign({method:r.method||"GET",headers:r.headers},e),s=((r={})=>{const e=Object.keys(r);return Object.keys(r).map(s=>s.toLocaleLowerCase()).reduce((s,n,l)=>(s[n]=r[e[l]],s),{})})(r.headers)["content-type"]||"";if("string"==typeof r.data)t.body=r.data;else if(s.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[l,i]of Object.entries(r.data||{}))n.set(l,i);t.body=n.toString()}else if(s.includes("multipart/form-data")){const n=new FormData;if(r.data instanceof FormData)r.data.forEach((i,f)=>{n.append(f,i)});else for(const i of Object.keys(r.data))n.append(i,r.data[i]);t.body=n;const l=new Headers(t.headers);l.delete("content-type"),t.headers=l}else(s.includes("application/json")||"object"==typeof r.data)&&(t.body=JSON.stringify(r.data));return t})(e,e.webFetchExtra),o=((r,e=!0)=>r?Object.entries(r).reduce((o,s)=>{const[n,l]=s;let i,f;return Array.isArray(l)?(f="",l.forEach(c=>{i=e?encodeURIComponent(c):c,f+=`${n}=${i}&`}),f.slice(0,-1)):(i=e?encodeURIComponent(l):l,f=`${n}=${i}`),`${o}&${f}`},"").substr(1):null)(e.params,e.shouldEncodeUrlParams),s=o?`${e.url}?${o}`:e.url,n=yield fetch(s,t),l=n.headers.get("content-type")||"";let f,c,{responseType:i="text"}=n.ok?e:{};switch(l.includes("application/json")&&(i="json"),i){case"arraybuffer":case"blob":c=yield n.blob(),f=yield X(c);break;case"json":f=yield n.json();break;default:f=yield n.text()}const W={};return n.headers.forEach((O,R)=>{W[R]=O}),{data:f,headers:W,status:n.status,url:n.url}})()}get(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"GET"}))})()}post(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"POST"}))})()}put(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PUT"}))})()}patch(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})()}delete(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})()}}Z("CapacitorHttp",{web:()=>new te})}}]);