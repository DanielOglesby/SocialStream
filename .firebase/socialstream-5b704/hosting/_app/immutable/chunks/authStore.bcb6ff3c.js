import{r as n,g as o,i as r,a as p,d as c,b as d,s as u,c as l,e as g,f as m,u as w,h as b}from"./index-61e5ac61.bc91c765.js";import{w as f}from"./index.6e2f1da7.js";var E="firebase",A="10.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n(E,A,"app");let i={apiKey:"AIzaSyDMyno4Ju3SmpmOZU1ouj8xn-rY8pMJmTc",authDomain:"socialstream-5b704.firebaseapp.com",projectId:"socialstream-5b704",storageBucket:"socialstream-5b704.appspot.com",messagingSenderId:"727474452664",appId:"1:727474452664:web:4b8d7ed52140f1ee625c4d"},t;o().length?(t=p(),c(t),t=r(i)):t=r(i);const e=d(t),h=f({isLoading:!0,currentUser:null}),P={login:async(a,s)=>{await u(e,a,s)},signup:async(a,s)=>{await l(e,a,s)},logout:async()=>{await g(e)},resetPassword:async a=>{if(console.log("WE ARE HERE",a),!a){console.log("inHERE");return}await m(e,a)},updateEmail:async a=>{h.update(s=>({...s,currentUser:{...s.currentUser,email:a}})),await w(e.currentUser,a)},updatePassword:async a=>{await b(e.currentUser,a)}};export{e as a,h as b,P as c};
