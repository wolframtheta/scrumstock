"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3037],{3037:(I,E,n)=>{n.r(E),n.d(E,{CheckoutPage:()=>Z});var c=n(5861),g=n(6895),s=n(433),i=n(6114),m=n(1848),d=n(5062),e=n(8256),l=n(910),C=n(849),M=n(2953),O=n(4876),A=n(7556),S=n(2e3);function T(u,P){1&u&&e._UZ(0,"ion-input",14)}function y(u,P){1&u&&(e.TgZ(0,"ion-row",15)(1,"ion-title"),e._uU(2,"El carrito esta vac\xedo"),e.qZA()())}let Z=(()=>{class u{constructor(r,t,a,o,_,p,h,D){this.cartService=r,this.storage=t,this.navController=a,this.itemService=o,this.formBuilder=_,this.logsService=p,this.authService=h,this.storeService=D,this.items=[],this.alertButtons=m.qI,this.itemsList=[],this.form=this.formBuilder.group({client:["",s.kI.required]})}ngOnInit(){this.loadPage()}loadPage(){var r=this;return(0,c.Z)(function*(){var t;r.cart=yield r.cartService.getGeneralCart(),r.selectedStore=yield r.storage.get("selectedStore"),null===(t=r.cart)||void 0===t||t.items.map(a=>{var o;return a.img=null===(o=r.items.find(_=>_.id===a.id||_.id===a.idFather))||void 0===o?void 0:o.img,a})})()}cancelSale(r){var t=this;return(0,c.Z)(function*(){r.detail.role===m.qI[1].role&&(yield t.resetCart(),t.navController.navigateRoot(`/tabs/${t.selectedStore}/sales`))})()}confirmSale(r){var t=this;return(0,c.Z)(function*(){if(r.detail.role===m.qI[1].role){var o,_,p,h;console.log(t.cart),t.itemsList=(yield t.itemService.getItemsStore(t.selectedStore)).data,null===(o=t.cart)||void 0===o||o.items.forEach(v=>{t.saleItem(v)}),t.itemsList.forEach(function(){var v=(0,c.Z)(function*(f){yield t.itemService.modifyItem(f)});return function(f){return v.apply(this,arguments)}}());const D={client:t.form.value.client,description:`Items: ${null===(_=t.cart)||void 0===_?void 0:_.items.map(v=>{var f;return`${v.name} ${null!==(f=v.size)&&void 0!==f?f:""} - ${v.quantityAdded}`}).join(", ")}`,total:null!==(p=null===(h=t.cart)||void 0===h?void 0:h.total)&&void 0!==p?p:0,type:m.Ii.SALE,store:(yield t.storeService.getStore(t.selectedStore)).data,data:t.cart};yield t.logsService.insertLog(D),yield t.resetCart(),t.navController.navigateRoot(`/tabs/${t.selectedStore}/sales`)}})()}saleItem(r){r.idFather?this.itemsList&&this.itemsList.length>0&&this.itemsList.map(t=>{var a;return t.id===r.idFather&&(null===(a=t.sizes)||void 0===a||a.map(o=>(o.id===r.id&&(o.quantity-=r.quantityAdded),o)),t.quantity-=r.quantityAdded),t}):this.itemsList.map(t=>(t.id===r.id&&(t.quantity-=r.quantityAdded),t))}resetCart(){var r=this;return(0,c.Z)(function*(){const t=r.cartService.initCart();yield r.storage.set(m.WZ,t)})()}}return u.\u0275fac=function(r){return new(r||u)(e.Y36(l.N),e.Y36(C.K),e.Y36(i.SH),e.Y36(M.e),e.Y36(s.qu),e.Y36(O.P),e.Y36(A.e),e.Y36(S.d))},u.\u0275cmp=e.Xpm({type:u,selectors:[["app-checkout"]],standalone:!0,features:[e.jDz],decls:30,vars:10,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],[3,"formGroup"],["formControlName","client","mode","md","label","Cliente","labelPlacement","floating","clearInput","true","fill","outline","placeholder","Ermen","color","primary","shape","round","type","text",4,"ngIf"],[3,"cart"],["class","flex text-center",4,"ngIf"],[1,"text-start"],[1,"text-end"],[1,"text-center"],["color","danger","expand","block","id","cancel-alert"],["color","primary","expand","block","id","confirm-alert",3,"disabled"],["trigger","cancel-alert","header","\xbfEst\xe1s seguro que quieres cancelar la venta?","message","Se vaciar\xe1 el carrito de la compra",3,"buttons","didDismiss"],["trigger","confirm-alert","header","\xbfEst\xe1s seguro que quieres confirmar la venta?","message","Se guardaran los datos en nuestro sistema",3,"buttons","didDismiss"],["formControlName","client","mode","md","label","Cliente","labelPlacement","floating","clearInput","true","fill","outline","placeholder","Ermen","color","primary","shape","round","type","text"],[1,"flex","text-center"]],template:function(r,t){1&r&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Carrito"),e.qZA(),e._UZ(4,"ion-back-button",1),e.qZA()(),e.TgZ(5,"ion-content",2)(6,"ion-grid",3)(7,"ion-row"),e.YNc(8,T,1,0,"ion-input",4),e.qZA(),e._UZ(9,"app-ticket-sale",5),e.YNc(10,y,3,0,"ion-row",6),e.qZA()(),e.TgZ(11,"ion-footer")(12,"ion-card")(13,"ion-card-header")(14,"ion-card-title")(15,"ion-grid")(16,"ion-row")(17,"ion-col",7),e._uU(18," Total "),e.qZA(),e.TgZ(19,"ion-col",8),e._uU(20),e.qZA()(),e.TgZ(21,"ion-row",9)(22,"ion-col")(23,"ion-button",10),e._uU(24," Cancelar "),e.qZA()(),e.TgZ(25,"ion-col")(26,"ion-button",11),e._uU(27," Confirmar "),e.qZA()()()()()()()(),e.TgZ(28,"ion-alert",12),e.NdJ("didDismiss",function(o){return t.cancelSale(o)}),e.qZA(),e.TgZ(29,"ion-alert",13),e.NdJ("didDismiss",function(o){return t.confirmSale(o)}),e.qZA()),2&r&&(e.Q6J("translucent",!0),e.xp6(5),e.Q6J("fullscreen",!0),e.xp6(1),e.Q6J("formGroup",t.form),e.xp6(2),e.Q6J("ngIf",null==t.cart||null==t.cart.items?null:t.cart.items.length),e.xp6(1),e.Q6J("cart",t.cart),e.xp6(1),e.Q6J("ngIf",!(null!=t.cart&&null!=t.cart.items&&t.cart.items.length)),e.xp6(10),e.hij(" ",null==t.cart?null:t.cart.total,"\u20ac "),e.xp6(6),e.Q6J("disabled",0===(null==t.cart||null==t.cart.items?null:t.cart.items.length)||t.form.invalid),e.xp6(2),e.Q6J("buttons",t.alertButtons),e.xp6(1),e.Q6J("buttons",t.alertButtons))},dependencies:[i.Pc,i.Ge,i.oU,i.YG,i.PM,i.Zi,i.Dq,i.wI,i.W2,i.fr,i.jY,i.Gu,i.pK,i.Nd,i.wd,i.sr,i.j9,i.cs,g.ez,g.O5,s.u5,s.JJ,s.JL,s.UX,s.sg,s.u,d.M]}),u})()},2953:(I,E,n)=>{n.d(E,{e:()=>m});var c=n(9808),g=n(2340),s=n(8256),i=n(529);let m=(()=>{class d{constructor(l){this.httpClient=l}getItemsStore(l){return(0,c.n)(this.httpClient.get(`${g.N.urlServer}/items/store/${l}`))}createItemStore(l,C){return(0,c.n)(this.httpClient.post(`${g.N.urlServer}/items/store/${l}`,C))}modifyItem(l){return(0,c.n)(this.httpClient.put(`${g.N.urlServer}/items/${l.id}`,{data:l}))}}return d.\u0275fac=function(l){return new(l||d)(s.LFG(i.eN))},d.\u0275prov=s.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()}}]);