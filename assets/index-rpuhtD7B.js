(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();function E(a){if(a.x===gridSize-1)return;const c=["down","left","right"];let l={chocolates:0,direction:null};c.forEach(s=>{const t=a.y+1;let r=a.x;s==="left"&&a.x>0&&(r-=1),s==="right"&&a.x<gridSize-1&&(r+=1);const d=grid[t][r]||0;d>l.chocolates&&(l={chocolates:d,direction:s})}),moveRobot(a,l.direction)}function w(){alert(`Game Over!
Robot 1: ${robot1.score}
Robot 2: ${robot2.score}
Total: ${robot1.score+robot2.score}`)}function h(){document.getElementById("robot1-score").textContent=`Robot 1: ${robot1.score}`,document.getElementById("robot2-score").textContent=`Robot 2: ${robot2.score}`}document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("grid"),c=5,l=[];let s={x:0,y:0,score:0,path:[]},t={x:c-1,y:0,score:0,path:[]},r="robot1",d=!1;function m(e){l.length=0;for(let i=0;i<e;i++){const o=[];for(let n=0;n<e;n++){const y=Math.floor(Math.random()*10)+1;o.push(y)}l.push(o)}}function u(){a.innerHTML="";for(let e=0;e<c;e+=1){const i=document.createElement("div");i.classList.add("row");for(let o=0;o<c;o+=1){const n=document.createElement("div");n.classList.add("cell"),n.textContent=l[o][e],console.log(n.textContent,{robot1:s},{robot2:t}),s.x===e&&s.y===o&&n.classList.add("robot1"),t.x===e&&t.y===o&&n.classList.add("robot2"),s.x===e&&s.y===o&&t.x===e&&t.y===o&&n.classList.add("both-robots");const y=s.path,L=t.path;y.forEach(f=>{f.x===e&&f.y===o&&n.classList.add("robot1v")}),L.forEach(f=>{f.x===e&&f.y===o&&n.classList.add("robot2v")}),i.appendChild(n)}a.appendChild(i)}}function p(e,i,o){e.score+=l[o][i],e.path.push({x:i,y:o}),l[o][i]=0}function g(e,i){if(console.log({robot:e},{direction:i}),e.y===c-1)return;let o=e.x,n=e.y;i==="left"&&e.x>0&&e.y<c-1?(o=o-1,n=n+1):i==="right"&&e.x<c-1&&e.y<c-1?(o=o+1,n=n+1):e.y<c-1&&(n=n+1,console.log("el if case")),console.log({tempX:o},{tempY:n}),p(e,e.x,e.y),e.x=o,e.y=n,console.log({robot:e}),u(),h()}function x(e){if(console.log({event:e},{activeRobot:r}),e.key==="Tab"){e.preventDefault(),r=r==="robot1"?"robot2":"robot1";return}const i=r==="robot1"?s:t;if(["ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){const o=e.key==="ArrowDown"?"down":e.key==="ArrowLeft"?"left":"right";r=r==="robot1"?"robot2":"robot1",g(i,o)}s.y===c-1&&t.y===c-1&&w()}function b(){s={x:0,y:0,score:0,path:[]},t={x:0,y:c-1,score:0,path:[]},r="robot1",m(c),u(),h()}document.addEventListener("keydown",x),document.getElementById("reset-button").addEventListener("click",b),document.getElementById("auto-play").addEventListener("click",()=>{d=!d,d&&E(),document.getElementById("auto-play").textContent=d?"Disable Auto-Play":"Enable Auto-Play"}),m(c),u(),h()});
