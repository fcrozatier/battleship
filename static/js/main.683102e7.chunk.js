(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{33:function(e,n,t){},34:function(e,n,t){},35:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t(1),i=t.n(a),c=t(21),o=t.n(c),s=t(37),d=t(23),l=t(4),u=t(3),h=t(39),f=t(38),b=t(24);function p(e){var n=e.dnd,t=e.unit,a=e.canRotate,i=e.rotate,c=Object(f.a)({item:{type:"ship",id:t.ship.id},collect:function(e){return{isDragging:!!e.isDragging()}}}),o=Object(l.a)(c,2),s=o[0].isDragging,d=o[1],h=n?{ref:d,onDoubleClick:function(){return i()}}:{},p=t.v?{width:"80%",height:"".concat(43*t.ship.length-10,"px"),top:"10%",left:"10%"}:{width:"".concat(43*t.ship.length-10,"px"),height:"80%",top:"10%",left:"10%"};return p=s?Object(u.a)(Object(u.a)({},p),{},{display:"none"}):p,Object(r.jsx)("div",Object(u.a)(Object(u.a)({style:p,className:"ship"},h),{},{children:n&&a&&Object(r.jsx)(b.a,{style:{color:"#fff",fontSize:"22px",position:"relative",top:"-3px",left:"5px"}})}))}p.defaultProps={dnd:!1,canRotate:!1,rotate:function(){},unit:{}};var j=p;function v(e){var n=e.unit,t=e.drawShip,a=e.hit,i=e.onClick,c=e.dnd,o=e.onDrop,s=e.onCanDrop,d=e.onCanRotate,u=e.onRotate,f=Object(h.a)({accept:"ship",drop:function(e){o(e.id)},canDrop:function(e){return s(e.id)},collect:function(e){return{canDrop:!!e.canDrop(),isOver:!!e.isOver()}}}),b=Object(l.a)(f,2),p=b[0],v=p.canDrop,O=p.isOver,m=b[1],x="cell";x+=t?" draw-ship":"",x+=a?" hit":"";var g={backgroundColor:(!O&&v?"hsl(150deg 50% 95%)":O&&v&&"hsl(150deg 80% 90%)")||O&&!v&&"hsl(0deg 100% 96%)"};return Object(r.jsx)("div",{ref:m,style:g,className:x,onClick:i,onKeyDown:i,role:"button",tabIndex:"-1",children:null!==n&&Object(r.jsx)(j,{dnd:c,unit:n,canRotate:d(n.ship.id),rotate:function(){return u(n.ship.id)}})})}v.defaultProps={unit:!1,drawShip:!1,hit:!1,dnd:!1,onClick:function(){},onCanDrop:function(){},onCanRotate:function(){},onDrop:function(){},onRotate:function(){}};var O=v,m=t(15),x=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100*Math.random(),t=0,r=function(){t+=1},a=function(){return t>=e};return{id:n,isSunk:a,hit:r,hits:t,length:e}},g=void 0,y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=[],t=[],r=function(){var n=Array(e*e).fill(null);return t.forEach((function(e){n[e.index]=e})),n},a=function(n,r){var a=n+r.length-1;if(a>=Math.pow(e,2))return!1;if(Math.floor(n/e)!==Math.floor(a/e))return!1;var i,c=Object(m.a)(t);try{for(c.s();!(i=c.n()).done;){var o=i.value;if(o.ship.id===r.id||o.v){if(o.ship.id!==r.id&&o.v){if(o.index<=n&&o.index+(o.ship.length-1)*e>=n&&n%e<=o.index%e&&a%e>=o.index%e)return!1;if(o.index<=a&&o.index+(o.ship.length-1)*e>=a&&n%e<=o.index%e&&a%e>=o.index%e)return!1}}else{if(o.index<=n&&o.index+o.ship.length-1>=n)return!1;if(o.index>=n&&o.index<=a)return!1}}}catch(s){c.e(s)}finally{c.f()}return!0},i=function(n,r){var a=n+(r.length-1)*e;if(a>=Math.pow(e,2))return!1;var i,c=Object(m.a)(t);try{for(c.s();!(i=c.n()).done;){var o=i.value;if(o.ship.id!==r.id&&o.v){if(o.index%e===n%e){if(o.index<=n&&o.index+(o.ship.length-1)*e>=n)return!1;if(o.index>=n&&o.index<=a)return!1}}else if(o.ship.id!==r.id&&!o.v){if(n<=o.index&&o.index<=a&&o.index%e<=n%e&&n%e<=(o.index+o.ship.length-1)%e)return!1;if(n<=o.index+o.ship.length-1&&o.index+o.ship.length-1<=a&&o.index%e<=n%e&&n%e<=(o.index+o.ship.length-1)%e)return!1}}}catch(s){c.e(s)}finally{c.f()}return!0},c=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];(r&&i(e,n)||!r&&a(e,n))&&t.push({ship:n,index:e,v:r})},o=function(e,n){var r=t.find((function(e){return e.ship.id===n})),c=r.ship,o=r.v;return o&&i(e,c)||!o&&a(e,c)},s=function(e,n){return o(e,n)&&t.forEach((function(r,a){r.ship.id===n&&(t[a].index=e)})),t},d=function(e){var n=t.find((function(n){return n.ship.id===e})),r=n.index,c=n.ship,o=n.v;return o&&a(r,c)||!o&&i(r,c)},l=function(e){return d(e)&&t.forEach((function(n,r){n.ship.id===e&&(t[r].v=!t[r].v)})),t},u=function(){return t.forEach((function(n,r){var c,o=!!Math.floor(2*Math.random()),s=o?i:a,d=0;do{d+=1,c=Math.floor(Math.random()*Math.pow(e,2))}while(!s(c,n.ship)||d<=100);s(c,n.ship)&&(t[r].v=o,t[r].index=c)})),g},h=function(r){var a,i=Object(m.a)(t);try{for(i.s();!(a=i.n()).done;){var c=a.value;if(!c.v&&c.index<=r&&r<=c.index+c.ship.length-1)return c.ship.hit(),n.push(r),c.ship.id;if(c.v&&r%e===c.index%e&&c.index<=r&&r<=c.index+(c.ship.length-1)*e)return c.ship.hit(),n.push(r),c.ship.id}}catch(o){i.e(o)}finally{i.f()}return n.push(r),!1},f=function(e){return t.find((function(n){return n.ship.id===e})).ship.isSunk()},b=function(){return t.every((function(e){return e.ship.isSunk()}))},p=function(){return t.reduce((function(e,n){return e-n.ship.isSunk()}),t.length)},j=function(){var n=[];return t.forEach((function(t){for(var r=0;r<t.ship.length;r+=1){var a=t.v?t.index+r*e:t.index+r;n.push(a)}})),n};if(e>=7){var v=x(5,"carrier"),O=x(4,"battleship"),y=x(3,"destroyer"),k=x(3,"submarine"),w=x(2,"patrol");c(22,v,!0),c(4,O),c(55,y),c(1,k,!0),c(36,w,!0),u()}return{canReposition:o,canRotate:d,createBoard:r,fleet:t,fleetSunk:b,hits:n,isSunk:f,position:c,randomize:u,receiveAttack:h,reposition:s,rotate:l,shipsLeft:p,unitIndices:j}},k=function(e){var n=e.boardInit,t=e.dnd,a=e.gameboard,i=e.onClick,c=e.updateBoard;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{className:"board-grid ".concat(t?"dnd-board":""),children:function(){var e=a.createBoard(),n=a.hits;return e.map((function(e,o){return Object(r.jsx)(O,{unit:e,drawShip:a.unitIndices().includes(o),hit:n.includes(o),onClick:function(){i(o)},dnd:t,onDrop:function(e){return function(e,n){c(Object(u.a)(Object(u.a)({},a),{},{fleet:a.reposition(e,n)}))}(o,e)},onCanDrop:function(e){return a.canReposition(o,e)},onCanRotate:function(e){return a.canRotate(e)},onRotate:function(e){return function(e){c(Object(u.a)(Object(u.a)({},a),{},{fleet:a.rotate(e)}))}(e)}},1e3*Math.random())}))}()}),t&&Object(r.jsxs)("div",{className:"btn-wrapper",children:[Object(r.jsx)("div",{className:"btn-container",children:Object(r.jsx)("button",{className:"btn",type:"button",onClick:function(){c(Object(u.a)(Object(u.a)({},a),{},{fleet:a.randomize()}))},children:"Random"})}),Object(r.jsx)("div",{className:"btn-container",children:Object(r.jsx)("button",{className:"btn",type:"button",onClick:function(){return n(a)},children:"Continue"})})]})]})};k.defaultProps={boardInit:function(){},dnd:!1,gameboard:y(),onClick:function(){},updateBoard:function(){}};var w=k,N=t(25),C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10*Math.random(),n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:y(),t="AI"===e,r=e,a=Array.from(new Array(100).keys()),i={},c=function(e,n){return!e.gameboard.hits.includes(n)};function o(e,n){var t=e.gameboard.receiveAttack(n);t&&(i[t]=i[t]?[].concat(Object(N.a)(i[t]),[n]):[n],e.gameboard.isSunk(t)&&delete i[t]),a.splice(a.indexOf(n),1)}var s=function(){var e=[];return Object.values(i).forEach((function(n){return n.forEach((function(n){return e.push(n)}))})),e},d=function(){for(var e=s(),n=0;n<e.length;n+=1)for(var t=e[n],r=n+1;r<e.length;r+=1){var a=e[r];if(1===Math.abs(a-t)||10===Math.abs(a-t))return[t,a]}return!1},u=function(){return a[Math.floor(Math.random()*a.length)]},h=function(){var e,n=[-1,1,-10,10],t=s();do{var r=t[Math.floor(Math.random()*t.length)];0===Math.floor(r/10)&&(n=n.filter((function(e){return-10!==e}))),9===Math.floor(r/10)&&(n=n.filter((function(e){return 10!==e}))),r%10===0&&(n=n.filter((function(e){return-1!==e}))),r%10===9&&(n=n.filter((function(e){return 1!==e}))),e=r+n[Math.floor(Math.random()*n.length)]}while(!a.includes(e));return e},f=function(e){return s().includes(e)},b=function(e){for(var n=Object(l.a)(e,2),t=n[0],r=n[1],i=Math.abs(r-t),c=t,o=r;f(o);)o+=i;for(;f(c);)c-=i;return a.includes(c)?c:a.includes(o)?o:h(c+i)};function p(e,n){if(n)return e.gameboard;var t=d();o(e,0===Object.keys(i).length?u():t?b(t):h())}var j=function(){return n.fleetSunk()},v=function(e){if(j())return e.gameboard;if(t)p(e,arguments.length<=1?void 0:arguments[1]);else{var n=!!(arguments.length<=2?void 0:arguments[2])&&(arguments.length<=2?void 0:arguments[2]);!n&&c(e,arguments.length<=1?void 0:arguments[1])&&o(e,arguments.length<=1?void 0:arguments[1])}return e.gameboard};return{attack:v,isBot:t,hasLost:j,gameboard:n,name:r,validAttack:c}},M=function(){var e=Object(a.useState)(0),n=Object(l.a)(e,2),t=n[0],r=n[1],i=Object(a.useState)(0),c=Object(l.a)(i,2),o=c[0],s=c[1],d=Object(a.useState)(C("Player1")),h=Object(l.a)(d,2),f=h[0],b=h[1],p=Object(a.useState)(C(2===t?"Player2":"AI")),j=Object(l.a)(p,2),v=j[0],O=j[1],m=Object(a.useState)(!0),x=Object(l.a)(m,2),g=x[0],y=x[1],k=Object(a.useState)(""),w=Object(l.a)(k,2),N=w[0],M=w[1],S=function(){y((function(e){return!e}))},P=function(){return v.hasLost()?f.name:!!f.hasLost()&&v.name};return[{gameboards:o,message:N,players:t,player1:f,player2:v,player1Turn:g,reset:function(e){r(e),s(0),b(C("Player1")),O(C(2===e?"Player2":"AI")),y(!0)},setGameboards:s,setPlayers:r,setPlayer1:b,setPlayer2:O,switchPlayers:S,winner:P},function(e){var n=!!P();if(1===t){var r=!f.validAttack(v,e)||n;M(r?"Try again!":""),O(Object(u.a)(Object(u.a)({},v),{},{gameboard:f.attack(v,e,n)})),b(Object(u.a)(Object(u.a)({},f),{},{gameboard:v.attack(f,r)}))}else if(2===t){var a=g?f:v,i=g?v:f,c=g?O:b,o=!a.validAttack(i,e);M(o?"Try again!":""),c(Object(u.a)(Object(u.a)({},i),{},{gameboard:a.attack(i,e,n)})),o||P()||S()}}]};function S(e){var n=e.onClick;return Object(r.jsxs)("div",{className:"btn-wrapper",children:[Object(r.jsx)("div",{className:"btn-container",children:Object(r.jsx)("button",{className:"btn",type:"button",onClick:function(){return n(1)},children:"1 Player"})}),Object(r.jsx)("div",{className:"btn-container",children:Object(r.jsx)("button",{className:"btn",type:"button",onClick:function(){return n(2)},children:"2 Players"})})]})}S.defaultProps={onClick:function(){}};var P=S;function D(e){var n,t=e.players,a=e.gameboards,i=e.info,c=e.player1Turn,o=e.winner;return t?t&&a!==t?n=Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h2",{className:"heading",children:["Player",a+1,": ","place your ships"]}),Object(r.jsx)("div",{className:"info-wrapper",children:Object(r.jsxs)("ul",{className:"info",children:[Object(r.jsx)("li",{children:"Drag'n drop to move"}),Object(r.jsx)("li",{children:"Double click to rotate"})]})})]}):t&&a===t&&!o?n=Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h2",{className:"heading",children:["Player",c?"1 ":"2 ","turn"]}),Object(r.jsx)("p",{className:"info-wrapper",children:i})]}):o&&(n=Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{className:"heading",children:"".concat(o," wins")}),Object(r.jsx)("small",{className:"info-wrapper",children:"Click below to rematch"})]})):n=Object(r.jsx)("h2",{className:"heading",children:"Battlefied"}),Object(r.jsx)("header",{className:"feedback",children:n})}D.defaultProps={gameboards:0,info:"",player1Turn:!0,players:0,winner:!1};var R=D;function I(e){var n=e.player1,t=e.player2,a=e.player1Turn,i=e.handleClick;return Object(r.jsxs)("div",{className:"display-boards",children:[Object(r.jsxs)("div",{className:"".concat(a?"my-board":"enemy-board"),children:[Object(r.jsx)("div",{className:"whose-board",children:"".concat(n.name," board")}),Object(r.jsx)(w,{gameboard:n.gameboard,onClick:i}),Object(r.jsxs)("div",{className:"info",children:["Ships left:",Object(r.jsx)("span",{style:{color:"var(--info)"},children:n.gameboard.shipsLeft()})]})]}),Object(r.jsxs)("div",{className:"".concat(a?"enemy-board":"my-board"),children:[Object(r.jsx)("div",{className:"whose-board",children:"".concat(t.name," board")}),Object(r.jsx)(w,{gameboard:t.gameboard,onClick:i}),Object(r.jsxs)("div",{className:"info",children:["Ships left:",Object(r.jsx)("span",{style:{color:"var(--info)"},children:t.gameboard.shipsLeft()})]})]})]})}I.defaultProps={player1Turn:!0,handleClick:function(){}};var A=I;t(33);var T=function(){var e=M(),n=Object(l.a)(e,2),t=n[0],i=t.gameboards,c=t.message,o=t.players,s=t.player1,d=t.player2,u=t.player1Turn,h=t.reset,f=t.setGameboards,b=t.setPlayer1,p=t.setPlayer2,j=t.switchPlayers,v=t.winner,O=n[1],m=Object(a.useState)(!1),x=Object(l.a)(m,2),g=x[0],y=x[1],k=Object(a.useState)(),N=Object(l.a)(k,2),S=N[0],D=N[1],I=function(e){h(e)},T=function(e){b(u?C(s.name,e):s),p(u?d:C(d.name,e))};return Object(r.jsxs)("div",{className:"app",children:[Object(r.jsx)(R,{players:o,gameboards:i,player1Turn:u,info:c,winner:v()}),!o&&Object(r.jsx)(P,{onClick:I}),!!o&&i!==o&&Object(r.jsx)(w,{dnd:!0,gameboards:i,gameboard:u?s.gameboard:d.gameboard,updateBoard:T,boardInit:function(e){T(e),f((function(e){return e+1})),2===o&&j()}}),!!o&&i===o&&!g&&Object(r.jsx)(A,{player1:s,player2:d,player1Turn:u,handleClick:function(e){v()||(O(e),2===o&&function(){y(!0),D(2);var e=setInterval((function(){D((function(e){return e-1}))}),1e3);setTimeout((function(){y(!1),clearInterval(e)}),2e3)}())}}),g&&!v()&&Object(r.jsx)("div",{children:"in ".concat(S,"s")}),v()&&Object(r.jsx)(P,{onClick:I})]})};t(34);o.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(s.a,{backend:d.a,children:Object(r.jsx)(T,{})})}),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.683102e7.chunk.js.map