(function(t){function e(e){for(var r,c,o=e[0],i=e[1],l=e[2],u=0,h=[];u<o.length;u++)c=o[u],Object.prototype.hasOwnProperty.call(s,c)&&s[c]&&h.push(s[c][0]),s[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);d&&d(e);while(h.length)h.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,o=1;o<a.length;o++){var i=a[o];0!==s[i]&&(r=!1)}r&&(n.splice(e--,1),t=c(c.s=a[0]))}return t}var r={},s={app:0},n=[];function c(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=t,c.c=r,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(a,r,function(e){return t[e]}.bind(null,r));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=i;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"034f":function(t,e,a){"use strict";var r=a("85ec"),s=a.n(r);s.a},"22d6":function(t,e,a){"use strict";var r=a("f296"),s=a.n(r);s.a},"5d39":function(t,e,a){"use strict";var r=a("f1bd"),s=a.n(r);s.a},"85ec":function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);var r=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[t._m(0),a("router-view")],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",{staticClass:"header"},[a("h1",[t._v("The Rick and Morty API")])])}],c={name:"App"},o=c,i=(a("034f"),a("2877")),l=Object(i["a"])(o,s,n,!1,null,null,null),d=l.exports,u=a("9483");Object(u["a"])("/service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});var h=a("8c4f"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.pageLoading?a("div",{staticClass:"m-5"},[a("b-spinner",{staticClass:"m-5",attrs:{label:"Busy"}})],1):t._e(),t.pageLoading?t._e():a("div",[a("b-list-group",{staticClass:"align-items-center"},t._l(t.locations,(function(e,r){return a("b-list-group-item",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-lg",modifiers:{"modal-lg":!0}}],key:r,staticClass:"d-flex align-items-center minWidth list-item",on:{click:function(e){return t.changeState(r)}}},[a("span",{staticClass:"ml-auto mr-auto list-name"},[t._v(t._s(e.name))])])})),1),t.showModal?a("b-modal",{attrs:{id:"modal-lg",size:"lg",title:t.modalTitle,"ok-only":""}},[a("div",[a("b-card-group",{attrs:{columns:""}},[a("transition-group",{attrs:{name:"list","enter-active-class":"animated bounceInUp","leave-active-class":"animated bounceOutDown"}},t._l(t.residents,(function(e,r){return a("b-card",{key:r,staticClass:"mb-2 character-card shadow",class:["Dead"===e.status?"dead":"Alive"===e.status?"alive":""],staticStyle:{"max-width":"20rem"},attrs:{"img-src":e.image,"img-alt":"Image","img-top":"",tag:"article"}},[a("b-card-title",{staticClass:"text-truncate"},[a("a",{attrs:{href:"#/character/"+e.id}},[t._v(" "+t._s(e.name)+" ")])]),a("b-card-text",[a("p",{staticClass:"m-0 text-warning"},[t._v(t._s(e.species))]),a("p",{staticClass:"m-0 text-bold",class:["Dead"===e.status?"text-danger":"Alive"===e.status?"text-success":"text-secondary"]},[t._v(" "+t._s(e.status)+" ")]),a("p",{staticClass:"text-truncate m-0",staticStyle:{"min-height":"24px"}},[t._v(" "+t._s(e.type?e.type:" ")+" ")])])],1)})),1)],1)],1)]):t._e()],1)])},m=[];const g="rickyMortyLocationsdb",b="rickyMortyCharacterdb",f=1;var v={name:"Locations",data(){return{db:null,db2:null,locations:null,residentsDB:[],charactersDB:[],showModal:!1,residents:[],pageLoading:!0,modalTitle:null}},async created(){if(this.db=await this.getDb(),this.locations=await this.getLocationsFromDb(),this.locations.length)this.locations=this.locations[0],this.pageLoading=!1;else{const t=await this.$http.get("https://rickandmortyapi.com/api/location/");this.locations=t.data.results,await this.addLocationsToDb(this.locations),this.pageLoading=!1}},methods:{async addLocationsToDb(t){return new Promise((e,a)=>{const r=this.db.transaction(["locations"],"readwrite");r.oncomplete=t=>{e(t)};const s=r.objectStore("locations");s.add(t)})},async getDb(){return new Promise((t,e)=>{const a=window.indexedDB.open(g,f);a.onerror=t=>{e("Error")},a.onsuccess=e=>{t(e.target.result)},a.onupgradeneeded=t=>{const e=t.target.result;e.createObjectStore("locations",{autoIncrement:!0,keyPath:"id"})}})},async getDb2(){return new Promise((t,e)=>{const a=window.indexedDB.open(b,f);a.onerror=t=>{e("Error")},a.onsuccess=e=>{t(e.target.result)},a.onupgradeneeded=t=>{const e=t.target.result;e.createObjectStore("character",{autoIncrement:!0,keyPath:"id"})}})},async getLocationsFromDb(){return new Promise((t,e)=>{const a=this.db.transaction(["locations"],"readonly"),r=[];a.oncomplete=e=>{t(r)};const s=a.objectStore("locations");s.openCursor().onsuccess=t=>{const e=t.target.result;e&&(r.push(e.value),e.continue())}})},async getCharacterFromDb(){return new Promise((t,e)=>{const a=this.db2.transaction(["character"],"readonly"),r=[];a.oncomplete=e=>{t(r)};const s=a.objectStore("character");s.openCursor().onsuccess=t=>{const e=t.target.result;e&&(r.push(e.value),e.continue())}})},async changeState(t){this.showModal=!0,this.residents=[],this.modalTitle=this.locations[t].name,this.db2=await this.getDb2(),this.charactersDB=await this.getCharacterFromDb(),this.locations[t].residents.forEach(t=>{this.character=this.charactersDB.filter(e=>e.url===t)[0],this.character?this.residents.push(this.character):this.$http.get(t).then(async t=>{const e=await t.data;this.residents.push(e),await this.addCharacterToDb(e)})})},async addCharacterToDb(t){return new Promise((e,a)=>{const r=this.db2.transaction(["character"],"readwrite");r.oncomplete=t=>{e(t)};const s=r.objectStore("character");s.add(t)})}}},y=v,w=(a("22d6"),Object(i["a"])(y,p,m,!1,null,"4723ddb4",null)),_=w.exports,x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.pageLoading?a("div",{staticClass:"m-5"},[a("b-spinner",{staticClass:"m-5",attrs:{label:"Busy"}})],1):t._e(),t.pageLoading?t._e():a("b-card",{staticClass:"mx-auto shadow-lg  character",staticStyle:{"max-width":"25rem"},attrs:{"img-src":t.character.image,"img-alt":"Image","img-top":"",tag:"article"}},[a("b-card-title",{staticClass:"text-truncate"},[t._v(" "+t._s(t.character.name))]),a("b-card-text",[a("p",{staticClass:"m-0 text-warning"},[t._v(t._s(t.character.species))]),a("p",{staticClass:"m-0 text-bold",class:["Dead"===t.character.status?"text-danger":"Alive"===t.character.status?"text-success":"text-secondary"]},[t._v(" "+t._s(t.character.status)+" ")]),a("p",{staticClass:"text-truncate m-0",staticStyle:{"min-height":"24px"}},[t._v(" "+t._s(t.character.type?t.character.type:" ")+" ")])])],1)],1)},C=[];const D="rickyMortyCharacterdb",j=1;var k={name:"Character",data(){return{db:null,character:null,id:this.$route.params.id,pageLoading:!0,charactersDB:[]}},async created(){if(this.db=await this.getDb(),this.charactersDB=await this.getCharacterFromDb(),this.character=this.charactersDB.filter(t=>t.id===parseInt(this.id))[0],this.character)this.pageLoading=!1;else{const t=await this.$http.get("https://rickandmortyapi.com/api/character/"+this.id);await this.addCharacterToDb(t.data),this.pageLoading=!1,this.character=t.data}},methods:{async addCharacterToDb(t){return new Promise((e,a)=>{const r=this.db.transaction(["character"],"readwrite");r.oncomplete=t=>{e(t)};const s=r.objectStore("character");s.add(t)})},async getDb(){return new Promise((t,e)=>{const a=window.indexedDB.open(D,j);a.onerror=t=>{e("Error")},a.onsuccess=e=>{t(e.target.result)},a.onupgradeneeded=t=>{const e=t.target.result;e.createObjectStore("character",{autoIncrement:!0,keyPath:"id"})}})},async getCharacterFromDb(){return new Promise((t,e)=>{const a=this.db.transaction(["character"],"readonly"),r=[];a.oncomplete=e=>{t(r)};const s=a.objectStore("character");s.openCursor().onsuccess=t=>{const e=t.target.result;e&&(r.push(e.value),e.continue())}})}}},S=k,O=(a("5d39"),Object(i["a"])(S,x,C,!1,null,"33dece82",null)),P=O.exports;r["default"].use(h["a"]);var L=[{path:"/",name:"locations",component:_},{path:"/character/:id",name:"character",component:P}],B=new h["a"]({routes:L}),T=B,M=a("5f5b"),E=a("b1e0"),$=(a("f9e3"),a("2dd8"),a("691a")),A=a("bc3a"),F=a.n(A),I=a("a7fe"),N=a.n(I);r["default"].use(M["a"]),r["default"].use(E["a"]),r["default"].use(N.a,F.a.create({adapter:Object($["a"])(F.a.defaults.adapter)})),r["default"].config.productionTip=!1,new r["default"]({router:T,render:function(t){return t(d)}}).$mount("#app")},f1bd:function(t,e,a){},f296:function(t,e,a){}});
//# sourceMappingURL=app.c71dc2f1.js.map