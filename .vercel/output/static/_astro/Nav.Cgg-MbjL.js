import{r as p}from"./index.DhYZZe0J.js";var f={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c=p,d=Symbol.for("react.element"),u=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,_=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function m(t,e,s){var r,o={},i=null,l=null;s!==void 0&&(i=""+s),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(l=e.ref);for(r in e)x.call(e,r)&&!v.hasOwnProperty(r)&&(o[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:d,type:t,key:i,ref:l,props:o,_owner:_.current}}a.Fragment=u;a.jsx=m;a.jsxs=m;f.exports=a;var n=f.exports;function h({pathName:t}){const e=[{name:"Home",path:"/",isActive:!1},{name:"Blog",path:"/blog",isActive:!1}];return n.jsxs("nav",{className:"flex justify-between m-4 items-center",children:[n.jsx("a",{href:"/",children:n.jsx("img",{src:"/logo.jpg",className:"w-8 rounded-md",alt:"pp"})}),n.jsx("div",{className:"flex gap-4 text-gray-600 font-medium",children:e.map((s,r)=>n.jsx("a",{href:s.path,className:t==s.path?"underline text-gray-800 font-semibold":"",children:s.name},r))})]})}export{h as default};
