(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1083:function(e,t){},1268:function(e,t,n){},1270:function(e,t,n){},1273:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(48),c=n.n(s),o=n(1280),i=(n(477),n(439)),u=n(440),l=n(469),m=n(441),f=n(470),d=n(467),p=n.n(d),v=n(1282),A=n(1281),E=n(107),b=n.n(E),h=n(1278);function w(e){return r.a.createElement(h.a,Object.assign({},e,{className:"router-link"}))}var O=n(443),g=n.n(O),j=n(445),y=n.n(j),x=n(442),N=n.n(x),P=(n(641),function(){return r.a.createElement(g.a,{id:"nav",position:"static"},r.a.createElement(y.a,null,r.a.createElement(w,{to:"/"},r.a.createElement("img",{src:N.a,alt:"logo"}))))}),k=n(27),R=n(20),S=n(41),C="USER_FORMS",X="EDITED_FORM";function F(){var e=localStorage.getItem(C);if(!e)return[];try{return JSON.parse(e)}catch(t){return console.error("Error parsing user forms: ".concat(t.stack)),{}}}function T(e){try{var t=JSON.stringify(e);localStorage.setItem(C,t)}catch(n){console.error("Error storing userForm: ".concat(n.stack))}}function D(e,t){console.log("storing user form"),T(Object(k.a)({},F(),Object(S.a)({},e,{title:t.title,lastOpenned:Date.now()})))}function q(e){try{var t=JSON.stringify(e);localStorage.setItem(X,t)}catch(n){console.error("Error storing user edited form: ".concat(n.stack))}}var B=n(1279),V=n(446),H=n.n(V);B.a.addLocale(H.a);var U=new B.a,z=function(e){var t=U.format(e,"twitter");return t?t.includes(" ")?t:"".concat(t," ago"):"Just now"},I=n(44),L=n.n(I),W=n(85),M=n.n(W),G=n(447),K=n.n(G),Q=n(448),J=n.n(Q);n(709);function Y(e){var t=e.hash,n=e.title,a=e.lastOpenned;return r.a.createElement(w,{to:"/".concat(t)},r.a.createElement(M.a,{className:"form-preview"},r.a.createElement(K.a,{className:"miniature"}),r.a.createElement("div",{className:"formTitle"},n),r.a.createElement("div",{className:"bottom"},r.a.createElement("span",{className:"time"},"Openned ",z(a))," ",r.a.createElement(J.a,null))))}var Z=function(){var e=Object(a.useState)([]),t=Object(R.a)(e,2),n=t[0],s=t[1];return Object(a.useEffect)(function(){var e=Object.entries(F()).map(function(e){var t=Object(R.a)(e,2),n=t[0],a=t[1];return Object(k.a)({},a,{hash:n})}).sort(function(e,t){return t.lastOpenned-e.lastOpenned});console.log("Got user forms",e),s(e)},[]),console.log(n),r.a.createElement("div",{id:"home"},r.a.createElement("section",null,r.a.createElement("div",{className:"site-width"},r.a.createElement("div",{className:"title"},"Decentralized forms, for decentralized projects"),r.a.createElement("p",null,"Finally a way to collect feedback in a decentralized way"),r.a.createElement(w,{to:"/create"},r.a.createElement(L.a,{variant:"contained",color:"primary"},"Start a new form")),Boolean(n.length)&&r.a.createElement("div",{className:"recent-forms"},r.a.createElement("div",{className:"sub-title"},"Recent forms"),r.a.createElement("div",{className:"user-forms"},n.map(function(e){var t=e.hash,n=e.title,a=e.lastOpenned;return r.a.createElement(Y,Object.assign({key:t},{hash:t,title:n,lastOpenned:a}))}))))),r.a.createElement("section",null,r.a.createElement("div",{className:"site-width"},r.a.createElement("div",{className:"title"},"Show the world that you believe in Web3"),r.a.createElement("p",null,"Stop relying on google's tools to do the marketing of your decentralized project. Embrace the Web3 concept on corner of your DApp user experience."),r.a.createElement("p",null,r.a.createElement("a",{href:"https://github.com/dapplion/d4rm",style:{textDecoration:"none"}},"Show me the source code")))))},_=n(19),$=n.n(_),ee=n(35),te=n(196),ne=te.object({id:te.string().allow(""),to:te.string().valid("smartContract").required(),network:te.string().required(),address:te.string().required()});var ae=n(196),re=ae.object({title:ae.string().required(),description:ae.string().allow("").required(),questions:ae.array().items(ae.object({text:ae.string().required(),options:ae.array().items(ae.string().allow("").required()).required()}).required()).required()});var se=n(449),ce=n.n(se),oe=n(109);function ie(e,t,n){var a,r=e.length-1;return t<0||n<0||t>r||n>r||t===n?e:Object.assign([],e,(a={},Object(S.a)(a,t,e[n]),Object(S.a)(a,n,e[t]),a))}function ue(e,t){return t<0||t>e.length-1?e:[].concat(Object(oe.a)(e.slice(0,t)),Object(oe.a)(e.slice(t+1)))}function le(e,t,n){for(var a={},r=function(){var e=c[s],r=(o=Object(R.a)(e,2))[0],i=o[1];if(!t[r])throw Error("No type defined for action key: ".concat(r));a[r]=function(){return n(Object(k.a)({type:t[r]},i.apply(void 0,arguments)))}},s=0,c=Object.entries(e);s<c.length;s++){var o;r()}return a}var me={setTitle:"setTitle",setDescription:"setDescription",addQuestion:"addQuestion",deleteQuestion:"deleteQuestion",addOption:"addOption",setText:"setText",setOption:"setOption",moveOptionUp:"moveOptionUp",moveOptionDown:"moveOptionDown",deleteOption:"deleteOption"},fe={setTitle:function(e){return{title:e}},setDescription:function(e){return{description:e}},addQuestion:function(){},deleteQuestion:function(e){return{i:e}},addOption:function(e){return{i:e}},setText:function(e,t){return{i:e,text:t}},setOption:function(e,t,n){return{i:e,j:t,text:n}},moveOptionUp:function(e,t){return{i:e,j:t}},moveOptionDown:function(e,t){return{i:e,j:t}},deleteOption:function(e,t){return{i:e,j:t}}},de=function(e){return le(fe,me,e)};function pe(e,t){var n,a,r,s=function(t){return Object(k.a)({},e,{questions:t(e.questions)})},c=function(e,t){return s(function(n){return Object.assign([],n,Object(S.a)({},e,Object(k.a)({},n[e],t(n[e]))))})};switch(t.type){case me.setTitle:return Object(k.a)({},e,{title:t.title});case me.setDescription:return Object(k.a)({},e,{description:t.description});case me.addQuestion:return s(function(e){return[].concat(Object(oe.a)(e),[{text:"",options:[]}])});case me.deleteQuestion:return s(function(e){return ue(e,t.i)});case me.addOption:return c(t.i,function(e){return{options:[].concat(Object(oe.a)(e.options),[""])}});case me.setText:return c(t.i,function(){return{text:t.text}});case me.setOption:return n=t.i,a=t.j,r=t.text,c(n,function(e){return{options:Object.assign([],e.options,Object(S.a)({},a,r))}});case me.moveOptionUp:return c(t.i,function(e){return{options:ie(e.options,t.j,t.j-1)}});case me.moveOptionDown:return c(t.i,function(e){return{options:ie(e.options,t.j,t.j+1)}});case me.deleteOption:return c(t.i,function(e){return{options:ue(e.options,t.j)}});default:throw new Error("Unknown action")}}var ve=n(471),Ae=n(450),Ee=n.n(Ae);function be(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return function(t){13===(t.charCode?t.charCode:t.keyCode?t.keyCode:0)&&e.apply(void 0,n)}}function he(e){var t=e.value,n=e.onValueChange,a=e.onEnterPress,s=Object(ve.a)(e,["value","onValueChange","onEnterPress"]);return r.a.createElement(Ee.a,Object.assign({value:t,onChange:function(e){return n(e.target.value)},onKeyPress:be(a),margin:"normal",fullWidth:!0,autoFocus:!0},s))}he.defaultProps={onEnterPress:function(){}};var we=he,Oe=n(453),ge=n.n(Oe),je=n(451),ye=n.n(je),xe=n(452),Ne=n.n(xe),Pe=n(239),ke=n.n(Pe);function Re(e){var t=e.value,n=e.onValueChange,a=e.onEnterPress,s=e.onUp,c=e.onDown,o=e.onDelete;return r.a.createElement("div",{className:"option-row"},r.a.createElement("span",{className:"arrows"},r.a.createElement(ye.a,{onClick:s}),r.a.createElement(Ne.a,{onClick:c})),r.a.createElement("span",null,r.a.createElement(ke.a,{className:"circle"})),r.a.createElement("span",{className:"text"},r.a.createElement(we,{value:t,onValueChange:n,onEnterPress:a,margin:"none",className:"option-row-input"})),r.a.createElement("span",{className:"delete"},r.a.createElement(ge.a,{onClick:o})))}function Se(e){var t=e.onAdd;return r.a.createElement("div",{className:"option-row add-option"},r.a.createElement("span",{className:"arrows"}),r.a.createElement("span",null,r.a.createElement(ke.a,{className:"circle"})),r.a.createElement("span",{className:"text",onClick:t},r.a.createElement(L.a,null,"Add option")),r.a.createElement("span",{className:"delete"}))}function Ce(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"paper-section-topline"}),r.a.createElement(M.a,Object.assign({},e,{elevation:1,className:"paper-section ".concat(e.className)})))}Re.defaultProps={onEnterPress:function(){}};var Xe=n(454),Fe=n.n(Xe),Te=n(455),De=n.n(Te);var qe=function(e){var t=e.initialForm,n=e.setForm,s=Object(a.useReducer)(pe,t),c=Object(R.a)(s,2),o=c[0],i=c[1],u=o.title,l=o.description,m=o.questions,f=Object(a.useMemo)(function(){return de(i)},[]),d=f.setTitle,p=f.setDescription,v=f.addQuestion,A=f.deleteQuestion,E=f.addOption,b=f.setText,h=f.setOption,w=f.moveOptionUp,O=f.moveOptionDown,g=f.deleteOption;return Object(a.useEffect)(function(){n(o)},[o]),r.a.createElement(r.a.Fragment,null,r.a.createElement(Ce,null,r.a.createElement("div",{className:"header"},r.a.createElement(we,{label:"Form title",value:u,onValueChange:d,InputProps:{style:{fontSize:"2.5rem"}}}),r.a.createElement(we,{label:"Form description",value:l,onValueChange:p,multiline:!0}))),m.map(function(e,t){var n=e.text,a=e.options;return r.a.createElement(Ce,{key:t,className:"question"},r.a.createElement("div",{className:"header"},r.a.createElement(we,{label:"".concat(t+1,". Question text"),value:n,onValueChange:function(e){return b(t,e)},onEnterPress:function(){return E(t)},margin:"none"}),r.a.createElement(Fe.a,{onClick:function(){return A(t)}})),r.a.createElement("div",{className:"options"},a.map(function(e,n){return r.a.createElement(Re,{key:n,value:e,onValueChange:function(e){return h(t,n,e)},onUp:function(){return w(t,n)},onDown:function(){return O(t,n)},onDelete:function(){return g(t,n)},onEnterPress:function(){return n===a.length-1?E(t):null}})}),r.a.createElement(Se,{onAdd:function(){return E(t)}})))}),r.a.createElement(Ce,{className:"add-question",onClick:v},r.a.createElement(De.a,{className:"button-svg"}),"Add question",r.a.createElement("div",{id:"gradient"})))},Be={setId:"setId",setTo:"setTo",setNetwork:"setNetwork",setAddress:"setAddress"},Ve={setId:function(e){return{id:e}},setTo:function(e){return{to:e}},setNetwork:function(e){return{network:e}},setAddress:function(e){return{address:e}}},He=function(e){return le(Ve,Be,e)};function Ue(e,t){switch(t.type){case Be.setId:return Object(k.a)({},e,{id:t.id});case Be.setTo:return Object(k.a)({},e,{to:t.to});case Be.setNetwork:return Object(k.a)({},e,{network:t.network});case Be.setAddress:return Object(k.a)({},e,{address:t.address});default:throw new Error("Unknown action")}}var ze=n(108),Ie=n.n(ze),Le=n(168),We=n.n(Le),Me=n(169),Ge=n.n(Me),Ke=n(240),Qe=n.n(Ke);function Je(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").replace(/^[a-z]|[A-Z]/g,function(e,t){return 0===t?e.toUpperCase():" "+e.toLowerCase()})}var Ye={rel:"noopener noreferrer",target:"_blank"},Ze=[{name:"Generic smart contract (default)",description:"Submissions will be directed to a generic form submission smart contract already deployed, which can handle multiple surveys at once. This is the default method for non-technical users, and since the contract is already deployed, publishing the form will be free.",value:"smartContract",id:"genericSmartContract"}],_e={ropsten:"0xA56678Bc585cdB7Fdcd24176401BDf8D24927505",kovan:"0xA56678Bc585cdB7Fdcd24176401BDf8D24927505",rinkeby:"0xA56678Bc585cdB7Fdcd24176401BDf8D24927505",goerli:"0xA56678Bc585cdB7Fdcd24176401BDf8D24927505"},$e=Object.keys(_e);function et(e){return Ze.find(function(t){return t.id===e})}var tt=function(e){var t=e.setSubmit,n=e.initialSubmit,s=Object(a.useReducer)(Ue,n),c=Object(R.a)(s,2),o=c[0],i=c[1],u=o.id,l=o.to,m=o.network,f=o.address,d=Object(a.useMemo)(function(){return He(i)},[]),p=d.setId,v=d.setTo,A=d.setNetwork,E=d.setAddress,b=et(u);return Object(a.useEffect)(function(){t(o)},[o]),Object(a.useEffect)(function(){"genericSmartContract"===u&&E(_e[m])},[b,m]),r.a.createElement(r.a.Fragment,null,r.a.createElement(Ce,{className:"submit-mechanism"},r.a.createElement("div",{className:"title"},"Submission mechanism"),r.a.createElement("p",null,"Specify how to aggregate user's answers."),r.a.createElement("div",null,r.a.createElement(Ie.a,{fullWidth:!0},r.a.createElement(We.a,null,"Submit to"),r.a.createElement(Ge.a,{value:u||"",onChange:function(e){var t=e.target.value;p(t),v((et(t)||{}).value)}},Ze.map(function(e,t){var n=e.name,a=e.id;return r.a.createElement(Qe.a,{key:t,value:a},n)})))),b&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,b.description),b.note&&r.a.createElement("p",{className:"alert"},r.a.createElement("strong",null,"Note: "),b.note)),"smartContract"===l&&r.a.createElement(r.a.Fragment,null,r.a.createElement(Ie.a,{className:"select"},r.a.createElement(We.a,{htmlFor:"age-simple"},"Choose network"),r.a.createElement(Ge.a,{value:m||"",onChange:function(e){return A(e.target.value)}},$e.map(function(e){return r.a.createElement(Qe.a,{key:e,value:e},Je(e))}))),f&&r.a.createElement("p",{className:"at-address"},"At address"," ",r.a.createElement("a",Object.assign({href:"https://".concat(m,".etherscan.io/address/").concat(f)},Ye),f)))))},nt=n(456),at=n.n(nt),rt=n(458),st=n.n(rt),ct=n(457),ot=n.n(ct);function it(e){var t=e.title,n=e.description,a=e.questions,s=e.answers,c=e.disabled,o=e.setAnswers;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"title"},t),r.a.createElement("p",{className:"description"},n)),a.map(function(e,t){var n=e.text,a=e.options;return r.a.createElement("div",{key:t,className:"form-question"},r.a.createElement("div",{className:"text"},n),r.a.createElement(Ie.a,{component:"fieldset"},r.a.createElement(at.a,{value:s[t],onChange:function(e){o(Object(k.a)({},s,Object(S.a)({},t,e.target.value)))}},a.map(function(e,t){return r.a.createElement(ot.a,{key:t,value:String(t),control:r.a.createElement(st.a,{color:"primary"}),label:e,className:"form-option",disabled:c})}))))}))}it.defaultProps={answers:{},disabled:!1,setAnswers:function(){}};var ut=it;function lt(e){var t=e.submit;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",null,"Submissions"),r.a.createElement("p",null,"Submit to ",Je(t.to)," at ",t.network," ",t.address))}var mt=n(459),ft=n.n(mt),dt=n(460),pt=n.n(dt),vt=n(461),At=n.n(vt),Et=n(462),bt=n.n(Et),ht=(n(817),{title:"",description:"",questions:[{text:"",options:[]}]}),wt={to:"",network:""};var Ot=function(){var e=Object(a.useState)(ht),t=Object(R.a)(e,2),n=t[0],s=t[1],c=Object(a.useState)(wt),o=Object(R.a)(c,2),i=o[0],u=o[1],l=Object(a.useState)(n),m=Object(R.a)(l,2),f=m[0],d=m[1],p=Object(a.useState)(i),v=Object(R.a)(p,2),A=v[0],E=v[1],b=Object(a.useState)(!1),h=Object(R.a)(b,2),O=h[0],g=h[1],j=Object(a.useState)(""),y=Object(R.a)(j,2),x=y[0],N=y[1],P=Object(a.useState)(""),S=Object(R.a)(P,2),C=S[0],F=S[1],T=["Create form","Choose submimission","Publish"],B=ce()(q,1e3,[]),V=Object(R.a)(B,1)[0];function H(e){d(e),V(Object(k.a)({},e,{submit:A}))}function U(e){E(e),V(Object(k.a)({},f,{submit:e}))}function z(){return(z=Object(ee.a)($.a.mark(function e(){var t,n;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),N(""),F(""),e.prev=3,t={title:f.title,description:f.description,questions:f.questions,submit:{to:A.to,network:A.network,address:A.address}},console.log("Uploading form object",t),e.next=8,window.add(t);case 8:n=e.sent,F(n),D(n,t),G(3),localStorage.removeItem(X),s(ht),u(wt),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(3),console.error("Error uploading formObj: ".concat(e.t0.stack)),N(e.t0.message);case 21:return e.prev=21,g(!1),e.finish(21);case 24:case"end":return e.stop()}},e,null,[[3,17,21,24]])}))).apply(this,arguments)}Object(a.useEffect)(function(){var e=function(){try{var e=localStorage.getItem(X);return e?JSON.parse(e):null}catch(t){console.error("Error getting user edited form: ".concat(t.stack))}}();e&&(s({title:e.title,description:e.description,questions:e.questions}),u(e.submit))},[]);var I=Object(a.useState)(0),W=Object(R.a)(I,2),M=W[0],G=W[1],K=0===M&&!function(e){return!ae.validate(e,re.required()).error}(f)||1===M&&!function(e){return!te.validate(e,ne.required()).error}(A);return r.a.createElement("div",{id:"create",className:"site-width main-section"},r.a.createElement("div",null,r.a.createElement(pt.a,{activeStep:M,alternativeLabel:!0},T.map(function(e){return r.a.createElement(At.a,{key:e},r.a.createElement(bt.a,null,e))})),function(e){switch(e){case 0:return r.a.createElement(qe,{setForm:H,initialForm:n});case 1:return r.a.createElement(tt,{setSubmit:U,initialSubmit:i});case 2:return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ce,{className:"submit-mechanism"},O?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Uploading..."),r.a.createElement(ft.a,null)):x?r.a.createElement("div",{style:{color:"red"}},"Error publishing: ",x):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"title"},"Review and confirm form"),r.a.createElement(Ce,{style:{opacity:.75}},r.a.createElement(ut,Object(k.a)({},f,{disabled:!0})),r.a.createElement(lt,{submit:A})))));case 3:return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ce,null,r.a.createElement("p",null,"Form successfully uploaded"),r.a.createElement(w,{to:"/".concat(C)},r.a.createElement(L.a,{variant:"contained",color:"primary"},"View form"))));default:return"Unknown stepIndex"}}(M),r.a.createElement("div",{style:{marginTop:"2rem"}},M<T.length&&r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{disabled:0===M,onClick:function(){return G(function(e){return e-1})}},"Back"),r.a.createElement(L.a,{variant:"contained",color:"primary",disabled:K,onClick:function(){2===M?function(){z.apply(this,arguments)}():G(function(e){return e+1})}},M===T.length-1?"Publish":"Next")))),r.a.createElement("div",{className:"mt-5"}))},gt=n(463),jt=n.n(gt)()("ipfs.infura.io","5001",{protocol:"https"});function yt(e){return xt.apply(this,arguments)}function xt(){return(xt=Object(ee.a)($.a.mark(function e(t){var n,a,r;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.stringify(t),a=jt.types.Buffer.from(n),e.next=4,jt.add(a);case 4:return r=e.sent,e.abrupt("return",r[0].hash);case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Nt(e){return Pt.apply(this,arguments)}function Pt(){return(Pt=Object(ee.a)($.a.mark(function e(t){var n,a;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,jt.cat(t);case 2:return n=e.sent,a=n.toString("utf8"),e.abrupt("return",JSON.parse(a));case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}window.ipfs=jt,window.add=yt,window.cat=Nt;var kt={add:yt,cat:Nt,isHash:function(e){return jt.util.isIPFS.cid(e)}};function Rt(e){if(!e.title)throw Error("Invalid form: Must contain a title");if(!e.questions||!Array.isArray(e.questions))throw Error("Invalid form: Must contain questions");if(!e.submit)throw Error("Invalid form: Must contain submit specification");return e.questions=e.questions.map(function(e){var t=e.text,n=e.title,a=e.options,r=e.answers;return{text:t||n,options:a||r}}),e}function St(e){return Ct.apply(this,arguments)}function Ct(){return(Ct=Object(ee.a)($.a.mark(function e(t){var n;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(kt.isHash(t)){e.next=2;break}throw Error("Invalid IPFS hash: ".concat(t));case 2:return e.next=4,kt.cat(t);case 4:return n=Rt(n=e.sent),e.abrupt("return",n);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}var Xt=n(170),Ft=1;function Tt(){return(Tt=Object(ee.a)($.a.mark(function e(t){var n,a,r,s,c,o;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.network,a=t.address,r=t.questions,s=new b.a("https://".concat(n,".infura.io/v3/89b12e3b00cf40f5ae26cc72b3284a44")),c=new s.eth.Contract(Xt,a),e.next=5,c.getPastEvents("Submission",{fromBlock:"0"});case 5:return o=e.sent,console.log("events at submission contract ".concat(n," ").concat(a),o),e.abrupt("return",o.map(function(e){for(var t=(e.returnValues.answers||"").replace("0x",""),n=[],a=0;a<r.length;a++){var s=a*Ft,c=parseInt(t.slice(s,s+Ft),16);n.push({title:r[a].title,answer:r[a].options[c],answerIndex:c})}return{answers:n,txHash:e.transactionHash,user:e.returnValues.user}}));case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}var Dt=function(e){return Tt.apply(this,arguments)},qt=n(464),Bt=n.n(qt);function Vt(e){return"0x"+new Bt.a(e).multihash.slice(2,64).toString("hex").padStart(64,"0")}function Ht(){return(Ht=Object(ee.a)($.a.mark(function e(t){var n,a,r,s,c,o;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.answers,a=t.submit,r=t.hash){e.next=3;break}throw Error("hash must be defined");case 3:if(s=Object.values(n).map(function(e){if(isNaN(e))throw Error("Answer index must be a number");if(e>15)throw Error("Max number of possible answers for questions is 15");return parseInt(e).toString(16)}),c="0x"+s.join("").padEnd(64,"0"),"smartContract"===a.to){e.next=7;break}throw Error("Unsupported submit method");case 7:return e.next=9,Ut({surveyId:Vt(r),answerBytes:c,address:a.address,network:a.network});case 9:return o=e.sent,e.abrupt("return",(o||{}).result);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Ut(e){return zt.apply(this,arguments)}function zt(){return(zt=Object(ee.a)($.a.mark(function e(t){var n,a,r,s,c,o,i,u,l,m;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(m=function(){return(m=Object(ee.a)($.a.mark(function e(){return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e,t){window.ethereum.sendAsync({method:"eth_sendTransaction",params:[u],from:window.ethereum.selectedAddress},function(n,a){n?t(n):e(a)})}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)},l=function(){return m.apply(this,arguments)},n=t.surveyId,a=t.answerBytes,r=t.address,s=t.network,window.ethereum){e.next=5;break}throw Error("You must have a recent version of metamask installed");case 5:return console.log("Submitting answers to smart contract",{surveyId:n,answerBytes:a,address:r,network:s}),e.next=8,window.ethereum.enable();case 8:if((c=new b.a("https://".concat(s,".infura.io"))).utils.isAddress(window.ethereum.selectedAddress)){e.next=11;break}throw Error("Could not get address from window.ethereum.selectedAddress ".concat(window.ethereum.selectedAddress));case 11:if(c.utils.isAddress(r)){e.next=13;break}throw Error("Submit address is not valid: ".concat(r));case 13:return o=new c.eth.Contract(Xt,r),i=o.methods.submit(n,a).encodeABI(),u={to:r,from:window.ethereum.selectedAddress,data:i},e.next=18,l();case 18:return e.abrupt("return",e.sent);case 19:case"end":return e.stop()}},e)}))).apply(this,arguments)}var It=function(e){return Ht.apply(this,arguments)};var Lt=function(e){var t=e.form,n=e.hash,s=t.title,c=t.description,o=t.questions,i=t.submit,u=Object(a.useState)({}),l=Object(R.a)(u,2),m=l[0],f=l[1],d=Object(a.useState)(""),p=Object(R.a)(d,2),v=p[0],A=p[1],E=Object(a.useState)(!1),b=Object(R.a)(E,2),h=b[0],w=b[1],O=Object(a.useState)(""),g=Object(R.a)(O,2),j=g[0],y=g[1];function x(){return(x=Object(ee.a)($.a.mark(function e(){var t;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,w(!0),e.next=4,It({answers:m,submit:i,hash:n});case 4:t=e.sent,A(t),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),y(e.t0.message),console.error("\xc8rror onSubmit answers: ".concat(e.t0.message));case 12:return e.prev=12,w(!1),e.finish(12);case 15:case"end":return e.stop()}},e,null,[[0,8,12,15]])}))).apply(this,arguments)}var N=function(e,t){if(!t||!e)return!1;for(var n=0;n<t.length;n++)if(!(n in e))return!1;return!0}(m,o);return v?r.a.createElement("div",null,r.a.createElement("h5",null,"Success!"),r.a.createElement("p",null,"Answers submitted to"," ",r.a.createElement("a",{href:"https://".concat(i.network,".etherscan.io/tx/").concat(v)},i.network))):r.a.createElement(r.a.Fragment,null,r.a.createElement(ut,{title:s,description:c,questions:o,answers:m,setAnswers:f}),r.a.createElement("div",{className:"submit"},h?r.a.createElement("h6",null,"Submitting..."):r.a.createElement("div",null,r.a.createElement(L.a,{variant:"contained",color:"primary",onClick:function(){return x.apply(this,arguments)},disabled:!N},"Submit"),r.a.createElement("p",{style:{opacity:.5,fontSize:"75%"}},"Submits to ",i.to," at ",i.network," ",i.address),j&&r.a.createElement("h5",null,"Error: ",j))))},Wt=n(465),Mt=n.n(Wt);var Gt,Kt=function(e){var t=e.form,n=e.submissions,a=t.title,s=t.questions;if(!t||!n)return null;var c=function(e){return Object.keys(e.reduce(function(e,t){var n=t.user;return Object(k.a)({},e,Object(S.a)({},n,!0))},{}))}(n),o=function(e){var t=e.length,n=[];return e.forEach(function(e){e.answers.forEach(function(e,t){n[t]||(n[t]=[]);var a=e.answerIndex;n[t][a]=n[t][a]?n[t][a]+1:1})}),n.map(function(e){return e.map(function(e){return Math.round(100*e/t)})})}(n),i=n.length,u=c.length;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"title"},a)),r.a.createElement("div",{className:"stats"},r.a.createElement("div",{className:"name"},"Total responses"),r.a.createElement("div",{className:"name"},"Unique responses"),r.a.createElement("div",{className:"stat"},i),r.a.createElement("div",{className:"stat"},u)),r.a.createElement("details",{className:"address-list"},r.a.createElement("summary",null,"Unique addresses list"),c.map(function(e){return r.a.createElement("div",{key:e},e)})),r.a.createElement("h3",null,"Results"),s.map(function(e,t){var n=e.text,a=e.options;return r.a.createElement("div",{key:t,className:"form-question"},r.a.createElement("div",{className:"text"},n),r.a.createElement("div",{className:"answers"},a.map(function(e,n){var a=((o[t]||[])[n]||0)+"%";return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("div",{className:"option"},r.a.createElement(Mt.a,null),r.a.createElement("span",null,e)),r.a.createElement("div",{className:"progress"},r.a.createElement("div",{className:"progress-bar",role:"progressbar",style:{width:a}},a)))})))}))},Qt=n(466),Jt=n.n(Qt),Yt=(n(1268),function(){return r.a.createElement("div",{className:"loading"},r.a.createElement("div",{className:"text"},"Loading..."),r.a.createElement(Jt.a,null))});n(1270);var Zt=function(e){var t=e.match.params,n=t.hash,s=t.showResults,c=Object(a.useState)(null),o=Object(R.a)(c,2),i=o[0],u=o[1],l=Object(a.useState)(null),m=Object(R.a)(l,2),f=m[0],d=m[1],p=Object(a.useState)(!0),v=Object(R.a)(p,2),A=v[0],E=v[1],b=Object(a.useState)(""),h=Object(R.a)(b,2),O=h[0],g=h[1];return Object(a.useEffect)(function(){function e(){return(e=Object(ee.a)($.a.mark(function e(){var t;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,E(!0),e.next=4,St(n);case 4:t=e.sent,u(t),console.log("Fetched form for ".concat(n),t),D(n,t),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),g(e.t0.message),console.error("\xc8rror fetching form: ".concat(e.t0.stack));case 14:return e.prev=14,E(!1),e.finish(14);case 17:case"end":return e.stop()}},e,null,[[0,10,14,17]])}))).apply(this,arguments)}n&&function(){e.apply(this,arguments)}()},[n]),Object(a.useEffect)(function(){function e(){return(e=Object(ee.a)($.a.mark(function e(){var t;return $.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,E(!0),e.next=4,Dt({network:i.submit.network,address:i.submit.address,questions:i.questions});case 4:t=e.sent,d(t),console.log("Fetched submissions for ".concat(n),t),Gt=n,e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),g(e.t0.message),console.error("\xc8rror fetching submissions: ".concat(e.t0.stack));case 14:return e.prev=14,E(!1),e.finish(14);case 17:case"end":return e.stop()}},e,null,[[0,10,14,17]])}))).apply(this,arguments)}i&&s&&Gt!==n&&function(){e.apply(this,arguments)}()},[s,i]),r.a.createElement("div",{className:"site-width main-section"},r.a.createElement(Ce,{id:"form"},A?r.a.createElement(Yt,null):i?s?r.a.createElement(Kt,{form:i,submissions:f}):r.a.createElement(Lt,{form:i,hash:n}):r.a.createElement("h5",null,"No form"),i&&(s?r.a.createElement(w,{to:"/".concat(n)},r.a.createElement(L.a,null,"Back to form")):r.a.createElement(w,{to:"/".concat(n,"/results")},r.a.createElement(L.a,null,"See Results"))),O&&r.a.createElement("h5",null,"Error: ",O)))},_t=new b.a("https://rinkeby.infura.io");window.web3=_t,console.log("Version: 1552176415442");var $t=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={title:null,questions:null},e}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,null),r.a.createElement(P,null),r.a.createElement(v.a,null,r.a.createElement(A.a,{path:"/",exact:!0,component:Z}),r.a.createElement(A.a,{path:"/create/:publish?",component:Ot}),r.a.createElement(A.a,{path:"/:hash/:showResults?",component:Zt}),r.a.createElement(A.a,{render:function(){return r.a.createElement("h1",null,"404 Route not found")}})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(o.a,null,r.a.createElement($t,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},170:function(e){e.exports=[{constant:!1,inputs:[{name:"surveyId",type:"bytes32"},{name:"_answers",type:"bytes32"}],name:"submit",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,name:"surveyId",type:"bytes32"},{indexed:!1,name:"user",type:"address"},{indexed:!1,name:"answers",type:"bytes32"}],name:"Submission",type:"event"}]},413:function(e,t){},442:function(e,t){e.exports="data:image/png;base64,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"},472:function(e,t,n){e.exports=n(1273)},477:function(e,t,n){},521:function(e,t){},523:function(e,t){},554:function(e,t){},555:function(e,t){},641:function(e,t,n){},709:function(e,t,n){},817:function(e,t,n){},840:function(e,t){},842:function(e,t){},853:function(e,t){},855:function(e,t){},883:function(e,t){},884:function(e,t){},898:function(e,t){},900:function(e,t){},926:function(e,t){}},[[472,1,2]]]);
//# sourceMappingURL=main.ec25bfcd.chunk.js.map