var app=function(){"use strict";function t(){}function e(t){return t()}function i(){return Object.create(null)}function s(t){t.forEach(e)}function n(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e,i,s){return t[1]&&s?function(t,e){for(const i in e)t[i]=e[i];return t}(i.ctx.slice(),t[1](s(e))):i.ctx}function l(t){return null==t?"":t}function c(t,e){t.appendChild(e)}function a(t,e,i){t.insertBefore(e,i||null)}function h(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function d(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function f(t){return document.createTextNode(t)}function p(){return f(" ")}function m(t,e,i,s){return t.addEventListener(e,i,s),()=>t.removeEventListener(e,i,s)}function g(t,e,i){null==i?t.removeAttribute(e):t.getAttribute(e)!==i&&t.setAttribute(e,i)}let $;function v(t){$=t}function y(t){(function(){if(!$)throw new Error("Function called outside component initialization");return $})().$$.on_mount.push(t)}const x=[],S=[],k=[],w=[],b=Promise.resolve();let T=!1;function P(t){k.push(t)}let E=!1;const I=new Set;function L(){if(!E){E=!0;do{for(let t=0;t<x.length;t+=1){const e=x[t];v(e),A(e.$$)}for(v(null),x.length=0;S.length;)S.pop()();for(let t=0;t<k.length;t+=1){const e=k[t];I.has(e)||(I.add(e),e())}k.length=0}while(x.length);for(;w.length;)w.pop()();T=!1,E=!1,I.clear()}}function A(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const C=new Set;function B(t,e){t&&t.i&&(C.delete(t),t.i(e))}function N(t,e,i,s){if(t&&t.o){if(C.has(t))return;C.add(t),undefined.c.push((()=>{C.delete(t),s&&(i&&t.d(1),s())})),t.o(e)}}function F(t){t&&t.c()}function D(t,i,o,r){const{fragment:l,on_mount:c,on_destroy:a,after_update:h}=t.$$;l&&l.m(i,o),r||P((()=>{const i=c.map(e).filter(n);a?a.push(...i):s(i),t.$$.on_mount=[]})),h.forEach(P)}function z(t,e){const i=t.$$;null!==i.fragment&&(s(i.on_destroy),i.fragment&&i.fragment.d(e),i.on_destroy=i.fragment=null,i.ctx=[])}function G(t,e){-1===t.$$.dirty[0]&&(x.push(t),T||(T=!0,b.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function O(e,n,o,r,l,c,a,u=[-1]){const d=$;v(e);const f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:i(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:i(),dirty:u,skip_bound:!1,root:n.target||d.$$.root};a&&a(f.root);let p=!1;if(f.ctx=o?o(e,n.props||{},((t,i,...s)=>{const n=s.length?s[0]:i;return f.ctx&&l(f.ctx[t],f.ctx[t]=n)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](n),p&&G(e,t)),i})):[],f.update(),p=!0,s(f.before_update),f.fragment=!!r&&r(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(h)}else f.fragment&&f.fragment.c();n.intro&&B(e.$$.fragment),D(e,n.target,n.anchor,n.customElement),L()}v(d)}class R{$destroy(){z(this,1),this.$destroy=t}$on(t,e){const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(e),()=>{const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const W=parseFloat;function U(t,e=";"){let i;if(Array.isArray(t))i=t.filter((t=>t));else{i=[];for(const e in t)t[e]&&i.push(`${e}:${t[e]}`)}return i.join(e)}function M(t){let e,i,s,n,o,r,u;function f(t,e){return"string"==typeof t[7][4]?_:j}let p=f(t),m=p(t);return{c(){e=d("svg"),i=d("g"),s=d("g"),m.c(),g(s,"transform",t[10]),g(i,"transform",n=`translate(${t[7][0]/2} ${t[7][1]/2})`),g(i,"transform-origin",o=t[7][0]/4+" 0"),g(e,"id",t[0]),g(e,"class",r=l(t[8])+" svelte-1cj2gr0"),g(e,"style",t[9]),g(e,"viewBox",u=`0 0 ${t[7][0]} ${t[7][1]}`),g(e,"aria-hidden","true"),g(e,"role","img"),g(e,"xmlns","http://www.w3.org/2000/svg")},m(t,n){a(t,e,n),c(e,i),c(i,s),m.m(s,null)},p(t,c){p===(p=f(t))&&m?m.p(t,c):(m.d(1),m=p(t),m&&(m.c(),m.m(s,null))),1024&c&&g(s,"transform",t[10]),128&c&&n!==(n=`translate(${t[7][0]/2} ${t[7][1]/2})`)&&g(i,"transform",n),128&c&&o!==(o=t[7][0]/4+" 0")&&g(i,"transform-origin",o),1&c&&g(e,"id",t[0]),256&c&&r!==(r=l(t[8])+" svelte-1cj2gr0")&&g(e,"class",r),512&c&&g(e,"style",t[9]),128&c&&u!==(u=`0 0 ${t[7][0]} ${t[7][1]}`)&&g(e,"viewBox",u)},d(t){t&&h(e),m.d()}}}function j(t){let e,i,s,n,o,r,l,c,u,f;return{c(){e=d("path"),r=d("path"),g(e,"d",i=t[7][4][0]),g(e,"fill",s=t[3]||t[1]||"currentColor"),g(e,"fill-opacity",n=0!=t[6]?t[4]:t[5]),g(e,"transform",o=`translate(${t[7][0]/-2} ${t[7][1]/-2})`),g(r,"d",l=t[7][4][1]),g(r,"fill",c=t[2]||t[1]||"currentColor"),g(r,"fill-opacity",u=0!=t[6]?t[5]:t[4]),g(r,"transform",f=`translate(${t[7][0]/-2} ${t[7][1]/-2})`)},m(t,i){a(t,e,i),a(t,r,i)},p(t,a){128&a&&i!==(i=t[7][4][0])&&g(e,"d",i),10&a&&s!==(s=t[3]||t[1]||"currentColor")&&g(e,"fill",s),112&a&&n!==(n=0!=t[6]?t[4]:t[5])&&g(e,"fill-opacity",n),128&a&&o!==(o=`translate(${t[7][0]/-2} ${t[7][1]/-2})`)&&g(e,"transform",o),128&a&&l!==(l=t[7][4][1])&&g(r,"d",l),6&a&&c!==(c=t[2]||t[1]||"currentColor")&&g(r,"fill",c),112&a&&u!==(u=0!=t[6]?t[5]:t[4])&&g(r,"fill-opacity",u),128&a&&f!==(f=`translate(${t[7][0]/-2} ${t[7][1]/-2})`)&&g(r,"transform",f)},d(t){t&&h(e),t&&h(r)}}}function _(t){let e,i,s,n;return{c(){e=d("path"),g(e,"d",i=t[7][4]),g(e,"fill",s=t[1]||t[2]||"currentColor"),g(e,"transform",n=`translate(${t[7][0]/-2} ${t[7][1]/-2})`)},m(t,i){a(t,e,i)},p(t,o){128&o&&i!==(i=t[7][4])&&g(e,"d",i),6&o&&s!==(s=t[1]||t[2]||"currentColor")&&g(e,"fill",s),128&o&&n!==(n=`translate(${t[7][0]/-2} ${t[7][1]/-2})`)&&g(e,"transform",n)},d(t){t&&h(e)}}}function H(e){let i,s=e[7][4]&&M(e);return{c(){s&&s.c(),i=f("")},m(t,e){s&&s.m(t,e),a(t,i,e)},p(t,[e]){t[7][4]?s?s.p(t,e):(s=M(t),s.c(),s.m(i.parentNode,i)):s&&(s.d(1),s=null)},i:t,o:t,d(t){s&&s.d(t),t&&h(i)}}}function Y(t,e,i){let s,n,o,r,{class:l=""}=e,{id:c=""}=e,{style:a=""}=e,{icon:h}=e,{size:u=""}=e,{color:d=""}=e,{fw:f=!1}=e,{pull:p=""}=e,{scale:m=1}=e,{translateX:g=0}=e,{translateY:$=0}=e,{rotate:v=""}=e,{flip:y=!1}=e,{spin:x=!1}=e,{pulse:S=!1}=e,{primaryColor:k=""}=e,{secondaryColor:w=""}=e,{primaryOpacity:b=1}=e,{secondaryOpacity:T=.4}=e,{swapOpacity:P=!1}=e;return t.$$set=t=>{"class"in t&&i(11,l=t.class),"id"in t&&i(0,c=t.id),"style"in t&&i(12,a=t.style),"icon"in t&&i(13,h=t.icon),"size"in t&&i(14,u=t.size),"color"in t&&i(1,d=t.color),"fw"in t&&i(15,f=t.fw),"pull"in t&&i(16,p=t.pull),"scale"in t&&i(17,m=t.scale),"translateX"in t&&i(18,g=t.translateX),"translateY"in t&&i(19,$=t.translateY),"rotate"in t&&i(20,v=t.rotate),"flip"in t&&i(21,y=t.flip),"spin"in t&&i(22,x=t.spin),"pulse"in t&&i(23,S=t.pulse),"primaryColor"in t&&i(2,k=t.primaryColor),"secondaryColor"in t&&i(3,w=t.secondaryColor),"primaryOpacity"in t&&i(4,b=t.primaryOpacity),"secondaryOpacity"in t&&i(5,T=t.secondaryOpacity),"swapOpacity"in t&&i(6,P=t.swapOpacity)},t.$$.update=()=>{8192&t.$$.dirty&&i(7,s=h&&h.icon||[0,0,"",[],""]),12584960&t.$$.dirty&&i(8,n=U([l,"fa",x&&"spin",S&&"pulse"]," ")),118784&t.$$.dirty&&i(9,o=function(t,e,i,s){let n,o,r,l,c,a="-.125em";return s&&(c="center",o="1.25em"),i&&(n=i),e&&("lg"==e?(l="1.33333em",r=".75em",a="-.225em"):l="xs"==e?".75em":"sm"==e?".875em":e.replace("x","em")),U([U({float:n,width:o,height:"1em","line-height":r,"font-size":l,"text-align":c,"vertical-align":a,"transform-origin":"center",overflow:"visible"}),t])}(a,u,p,f)),4063232&t.$$.dirty&&i(10,r=function(t,e,i,s,n,o=1,r="",l=""){let c=1,a=1;return n&&("horizontal"==n?c=-1:"vertical"==n?a=-1:c=a=-1),U([`translate(${W(e)*o}${r},${W(i)*o}${r})`,`scale(${c*W(t)},${a*W(t)})`,s&&`rotate(${s}${l})`]," ")}(m,g,$,v,y,512))},[c,d,k,w,b,T,P,s,n,o,r,l,a,h,u,f,p,m,g,$,v,y,x,S]}class V extends R{constructor(t){super(),O(this,t,Y,H,o,{class:11,id:0,style:12,icon:13,size:14,color:1,fw:15,pull:16,scale:17,translateX:18,translateY:19,rotate:20,flip:21,spin:22,pulse:23,primaryColor:2,secondaryColor:3,primaryOpacity:4,secondaryOpacity:5,swapOpacity:6})}}
/*!
     * Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
     * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
     */var q,X,J={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]};function K(t){let e,i;const s=t[2].default,n=function(t,e,i,s){if(t){const n=r(t,e,i,s);return t[0](n)}}(s,t,t[1],null);return{c(){e=u("a"),n&&n.c(),g(e,"href",t[0]),g(e,"target","_blank"),g(e,"rel","noopener noreferrer")},m(t,s){a(t,e,s),n&&n.m(e,null),i=!0},p(t,[o]){n&&n.p&&(!i||2&o)&&function(t,e,i,s,n,o){if(n){const l=r(e,i,s,o);t.p(l,n)}}(n,s,t,t[1],i?function(t,e,i,s){if(t[2]&&s){const n=t[2](s(i));if(void 0===e.dirty)return n;if("object"==typeof n){const t=[],i=Math.max(e.dirty.length,n.length);for(let s=0;s<i;s+=1)t[s]=e.dirty[s]|n[s];return t}return e.dirty|n}return e.dirty}(s,t[1],o,null):function(t){if(t.ctx.length>32){const e=[],i=t.ctx.length/32;for(let t=0;t<i;t++)e[t]=-1;return e}return-1}(t[1]),null),(!i||1&o)&&g(e,"href",t[0])},i(t){i||(B(n,t),i=!0)},o(t){N(n,t),i=!1},d(t){t&&h(e),n&&n.d(t)}}}function Q(t,e,i){let{$$slots:s={},$$scope:n}=e,{href:o=""}=e;return t.$$set=t=>{"href"in t&&i(0,o=t.href),"$$scope"in t&&i(1,n=t.$$scope)},[o,n,s]}class Z extends R{constructor(t){super(),O(this,t,Q,K,o,{href:0})}}!function(t){t.NONE="NONE",t.UP="UP",t.LEFT="LEFT",t.DOWN="DOWN",t.RIGHT="RIGHT"}(q||(q={})),function(t){t.WAITING="WAITING",t.PAUSE="PAUSE",t.PLAYING="PLAYING",t.COUNTDOWN="COUNTDOWN",t.EATEN_PAUSE="EATEN_PAUSE",t.DYING="DYING"}(X||(X={}));const tt="undefined"!=typeof window;class et{constructor(t){this.blockSize=20,this.fps=30,this.ghostsEatenCount=0,this.ghostPos=[],this.ghosts=[],this.ghostColors=["#00FFDE","#FF0000","#FFB8DE","#FFB847"],this.intervalId=null,this.lastTime=0,this.level=0,this.reward={biscuit:10,death:-100,eatGhostMultiplier:50,pill:50},this.state=X.WAITING,this.stateChanged=!0,this.stored=X.WAITING,this.tick=0,this.timerStart=0,this.userPos=null,this.completedLevel=()=>{this.setState(X.WAITING),this.level++,this.map.reset(),this.user.newLevel(),this.startLevel()},this.drawFooter=()=>{const t=this.map.height*this.map.blockSize,e=t+17;this.ctx.fillStyle="#000000",this.ctx.fillRect(0,t,this.map.width*this.map.blockSize,30),this.ctx.fillStyle="#FFFF00";for(let e=0,i=this.user.getLives();e<i;++e){const i=this.map.blockSize/2;this.ctx.fillStyle="#FFFF00",this.ctx.beginPath(),this.ctx.moveTo(150+25*e+i,t+1+i),this.ctx.arc(150+25*e+i,t+1+i,i,.25*Math.PI,1.75*Math.PI,!1),this.ctx.fill()}this.ctx.fillStyle="#FFFF00",this.ctx.font="14px BDCartoonShoutRegular",this.ctx.fillText("Score: "+this.user.getScore(),30,e),this.ctx.fillText("Level: "+this.level,260,e)},this.drawScore=(t,e)=>{this.ctx.fillStyle="#FFFFFF",this.ctx.font="12px BDCartoonShoutRegular",this.ctx.fillText(t,e.x/10*this.map.blockSize,(e.y+5)/10*this.map.blockSize)},this.eatenPill=()=>{this.timerStart=this.tick,this.ghostsEatenCount=0,this.ghosts.forEach((t=>t.makeEdible()))},this.getTick=()=>this.tick,this.init=(t,e)=>{t&&(t.setAttribute("width",this.blockSize*this.arena[0].length+"px"),t.setAttribute("height",this.blockSize*this.arena.length+30+"px"),this.ctx=t.getContext("2d")),this.map=new ot(this,this.blockSize),this.user=new nt(this,e),this.ghosts=this.ghostColors.map((t=>new st(this,t))),tt&&this.map.draw(this.ctx),tt&&this.renderText("Loading ..."),this.loaded()},this.keyDown=t=>{if("n"===t.key)this.startNewGame();else if("s"===t.key);else if("p"===t.key&&this.state===X.PAUSE)this.map.draw(this.ctx),this.setState(this.stored);else if("p"===t.key)this.stored=this.state,this.setState(X.PAUSE),this.renderText("Paused");else if(this.state!==X.PAUSE)return this.user.keyDown(t);return!0},this.keyPress=t=>{this.state!==X.WAITING&&this.state!==X.PAUSE&&(t.preventDefault(),t.stopPropagation())},this.loaded=()=>{tt&&(this.renderText("Press N to Start"),document.addEventListener("keydown",this.keyDown,!0),document.addEventListener("keypress",this.keyPress,!0),this.intervalId=window.setInterval(this.mainLoop,1e3/this.fps))},this.loseLife=()=>{this.setState(X.WAITING),this.user.loseLife(),this.user.getLives()>0&&this.startLevel()},this.mainLoop=(t=tt)=>{let e=0;if(this.state!==X.PAUSE&&++this.tick,t&&this.map.drawPills(this.ctx),this.state===X.PLAYING){this.ghostPos=this.ghosts.map((t=>t.move())),this.ghosts.forEach((t=>{t.act(),t.behave()})),tt&&this.ghostPos.forEach((t=>this.redrawBlock(t.old))),tt&&this.ghosts.forEach((t=>t.draw(this.ctx)));const i=this.user.move();this.userPos=i.new,this.user.act();const s=this.user.nextWholeBlock(this.user.position,this.user.direction),n=this.map.getBlock(s);if((this.user.isMidBlock(this.user.position.y)||this.user.isMidBlock(this.user.position.x))&&(n===rt.BISCUIT||n===rt.PILL)){this.map.setBlock(s,rt.EMPTY);const t=n===rt.BISCUIT?this.reward.biscuit:this.reward.pill;this.user.biscuitPillEatenCount++,this.user.addScore(t),e+=t,182===this.user.biscuitPillEatenCount&&this.completedLevel(),n===rt.PILL&&this.eatenPill()}t&&this.redrawBlock(i.old),t&&this.user.draw(this.ctx),this.ghosts.forEach(((i,s)=>{if(this.userGhostCollision(this.userPos,this.ghostPos[s].new))if(i.isVunerable()){i.eaten(),this.ghostsEatenCount++;const n=this.ghostsEatenCount*this.reward.eatGhostMultiplier;this.user.addScore(n),this.setState(X.EATEN_PAUSE),this.timerStart=this.tick,e+=n,t&&this.drawScore(n.toString(),this.ghostPos[s].new)}else i.isDangerous()&&this.state!==X.DYING&&(this.setState(X.DYING),this.timerStart=this.tick,e+=this.reward.death)}))}else if(this.state===X.WAITING&&this.stateChanged)this.stateChanged=!1,t&&this.map.draw(this.ctx),t&&this.renderText("Press N to Start a New Game");else if(this.state===X.EATEN_PAUSE&&this.tick-this.timerStart>this.fps/3)this.setState(X.PLAYING),t&&this.map.draw(this.ctx);else if(this.state===X.DYING)this.tick-this.timerStart>2*this.fps?this.loseLife():(t&&this.redrawBlock(this.userPos),t&&this.ghostPos.forEach((t=>this.redrawBlock(t.old))),t&&this.user.drawDead(this.ctx,(this.tick-this.timerStart)/(2*this.fps)));else if(this.state===X.COUNTDOWN){const e=5+Math.floor((this.timerStart-this.tick)/this.fps);0===e?(this.setState(X.PLAYING),t&&this.map.draw(this.ctx)):e!==this.lastTime&&(this.lastTime=e,t&&this.map.draw(this.ctx),t&&this.renderText("Starting in: "+e))}return t&&this.drawFooter(),e},this.redrawBlock=t=>{this.map.drawBlock(Math.floor(t.x/10),Math.floor(t.y/10),this.ctx),this.map.drawBlock(Math.ceil(t.x/10),Math.ceil(t.y/10),this.ctx)},this.renderText=t=>{this.ctx.fillStyle="#FFFF00",this.ctx.font="14px BDCartoonShoutRegular";let e=this.ctx.measureText(t).width,i=(this.map.width*this.map.blockSize-e)/2;this.ctx.fillText(t,i,10*this.map.height+8)},this.setState=t=>{this.state=t,this.stateChanged=!0},this.startLevel=()=>{this.user.resetPosition(),this.ghosts.forEach((t=>t.reset())),this.timerStart=this.tick,this.setState(tt?X.COUNTDOWN:X.PLAYING)},this.startNewGame=()=>{this.setState(X.WAITING),this.level=1,this.user.reset(),this.map.reset(),tt&&this.map.draw(this.ctx),this.startLevel()},this.userGhostCollision=(t,e)=>Math.hypot(e.x-t.x,e.y-t.y)<10,this.arena=t.arena,this.reward=t.reward||this.reward,this.walls=t.walls,this.init(t.canvas,t.userActCallback)}}class it{constructor(){this.desiredDirection=q.NONE,this.direction=q.NONE,this.position={x:0,y:0},this.score=0,this.act=()=>{},this.addBounded=(t,e)=>{const i=t%10,s=i+e;return 0!==i&&s>10?t+(10-i):i>0&&s<0?t-i:t+e},this.behave=()=>{},this.checkTeleport=(t,e)=>100===e.y&&e.x>=190&&t===q.RIGHT?{y:100,x:-10}:100===e.y&&e.x<=-10&&t===q.LEFT?{y:100,x:190}:e,this.currentArenaPosition=t=>({x:this.positionToBlock(t.x),y:this.positionToBlock(t.y)}),this.getNewPosition=()=>{let t=null;return this.desiredDirection!==this.direction&&(t=this.getNextPosition(this.desiredDirection,this.position),this.turnedAround(this.desiredDirection,this.direction)||this.onWholeBlock(this.position)&&this.game.map.isFloorBlock(this.nextWholeBlock(t,this.desiredDirection))?this.direction=this.desiredDirection:t=null),null===t&&(t=this.getNextPosition(this.direction,this.position)),t=this.checkTeleport(this.direction,t),t},this.getNextPosition=(t,e)=>{const i=this.getSpeed(),s=t===q.LEFT&&-i||t===q.RIGHT&&i||0,n=t===q.DOWN&&i||t===q.UP&&-i||0;return{x:this.addBounded(e.x,s),y:this.addBounded(e.y,n)}},this.getRandomDirection=()=>(this.direction===q.LEFT||this.direction===q.RIGHT?[q.UP,q.DOWN]:[q.LEFT,q.RIGHT])[Math.floor(2*Math.random())],this.getSpeed=()=>2,this.hitWallCallback=()=>(this.direction=q.NONE,{new:this.position,old:this.position}),this.isWholeCoordinate=t=>t%10==0,this.move=()=>{const t=this.position,e=this.getNewPosition();return this.onWholeBlock(this.position)&&this.game.map.isWall(this.nextWholeBlock(e,this.direction))?this.hitWallCallback():(this.setNewPosition(e),{new:this.position,old:t})},this.nextBlock=(t,e)=>{const i=t%10;return 0===i?t:e===q.RIGHT||e===q.DOWN?t+(10-i):t-i},this.nextWholeBlock=(t,e)=>({x:this.positionToBlock(this.nextBlock(t.x,e)),y:this.positionToBlock(this.nextBlock(t.y,e))}),this.onWholeBlock=t=>this.isWholeCoordinate(t.y)&&this.isWholeCoordinate(t.x),this.positionToBlock=t=>Math.round(t/10),this.setNewPosition=t=>{this.position=t},this.turnedAround=(t,e)=>!((t!==q.LEFT&&t!==q.RIGHT||e!==q.LEFT&&e!==q.RIGHT)&&(t!==q.UP&&t!==q.DOWN||e!==q.UP&&e!==q.DOWN))}}class st extends it{constructor(t,e){super(),this.color="",this.desiredDirection=q.NONE,this.direction=q.NONE,this.eatenAt=null,this.edibleAt=null,this.position={x:0,y:0},this.act=()=>{this.desiredDirection=this.getRandomDirection()},this.behave=()=>{this.edibleAt&&this.secondsAgo(this.edibleAt)>8&&(this.edibleAt=null),this.eatenAt&&this.secondsAgo(this.eatenAt)>3&&(this.eatenAt=null)},this.draw=t=>{const e=this.game.map.blockSize,i=this.position.y/10*e,s=this.position.x/10*e,n=s+e,o=i+e-3,r=e/10,l=this.game.getTick()%10>5?3:-3,c=this.game.getTick()%10>5?-3:3;t.fillStyle=this.getColor(),t.beginPath(),t.moveTo(s,o),t.quadraticCurveTo(s,i,s+e/2,i),t.quadraticCurveTo(s+e,i,s+e,o),t.quadraticCurveTo(n-1*r,o+l,n-2*r,o),t.quadraticCurveTo(n-3*r,o+c,n-4*r,o),t.quadraticCurveTo(n-5*r,o+l,n-6*r,o),t.quadraticCurveTo(n-7*r,o+c,n-8*r,o),t.quadraticCurveTo(n-9*r,o+l,n-10*r,o),t.closePath(),t.fill(),t.beginPath(),t.fillStyle="#FFF",t.arc(s+6,i+6,e/6,0,300,!1),t.arc(s+e-6,i+6,e/6,0,300,!1),t.closePath(),t.fill();const a=e/12,h={[q.RIGHT]:[a,0],[q.LEFT]:[-a,0],[q.UP]:[0,-a],[q.DOWN]:[0,a]};t.beginPath(),t.fillStyle="#000",t.arc(s+6+h[this.direction][0],i+6+h[this.direction][1],e/15,0,300,!1),t.arc(s+e-6+h[this.direction][0],i+6+h[this.direction][1],e/15,0,300,!1),t.closePath(),t.fill()},this.eaten=()=>{this.edibleAt=null,this.eatenAt=this.game.getTick()},this.getColor=()=>this.edibleAt>0?this.secondsAgo(this.edibleAt)>5&&this.game.getTick()%20>10?"#FFFFFF":"#0000BB":this.eatenAt>0?"#222":this.color,this.getSpeed=()=>this.isVunerable()?1:this.isHidden()?4:2,this.hitWallCallback=()=>(this.act(),{new:this.position,old:this.position}),this.isDangerous=()=>null===this.edibleAt&&null===this.eatenAt,this.isHidden=()=>null===this.edibleAt&&null!==this.eatenAt,this.isVunerable=()=>null!==this.edibleAt,this.makeEdible=()=>{this.direction=this.oppositeDirection(this.direction),this.edibleAt=this.game.getTick()},this.oppositeDirection=t=>t===q.LEFT&&q.RIGHT||t===q.RIGHT&&q.LEFT||t===q.UP&&q.DOWN||q.UP,this.reset=()=>{this.eatenAt=null,this.edibleAt=null,this.position={x:90,y:80},this.direction=this.getRandomDirection(),this.desiredDirection=this.getRandomDirection()},this.secondsAgo=t=>(this.game.getTick()-t)/this.game.fps,this.color=e,this.game=t}}class nt extends it{constructor(t,e){super(),this.biscuitPillEatenCount=0,this.lives=3,this.keyMap={ArrowLeft:q.LEFT,ArrowUp:q.UP,ArrowRight:q.RIGHT,ArrowDown:q.DOWN},this.act=()=>{this.actCallback&&(this.desiredDirection=this.actCallback(this))},this.calcAngle=(t,e)=>t===q.RIGHT&&e.x%10<5?{start:.25,end:1.75,direction:!1}:t===q.DOWN&&e.y%10<5?{start:.75,end:2.25,direction:!1}:t===q.UP&&e.y%10<5?{start:1.25,end:1.75,direction:!0}:t===q.LEFT&&e.x%10<5?{start:.75,end:1.25,direction:!0}:{start:0,end:2,direction:!1},this.drawDead=(t,e)=>{if(e<1){const i=this.game.map.blockSize,s=i/2;t.fillStyle="#FFFF00",t.beginPath(),t.moveTo(this.position.x/10*i+s,this.position.y/10*i+s),t.arc(this.position.x/10*i+s,this.position.y/10*i+s,s,0,2*Math.PI*e,!0),t.fill()}},this.draw=t=>{const{direction:e,end:i,start:s}=this.calcAngle(this.direction,this.position),n=this.game.map.blockSize;t.fillStyle="#FFFF00",t.beginPath(),t.moveTo(this.position.x/10*n+n/2,this.position.y/10*n+n/2),t.arc(this.position.x/10*n+n/2,this.position.y/10*n+n/2,n/2,Math.PI*s,Math.PI*i,e),t.fill()},this.getLives=()=>this.lives,this.addScore=t=>{this.score+=t,this.score>=1e4&&this.score-t<1e4&&this.lives++},this.getScore=()=>this.score,this.initUser=()=>{this.score=0,this.lives=3,this.newLevel()},this.isMidBlock=t=>{const e=t%10;return e>3||e<7},this.keyDown=t=>void 0===this.keyMap[t.key]||(this.desiredDirection=this.keyMap[t.key],t.preventDefault(),t.stopPropagation(),!1),this.loseLife=()=>{this.lives--},this.newLevel=()=>{this.resetPosition(),this.biscuitPillEatenCount=0},this.reset=()=>{this.initUser(),this.resetPosition()},this.resetPosition=()=>{this.position={x:90,y:120},this.direction=q.LEFT,this.desiredDirection=q.LEFT},this.actCallback=e,this.game=t,this.initUser()}}class ot{constructor(t,e){this.height=0,this.pillSize=0,this.width=0,this.draw=t=>{const e=this.blockSize;t.fillStyle="#000",t.fillRect(0,0,this.width*e,this.height*e),this.drawWall(t);for(let e=0;e<this.height;++e)for(let i=0;i<this.width;++i)this.drawBlock(i,e,t)},this.drawBlock=(t,e,i)=>{const s=this.getBlock({x:t,y:e});s!==rt.PILL&&(i.beginPath(),s!==rt.EMPTY&&s!==rt.RESTRICTED&&s!==rt.BISCUIT||(i.fillStyle="#000",i.fillRect(t*this.blockSize,e*this.blockSize,this.blockSize,this.blockSize),s===rt.BISCUIT&&(i.fillStyle="#FFF",i.fillRect(t*this.blockSize+this.blockSize/2.5,e*this.blockSize+this.blockSize/2.5,this.blockSize/6,this.blockSize/6))),i.closePath())},this.drawPills=t=>{++this.pillSize>30&&(this.pillSize=0);for(let e=0;e<this.height;++e)for(let i=0;i<this.width;++i)this.getBlock({x:i,y:e})===rt.PILL&&(t.beginPath(),t.fillStyle="#000",t.fillRect(i*this.blockSize,e*this.blockSize,this.blockSize,this.blockSize),t.fillStyle="#FFF",t.arc(i*this.blockSize+this.blockSize/2,e*this.blockSize+this.blockSize/2,Math.abs(5-this.pillSize/3),0,2*Math.PI,!1),t.fill(),t.closePath())},this.drawWall=t=>{t.strokeStyle="#0000FF",t.lineWidth=5,t.lineCap="round",this.game.walls.forEach((e=>{t.beginPath(),e.forEach((e=>{e.move?t.moveTo(e.move[0]*this.blockSize,e.move[1]*this.blockSize):e.line?t.lineTo(e.line[0]*this.blockSize,e.line[1]*this.blockSize):e.curve&&t.quadraticCurveTo(e.curve[0]*this.blockSize,e.curve[1]*this.blockSize,e.curve[2]*this.blockSize,e.curve[3]*this.blockSize)})),t.stroke()}))},this.getBlock=t=>this.arena[t.y][t.x],this.isFloorBlock=t=>{if(this.withinBounds(t)){const e=this.getBlock(t);return e===rt.EMPTY||e===rt.BISCUIT||e===rt.PILL}return!1},this.isWall=t=>this.withinBounds(t)&&this.getBlock(t)===rt.WALL,this.reset=()=>{this.arena=JSON.parse(JSON.stringify(this.game.arena)),this.height=this.arena.length,this.width=this.arena[0].length},this.setBlock=(t,e)=>{this.arena[t.y][t.x]=e},this.withinBounds=t=>t.y>=0&&t.y<this.height&&t.x>=0&&t.x<this.width,this.blockSize=e,this.game=t,this.reset()}}var rt;!function(t){t[t.WALL=0]="WALL",t[t.BISCUIT=1]="BISCUIT",t[t.EMPTY=2]="EMPTY",t[t.RESTRICTED=3]="RESTRICTED",t[t.PILL=4]="PILL"}(rt||(rt={}));const lt=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],[0,4,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,4,0],[0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0],[0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0],[0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0],[2,2,2,0,1,0,1,1,1,1,1,1,1,0,1,0,2,2,2],[0,0,0,0,1,0,1,0,0,3,0,0,1,0,1,0,0,0,0],[2,2,2,2,1,1,1,0,3,3,3,0,1,1,1,2,2,2,2],[0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0],[2,2,2,0,1,0,1,1,1,2,1,1,1,0,1,0,2,2,2],[0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],[0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0],[0,4,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,4,0],[0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0],[0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0],[0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],ct=[[{move:[0,9.5]},{line:[3,9.5]},{curve:[3.5,9.5,3.5,9]},{line:[3.5,8]},{curve:[3.5,7.5,3,7.5]},{line:[1,7.5]},{curve:[.5,7.5,.5,7]},{line:[.5,1]},{curve:[.5,.5,1,.5]},{line:[9,.5]},{curve:[9.5,.5,9.5,1]},{line:[9.5,3.5]}],[{move:[9.5,1]},{curve:[9.5,.5,10,.5]},{line:[18,.5]},{curve:[18.5,.5,18.5,1]},{line:[18.5,7]},{curve:[18.5,7.5,18,7.5]},{line:[16,7.5]},{curve:[15.5,7.5,15.5,8]},{line:[15.5,9]},{curve:[15.5,9.5,16,9.5]},{line:[19,9.5]}],[{move:[2.5,5.5]},{line:[3.5,5.5]}],[{move:[3,2.5]},{curve:[3.5,2.5,3.5,3]},{curve:[3.5,3.5,3,3.5]},{curve:[2.5,3.5,2.5,3]},{curve:[2.5,2.5,3,2.5]}],[{move:[15.5,5.5]},{line:[16.5,5.5]}],[{move:[16,2.5]},{curve:[16.5,2.5,16.5,3]},{curve:[16.5,3.5,16,3.5]},{curve:[15.5,3.5,15.5,3]},{curve:[15.5,2.5,16,2.5]}],[{move:[6,2.5]},{line:[7,2.5]},{curve:[7.5,2.5,7.5,3]},{curve:[7.5,3.5,7,3.5]},{line:[6,3.5]},{curve:[5.5,3.5,5.5,3]},{curve:[5.5,2.5,6,2.5]}],[{move:[12,2.5]},{line:[13,2.5]},{curve:[13.5,2.5,13.5,3]},{curve:[13.5,3.5,13,3.5]},{line:[12,3.5]},{curve:[11.5,3.5,11.5,3]},{curve:[11.5,2.5,12,2.5]}],[{move:[7.5,5.5]},{line:[9,5.5]},{curve:[9.5,5.5,9.5,6]},{line:[9.5,7.5]}],[{move:[9.5,6]},{curve:[9.5,5.5,10.5,5.5]},{line:[11.5,5.5]}],[{move:[5.5,5.5]},{line:[5.5,7]},{curve:[5.5,7.5,6,7.5]},{line:[7.5,7.5]}],[{move:[6,7.5]},{curve:[5.5,7.5,5.5,8]},{line:[5.5,9.5]}],[{move:[13.5,5.5]},{line:[13.5,7]},{curve:[13.5,7.5,13,7.5]},{line:[11.5,7.5]}],[{move:[13,7.5]},{curve:[13.5,7.5,13.5,8]},{line:[13.5,9.5]}],[{move:[0,11.5]},{line:[3,11.5]},{curve:[3.5,11.5,3.5,12]},{line:[3.5,13]},{curve:[3.5,13.5,3,13.5]},{line:[1,13.5]},{curve:[.5,13.5,.5,14]},{line:[.5,17]},{curve:[.5,17.5,1,17.5]},{line:[1.5,17.5]}],[{move:[1,17.5]},{curve:[.5,17.5,.5,18]},{line:[.5,21]},{curve:[.5,21.5,1,21.5]},{line:[18,21.5]},{curve:[18.5,21.5,18.5,21]},{line:[18.5,18]},{curve:[18.5,17.5,18,17.5]},{line:[17.5,17.5]}],[{move:[18,17.5]},{curve:[18.5,17.5,18.5,17]},{line:[18.5,14]},{curve:[18.5,13.5,18,13.5]},{line:[16,13.5]},{curve:[15.5,13.5,15.5,13]},{line:[15.5,12]},{curve:[15.5,11.5,16,11.5]},{line:[19,11.5]}],[{move:[5.5,11.5]},{line:[5.5,13.5]}],[{move:[13.5,11.5]},{line:[13.5,13.5]}],[{move:[2.5,15.5]},{line:[3,15.5]},{curve:[3.5,15.5,3.5,16]},{line:[3.5,17.5]}],[{move:[16.5,15.5]},{line:[16,15.5]},{curve:[15.5,15.5,15.5,16]},{line:[15.5,17.5]}],[{move:[5.5,15.5]},{line:[7.5,15.5]}],[{move:[11.5,15.5]},{line:[13.5,15.5]}],[{move:[2.5,19.5]},{line:[5,19.5]},{curve:[5.5,19.5,5.5,19]},{line:[5.5,17.5]}],[{move:[5.5,19]},{curve:[5.5,19.5,6,19.5]},{line:[7.5,19.5]}],[{move:[11.5,19.5]},{line:[13,19.5]},{curve:[13.5,19.5,13.5,19]},{line:[13.5,17.5]}],[{move:[13.5,19]},{curve:[13.5,19.5,14,19.5]},{line:[16.5,19.5]}],[{move:[7.5,13.5]},{line:[9,13.5]},{curve:[9.5,13.5,9.5,14]},{line:[9.5,15.5]}],[{move:[9.5,14]},{curve:[9.5,13.5,10,13.5]},{line:[11.5,13.5]}],[{move:[7.5,17.5]},{line:[9,17.5]},{curve:[9.5,17.5,9.5,18]},{line:[9.5,19.5]}],[{move:[9.5,18]},{curve:[9.5,17.5,10,17.5]},{line:[11.5,17.5]}],[{move:[8.5,9.5]},{line:[8,9.5]},{curve:[7.5,9.5,7.5,10]},{line:[7.5,11]},{curve:[7.5,11.5,8,11.5]},{line:[11,11.5]},{curve:[11.5,11.5,11.5,11]},{line:[11.5,10]},{curve:[11.5,9.5,11,9.5]},{line:[10.5,9.5]}]];function at(t){return{dx:(t===q.LEFT?-1:t===q.RIGHT&&1)||0,dy:(t===q.DOWN?1:t===q.UP&&-1)||0}}var ht;!function(t){t[t.DANGEROUS_GHOST=0]="DANGEROUS_GHOST",t[t.EDIBLE_GHOST=1]="EDIBLE_GHOST",t[t.PILL=2]="PILL",t[t.BISCUIT=3]="BISCUIT"}(ht||(ht={}));const ut=(t,e,i,s=.95)=>{const{dx:n,dy:o}=at(i),{encoding:r,isValidBlock:l}=ft(t,e.x+n,e.y+o,{[pt(e.x,e.y)]:!0},10,s);return l?r:null},dt=[[-1,0],[1,0],[0,-1],[0,1]];function ft(t,e,i,s={},n=10,o=.9){s[pt(e,i)]=!0;const r=[0,0,0,0],{isValidBlock:l,keepSearching:c}=function(t,e,i,s){const n=t.map.getBlock({x:e,y:i});if(void 0===n||n===rt.WALL||n===rt.RESTRICTED)return{isValidBlock:!1,keepSearching:!1};{n===rt.PILL?s[ht.PILL]++:n===rt.BISCUIT&&s[ht.BISCUIT]++;const o=t.ghosts.filter((t=>{const s=t.currentArenaPosition(t.position);return s.x===e&&s.y===i}));let r=!0;for(const t of o)t.isDangerous()?(s[ht.DANGEROUS_GHOST]++,r=!1):t.isVunerable()&&s[ht.EDIBLE_GHOST]++;return{isValidBlock:!0,keepSearching:r}}}(t,e,i,r);if(c&&n>0){const l=[0,0,0,0];let c=0;dt.forEach((([r,a])=>{const h=e+r,u=i+a;if(void 0===s[pt(h,u)]){const{encoding:e,isValidBlock:i}=ft(t,h,u,s,n-1,o);i&&(l.forEach(((t,i)=>{l[i]+=o*e[i]})),c++)}})),c>0&&r.forEach(((t,e)=>{r[e]+=l[e]/c}))}return{encoding:r,isValidBlock:l}}function pt(t,e){return`${t}-${e}`}function mt(t,e="tree"){let i=[q.LEFT,q.RIGHT,q.UP,q.DOWN];const s=t.user.currentArenaPosition(t.user.position);let n=i.map((i=>"tree"===e?ut(t,s,i):((t,e,i,s=.9)=>{const{dx:n,dy:o}=at(i),r=t.ghosts;let l=null,c=e.x,a=e.y,h=0,u=t.map.getBlock({x:c+n,y:a+o});for(;void 0!==u&&u!==rt.WALL&&u!==rt.RESTRICTED;){const e=Math.pow(s,h);null===l&&(l=[0,0,0,0]),u===rt.PILL?l[ht.PILL]+=e:u===rt.BISCUIT&&(l[ht.BISCUIT]+=e);const i=r.filter((t=>{const e=t.currentArenaPosition(t.position);return e.x===c&&e.y===a}));let d=!1;for(const t of i)t.isDangerous()?(l[ht.DANGEROUS_GHOST]+=e,d=!0):t.isVunerable()&&(l[ht.EDIBLE_GHOST]+=e);if(d)break;++h,c+=n,a+=o,u=t.map.getBlock({x:c,y:a})}return l})(t,s,i)));return i=i.filter(((t,e)=>null!==n[e])),n=n.filter((t=>null!==t)),{actions:i,encodings:n}}var gt=[-26.012782723972947,63.60069687665039,44.92294844769546,18.573949080956744];function $t(t,e,i,s,n=.1){if(e.forEach((t=>{if(t.length!==i.length)throw new Error(`Action encodings and weights lengths must match. Received ${t.length} and weights ${i.length}`)})),n<0||n>1)throw new Error(`Epsilon must be between 0 and 1. Received ${n}`);let o=0;if(Math.random()>n){let n=-1/0;e.forEach(((e,r)=>{const l=s(t,e,i);l>n&&(o=r,n=l)}))}else o=Math.floor(Math.random()*e.length);return o}function vt(t,e,i){if(e.length!==i.length)throw new Error(`Expected equal array lengths. Received ${e.length} and ${i.length}`);return e.reduce(((t,e,s)=>t+e*i[s]),0)}function yt(e){let i,s;return i=new V({props:{class:"icon-button",icon:J,style:"color:white;"}}),{c(){F(i.$$.fragment)},m(t,e){D(i,t,e),s=!0},p:t,i(t){s||(B(i.$$.fragment,t),s=!0)},o(t){N(i.$$.fragment,t),s=!1},d(t){z(i,t)}}}function xt(t){let e;return{c(){e=f("tree-search state-action encoding")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function St(t){let e;return{c(){e=f("n-step semi-gradient Sarsa for policy control")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function kt(t){let e;return{c(){e=f("linear function approximation and gradient descent")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function wt(t){let e;return{c(){e=f("Svelte")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function bt(t){let e;return{c(){e=f("Typescript")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function Tt(t){let e;return{c(){e=f("Pac-Man implementation")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function Pt(t){let e;return{c(){e=f("https://github.com/harryli0088/reinforcement-learning-pacman")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function Et(t){let e;return{c(){e=f("https://fontawesome.com/license")},m(t,i){a(t,e,i)},d(t){t&&h(e)}}}function It(t){let e,i,n,o,r,d,$,v,y,x,S,k,w,b,T,P,E,I,L,A,C,G,O,R,W,U,M,j,_,H,Y,V,q,X,J,K,Q,tt,et,it,st,nt,ot,rt,lt,ct,at,ht,ut,dt,ft,pt,mt,gt,$t,vt,It,Lt,At,Ct,Bt,Nt,Ft,Dt,zt,Gt,Ot,Rt,Wt,Ut,Mt,jt,_t;return y=new Z({props:{href:"https://github.com/harryli0088/reinforcement-learning-pacman",$$slots:{default:[yt]},$$scope:{ctx:t}}}),ot=new Z({props:{href:"https://github.com/harryli0088/reinforcement-learning-pacman/blob/main/src/lib/train/treeSearch.ts",$$slots:{default:[xt]},$$scope:{ctx:t}}}),ct=new Z({props:{href:"https://github.com/harryli0088/reinforcement-learning-pacman/blob/main/src/lib/train/nStepSemiGradientSarsa.ts",$$slots:{default:[St]},$$scope:{ctx:t}}}),ut=new Z({props:{href:"https://github.com/harryli0088/reinforcement-learning-pacman/blob/main/src/lib/train/linearQFunction.ts",$$slots:{default:[kt]},$$scope:{ctx:t}}}),vt=new Z({props:{href:"https://svelte.dev/",$$slots:{default:[wt]},$$scope:{ctx:t}}}),Lt=new Z({props:{href:"https://www.typescriptlang.org/",$$slots:{default:[bt]},$$scope:{ctx:t}}}),Nt=new Z({props:{href:"https://github.com/daleharvey/pacman",$$slots:{default:[Tt]},$$scope:{ctx:t}}}),Gt=new Z({props:{href:"https://github.com/harryli0088/reinforcement-learning-pacman",$$slots:{default:[Pt]},$$scope:{ctx:t}}}),Ut=new Z({props:{href:"https://fontawesome.com/license",$$slots:{default:[Et]},$$scope:{ctx:t}}}),{c(){var s,c,a;e=u("main"),i=u("header"),n=u("div"),o=u("h1"),o.textContent="Reinforcement Learning Pac-Man",r=p(),d=u("br"),$=p(),v=u("div"),F(y.$$.fragment),x=p(),S=u("section"),k=u("div"),w=u("canvas"),b=p(),T=u("div"),P=u("button"),P.textContent="Start a New Game",E=p(),I=u("br"),L=p(),A=u("div"),C=u("div"),C.innerHTML="<b>How should Pac-Man be controled?</b>",G=p(),O=u("div"),R=u("button"),W=f("By a Pre-Trained Agent"),M=p(),j=u("span"),j.textContent="or",_=p(),H=u("button"),Y=f("By Myself with Arrow Keys"),q=p(),X=u("section"),X.innerHTML="<hr/>",J=p(),K=u("section"),Q=u("h2"),Q.textContent="Background",tt=p(),et=u("p"),et.textContent="For my Reinforcement Learning class, I trained an RL agent to play Pac-Man. Some of the concepts I explored and implemented include:",it=p(),st=u("ul"),nt=u("li"),F(ot.$$.fragment),rt=p(),lt=u("li"),F(ct.$$.fragment),at=p(),ht=u("li"),F(ut.$$.fragment),dt=p(),ft=u("p"),ft.textContent="For more background, implementation details, and possible future work, read my full report!",pt=p(),mt=u("footer"),gt=u("p"),$t=f("Built using "),F(vt.$$.fragment),It=f(" and "),F(Lt.$$.fragment),At=p(),Ct=u("p"),Bt=f("Based off Dale Harvey's "),F(Nt.$$.fragment),Ft=p(),Dt=u("p"),zt=f("Github Repo: "),F(Gt.$$.fragment),Ot=p(),Rt=u("p"),Wt=f("Github Logo provided by Font Awesome: "),F(Ut.$$.fragment),s="font-size",c="2em",v.style.setProperty(s,c,a?"important":""),g(i,"class","svelte-oajj78"),g(w,"id","pacman"),g(w,"class","svelte-oajj78"),g(R,"class",U=l(!0===t[2]&&"focused")+" svelte-oajj78"),g(j,"class","svelte-oajj78"),g(H,"class",V=l(!1===t[2]&&"focused")+" svelte-oajj78"),g(O,"id","agent-control-buttons"),g(O,"class","svelte-oajj78"),g(k,"id","game-container"),g(k,"class","svelte-oajj78"),g(S,"class","svelte-oajj78"),g(X,"class","svelte-oajj78"),g(K,"class","svelte-oajj78"),g(mt,"class","svelte-oajj78"),g(e,"class","svelte-oajj78")},m(s,l){a(s,e,l),c(e,i),c(i,n),c(n,o),c(n,r),c(n,d),c(n,$),c(n,v),D(y,v,null),c(e,x),c(e,S),c(S,k),c(k,w),t[3](w),c(k,b),c(k,T),c(T,P),c(k,E),c(k,I),c(k,L),c(k,A),c(A,C),c(A,G),c(A,O),c(O,R),c(R,W),c(O,M),c(O,j),c(O,_),c(O,H),c(H,Y),c(e,q),c(e,X),c(e,J),c(e,K),c(K,Q),c(K,tt),c(K,et),c(K,it),c(K,st),c(st,nt),D(ot,nt,null),c(st,rt),c(st,lt),D(ct,lt,null),c(st,at),c(st,ht),D(ut,ht,null),c(K,dt),c(K,ft),c(e,pt),c(e,mt),c(mt,gt),c(gt,$t),D(vt,gt,null),c(gt,It),D(Lt,gt,null),c(mt,At),c(mt,Ct),c(Ct,Bt),D(Nt,Ct,null),c(Ct,Ft),c(mt,Dt),c(Dt,zt),D(Gt,Dt,null),c(mt,Ot),c(mt,Rt),c(Rt,Wt),D(Ut,Rt,null),Mt=!0,jt||(_t=[m(P,"click",t[4]),m(R,"click",t[5]),m(H,"click",t[6])],jt=!0)},p(t,[e]){const i={};128&e&&(i.$$scope={dirty:e,ctx:t}),y.$set(i),(!Mt||4&e&&U!==(U=l(!0===t[2]&&"focused")+" svelte-oajj78"))&&g(R,"class",U),(!Mt||4&e&&V!==(V=l(!1===t[2]&&"focused")+" svelte-oajj78"))&&g(H,"class",V);const s={};128&e&&(s.$$scope={dirty:e,ctx:t}),ot.$set(s);const n={};128&e&&(n.$$scope={dirty:e,ctx:t}),ct.$set(n);const o={};128&e&&(o.$$scope={dirty:e,ctx:t}),ut.$set(o);const r={};128&e&&(r.$$scope={dirty:e,ctx:t}),vt.$set(r);const c={};128&e&&(c.$$scope={dirty:e,ctx:t}),Lt.$set(c);const a={};128&e&&(a.$$scope={dirty:e,ctx:t}),Nt.$set(a);const h={};128&e&&(h.$$scope={dirty:e,ctx:t}),Gt.$set(h);const u={};128&e&&(u.$$scope={dirty:e,ctx:t}),Ut.$set(u)},i(t){Mt||(B(y.$$.fragment,t),B(ot.$$.fragment,t),B(ct.$$.fragment,t),B(ut.$$.fragment,t),B(vt.$$.fragment,t),B(Lt.$$.fragment,t),B(Nt.$$.fragment,t),B(Gt.$$.fragment,t),B(Ut.$$.fragment,t),Mt=!0)},o(t){N(y.$$.fragment,t),N(ot.$$.fragment,t),N(ct.$$.fragment,t),N(ut.$$.fragment,t),N(vt.$$.fragment,t),N(Lt.$$.fragment,t),N(Nt.$$.fragment,t),N(Gt.$$.fragment,t),N(Ut.$$.fragment,t),Mt=!1},d(i){i&&h(e),z(y),t[3](null),z(ot),z(ct),z(ut),z(vt),z(Lt),z(Nt),z(Gt),z(Ut),jt=!1,s(_t)}}}function Lt(t,e,i){let s,n=null,o=!0;y((async()=>{i(1,n=new et({arena:lt,canvas:s,userActCallback:t=>o&&t.onWholeBlock(t.position)?function(t,e,i,s,n=0){const{actions:o,encodings:r}=mt(t);return o[i(t,r,e,s,n)]}(t.game,gt,$t,vt):t.desiredDirection,walls:ct}))}));return[s,n,o,function(t){S[t?"unshift":"push"]((()=>{s=t,i(0,s)}))},()=>n&&n.startNewGame(),()=>i(2,o=!0),()=>i(2,o=!1)]}return new class extends R{constructor(t){super(),O(this,t,Lt,It,o,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
