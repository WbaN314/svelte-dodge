import{S as V,i as j,s as G,C as J,k as K,l as O,m as U,h as I,n as L,I as Z,b as B,P as r,L as R,D as o,E as c,F as b,f as l,t as $,N as m,Q as e,R as ii}from"./index-4c32462a.js";function F(i,a){let f;return a.x>=i.x-i.a&&a.x<i.x&&a.y>=i.y-i.a&&a.y<i.y?f="tl":a.x>i.x+i.w&&a.x<=i.x+i.w+i.a&&a.y>=i.y-i.a&&a.y<i.y?f="tr":a.x>=i.x-i.a&&a.x<i.x&&a.y>i.y+i.h&&a.y<=i.y+i.h+i.a?f="bl":a.x>i.x+i.w&&a.x<=i.x+i.w+i.a&&a.y>i.y+i.h&&a.y<=i.y+i.h+i.a?f="br":a.x>=i.x&&a.x<=i.x+i.w&&a.y>=i.y-i.a&&a.y<i.y?f="t":a.x>=i.x&&a.x<=i.x+i.w&&a.y>i.y+i.h&&a.y<=i.y+i.h+i.a?f="b":a.x>=i.x-i.a&&a.x<i.x&&a.y>=i.y&&a.y<=i.y+i.h+i.a?f="l":a.x>i.x+i.w&&a.x<=i.x+i.w+i.a&&a.y>=i.y&&a.y<=i.y+i.h+i.a?f="r":E(a,{x:i.x,y:i.y},{x:i.x+i.w,y:i.y},{x:i.x+i.w/2,y:i.y+i.h/2})?f="mt":E(a,{x:i.x+i.w,y:i.y},{x:i.x+i.w,y:i.y+i.h},{x:i.x+i.w/2,y:i.y+i.h/2})?f="mr":E(a,{x:i.x,y:i.y+i.h},{x:i.x+i.w,y:i.y+i.h},{x:i.x+i.w/2,y:i.y+i.h/2})?f="mb":E(a,{x:i.x,y:i.y},{x:i.x,y:i.y+i.h},{x:i.x+i.w/2,y:i.y+i.h/2})&&(f="ml"),f}function z(i,a,f){return Math.abs((i.x*(a.y-f.y)+a.x*(f.y-i.y)+f.x*(i.y-a.y))/2)}function E(i,a,f,h){let t=z(a,f,h),g=z(i,f,h),y=z(a,i,h),M=z(a,f,i);return Math.abs(t-(g+y+M))<.01}function S(i){let a=i.x+i.w/2,f=i.y+i.h/2;return{x:a,y:f}}function x(i,a){return(i%a+a)%a}function ai(i,a){if(a===0)return i;let f=!1;function h(...t){if(!f)return f=!0,setTimeout(()=>f=!1,a),i(...t)}return h}function fi(i,a,f){let h=a.x,t=a.y;return F(a,f)&&(i.left+i.right>a.w&&(h=x(Math.round(Math.random()*(i.left+i.right-a.w)+f.x),i.left+i.right)),i.up+i.down>a.h&&(t=x(Math.round(Math.random()*(i.up+i.down-a.h)+f.y),i.up+i.down))),{x:h,y:t}}function yi(i,a,f){let h=a.x,t=a.y,g=S(a),y=F(a,f);return i.left+i.right>0&&i.up+i.down>0?(y==="l"||y==="ml"||y==="bl"||y==="tl"?h=x(f.x+a.a+a.m,i.left+i.right):(y==="r"||y==="mr"||y==="br"||y==="tr")&&(h=x(f.x-a.w-a.a-a.m,i.left+i.right)),y==="t"||y==="mt"||y==="tl"||y==="tr"?t=x(f.y+a.a+a.m,i.up+i.down):(y==="b"||y==="mb"||y==="bl"||y==="br")&&(t=x(f.y-a.h-a.a-a.m,i.up+i.down))):i.left+i.right>a.w?f.x<=g.x?h=x(f.x+a.a+a.m,i.left+i.right):h=x(f.x-a.w-a.a-a.m,i.left+i.right):i.up+i.down>a.h&&(f.y<=g.y?t=x(f.y+a.a+a.m,i.up+i.down):t=x(f.y-a.h-a.a-a.m,i.up+i.down)),{x:h,y:t}}function ti(i,a,f){let h=a.x,t=a.y,g=S(a),y=F(a,f);return i.left+i.right>a.w&&i.up+i.down>a.h?(y==="l"||y==="ml"||y==="bl"||y==="tl"?(h=f.x+a.a+a.m,h>i.left+i.right&&(h=Math.max(f.x-a.w-a.a-a.m,0))):(y==="r"||y==="mr"||y==="br"||y==="tr")&&(h=f.x-a.w-a.a-a.m,h<0&&(h=Math.min(f.x+a.a+a.m,i.left+i.right))),y==="t"||y==="mt"||y==="tl"||y==="tr"?(t=f.y+a.a+a.m,t>i.up+i.down&&(t=Math.max(f.y-a.h-a.a-a.m,0))):(y==="b"||y==="mb"||y==="bl"||y==="br")&&(t=f.y-a.h-a.a-a.m,t<0&&(t=Math.min(f.y+a.a+a.m,i.up+i.down)))):i.left+i.right>a.w?f.x<=g.x?(h=f.x+a.a+a.m,h>i.left+i.right&&(h=Math.max(f.x-a.w-a.a-a.m,0))):(h=f.x-a.w-a.a-a.m,h<0&&(h=Math.min(f.x+a.a+a.m,i.left+i.right))):i.up+i.down>a.h&&(f.y<=g.y?(t=f.y+a.a+a.m,t>i.up+i.down&&(t=Math.max(f.y-a.h-a.a-a.m,0))):(t=f.y-a.h-a.a-a.m,t<0&&(t=Math.min(f.y+a.a+a.m,i.up+i.down)))),{x:h,y:t}}function hi(i){let a,f,h,t,g,y;const M=i[16].default,_=J(M,i,i[15],null);return{c(){a=K("div"),_&&_.c(),this.h()},l(s){a=O(s,"DIV",{style:!0});var u=U(a);_&&_.l(u),u.forEach(I),this.h()},h(){L(a,"style",f=`
	display: inline-block;
	transform: translate(${i[2].x-i[0].left}px, ${i[2].y-i[0].up}px);
	${i[1]>0?`transition: ${i[1]}s`:""}
	`),Z(()=>i[18].call(a))},m(s,u){B(s,a,u),_&&_.m(a,null),h=r(a,i[18].bind(a)),i[19](a),t=!0,g||(y=[R(window,"pointermove",i[17]),R(a,"transitionend",i[20]),R(a,"transitionstart",i[21])],g=!0)},p(s,[u]){_&&_.p&&(!t||u&32768)&&o(_,M,s,s[15],t?b(M,s[15],u,null):c(s[15]),null),(!t||u&7&&f!==(f=`
	display: inline-block;
	transform: translate(${s[2].x-s[0].left}px, ${s[2].y-s[0].up}px);
	${s[1]>0?`transition: ${s[1]}s`:""}
	`))&&L(a,"style",f)},i(s){t||(l(_,s),t=!0)},o(s){$(_,s),t=!1},d(s){s&&I(a),_&&_.d(s),h(),i[19](null),g=!1,m(y)}}}function di(i,a,f){let{$$slots:h={},$$scope:t}=a,{activationDistance:g=20}=a,{box:y={up:0,right:400,down:0,left:0}}=a,{customMovement:M=(d,si,wi)=>({x:0,y:0})}=a,{dodge:_=!0}=a,{duration:s=.3}=a,{mode:u="kite-flip"}=a,{moveDistance:H=100}=a,{rate:P=.1}=a,v=!1;const A=e();let w,C,p,D;function T(d){if(W(d),!!F(w,D)&&_&&!v)switch(A("move"),u){case"random":f(2,w={...w,...fi(y,w,D)});break;case"kite":f(2,w={...w,...yi(y,w,D)});break;case"kite-flip":f(2,w={...w,...ti(y,w,D)});break;case"custom":f(2,w={...w,...M(y,w,D)});break}}let k;function W(d){D.x=d.x-w.baseX+y.left,D.y=d.y-w.baseY+y.up}const n=ai(T,P),X=d=>n(d);function Y(){p=this.clientHeight,C=this.clientWidth,f(4,p),f(3,C)}function q(d){ii[d?"unshift":"push"](()=>{k=d,f(5,k)})}const N=()=>{f(6,v=!1),A("transitionend")},Q=()=>{f(6,v=!0),A("transitionstart")};return i.$$set=d=>{"activationDistance"in d&&f(9,g=d.activationDistance),"box"in d&&f(0,y=d.box),"customMovement"in d&&f(10,M=d.customMovement),"dodge"in d&&f(11,_=d.dodge),"duration"in d&&f(1,s=d.duration),"mode"in d&&f(12,u=d.mode),"moveDistance"in d&&f(13,H=d.moveDistance),"rate"in d&&f(14,P=d.rate),"$$scope"in d&&f(15,t=d.$$scope)},i.$$.update=()=>{i.$$.dirty&8761&&f(2,w={m:H,a:g,baseX:k==null?void 0:k.getBoundingClientRect().x,baseY:k==null?void 0:k.getBoundingClientRect().y,x:y.left,y:y.up,w:C,h:p}),i.$$.dirty&2053&&_===!1&&f(2,w={...w,x:y.left,y:y.up})},D={x:0,y:0},[y,s,w,C,p,k,v,A,n,g,M,_,u,H,P,t,h,X,Y,q,N,Q]}class gi extends V{constructor(a){super(),j(this,a,di,hi,G,{activationDistance:9,box:0,customMovement:10,dodge:11,duration:1,mode:12,moveDistance:13,rate:14})}}export{gi as D};