(self.webpackChunkblackbox=self.webpackChunkblackbox||[]).push([[757],{8757:(t,e,o)=>{"use strict";o.r(e),o.d(e,{LandingModule:()=>vt});var s=o(1116),r=o(1462),i=o(8366),n=o(8619),a=o(2290),l=o(3022),c=o(2250),u=o(7719),p=o(2693);const d="http://"+window.location.host+"/api/auth/",g={headers:new p.WM({"Content-Type":"application/json"})};let m=(()=>{class t{constructor(t){this.http=t}login(t,e){return this.http.post(d+"signin",{contact:t,password:e},g)}loginUsingOTP(t,e){return this.http.post(d+"signin",{contact:t,otp:e},g)}sendOTP(t){return this.http.post(d+"send-otp",{contact:t},g)}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(p.eN))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var h=o(322),Z=o(6726),f=o(6239),v=o(9892),b=o(3454),T=o(1956);function w(t,e){if(1&t&&n._uU(0),2&t){const t=n.oxw();n.hij(" ",t.otpLogin?"Login / Signup":"Login"," ")}}function q(t,e){1&t&&(n.TgZ(0,"span",18),n._uU(1,"*Enter both email/contact and password"),n.qZA())}function A(t,e){1&t&&(n.TgZ(0,"span",18),n._uU(1,"Wrong credentials. Please try again!"),n.qZA())}function C(t,e){if(1&t&&n.YNc(0,A,2,0,"span",19),2&t){const t=n.oxw(2);n.Q6J("ngIf",t.loginFormSubmitted&&!t.loginFormControls.password.errors&&t.invalidLogin)}}function F(t,e){if(1&t){const t=n.EpF();n.TgZ(0,"div",3),n.TgZ(1,"form",6),n.NdJ("submit",function(){n.CHM(t);const e=n.oxw();return e.submitLoginForm(e.loginForm.value)}),n.TgZ(2,"div",7),n.TgZ(3,"span",8),n._UZ(4,"input",9),n.TgZ(5,"label",10),n._uU(6,"E-mail / Contact"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(7,"div",7),n.TgZ(8,"span",8),n._UZ(9,"input",11),n.TgZ(10,"label",12),n._uU(11,"Password"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(12,"div",13),n.YNc(13,q,2,0,"span",14),n.YNc(14,C,1,1,"ng-template",null,15,n.W1O),n.qZA(),n.TgZ(16,"div",16),n._UZ(17,"button",17),n.qZA(),n.qZA(),n.qZA()}if(2&t){const t=n.MAs(15),e=n.oxw();n.xp6(1),n.Q6J("formGroup",e.loginForm),n.xp6(12),n.Q6J("ngIf",e.loginFormSubmitted&&(e.loginFormControls.contact.errors&&e.loginFormControls.contact.errors.required||e.loginFormControls.password.errors&&e.loginFormControls.password.errors.required))("ngIfElse",t)}}function x(t,e){if(1&t&&(n.TgZ(0,"div",29),n._uU(1),n.qZA()),2&t){const t=n.oxw(4);n.xp6(1),n.hij("Resend OTP in ",t.resendSecCount," seconds.")}}function S(t,e){1&t&&(n.TgZ(0,"p-messages",27),n.YNc(1,x,2,1,"ng-template",28),n.qZA())}function U(t,e){if(1&t){const t=n.EpF();n.TgZ(0,"a",30),n.NdJ("click",function(){n.CHM(t);const e=n.oxw(3);return e.resendOTP(e.otpForm.value)}),n._uU(1,"Resend OTP"),n.qZA()}}function y(t,e){if(1&t&&(n.TgZ(0,"div",24),n.YNc(1,S,2,0,"p-messages",25),n.YNc(2,U,2,0,"a",26),n.qZA()),2&t){const t=n.oxw(2);n.xp6(1),n.Q6J("ngIf",!t.showResend),n.xp6(1),n.Q6J("ngIf",t.showResend)}}function _(t,e){1&t&&(n.TgZ(0,"span",18),n._uU(1,"*Enter both contact and OTP"),n.qZA())}function k(t,e){1&t&&(n.TgZ(0,"span",18),n._uU(1,"Wrong OTP . Please try again!!"),n.qZA())}function I(t,e){if(1&t&&n.YNc(0,k,2,0,"span",19),2&t){const t=n.oxw(2);n.Q6J("ngIf",t.otpFormSubmitted&&!t.otpFormControls.otp.errors&&t.invalidOtp)}}function P(t,e){if(1&t){const t=n.EpF();n.TgZ(0,"div",3),n.TgZ(1,"form",6),n.NdJ("submit",function(){n.CHM(t);const e=n.oxw();return e.submitOtpForm(e.otpForm.value)}),n.TgZ(2,"div",7),n.TgZ(3,"span",8),n._UZ(4,"input",9),n.TgZ(5,"label",10),n._uU(6,"Contact"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(7,"div",7),n.TgZ(8,"span",8),n._UZ(9,"p-inputMask",20),n.TgZ(10,"label",21),n._uU(11,"OTP"),n.qZA(),n.qZA(),n.qZA(),n.YNc(12,y,3,2,"div",22),n.TgZ(13,"div",13),n.YNc(14,_,2,0,"span",14),n.YNc(15,I,1,1,"ng-template",null,15,n.W1O),n.qZA(),n.TgZ(17,"div",16),n._UZ(18,"button",23),n.qZA(),n.qZA(),n.qZA()}if(2&t){const t=n.MAs(16),e=n.oxw();n.xp6(1),n.Q6J("formGroup",e.otpForm),n.xp6(8),n.Q6J("disabled",!e.otpSent),n.xp6(3),n.Q6J("ngIf",e.otpSent),n.xp6(2),n.Q6J("ngIf",e.otpFormSubmitted&&(e.otpFormControls.contact.errors&&e.otpFormControls.contact.errors.required||e.otpFormControls.password.errors&&e.otpFormControls.password.errors.required))("ngIfElse",t),n.xp6(4),n.s9C("label",e.otpSent?"Submit":"Send OTP")}}let N=(()=>{class t{constructor(t,e,o,s){this.fb=t,this.authService=e,this.router=o,this.tokenService=s,this.showLoginDialog=!1,this.otpLogin=!1,this.otpSent=!1,this.showResend=!1,this.resendSecCount=30,this.invalidLogin=!1,this.invalidOtp=!1,this.otpFormSubmitted=!1,this.loginFormSubmitted=!1}ngOnInit(){this.loginForm=this.fb.group({contact:["",r.kI.required],password:["",r.kI.required]}),this.otpForm=this.fb.group({contact:["",r.kI.required],otp:[""]})}openLoginDialog(){this.loginForm.reset(),this.otpForm.reset(),this.otpFormSubmitted=!1,this.loginFormSubmitted=!1,this.otpLogin=!1,this.showLoginDialog=!0}submitLoginForm(t){Object.keys(this.loginFormControls).forEach(t=>{this.loginFormControls[t].markAsDirty()}),this.loginFormSubmitted=!0,this.loginForm.valid&&this.authService.login(t.contact,t.password).subscribe(t=>{if(t.accessToken){this.tokenService.saveToken(t.accessToken),this.tokenService.saveUser(t);let e=this.tokenService.getUser().role;console.log("role",e),"ROLE_ADMIN"==e?this.router.navigate(["/admin"]):"ROLE_SI"==e?this.router.navigate(["/si"]):"ROLE_USER"==e&&this.router.navigate(["/user"])}else this.invalidLogin=!0},t=>{this.invalidLogin=!0})}submitOtpForm(t){Object.keys(this.otpFormControls).forEach(t=>{this.otpFormControls[t].markAsDirty()}),this.otpFormSubmitted=!0,this.otpForm.valid&&(this.otpSent?this.authService.loginUsingOTP(t.contact,t.otp.split("-").join("")).subscribe(t=>{if(t.accessToken){this.tokenService.saveToken(t.accessToken),this.tokenService.saveUser(t);let e=this.tokenService.getUser().role;console.log("role",e),"ROLE_ADMIN"==e?this.router.navigate(["/admin"]):"ROLE_SI"==e?this.router.navigate(["/si"]):"ROLE_USER"==e&&this.router.navigate(["/user"])}else this.invalidOtp=!0},t=>{this.invalidOtp=!0}):this.authService.sendOTP(t.contact).subscribe(t=>{console.log("rrrr",t),"success"==t.status&&(this.otpSent=!0,this.otpFormSubmitted=!1,this.otpFormControls.otp.setValidators([r.kI.required]),this.otpFormControls.otp.updateValueAndValidity(),this.startResendOtpTimer())}))}startResendOtpTimer(){this.showResend=!1,this.resendSecCount=30;var t=setInterval(()=>{this.resendSecCount--},1e3);setTimeout(()=>{clearInterval(t),this.showResend=!0},3e4)}resendOTP(t){this.authService.sendOTP(t.contact).subscribe(t=>{console.log("rrrr",t),"success"==t.status&&this.startResendOtpTimer()})}get loginFormControls(){return this.loginForm.controls}get otpFormControls(){return this.otpForm.controls}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.qu),n.Y36(m),n.Y36(i.F0),n.Y36(l.B))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-login-signup"]],features:[n._Bn([a.ez])],decls:8,vars:4,consts:[[1,"login-modal",3,"visible","visibleChange"],["pTemplate","header"],["class","p-grid",4,"ngIf"],[1,"p-grid"],[1,"p-col","p-text-center"],["type","button","pButton","","pRipple","",1,"gradient-btn","p-mt-2",3,"label","click"],[2,"width","100%","margin-top","25px",3,"formGroup","submit"],[1,"p-field","p-d-inline-block","p-col-12","p-md-12"],[1,"p-float-label"],["type","text","id","contact","pInputText","","formControlName","contact"],["for","contact",1,"required"],["type","password","id","password","pInputText","","formControlName","password"],["for","password",1,"required"],[1,"p-col-12","p-md-6","p-d-inline-block"],["class","p-error",4,"ngIf","ngIfElse"],["else2",""],[1,"p-col-12","p-md-6","p-d-inline-block","p-text-right"],["pButton","","pRipple","","label","Login","type","submit",1,"gradient-btn"],[1,"p-error"],["class","p-error",4,"ngIf"],["id","otp","mask","9-9-9-9","formControlName","otp",3,"disabled"],["for","otp",1,"required"],["class","p-col-12",4,"ngIf"],["pButton","","pRipple","","type","submit",1,"gradient-btn",3,"label"],[1,"p-col-12"],["severity","info",4,"ngIf"],["href","javascript:;","style","color: #fff;",3,"click",4,"ngIf"],["severity","info"],["pTemplate",""],[1,"p-ml-2"],["href","javascript:;",2,"color","#fff",3,"click"]],template:function(t,e){1&t&&(n.TgZ(0,"p-dialog",0),n.NdJ("visibleChange",function(t){return e.showLoginDialog=t}),n.YNc(1,w,1,1,"ng-template",1),n.YNc(2,F,18,3,"div",2),n.YNc(3,P,19,6,"div",2),n._UZ(4,"hr"),n.TgZ(5,"div",3),n.TgZ(6,"div",4),n.TgZ(7,"button",5),n.NdJ("click",function(){return e.otpLogin=!e.otpLogin}),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&t&&(n.Q6J("visible",e.showLoginDialog),n.xp6(2),n.Q6J("ngIf",!e.otpLogin),n.xp6(1),n.Q6J("ngIf",e.otpLogin),n.xp6(4),n.s9C("label",e.otpLogin?"Login using password":"Login / Signup using OTP"))},directives:[h.V,a.jx,s.O5,Z.Hq,f.H,r._Y,r.JL,r.sg,r.Fj,v.o,r.JJ,r.u,b.vy,T.V],styles:[""]}),t})();var O=o(1146),E=o(4568);const J=["loginSignup"];function R(t,e){1&t&&n._UZ(0,"img",4)}function Y(t,e){1&t&&n._uU(0," Profile Details ")}function L(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"*Enter all the required fields"),n.qZA())}function M(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"Email is already in use. Please try another!"),n.qZA())}function D(t,e){if(1&t&&n.YNc(0,M,2,0,"span",39),2&t){const t=n.oxw(2);n.Q6J("ngIf",t.profileFormSubmitted&&t.profileFormControls.email.errors&&t.profileFormControls.email.errors.exists)}}const B=function(){return{width:"50vw"}};function Q(t,e){if(1&t){const t=n.EpF();n.TgZ(0,"p-dialog",5),n.NdJ("visibleChange",function(e){return n.CHM(t),n.oxw().showProfileDialog=e}),n.YNc(1,Y,1,0,"ng-template",6),n.TgZ(2,"div",7),n.TgZ(3,"form",8),n.NdJ("submit",function(){n.CHM(t);const e=n.oxw();return e.submitProfileForm(e.profileForm.value)}),n.TgZ(4,"div",9),n.TgZ(5,"span",10),n._UZ(6,"input",11),n.TgZ(7,"label",12),n._uU(8,"First Name"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(9,"div",9),n.TgZ(10,"span",10),n._UZ(11,"input",13),n.TgZ(12,"label",14),n._uU(13,"Last Name"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(14,"div",9),n.TgZ(15,"span",10),n._UZ(16,"input",15),n.TgZ(17,"label",16),n._uU(18,"Contact"),n.qZA(),n.TgZ(19,"button",17),n.NdJ("click",function(){return n.CHM(t),n.oxw().editContact()}),n.qZA(),n.qZA(),n.qZA(),n.TgZ(20,"div",9),n.TgZ(21,"span",10),n._UZ(22,"input",18),n.TgZ(23,"label",19),n._uU(24,"E-mail"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(25,"div",20),n.TgZ(26,"span",10),n._UZ(27,"input",21),n.TgZ(28,"label",22),n._uU(29,"Address"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(30,"div",23),n.TgZ(31,"span",10),n._UZ(32,"input",24),n.TgZ(33,"label",25),n._uU(34,"City"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(35,"div",23),n.TgZ(36,"span",10),n._UZ(37,"p-dropdown",26),n.TgZ(38,"label",27),n._uU(39,"State"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(40,"div",23),n.TgZ(41,"span",10),n._UZ(42,"input",28),n.TgZ(43,"label",29),n._uU(44,"Pincode"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(45,"div",30),n.YNc(46,L,2,0,"span",31),n.YNc(47,D,1,1,"ng-template",null,32,n.W1O),n.qZA(),n.TgZ(49,"div",33),n.TgZ(50,"button",34),n.NdJ("click",function(){return n.CHM(t),n.oxw().changePassword()}),n.qZA(),n.qZA(),n.TgZ(51,"div",35),n.TgZ(52,"button",36),n.NdJ("click",function(){return n.CHM(t),n.oxw().showProfileDialog=!1}),n.qZA(),n._UZ(53,"button",37),n.qZA(),n.qZA(),n.qZA(),n.qZA()}if(2&t){const t=n.MAs(48),e=n.oxw();n.Akn(n.DdM(10,B)),n.Q6J("visible",e.showProfileDialog)("modal",!0),n.xp6(3),n.Q6J("formGroup",e.profileForm),n.xp6(13),n.Q6J("readOnly",!0),n.xp6(21),n.Q6J("autoDisplayFirst",!1)("options",e.states),n.xp6(9),n.Q6J("ngIf",e.profileFormSubmitted&&(e.profileFormControls.address.errors&&e.profileFormControls.address.errors.required||e.profileFormControls.fname.errors&&e.profileFormControls.fname.errors.required||e.profileFormControls.lname.errors&&e.profileFormControls.lname.errors.required||e.profileFormControls.contact.errors&&e.profileFormControls.contact.errors.required||e.profileFormControls.email.errors&&e.profileFormControls.email.errors.required||e.profileFormControls.city.errors&&e.profileFormControls.city.errors.required||e.profileFormControls.state.errors&&e.profileFormControls.state.errors.required||e.profileFormControls.pincode.errors&&e.profileFormControls.pincode.errors.required))("ngIfElse",t)}}function z(t,e){1&t&&n._uU(0," Change Password ")}function H(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"*Enter all the required fields"),n.qZA())}function j(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"Wrong current password!"),n.qZA())}function V(t,e){if(1&t&&n.YNc(0,j,2,0,"span",31),2&t){n.oxw();const t=n.MAs(24),e=n.oxw();n.Q6J("ngIf",e.passwordFormSubmitted&&e.passwordFormControls.currPassword.errors&&e.passwordFormControls.currPassword.errors.mustMatch)("ngIfElse",t)}}function W(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"New password & Confirm new password do not match!"),n.qZA())}function G(t,e){if(1&t&&n.YNc(0,W,2,0,"span",39),2&t){const t=n.oxw(2);n.Q6J("ngIf",t.passwordFormSubmitted&&t.passwordFormControls.confirmNewPassword.errors&&t.passwordFormControls.confirmNewPassword.errors.mustMatch)}}const X=function(){return{width:"45vw"}};function K(t,e){if(1&t){const t=n.EpF();n.TgZ(0,"p-dialog",5),n.NdJ("visibleChange",function(e){return n.CHM(t),n.oxw().showPasswordDialog=e}),n.YNc(1,z,1,0,"ng-template",6),n.TgZ(2,"div",7),n.TgZ(3,"form",8),n.NdJ("submit",function(){n.CHM(t);const e=n.oxw();return e.submitPasswordForm(e.passwordForm.value)}),n.TgZ(4,"div",20),n.TgZ(5,"span",10),n._UZ(6,"input",40),n.TgZ(7,"label",41),n._uU(8,"Current Password"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(9,"div",20),n.TgZ(10,"span",10),n._UZ(11,"input",42),n.TgZ(12,"label",43),n._uU(13,"New Password"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(14,"div",20),n.TgZ(15,"span",10),n._UZ(16,"input",44),n.TgZ(17,"label",45),n._uU(18,"Confirm New Password"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(19,"div",33),n.YNc(20,H,2,0,"span",31),n.YNc(21,V,1,2,"ng-template",null,46,n.W1O),n.YNc(23,G,1,1,"ng-template",null,47,n.W1O),n.qZA(),n.TgZ(25,"div",35),n.TgZ(26,"button",36),n.NdJ("click",function(){return n.CHM(t),n.oxw().showPasswordDialog=!1}),n.qZA(),n._UZ(27,"button",37),n.qZA(),n.qZA(),n.qZA(),n.qZA()}if(2&t){const t=n.MAs(22),e=n.oxw();n.Akn(n.DdM(7,X)),n.Q6J("visible",e.showPasswordDialog)("modal",!0),n.xp6(3),n.Q6J("formGroup",e.passwordForm),n.xp6(17),n.Q6J("ngIf",e.passwordFormSubmitted&&(e.passwordFormControls.currPassword.errors&&e.passwordFormControls.currPassword.errors.required||e.passwordFormControls.newPassword.errors&&e.passwordFormControls.newPassword.errors.required||e.passwordFormControls.confirmNewPassword.errors&&e.passwordFormControls.confirmNewPassword.errors.required))("ngIfElse",t)}}function $(t,e){1&t&&n._uU(0," Change Contact ")}function tt(t,e){if(1&t&&(n.TgZ(0,"div",60),n._uU(1),n.qZA()),2&t){const t=n.oxw(4);n.xp6(1),n.hij("Resend OTP in ",t.resendSecCount," seconds.")}}function et(t,e){1&t&&(n.TgZ(0,"p-messages",58),n.YNc(1,tt,2,1,"ng-template",59),n.qZA())}function ot(t,e){if(1&t){const t=n.EpF();n.TgZ(0,"a",61),n.NdJ("click",function(){n.CHM(t);const e=n.oxw(3);return e.resendOTP(e.contactForm.value)}),n._uU(1,"Resend OTP"),n.qZA()}}function st(t,e){if(1&t&&(n.TgZ(0,"div",55),n.YNc(1,et,2,0,"p-messages",56),n.YNc(2,ot,2,0,"a",57),n.qZA()),2&t){const t=n.oxw(2);n.xp6(1),n.Q6J("ngIf",!t.showResend),n.xp6(1),n.Q6J("ngIf",t.showResend)}}function rt(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"*Enter all the required fields"),n.qZA())}function it(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"Contact number already in use. Please try another!"),n.qZA())}function nt(t,e){if(1&t&&n.YNc(0,it,2,0,"span",31),2&t){n.oxw();const t=n.MAs(20),e=n.oxw();n.Q6J("ngIf",e.contactFormSubmitted&&e.contactFormControls.contact.errors&&e.contactFormControls.contact.errors.exists)("ngIfElse",t)}}function at(t,e){1&t&&(n.TgZ(0,"span",38),n._uU(1,"Wrong OTP or contact number mismatched. Please try again!"),n.qZA())}function lt(t,e){if(1&t&&n.YNc(0,at,2,0,"span",39),2&t){const t=n.oxw(2);n.Q6J("ngIf",t.contactFormSubmitted&&!t.contactFormControls.otp.errors&&t.invalidOTP)}}function ct(t,e){if(1&t){const t=n.EpF();n.TgZ(0,"p-dialog",5),n.NdJ("visibleChange",function(e){return n.CHM(t),n.oxw().showContactDialog=e}),n.YNc(1,$,1,0,"ng-template",6),n.TgZ(2,"div",7),n.TgZ(3,"form",8),n.NdJ("submit",function(){n.CHM(t);const e=n.oxw();return e.submitContactForm(e.contactForm.value)}),n.TgZ(4,"div",20),n.TgZ(5,"span",10),n._UZ(6,"input",48),n.TgZ(7,"label",16),n._uU(8,"Contact"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(9,"div",20),n.TgZ(10,"span",10),n._UZ(11,"p-inputMask",49),n.TgZ(12,"label",50),n._uU(13,"OTP"),n.qZA(),n.qZA(),n.qZA(),n.YNc(14,st,3,2,"div",51),n.TgZ(15,"div",33),n.YNc(16,rt,2,0,"span",31),n.YNc(17,nt,1,2,"ng-template",null,52,n.W1O),n.YNc(19,lt,1,1,"ng-template",null,53,n.W1O),n.qZA(),n.TgZ(21,"div",35),n.TgZ(22,"button",36),n.NdJ("click",function(){return n.CHM(t),n.oxw().showContactDialog=!1}),n.qZA(),n._UZ(23,"button",54),n.qZA(),n.qZA(),n.qZA(),n.qZA()}if(2&t){const t=n.MAs(18),e=n.oxw();n.Akn(n.DdM(10,X)),n.Q6J("visible",e.showContactDialog)("modal",!0),n.xp6(3),n.Q6J("formGroup",e.contactForm),n.xp6(8),n.Q6J("disabled",!e.otpSent),n.xp6(3),n.Q6J("ngIf",e.otpSent),n.xp6(2),n.Q6J("ngIf",e.contactFormSubmitted&&(e.contactFormControls.contact.errors&&e.contactFormControls.contact.errors.required||e.contactFormControls.otp.errors&&e.contactFormControls.otp.errors.required))("ngIfElse",t),n.xp6(7),n.s9C("label",e.otpSent?"Update":"Send OTP")}}let ut=(()=>{class t{constructor(t,e,o,s){this.tokenService=t,this.fb=e,this.userService=o,this.messageService=s,this.isLoggedIn=!1,this.profileFormSubmitted=!1,this.showProfileDialog=!1,this.states=[],this.passwordFormSubmitted=!1,this.showPasswordDialog=!1,this.contactFormSubmitted=!1,this.showContactDialog=!1,this.otpSent=!1,this.invalidOTP=!1,this.showResend=!1,this.resendSecCount=30,this.items=[],this.tokenService.getToken()&&(this.isLoggedIn=!0,this.user=this.tokenService.getUser())}ngOnInit(){this.items=[{label:"Home"},{label:"About Us"},{label:"Features"},{label:"Clients"},{label:"Contact Us"}],this.items.push(this.isLoggedIn&&this.user?{label:this.user.fname,icon:"pi pi-user",items:[{label:"Dashboard",icon:"pi pi-credit-card",routerLink:"ROLE_ADMIN"==this.user.role?"admin":"ROLE_SI"==this.user.role?"si":"ROLE_USER"==this.user.role?"user":""},{label:"Profile",icon:"pi pi-user-edit",command:this.editProfile.bind(this)},{label:"Logout",icon:"pi pi-power-off",command:this.logout.bind(this)}]}:{label:"Login",command:this.openLogin.bind(this)}),this.states=[{name:"Chhattisgarh",value:"Chhattisgarh"}],this.user&&(this.profileForm=this.fb.group({fname:[this.user.fname,r.kI.required],lname:[this.user.lname,r.kI.required],contact:[this.user.contact,r.kI.required],email:[this.user.email,r.kI.required],address:[this.user.address,r.kI.required],city:[this.user.city,r.kI.required],state:[{name:this.user.state,value:this.user.state},r.kI.required],pincode:[this.user.pincode,r.kI.required]},{validator:this.checkEmail()}),this.passwordForm=this.fb.group({currPassword:["",r.kI.required],newPassword:["",r.kI.required],confirmNewPassword:["",r.kI.required]},{validator:this.MustMatch()}),this.contactForm=this.fb.group({contact:["",r.kI.required],otp:[""]},{validator:this.checkContact()}))}openLogin(){this.loginSignup.showLoginDialog=!0}editProfile(){this.showProfileDialog=!0}submitProfileForm(t){Object.keys(this.profileFormControls).forEach(t=>{this.profileFormControls[t].markAsDirty()}),this.profileFormSubmitted=!0,this.profileForm.valid&&this.userService.updateProfile(t).subscribe(t=>{t.contact?(t.accessToken=this.tokenService.getToken(),this.tokenService.saveUser(t),this.messageService.add({severity:"success",summary:"Success",detail:"Profile updated successfully."}),this.showProfileDialog=!1):this.messageService.add({severity:"error",summary:"Error",detail:"Something went wrong. Please try again!"})})}editContact(){this.contactForm.reset(),this.contactFormSubmitted=!1,this.showContactDialog=!0}changePassword(){this.passwordForm.reset(),this.passwordFormSubmitted=!1,this.showPasswordDialog=!0}checkEmail(){return t=>{const e=t.controls.email;this.userService.checkEmailExists(e.value).subscribe(t=>{e.errors&&!e.errors.exists||e.setErrors("exists"==t.status?{exists:!0}:null)})}}MustMatch(){return t=>{const e=t.controls.newPassword,o=t.controls.confirmNewPassword,s=t.controls.currPassword;console.log("curr--\x3e ",s),console.log("new--\x3e ",e),console.log("confirm--\x3e ",s),this.userService.checkCurrPassword(s.value).subscribe(t=>{console.log("rrrr---\x3e> ",t),o.errors&&!o.errors.mustMatch||s.errors&&!s.errors.mustMatch||(o.setErrors(e.value!==o.value?{mustMatch:!0}:null),s.setErrors("match"==t.status?null:{mustMatch:!0}))})}}checkContact(){return t=>{const e=t.controls.contact;this.userService.checkContactExists(e.value).subscribe(t=>{e.errors&&!e.errors.exists||e.setErrors("exists"==t.status?{exists:!0}:null)})}}submitPasswordForm(t){Object.keys(this.passwordFormControls).forEach(t=>{this.passwordFormControls[t].markAsDirty()}),this.passwordFormSubmitted=!0,this.passwordForm.valid&&this.userService.updatePassword(t.newPassword).subscribe(t=>{"success"==t.status&&(this.messageService.add({severity:"success",summary:"Success",detail:"Password updated successfully."}),this.showPasswordDialog=!1)})}submitContactForm(t){Object.keys(this.contactFormControls).forEach(t=>{this.contactFormControls[t].markAsDirty()}),this.contactFormSubmitted=!0,this.contactForm.valid&&(this.otpSent?this.userService.updateContact(t.contact,t.otp.split("-").join("")).subscribe(e=>{e.contact?(e.accessToken=this.tokenService.getToken(),this.tokenService.saveUser(e),this.profileFormControls.contact.setValue(t.contact),this.messageService.add({severity:"success",summary:"Success",detail:"Contact updated successfully."}),this.showContactDialog=!1):this.messageService.add({severity:"error",summary:"Error",detail:"Something went wrong. Please try again!"})},t=>{this.messageService.add({severity:"error",summary:"Error",detail:"Wrong OTP or contact number mismatched. Please try again!"}),this.showContactDialog=!1}):this.userService.sendOTPForContactUpdate(t.contact).subscribe(t=>{console.log("rrrr",t),"success"==t.status&&(this.otpSent=!0,this.contactFormSubmitted=!1,this.contactFormControls.otp.setValidators([r.kI.required]),this.contactFormControls.otp.updateValueAndValidity(),this.startResendOtpTimer())}))}startResendOtpTimer(){this.showResend=!1,this.resendSecCount=30;var t=setInterval(()=>{this.resendSecCount--},1e3);setTimeout(()=>{clearInterval(t),this.showResend=!0},3e4)}resendOTP(t){this.userService.sendOTPForContactUpdate(t.contact).subscribe(t=>{console.log("rrrr",t),"success"==t.status&&this.startResendOtpTimer()})}get profileFormControls(){return this.profileForm.controls}get passwordFormControls(){return this.passwordForm.controls}get contactFormControls(){return this.contactForm.controls}logout(){this.tokenService.signOut(),window.location.reload()}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(l.B),n.Y36(r.qu),n.Y36(c.K),n.Y36(a.ez))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-header"]],viewQuery:function(t,e){if(1&t&&n.Gf(J,5),2&t){let t;n.iGM(t=n.CRH())&&(e.loginSignup=t.first)}},features:[n._Bn([a.ez])],decls:8,vars:4,consts:[[3,"model"],["pTemplate","start"],["loginSignup",""],["class","login-dialog",3,"visible","style","modal","visibleChange",4,"ngIf"],["src","assets/landing/logo.svg",1,"p-mr-2"],[1,"login-dialog",3,"visible","modal","visibleChange"],["pTemplate","header"],[1,"p-grid","p-fluid","p-pt-4"],[2,"width","100%",3,"formGroup","submit"],[1,"p-field","p-d-inline-block","p-col-12","p-md-6"],[1,"p-float-label"],["type","text","id","fname","pInputText","","formControlName","fname"],["for","fname",1,"required"],["type","text","id","lname","pInputText","","formControlName","lname"],["for","lname",1,"required"],["type","text","id","contact","pInputText","","formControlName","contact",2,"width","90%",3,"readOnly"],["for","contact",1,"required"],["pButton","","type","button","icon","pi pi-pencil","title","Edit Contact",1,"p-button-text","p-button-warning",2,"width","9%",3,"click"],["type","text","id","email","pInputText","","formControlName","email"],["for","email",1,"required"],[1,"p-field","p-d-inline-block","p-col-12","p-md-12"],["type","text","id","address","pInputText","","formControlName","address"],["for","address",1,"required"],[1,"p-field","p-d-inline-block","p-col-12","p-md-4"],["type","text","id","city","pInputText","","formControlName","city"],["for","city",1,"required"],["inputId","state","formControlName","state","optionLabel","name",3,"autoDisplayFirst","options"],["for","state",1,"required"],["type","text","id","pincode","pInputText","","formControlName","pincode"],["for","pincode",1,"required"],[1,"p-col-12","p-md-12","p-d-inline-block"],["class","p-error",4,"ngIf","ngIfElse"],["else1",""],[1,"p-col-12","p-md-6","p-d-inline-block"],["pButton","","pRipple","","label","Change Password","icon","pi pi-unlock","type","button",1,"p-button-outlined","p-button-help",2,"width","auto",3,"click"],[1,"p-col-12","p-md-6","p-text-right","p-d-inline-block"],["pButton","","pRipple","","label","Cancel","type","button",1,"p-button-outlined","p-button-secondary",2,"width","auto",3,"click"],["pButton","","pRipple","","label","Update","type","submit",1,"p-button-outlined",2,"width","auto","margin-left","15px"],[1,"p-error"],["class","p-error",4,"ngIf"],["type","text","id","currPassword","pInputText","","formControlName","currPassword"],["for","currPassword",1,"required"],["type","text","id","newPassword","pInputText","","formControlName","newPassword"],["for","newPassword",1,"required"],["type","text","id","confirmNewPassword","pInputText","","formControlName","confirmNewPassword"],["for","confirmNewPassword",1,"required"],["else2",""],["else3",""],["type","text","id","contact","pInputText","","formControlName","contact"],["id","otp","mask","9-9-9-9","formControlName","otp",3,"disabled"],["for","otp",1,"required"],["class","p-col-12",4,"ngIf"],["else4",""],["else5",""],["pButton","","pRipple","","type","submit",1,"p-button-outlined",2,"width","auto","margin-left","15px",3,"label"],[1,"p-col-12"],["severity","info",4,"ngIf"],["href","javascript:;","style","color: #fff;",3,"click",4,"ngIf"],["severity","info"],["pTemplate",""],[1,"p-ml-2"],["href","javascript:;",2,"color","#fff",3,"click"]],template:function(t,e){1&t&&(n.TgZ(0,"p-menubar",0),n.YNc(1,R,1,0,"ng-template",1),n.qZA(),n._UZ(2,"app-login-signup",null,2),n.YNc(4,Q,54,11,"p-dialog",3),n.YNc(5,K,28,8,"p-dialog",3),n.YNc(6,ct,24,11,"p-dialog",3),n._UZ(7,"p-toast")),2&t&&(n.Q6J("model",e.items),n.xp6(4),n.Q6J("ngIf",e.user),n.xp6(1),n.Q6J("ngIf",e.user),n.xp6(1),n.Q6J("ngIf",e.user))},directives:[u.nm,a.jx,N,s.O5,O.FN,h.V,r._Y,r.JL,r.sg,r.Fj,v.o,r.JJ,r.u,Z.Hq,E.Lt,f.H,b.vy,T.V],styles:[""]}),t})(),pt=(()=>{class t{constructor(t,e,o,s){this.el=t,this.ngModel=e,this.control=o,this.cd=s,this.onResize=new n.vpe}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(t){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(t){this.autoResize&&this.resize(t)}onBlur(t){this.autoResize&&this.resize(t)}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(n.SBq),n.Y36(r.On,8),n.Y36(r.a5,8),n.Y36(n.sBO))},t.\u0275dir=n.lG2({type:t,selectors:[["","pInputTextarea",""]],hostVars:10,hostBindings:function(t,e){1&t&&n.NdJ("input",function(t){return e.onInput(t)})("focus",function(t){return e.onFocus(t)})("blur",function(t){return e.onBlur(t)}),2&t&&n.ekj("p-inputtextarea",!0)("p-inputtext",!0)("p-component",!0)("p-filled",e.filled)("p-inputtextarea-resizable",e.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}}),t})(),dt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[s.ez]]}),t})();const gt=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){window.addEventListener("scroll",function(){var t,e;console.log("pos",window.pageYOffset),window.pageYOffset>100?null===(t=document.getElementById("landing-page"))||void 0===t||t.classList.add("sticky-header"):null===(e=document.getElementById("landing-page"))||void 0===e||e.classList.remove("sticky-header")},{passive:!0})}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-home"]],decls:93,vars:0,consts:[["id","landing-page",1,"landing-page"],["autoplay","","loop","","muted","",2,"width","100%"],["src","assets/landing/banner.mp4","type","video/mp4"],[1,"sections-parent"],[1,"first-section","p-grid"],[1,"p-col-12","p-md-6"],["src","assets/landing/big-dots.svg"],["src","assets/landing/shield.svg"],["src","assets/landing/circles.svg"],[1,"second-section","p-grid"],[1,"third-section","p-grid"],["src","assets/landing/big-dots.svg",1,"dotted-bg"],["src","assets/landing/house.svg",1,"house-img"],[1,"fourth-section","p-grid"],[1,"p-col-12"],["src","https://www.youtube.com/embed/kyTGIINVVow"],[1,"fifth-section","p-grid"],[1,"p-col-12","parent-box"],[1,"p-grid"],["pInputText","","name","email","type","text","placeholder","E-mail"],["pInputTextarea","","placeholder","Message"],["pButton","","pRipple","","label","Submit",1,"gradient-btn"],[1,"sixth-section","p-grid"],[1,"p-col"],["src","assets/landing/reload.svg","height","35"],["src","assets/landing/rupee.svg","height","35"],["src","assets/landing/world.svg","height","35"],[1,"footer-section","p-grid"],[1,"pi","pi-facebook","p-mr-2"],[1,"pi","pi-twitter","p-mr-2"],[1,"pi","pi-youtube"]],template:function(t,e){1&t&&(n.TgZ(0,"div",0),n._UZ(1,"app-header"),n.TgZ(2,"video",1),n._UZ(3,"source",2),n.qZA(),n.TgZ(4,"div",3),n.TgZ(5,"div",4),n.TgZ(6,"div",5),n.TgZ(7,"h1"),n._uU(8,"BlackBox Electronics"),n.qZA(),n.TgZ(9,"p"),n._uU(10,"Black Box is a leading CCTV, Smart IoT solution and service provider. Based on technological innovations, Black Box offers end-to-end Security Solutions, Systems, and Services to create values for Home, Commercial Establishment and Corporates."),n.qZA(),n.qZA(),n.TgZ(11,"div",5),n._UZ(12,"img",6),n._UZ(13,"img",7),n._UZ(14,"img",8),n.qZA(),n.qZA(),n.TgZ(15,"div",9),n._UZ(16,"img",6),n.TgZ(17,"div",5),n.TgZ(18,"h3"),n._uU(19,"Vision"),n.qZA(),n.TgZ(20,"p"),n._uU(21,"Black Box is committed to providing its highest quality solutions and products with the latest technologies to enable end users to perform their business successfully. In 2018, Black Box started its operation, since then, the company has continued to invest in building strong R&D capabilities for new technology and innovation."),n.qZA(),n.qZA(),n.TgZ(22,"div",5),n.TgZ(23,"h3"),n._uU(24,"Technology"),n.qZA(),n.TgZ(25,"p"),n._uU(26,"Our goal iss to deliver the highest quality products with Best price performance to our customers. We invest in process standardization, automation, advanced surveillance technologies and continuous improvements to enhance the quality and efficiency of our production lines."),n.qZA(),n.qZA(),n.qZA(),n.TgZ(27,"div",10),n._UZ(28,"img",11),n.TgZ(29,"div",5),n._UZ(30,"img",12),n.qZA(),n.TgZ(31,"div",5),n.TgZ(32,"h1"),n._uU(33,"Our Technology"),n.qZA(),n.TgZ(34,"h3"),n._uU(35,"Fast"),n.qZA(),n.TgZ(36,"p"),n._uU(37,"Text to be updated."),n.qZA(),n.TgZ(38,"h3"),n._uU(39,"Secure"),n.qZA(),n.TgZ(40,"p"),n._uU(41,"Text to be updated."),n.qZA(),n.TgZ(42,"h3"),n._uU(43,"Easy"),n.qZA(),n.TgZ(44,"p"),n._uU(45,"Text to be updated."),n.qZA(),n.qZA(),n.qZA(),n.TgZ(46,"div",13),n.TgZ(47,"div",14),n._UZ(48,"iframe",15),n.qZA(),n.qZA(),n.TgZ(49,"div",16),n._UZ(50,"img",6),n.TgZ(51,"div",17),n.TgZ(52,"div",18),n.TgZ(53,"div",5),n.TgZ(54,"h1"),n._uU(55,"Request a Demo"),n.qZA(),n.TgZ(56,"p"),n._uU(57,"Text to be updated."),n.qZA(),n.qZA(),n.TgZ(58,"div",5),n._UZ(59,"input",19),n._UZ(60,"textarea",20),n._UZ(61,"button",21),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(62,"div",22),n.TgZ(63,"div",23),n._UZ(64,"img",24),n.qZA(),n.TgZ(65,"div",23),n._UZ(66,"img",25),n.qZA(),n.TgZ(67,"div",23),n._UZ(68,"img",26),n.qZA(),n.qZA(),n.TgZ(69,"div",27),n.TgZ(70,"div",23),n.TgZ(71,"h5"),n._uU(72,"About Us"),n.qZA(),n.TgZ(73,"p"),n._uU(74,"Text to be updated"),n.qZA(),n.qZA(),n.TgZ(75,"div",23),n.TgZ(76,"h5"),n._uU(77,"Retail Store"),n.qZA(),n.TgZ(78,"p"),n._uU(79,"Text to be updated"),n.qZA(),n.qZA(),n.TgZ(80,"div",23),n.TgZ(81,"h5"),n._uU(82,"Contact Us"),n.qZA(),n.TgZ(83,"p"),n._uU(84,"Email"),n.qZA(),n.TgZ(85,"p"),n._uU(86,"Careers"),n.qZA(),n.TgZ(87,"h5"),n._uU(88,"Get in Touch"),n.qZA(),n.TgZ(89,"p"),n._UZ(90,"i",28),n._UZ(91,"i",29),n._UZ(92,"i",30),n.qZA(),n.qZA(),n.qZA(),n.qZA())},directives:[ut,v.o,pt,Z.Hq,f.H],styles:[""]}),t})()}];let mt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[i.Bz.forChild(gt)],i.Bz]}),t})();var ht=o(7593);o(250);let Zt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[s.ez,a.m8,ht.z,f.T],a.m8]}),t})();var ft=o(6094);let vt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[s.ez,mt,u.W6,Zt,v.j,dt,Z.hJ,h.S,b.zz,T.$,ft.O,r.UX,f.T,E.kW,O.EV]]}),t})()}}]);