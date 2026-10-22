(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4),t=new Intl.NumberFormat(`pt-BR`,{minimumFractionDigits:0,maximumFractionDigits:1}),n=new Intl.NumberFormat(`pt-BR`,{minimumFractionDigits:1,maximumFractionDigits:1}),r=new Intl.NumberFormat(`pt-BR`,{maximumFractionDigits:0}),i=e=>t.format(Number.isFinite(e)?e:0),a=e=>n.format(Number.isFinite(e)?e:0),o=e=>r.format(Number.isFinite(e)?e:0);function s(e){return e=Math.max(0,Math.round(e)),String(Math.floor(e/60)).padStart(2,`0`)+`:`+String(e%60).padStart(2,`0`)}function c(e){return e=Math.max(0,Math.round(e)),Math.floor(e/60)+`:`+String(e%60).padStart(2,`0`)}function l(e){let t=Math.max(0,Math.round(e/6e4));return t<60?`${t}m`:`${Math.floor(t/60)}h${String(t%60).padStart(2,`0`)}`}function u(e){let t=String(e??``).trim().replace(`,`,`.`);if(t===``)return null;let n=Number(t);return Number.isFinite(n)?n:null}var d=(e,t=.5)=>Math.round(e/t)*t,f=(e,t,n)=>Math.min(n,Math.max(t,e)),p=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function m(e){let t=new Date(e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}var h=(e,t)=>new Intl.DateTimeFormat(`pt-BR`,t).format(new Date(e)),g=e=>h(e,{day:`2-digit`,month:`short`}).replace(`.`,``),_=e=>h(e,{hour:`2-digit`,minute:`2-digit`});function v(e){let t=new Date(e);return t.setHours(0,0,0,0),t.setDate(t.getDate()-t.getDay()),t.getTime()}var y=`fitlife:v1`,b={normal:`Normal`,drop:`Drop set`,cluster:`Cluster`},x={leve:`Leve`,moderada:`Moderada`,pesada:`Pesada`},S=[45,60,90,120,180],C,w=()=>{},T=()=>C,ee=e=>w=e;function E(){try{localStorage.setItem(y,JSON.stringify(C))}catch(e){console.warn(`Não foi possível salvar`,e)}}function D(e,t=!0){e(C),E(),t&&w()}function te(){try{let e=localStorage.getItem(y);if(e)return C=ne(JSON.parse(e)),C}catch(e){console.warn(`Dados ilegíveis, começando do zero`,e)}return C=ie(),E(),C}function ne(e){let t=ie();return e.config={...t.config,...e.config||{}},e.treinos=Array.isArray(e.treinos)?e.treinos:t.treinos,e.sessoes=Array.isArray(e.sessoes)?e.sessoes:[],e.ativa??=null,e.timer??=null,e.ultimoBackup??=null,e.treinos.find(t=>t.id===e.treinoAtual)||(e.treinoAtual=e.treinos[0]?.id??null),e}function re(e){C=ne(e),E(),w()}function ie(){let e=[se()];return{v:1,treinos:e,treinoAtual:e[0].id,sessoes:[],ativa:null,timer:null,ultimoBackup:null,config:{som:!0,vibracao:!0,telaLigada:!0,autoDescanso:!0,passo:2.5,metaSemanal:4}}}function O(e=`normal`,t=10,n=12){return{tipo:e,repsMin:t,repsMax:n,degraus:3,blocos:4,pausa:15}}function ae(t=`Novo exercício`){return{id:e(),nome:t,grupo:``,intensidade:`moderada`,descanso:90,video:``,nota:``,series:[O(),O(),O()]}}function oe(t=`Novo treino`){return{id:e(),nome:t,foco:``,exercicios:[]}}function se(){let t=(t,n,r,i,a,o=``)=>({id:e(),nome:t,grupo:n,intensidade:r,descanso:i,video:``,nota:o,series:a}),n=(e,t,n)=>Array.from({length:e},()=>O(`normal`,t,n));return{id:e(),nome:`Treino A – Peito e Tríceps`,foco:`Exemplo — edite ou apague à vontade`,exercicios:[t(`Supino Reto com Barra`,`Peitoral maior · Composto`,`pesada`,120,n(4,8,10),`Escápulas travadas no banco. Não estalar os cotovelos no topo.`),t(`Supino Inclinado com Halteres`,`Peitoral superior`,`moderada`,90,n(3,10,12)),t(`Crossover na Polia Média`,`Peitoral maior · Isolador`,`pesada`,90,[...n(3,10,12),O(`drop`,10,12)],`Segurar 1s no pico de contração antes de iniciar o drop.`),t(`Desenvolvimento Militar`,`Ombros`,`pesada`,150,n(4,6,8)),t(`Paralelas (Dips) com Carga`,`Peitoral inferior · Tríceps`,`pesada`,120,Array.from({length:3},()=>({...O(`cluster`,3,3),blocos:4,pausa:15})),`Foco no peitoral, tronco inclinado 30° à frente.`),t(`Tríceps Testa na Barra`,`Tríceps`,`moderada`,75,n(3,10,12)),t(`Tríceps Corda na Polia`,`Tríceps`,`leve`,60,[...n(3,12,15),O(`drop`,12,15)])]}}var k=()=>C.treinos.find(e=>e.id===C.treinoAtual)??C.treinos[0]??null;function A(e){for(let t of C.treinos){let n=t.exercicios.find(t=>t.id===e);if(n)return{treino:t,ex:n}}return null}var ce=e=>e.repsMin===e.repsMax?`${e.repsMin}`:`${e.repsMin}-${e.repsMax}`;function le(e){let t=[];for(let n of e){let e=t.at(-1),r=`${n.tipo}|${n.repsMin}|${n.repsMax}|${n.degraus}|${n.blocos}|${n.pausa}`;e&&e.chave===r?e.qtd++:t.push({chave:r,qtd:1,s:n})}return t.map(({qtd:e,s:t})=>t.tipo===`normal`?`${e} × ${ce(t)}`:t.tipo===`drop`?`${e} drop`:`${e} cluster`).join(` + `)}function j(e,t){if(!e)return`—`;if(e.tipo===`cluster`)return`${t(e.carga)} kg · ${e.partes.map(e=>e.reps).join(`+`)}`;if(e.tipo===`drop`)return e.partes.map(e=>`${t(e.carga)}×${e.reps}`).join(` ▸ `);let n=e.partes[0];return`${t(n.carga)} kg × ${n.reps}`}var M=e=>e.tipo===`cluster`?e.carga:e.partes[0]?.carga??0,ue=(e,t)=>e.tipo===`cluster`?e.carga:t.carga;function de(e){return e.partes.reduce((t,n)=>n.ok?t+ue(e,n)*(n.reps||0):t,0)}function fe(e){let t=0;for(let n of Object.values(e.exercicios))for(let e of n.series)t+=de(e);return t}var pe=(e,t)=>t<=1?e:e*(1+t/30);function me(e,t=1/0){for(let n=C.sessoes.length-1;n>=0;n--){let r=C.sessoes[n];if(r.inicio>=t)continue;let i=r.exercicios[e];if(i&&i.series.some(e=>e.concluida))return{sessao:r,ex:i}}return null}function he(e,t,n){let r=0;for(let i of C.sessoes)if(i.id!==n)for(let n of i.exercicios[e]?.series??[])n.concluida&&n.tipo===t&&(r=Math.max(r,M(n)));return r}function ge(e,t,n,r){let i=[];for(let a=0;a<n;a++)if(r?.tipo===`drop`&&r.partes[a])i.push({carga:r.partes[a].carga,reps:r.partes[a].reps,ok:!1});else{let n=a===0?e:d(i[a-1].carga*.8);i.push({carga:n,reps:t,ok:!1})}return i}function _e(e,t,n={}){let r=t?M(t):0,i=t?.partes?.[0]?.reps??e.repsMax,a={tipo:e.tipo,repsMin:e.repsMin,repsMax:e.repsMax,concluida:!1,auto:!t,...n};if(e.tipo===`cluster`){let n=t?.tipo===`cluster`?t.partes.length:e.blocos;return{...a,pausa:e.pausa,carga:r,partes:Array.from({length:n},(n,r)=>({reps:(t?.tipo===`cluster`?t.partes[r]?.reps:null)??e.repsMax,ok:!1}))}}if(e.tipo===`drop`){let n=t?.tipo===`drop`?t.partes.length:e.degraus;return{...a,partes:ge(r,i,n,t)}}return{...a,partes:[{carga:r,reps:i,ok:!1}]}}function ve(e,t){let n=e.exercicios[t.id];if(!n){let r=me(t.id,e.inicio);n={nome:t.nome,nota:``,series:t.series.map((e,t)=>_e(e,r?r.ex.series[t]??r.ex.series.at(-1):null))},e.exercicios[t.id]=n}return n}function ye(t){return C.ativa={id:e(),treinoId:t.id,nome:t.nome,inicio:Date.now(),fim:null,exercicios:{}},C.ativa}function be(e,t){if(e.tipo===t)return e;let n=M(e),r=e.partes[0]?.reps??e.repsMax,i=_e({tipo:t,repsMin:e.repsMin,repsMax:e.repsMax,degraus:3,blocos:4,pausa:15},{tipo:`normal`,partes:[{carga:n,reps:r}]},{extra:e.extra});return i.auto=!1,i}function xe(e){let t=e.partes.at(-1);e.partes.push({carga:Math.max(0,d(t.carga*.8)),reps:t.reps,ok:!1})}function Se(e,t,n){let r=e.exercicios[t],i=r.series[n],a=i.partes.length>0&&i.partes.every(e=>e.ok);if(i.concluida=a,!a){i.recorde=!1;return}let o=M(i),s=he(t,i.tipo,e.id);r.series.forEach((e,t)=>{t!==n&&e.concluida&&e.tipo===i.tipo&&(s=Math.max(s,M(e)))}),i.recorde=s>0&&o>s}function Ce(e,t){let n=e.series[t],r=e.series[t+1];if(!r||!r.auto||r.concluida)return;let i=M(n);r.tipo===`cluster`?r.carga=i:r.tipo===`drop`?r.partes=ge(i,r.partes[0].reps,r.partes.length,null):r.partes[0].carga=i}function N(e){let t=0,n=0,r=0;for(let i of Object.values(e.exercicios)){let e=i.series.filter(e=>e.concluida);t+=e.length,n+=e.filter(e=>e.recorde).length,e.length&&r++}return{series:t,recordes:n,feitos:r,volume:fe(e),duracao:(e.fim??Date.now())-e.inicio}}function we(){let e=new Map;for(let t of C.sessoes)for(let[n,r]of Object.entries(t.exercicios))r.series.some(e=>e.concluida)&&e.set(n,r.nome);return[...e].map(([e,t])=>({id:e,nome:t}))}function Te(e){let t=[];for(let n of C.sessoes){let r=n.exercicios[e];if(!r)continue;let i=r.series.filter(e=>e.concluida&&(e.tipo===`normal`||e.tipo===`drop`));if(!i.length)continue;let a=i.reduce((e,t)=>M(t)>M(e)?t:e,i[0]);t.push({ts:n.inicio,carga:M(a),reps:a.partes[0].reps,sessao:n})}return t}function Ee(){let e=new Map;for(let t of C.sessoes){let n=m(t.inicio);e.has(n)||e.set(n,[]),e.get(n).push(t)}return e}var De=e=>N(e).series>0,P={aberta:{},editEx:null,rapida:``,progEx:null,periodo:`3m`,mes:null,dia:null,rolarAtiva:!1,instalar:null},Oe={},ke={};function F(e={},t={}){Object.assign(Oe,e),Object.assign(ke,t)}var Ae=e=>document.querySelector(e),je;function I(e){let t=Ae(`#toast`);t.textContent=e,t.classList.add(`on`),clearTimeout(je),je=setTimeout(()=>t.classList.remove(`on`),2200)}function L(e){let t=Ae(`#sheet`);t.innerHTML=`<div class="fundo" data-a="fechar"></div><div class="painel" role="dialog" aria-modal="true"><div class="alca"></div>${e}</div>`,t.classList.add(`aberto`)}function R(){let e=Ae(`#sheet`);e.classList.remove(`aberto`),e.innerHTML=``}var Me=null;function z({titulo:e,texto:t=``,ok:n=`Confirmar`,perigo:r=!0,fn:i}){Me=i,L(`
    <h2 class="h-md">${p(e)}</h2>
    ${t?`<p class="mute" style="margin:8px 0 16px">${p(t)}</p>`:`<div class="mt16"></div>`}
    <button class="btn ${r?`sec danger`:``}" data-a="confirmado">${p(n)}</button>
    <button class="btn sec mt8" data-a="fechar">Cancelar</button>`)}F({fechar:()=>R(),confirmado:()=>{let e=Me;Me=null,R(),e?.()}});var B=e=>{location.hash=e},Ne=Object.assign({"/node_modules/lucide-static/icons/arrow-down.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-arrow-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v14" />
  <path d="m19 12-7 7-7-7" />
</svg>
`,"/node_modules/lucide-static/icons/arrow-left.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-arrow-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m12 19-7-7 7-7" />
  <path d="M19 12H5" />
</svg>
`,"/node_modules/lucide-static/icons/arrow-right.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-arrow-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</svg>
`,"/node_modules/lucide-static/icons/arrow-up.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-arrow-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 12 7-7 7 7" />
  <path d="M12 19V5" />
</svg>
`,"/node_modules/lucide-static/icons/bell-ring.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-bell-ring"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
  <path d="M22 8c0-2.3-.8-4.3-2-6" />
  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
  <path d="M4 2C2.8 3.7 2 5.7 2 8" />
</svg>
`,"/node_modules/lucide-static/icons/calendar.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-calendar"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v3" />
  <path d="M16 2v3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
  <path d="M3 9h18" />
</svg>
`,"/node_modules/lucide-static/icons/check.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-down.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-chevron-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 9 6 6 6-6" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-left.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-right.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-up.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-chevron-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m18 15-6-6-6 6" />
</svg>
`,"/node_modules/lucide-static/icons/circle-check.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-circle-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="m16 9-5.5 5.5L8 12" />
</svg>
`,"/node_modules/lucide-static/icons/circle-play.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-circle-play"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
  <circle cx="12" cy="12" r="10" />
</svg>
`,"/node_modules/lucide-static/icons/copy.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-copy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`,"/node_modules/lucide-static/icons/download.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-download"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15V3" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="m7 10 5 5 5-5" />
</svg>
`,"/node_modules/lucide-static/icons/dumbbell.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-dumbbell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
  <path d="m2.5 21.5 1.4-1.4" />
  <path d="m20.1 3.9 1.4-1.4" />
  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
  <path d="m9.6 14.4 4.8-4.8" />
</svg>
`,"/node_modules/lucide-static/icons/equal.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-equal"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="5" x2="19" y1="9" y2="9" />
  <line x1="5" x2="19" y1="15" y2="15" />
</svg>
`,"/node_modules/lucide-static/icons/external-link.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-external-link"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="M10 14 21 3" />
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
</svg>
`,"/node_modules/lucide-static/icons/flag.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-flag"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
</svg>
`,"/node_modules/lucide-static/icons/flame.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-flame"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
</svg>
`,"/node_modules/lucide-static/icons/grip-vertical.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-grip-vertical"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="9" cy="12" r="1" />
  <circle cx="9" cy="5" r="1" />
  <circle cx="9" cy="19" r="1" />
  <circle cx="15" cy="12" r="1" />
  <circle cx="15" cy="5" r="1" />
  <circle cx="15" cy="19" r="1" />
</svg>
`,"/node_modules/lucide-static/icons/hand.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-hand"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
  <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
</svg>
`,"/node_modules/lucide-static/icons/history.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-history"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
  <path d="M3 3v5h5" />
  <path d="M12 7v5l4 2" />
</svg>
`,"/node_modules/lucide-static/icons/hourglass.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-hourglass"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 22h14" />
  <path d="M5 2h14" />
  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
</svg>
`,"/node_modules/lucide-static/icons/layers.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-layers"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
</svg>
`,"/node_modules/lucide-static/icons/lightbulb.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-lightbulb"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
  <path d="M9 18h6" />
  <path d="M10 22h4" />
</svg>
`,"/node_modules/lucide-static/icons/list-checks.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-list-checks"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13 5h8" />
  <path d="M13 12h8" />
  <path d="M13 19h8" />
  <path d="m3 17 2 2 4-4" />
  <path d="m3 7 2 2 4-4" />
</svg>
`,"/node_modules/lucide-static/icons/lock.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-lock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</svg>
`,"/node_modules/lucide-static/icons/minus.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-minus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
</svg>
`,"/node_modules/lucide-static/icons/notebook-pen.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-notebook-pen"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
  <path d="M2 6h4" />
  <path d="M2 10h4" />
  <path d="M2 14h4" />
  <path d="M2 18h4" />
  <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
</svg>
`,"/node_modules/lucide-static/icons/pause.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-pause"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="14" y="3" width="5" height="18" rx="1" />
  <rect x="5" y="3" width="5" height="18" rx="1" />
</svg>
`,"/node_modules/lucide-static/icons/pencil.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`,"/node_modules/lucide-static/icons/play.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-play"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
</svg>
`,"/node_modules/lucide-static/icons/plus.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,"/node_modules/lucide-static/icons/rotate-ccw.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-rotate-ccw"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
  <path d="M3 3v5h5" />
</svg>
`,"/node_modules/lucide-static/icons/rotate-cw.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-rotate-cw"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
  <path d="M21 3v5h-5" />
</svg>
`,"/node_modules/lucide-static/icons/skip-forward.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-skip-forward"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 4v16" />
  <path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" />
</svg>
`,"/node_modules/lucide-static/icons/sliders-horizontal.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-sliders-horizontal"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 5H3" />
  <path d="M12 19H3" />
  <path d="M14 3v4" />
  <path d="M16 17v4" />
  <path d="M21 12h-9" />
  <path d="M21 19h-5" />
  <path d="M21 5h-7" />
  <path d="M8 10v4" />
  <path d="M8 12H3" />
</svg>
`,"/node_modules/lucide-static/icons/smartphone.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-smartphone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
  <path d="M12 18h.01" />
</svg>
`,"/node_modules/lucide-static/icons/sparkles.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`,"/node_modules/lucide-static/icons/star.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-star"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
</svg>
`,"/node_modules/lucide-static/icons/timer.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-timer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="10" x2="14" y1="2" y2="2" />
  <line x1="12" x2="15" y1="14" y2="11" />
  <circle cx="12" cy="14" r="8" />
</svg>
`,"/node_modules/lucide-static/icons/trash-2.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-trash-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,"/node_modules/lucide-static/icons/trending-up.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-trending-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 7h6v6" />
  <path d="m22 7-8.5 8.5-5-5L2 17" />
</svg>
`,"/node_modules/lucide-static/icons/trophy.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-trophy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" />
  <path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" />
  <path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" />
  <path d="M4 22h16" />
  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
  <path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />
</svg>
`,"/node_modules/lucide-static/icons/upload.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-upload"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v12" />
  <path d="m17 8-5-5-5 5" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
</svg>
`,"/node_modules/lucide-static/icons/volume-2.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-volume-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
  <path d="M16 9a5 5 0 0 1 0 6" />
  <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
</svg>
`,"/node_modules/lucide-static/icons/wifi-off.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-wifi-off"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20h.01" />
  <path d="M8.5 16.429a5 5 0 0 1 7 0" />
  <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
  <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
  <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
  <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
  <path d="m2 2 20 20" />
</svg>
`,"/node_modules/lucide-static/icons/wifi.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-wifi"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20h.01" />
  <path d="M2 8.82a15 15 0 0 1 20 0" />
  <path d="M5 12.859a10 10 0 0 1 14 0" />
  <path d="M8.5 16.429a5 5 0 0 1 7 0" />
</svg>
`,"/node_modules/lucide-static/icons/x.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,"/node_modules/lucide-static/icons/zap.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-zap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
</svg>
`}),Pe={};for(let[e,t]of Object.entries(Ne)){let n=e.split(`/`).pop().replace(`.svg`,``);Pe[n]=t}function V(e,t=20,n=``){let r=Pe[e];return r?r.replace(/<!--[\s\S]*?-->/g,``).replace(/width="24"/,`width="${t}"`).replace(/height="24"/,`height="${t}"`).replace(/class="[^"]*"/,`class="ic ${n}" aria-hidden="true"`):``}var H={mudou:()=>{},tick:()=>{}};function Fe(){let e=T().timer;return e?e.fim==null?e.restante??0:Math.max(0,e.fim-Date.now()):0}var U=()=>Math.ceil(Fe()/1e3),Ie=()=>!!T().timer&&T().timer.fim==null;function Le({seg:e,tipo:t=`descanso`,ref:n=null,proxima:r=null}){Re();let i=Date.now();D(a=>{a.timer={inicio:i,fim:i+e*1e3,restante:null,total:e,tipo:t,ref:n,proxima:r,terminou:!1}},!1),H.mudou()}function Re(){let e=T(),t=e.timer;if(!t||t.tipo!==`descanso`||!t.ref||!e.ativa)return;let n=e.ativa.exercicios[t.ref.exId]?.series[t.ref.idx];if(!n)return;let r=Math.round((Date.now()-t.inicio)/1e3);D(()=>{n.descansoReal=Math.min(r,3600)},!1)}function W(){Re(),D(e=>{e.timer=null},!1),H.mudou()}function ze(e){let t=T().timer;t&&(D(()=>{t.fim==null?t.restante=Math.max(0,(t.restante??0)+e*1e3):t.fim+=e*1e3,t.total=Math.max(t.total,Math.ceil(Fe()/1e3)),t.terminou=Fe()<=0},!1),H.mudou())}function Be(){let e=T().timer;e&&e.fim!=null&&(D(()=>{e.restante=Math.max(0,e.fim-Date.now()),e.fim=null},!1),H.mudou())}function Ve(){let e=T().timer;e&&e.fim==null&&(D(()=>{e.fim=Date.now()+(e.restante??0),e.restante=null},!1),H.mudou())}function He(e){let t=T().timer;t&&(D(()=>{t.total=e,t.fim=t.inicio+e*1e3,t.restante=null,t.terminou=t.fim<=Date.now()},!1),H.mudou())}var G=null;function Ue(){try{G??=new(window.AudioContext||window.webkitAudioContext),G.state===`suspended`&&G.resume()}catch{}}function We(e=3){try{if(Ue(),!G)return;for(let t=0;t<e;t++){let n=G.createOscillator(),r=G.createGain(),i=G.currentTime+t*.28;n.type=`square`,n.frequency.value=t===e-1?1320:880,r.gain.setValueAtTime(1e-4,i),r.gain.exponentialRampToValueAtTime(.25,i+.02),r.gain.exponentialRampToValueAtTime(1e-4,i+.2),n.connect(r).connect(G.destination),n.start(i),n.stop(i+.22)}}catch{}}function Ge(e=15){try{navigator.vibrate?.(e)}catch{}}function Ke(e){let{som:t,vibracao:n}=T().config,r=e.tipo===`pausa`;t&&We(r?2:3),n&&Ge(r?[150,80,150]:[250,100,250,100,500])}function qe(){let e=T().timer;e&&(e.fim!=null&&!e.terminou&&Date.now()>=e.fim?(D(()=>{e.terminou=!0},!1),Ke(e),H.mudou()):H.tick())}function Je(){setInterval(qe,250),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&qe()})}var K=null;async function Ye(e){if(`wakeLock`in navigator)try{e&&!K?(K=await navigator.wakeLock.request(`screen`),K.addEventListener(`release`,()=>{K=null})):!e&&K&&(await K.release(),K=null)}catch{}}function Xe(e){let t={leve:`Leve`,moderada:`Moderada`,pesada:`Pesada`}[e]??e;return`<span class="badge ${p(e)}">${t}</span>`}function Ze(e){let t=[],n=e.series.map((e,t)=>e.tipo===`drop`?t+1:0).filter(Boolean),r=e.series.filter(e=>e.tipo===`cluster`).length;return n.length&&t.push(`<span class="badge tec">${V(`layers`,12)} Drop set · Série ${n.join(`, `)}</span>`),r&&t.push(`<span class="badge tec">${V(`layers`,12)} Cluster set${r>1?` ×${r}`:``}</span>`),t.join(``)}function Qe(){let e=T(),t=e.ativa,n=t?e.treinos.find(e=>e.id===t.treinoId)??k():k();if(!n)return{top:`<h1>Treino</h1>`,html:`<div class="vazio">${V(`dumbbell`,40)}<p>Você ainda não tem nenhum treino.</p><button class="btn" data-a="novo-treino">Criar primeiro treino</button></div>`,nav:!0};let r=h(Date.now(),{weekday:`long`,day:`numeric`,month:`long`}),i=n.exercicios.length,a=n.exercicios.filter(e=>{let n=t?.exercicios[e.id];return n&&n.series.filter(e=>!e.extra).every(e=>e.concluida)}).length,s=i?Math.round(a/i*100):0,u=t?N(t):null,d=e.treinos.length>1||!t?`<div class="periodos" style="margin:12px 0 0">
          ${e.treinos.map(e=>`<button class="chip ${e.id===n.id?`on`:``}" ${t?`disabled style="opacity:.5"`:`data-a="escolher-treino" data-id="${e.id}"`}>${p(e.nome.split(`–`)[0].trim())}</button>`).join(``)}
          ${t?``:`<button class="chip" data-a="novo-treino">${V(`plus`,14)} Novo</button>`}
        </div>`:``,f=n.exercicios.map((e,r)=>{let i=t?.exercicios[e.id],a=i?i.series.filter(e=>e.concluida).length:0,o=i?i.series.length:e.series.length,s=!!i&&i.series.filter(e=>!e.extra).every(e=>e.concluida),l=!s&&a>0,u=n.exercicios.find(e=>{let n=t?.exercicios[e.id];return!(n&&n.series.filter(e=>!e.extra).every(e=>e.concluida))}),d=t&&u?.id===e.id,f=s?`<span class="stat-ok">${V(`circle-check`,16)} Concluído (${a}/${o} séries)</span>`:l?`<span class="stat-and">Em andamento · ${a}/${o} séries</span>`:`<span class="stat-pend">PENDENTE</span>`,m=s?`Registro`:l?`Continuar`:`Iniciar`,h=e.video?`<a class="vid on" href="${p(e.video)}" target="_blank" rel="noopener" aria-label="Ver vídeo de ${p(e.nome)}">${V(`circle-play`,24)}</a>`:`<button class="vid" data-a="sem-video" aria-label="Sem vídeo cadastrado">${V(`circle-play`,24)}</button>`;return`
      <article class="card ex-card ${d?`hl`:``}">
        <div class="row between">
          <div class="row wrap grow" style="gap:6px">
            ${Xe(e.intensidade)}
            ${Ze(e)}
            <span class="badge neutro">${V(`hourglass`,12)} ${c(e.descanso)}</span>
          </div>
          ${h}
        </div>
        <a href="#/exercicio/${e.id}"><div class="nome">${r+1}. ${p(e.nome)}</div></a>
        <div class="resumo">${p(le(e.series))}${e.grupo?` <span class="mute" style="font-weight:400">· ${p(e.grupo)}</span>`:``}</div>
        ${e.nota?`<div class="nota">${V(`lightbulb`,16)}<span>${p(e.nota)}</span></div>`:``}
        <div class="ex-foot">
          ${f}
          <a class="btn ${s||!d?`sec`:``} sm" href="#/exercicio/${e.id}">${m}${s?``:V(`arrow-right`,16)}</a>
        </div>
      </article>`}).join(``),m=`
    <section class="card hl" style="margin-top:8px">
      <div class="row wrap" style="gap:8px">
        <span class="badge neutro" style="text-transform:uppercase">${V(`calendar`,12)} ${p(r)}</span>
      </div>
      <h2 class="h-lg mt8">${p(n.nome)}</h2>
      ${n.foco?`<p class="mute" style="margin:4px 0 0">${p(n.foco)}</p>`:``}
      ${d}
      <div class="inset mt16" style="padding:12px">
        <div class="row between"><span class="caps mute">Progresso da sessão</span><b class="num">${a} / ${i} exercícios <span class="mute">(${s}%)</span></b></div>
        <div class="bar mt8"><i style="width:${s}%"></i></div>
      </div>
      ${t?`<div class="metrics">
              <div class="metric"><span class="caps mute">Duração</span><b data-dur="${t.inicio}">${l(Date.now()-t.inicio)}</b></div>
              <div class="metric"><span class="caps mute">Carga total</span><b>${o(u.volume)} <small class="mute" style="font-size:12px">kg</small></b></div>
            </div>`:`<p class="mute sm" style="margin:12px 0 0">Toque em um exercício para começar. O treino é iniciado automaticamente.</p>`}
      <div class="row between mt12">
        <a class="link-btn" href="#/editar">${V(`pencil`,14)} Editar treino</a>
      </div>
    </section>
    ${i?f:`<div class="vazio">${V(`list-checks`,36)}<p>Este treino ainda não tem exercícios.</p><a class="btn" href="#/editar">Adicionar exercícios</a></div>`}
  `,g=i?t?`<button class="btn cta-dock" data-a="finalizar">${V(`circle-check`,20)} FINALIZAR TREINO</button>`:`<button class="btn cta-dock" data-a="iniciar">${V(`play`,20)} INICIAR TREINO</button>`:``;return{top:`<h1>Treino</h1><span class="tag-ativo ${navigator.onLine?``:`off`}">${navigator.onLine?`Pronto`:`Offline`}</span>`,html:m,cta:g,nav:!0}}function $e(){let e=T().ativa,t=N(e);t.series===0?L(`
      <h2 class="h-md">Nenhuma série registrada</h2>
      <p class="mute" style="margin:8px 0 16px">Você ainda não concluiu nenhuma série neste treino. Quer continuar ou descartar a sessão?</p>
      <button class="btn" data-a="fechar">Continuar treinando</button>
      <button class="btn sec danger mt8" data-a="descartar">Descartar sessão</button>`):L(`
    <h2 class="h-md">Finalizar treino?</h2>
    <div class="metrics">
      <div class="metric"><span class="caps mute">Duração</span><b>${l(t.duracao)}</b></div>
      <div class="metric"><span class="caps mute">Carga total</span><b>${o(t.volume)} kg</b></div>
      <div class="metric"><span class="caps mute">Séries</span><b>${t.series}</b></div>
      <div class="metric"><span class="caps mute">Recordes</span><b class="lime">${t.recordes}</b></div>
    </div>
    <button class="btn mt16" data-a="salvar-treino">Salvar treino</button>
    <button class="btn sec mt8" data-a="fechar">Continuar treinando</button>
    <button class="btn sec danger mt8" data-a="descartar">Descartar sessão</button>`)}F({iniciar:()=>{D(e=>ye(k()??e.treinos[0])),I(`Treino iniciado. Bom treino!`)},"escolher-treino":e=>D(t=>t.treinoAtual=e.dataset.id),"novo-treino":()=>{D(e=>{let t=oe(`Treino ${String.fromCharCode(65+e.treinos.length)}`);e.treinos.push(t),e.treinoAtual=t.id},!1),P.editEx=null,B(`#/editar`)},"sem-video":()=>I(`Sem vídeo cadastrado. Adicione o link em Editar treino.`),finalizar:$e,"salvar-treino":()=>{W();let e=T().ativa;D(t=>{e.fim=Date.now();for(let t of Object.keys(e.exercicios))e.exercicios[t].series=e.exercicios[t].series.filter(e=>e.concluida),e.exercicios[t].series.length||delete e.exercicios[t];t.sessoes.push(e),t.ativa=null},!1),R(),I(`Treino salvo no histórico`),B(`#/sessao/${e.id}`)},descartar:()=>{W(),D(e=>e.ativa=null),R(),B(`#/`),I(`Sessão descartada`)}});function et(e){let t=A(e);t&&D(e=>{e.ativa||ye(t.treino),ve(e.ativa,t.ex)},!1)}var q=()=>{let e=T(),{ex:t,treino:n}=A(P.exAtual);return{d:e,ex:t,treino:n,reg:e.ativa.exercicios[t.id]}};function tt({campo:e,i:t,p:n=0,valor:r,passo:o,un:s,casas:c}){let l=c===1?a(r):String(Math.round(r||0));return`<div class="stepper">
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="-1" aria-label="Diminuir">−${i(o)}</button>
    <div class="valor"><input class="num-input" inputmode="${c===1?`decimal`:`numeric`}" data-in="${e}" data-i="${t}" data-p="${n}" data-fmt="${c}" value="${l}" aria-label="${e===`reps`?`Repetições`:`Carga em kg`}"><span class="un">${s}</span></div>
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="1" aria-label="Aumentar">+${i(o)}</button>
  </div>`}function nt({campo:e,i:t,p:n=0,valor:r,casas:i}){let o=i===1?a(r):String(Math.round(r||0));return`<div class="stepper-mini">
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="-1" aria-label="Diminuir">−</button>
    <div class="valor"><input class="num-input" inputmode="${i===1?`decimal`:`numeric`}" data-in="${e}" data-i="${t}" data-p="${n}" data-fmt="${i}" value="${o}" aria-label="${e===`reps`?`Repetições`:`Carga em kg`}"></div>
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="1" aria-label="Aumentar">+</button>
  </div>`}function rt(e,t){let n=M(e)-M(t);if(Math.abs(n)>.001)return n>0?`<span class="trend up">↑ +${i(n)}</span>`:`<span class="trend dn">↓ ${i(n)}</span>`;let r=(e.partes[0]?.reps??0)-(t.partes[0]?.reps??0);return r>0?`<span class="trend up">↑ +${r} rep</span>`:r<0?`<span class="trend dn">↓ ${r} rep</span>`:`<span class="trend eq">=</span>`}function it(e,t,n){let r=e.tipo===`cluster`?`${e.partes.length} × ${ce(e)} reps`:`${ce(e)} reps`,i=e.concluida?`<span class="tec-chip ${e.tipo}">${b[e.tipo]}</span>`:`<button class="tec-chip ${e.tipo}" data-a="tec" data-i="${t}" aria-label="Mudar técnica da série ${t+1}">${b[e.tipo]} ${V(`chevron-down`,12)}</button>`;return`<div class="serie-h">
    <span class="t">Série ${t+1}</span>${i}
    ${e.recorde?`<span class="badge recorde">${V(`trophy`,12)} Recorde</span>`:``}
    ${e.extra?`<span class="badge neutro">Extra</span>`:``}
    <span class="grow"></span>
    ${n?`<span class="caps lime">Em andamento</span>`:`<span class="sm mute">Meta: ${r}</span>`}
  </div>`}function at(e,t,n,r){return e.concluida?r&&r.tipo===`descanso`&&r.ref&&r.ref.exId===n.id&&r.ref.idx===t&&!r.terminou?`<div class="descanso-real">${V(`timer`,14)} Descansando… <b class="num lime" data-timer-t>${s(U())}</b></div>`:e.descansoReal==null?`<div class="descanso-real">${V(`circle-check`,14)} Concluído</div>`:`<div class="descanso-real">${V(`circle-check`,14)} Concluído · descansou ${c(e.descansoReal)} <span class="sub">(meta ${c(n.descanso)})</span></div>`:``}function ot(e,t,n,r){let o=t.series[n],s=o.tipo===`normal`?`<div class="serie-resumo">
          <div><span class="caps k">Carga</span><div class="v">${a(o.partes[0].carga)}<small>kg</small></div></div>
          <div><span class="caps k">Reps</span><div class="v">${o.partes[0].reps}</div></div>
          <span class="grow"></span>
          <span class="check ${o.concluida?`on`:``}" aria-hidden="true">${V(`check`,24)}</span>
        </div>`:`<div class="serie-resumo">
          <div class="grow"><span class="caps k">${o.tipo===`drop`?`${o.partes.length} degraus`:`Carga fixa ${a(o.carga)} kg`}</span>
          <div class="v" style="font-size:20px;line-height:26px">${p(j(o,i))}</div></div>
          <span class="check ${o.concluida?`on`:``}" aria-hidden="true">${V(`check`,24)}</span>
        </div>`;return`<div class="serie" ${o.concluida?``:`data-a="abrir-serie" data-i="${n}" role="button" tabindex="0"`}>
    ${it(o,n,!1)}
    ${s}
    ${at(o,n,e,r)}
    ${o.concluida?`<button class="link-btn" style="margin-top:4px" data-a="reabrir" data-i="${n}">${V(`rotate-ccw`,14)} Reabrir série</button>`:``}
  </div>`}function st(e,t,n,r,a,o){let c=t.series[n],l=a?`Última: ${p(j(a,i))}`:``;if(c.tipo===`normal`){let e=c.partes[0];return`<div class="serie ativa">
      ${it(c,n,!0)}
      <div class="row between mt12"><span class="caps mute">Carga de trabalho</span><span class="sm mute">${l}</span></div>
      <div class="mt8">${tt({campo:`carga`,i:n,valor:e.carga,passo:r,un:`kg`,casas:1})}</div>
      <div class="row between mt12"><span class="caps mute">Repetições</span><span class="sm lime">Alvo: ${ce(c)} reps</span></div>
      <div class="mt8">${tt({campo:`reps`,i:n,valor:e.reps,passo:1,un:`reps`,casas:0})}</div>
      <button class="btn mt16" data-a="salvar" data-i="${n}">${V(`circle-check`,20)} Salvar Série ${n+1}</button>
    </div>`}if(c.tipo===`drop`){let e=c.partes.map((e,t)=>{let r=c.partes[t-1],i=r&&r.carga>0?Math.round((1-e.carga/r.carga)*100):0,a=t===0?`Base`:`${t===c.partes.length-1?`Drop final`:`Drop`} −${i}%`;return`<div class="parte ${e.ok?`ok`:``}">
          <div class="topo">
            <span class="caps ${t===0?`lime`:`ok`}">Degrau ${t+1} · ${a}</span>
            <span class="row" style="gap:4px">
              ${t===c.partes.length-1&&c.partes.length>1&&!e.ok?`<button class="icon-btn" style="width:40px;height:40px" data-a="rem-parte" data-i="${n}" aria-label="Remover degrau">${V(`x`,16)}</button>`:``}
              <button class="check sm ${e.ok?`on`:``}" data-a="ok-parte" data-i="${n}" data-p="${t}" aria-label="Confirmar degrau ${t+1}" aria-pressed="${e.ok}">${V(`check`,22)}</button>
            </span>
          </div>
          <div class="grid2">
            <div><span class="caps">Carga (kg)</span>${nt({campo:`carga`,i:n,p:t,valor:e.carga,casas:1})}</div>
            <div><span class="caps">Reps</span>${nt({campo:`reps`,i:n,p:t,valor:e.reps,casas:0})}</div>
          </div>
        </div>`}).join(``);return`<div class="serie ativa">
      ${it(c,n,!0)}
      <p class="sm mute" style="margin:6px 0 0">Reduza a carga logo após a falha em cada degrau. O descanso só começa ao final do bloco.</p>
      <div class="bloco">${e}</div>
      <button class="link-btn" data-a="add-degrau" data-i="${n}">${V(`plus`,16)} Adicionar degrau (sugerir −20%)</button>
    </div>`}let u=o&&o.tipo===`pausa`&&!o.terminou,d=c.partes.map((e,t)=>{let r=u&&e.ok&&t===c.partes.findLastIndex(e=>e.ok);return`<div class="parte ${e.ok?`ok`:``}">
        <div class="topo">
          <span class="caps">Bloco ${t+1}</span>
          <span class="row" style="gap:6px">
            ${r?`<span class="pausa-chip">${V(`timer`,14)} <span data-pausa-t>${s(U())}</span></span>`:``}
            ${t===c.partes.length-1&&c.partes.length>1&&!e.ok?`<button class="icon-btn" style="width:40px;height:40px" data-a="rem-parte" data-i="${n}" aria-label="Remover bloco">${V(`x`,16)}</button>`:``}
            <button class="check sm ${e.ok?`on`:``}" data-a="ok-parte" data-i="${n}" data-p="${t}" aria-label="Confirmar bloco ${t+1}" aria-pressed="${e.ok}">${V(`check`,22)}</button>
          </span>
        </div>
        <div><span class="caps" style="display:block;margin-bottom:4px;color:var(--mute);font-size:10px">Reps</span>${nt({campo:`reps`,i:n,p:t,valor:e.reps,casas:0})}</div>
      </div>`}).join(``);return`<div class="serie ativa">
    ${it(c,n,!0)}
    <p class="sm mute" style="margin:6px 0 0">Pausa curta de ${c.pausa}s entre os blocos. O descanso normal começa após o último.</p>
    <div class="row between mt12"><span class="caps mute">Carga fixa</span><span class="sm mute">${l}</span></div>
    <div class="mt8">${tt({campo:`cargaCluster`,i:n,valor:c.carga,passo:r,un:`kg`,casas:1})}</div>
    <div class="bloco">${d}</div>
    <button class="link-btn" data-a="add-bloco" data-i="${n}">${V(`plus`,16)} Adicionar bloco</button>
  </div>`}function ct({id:e}){let t=A(e),n=`<a class="icon-btn" href="#/" aria-label="Voltar">${V(`arrow-left`,24)}</a>`;if(!t)return{top:`${n}<h1 class="sub">Exercício</h1>`,html:`<div class="vazio">${V(`x`,36)}<p>Exercício não encontrado.</p><a class="btn" href="#/">Voltar ao treino</a></div>`,nav:!1};P.exAtual=e;let r=T(),{ex:a,treino:s}=t,l=r.ativa.exercicios[a.id],u=me(a.id,r.ativa.inicio),d=r.config.passo,f=r.timer,m=l.series.findIndex(e=>!e.concluida),g=P.aberta[a.id],_=g!=null&&l.series[g]&&!l.series[g].concluida?g:m,v=a.video?`<a class="chip" href="${p(a.video)}" target="_blank" rel="noopener">${V(`circle-play`,16)} Ver vídeo ${V(`external-link`,12)}</a>`:`<button class="chip" data-a="sem-video">${V(`circle-play`,16)} Ver vídeo</button>`,y=u?`<section class="card ultima">
        <div class="row between"><span class="row" style="gap:6px"><span class="lime">${V(`history`,16)}</span><b>Última vez</b> <span class="mute">(${h(u.sessao.inicio,{day:`numeric`,month:`short`}).replace(`.`,``)})</span></span>
        <span class="caps ok">Vol. ${o(u.ex.series.reduce((e,t)=>e+de(t),0))} kg</span></div>
        <div class="grid">${u.ex.series.map((e,t)=>{let n=l.series[t],r=n?.concluida?rt(n,e):``;return`<div class="it"><span class="mute">S${t+1}</span> <b>${p(j(e,i))}</b> ${r}</div>`}).join(``)}</div>
      </section>`:`<section class="card"><div class="row" style="gap:8px"><span class="lime">${V(`sparkles`,18)}</span><span class="mute">Primeira vez neste exercício. Os valores que você registrar hoje viram a referência da próxima sessão.</span></div></section>`,b=l.series.map((e,t)=>{if(t===_){let e=u?u.ex.series[t]??u.ex.series.at(-1):null;return st(a,l,t,d,e,f)}return ot(a,l,t,f)}).join(``),S=s.exercicios.findIndex(e=>e.id===a.id),C=s.exercicios[S+1],w=l.series.every(e=>e.concluida),ee=C?`<a class="card row between" href="#/exercicio/${C.id}" style="${w?`border-color:var(--lime)`:``}">
        <div><span class="caps mute">Próximo exercício</span><div class="h-md" style="margin-top:2px">${p(C.nome)}</div></div>
        <span class="icon-btn" style="background:var(--inset)">${V(`arrow-right`,20)}</span></a>`:`<a class="card row between" href="#/" style="${w?`border-color:var(--lime)`:``}">
        <div><span class="caps mute">Último exercício</span><div class="h-md" style="margin-top:2px">Voltar e finalizar o treino</div></div>
        <span class="icon-btn" style="background:var(--inset)">${V(`arrow-right`,20)}</span></a>`,E=`
    <section style="margin-top:8px">
      ${a.grupo?`<div class="caps lime">${p(a.grupo)}</div>`:``}
      <h2 class="h-lg" style="margin-top:4px">${p(a.nome)}</h2>
      <div class="mt8"><span class="badge lime" style="text-transform:none;letter-spacing:0;font-size:13px">${p(le(a.series))}</span></div>
      <div class="row wrap mt12" style="gap:8px">
        <span class="badge ${p(a.intensidade)}">${x[a.intensidade]??a.intensidade}</span>
        <button class="chip" data-a="editar-descanso">${V(`timer`,16)} Descanso: ${c(a.descanso)} ${V(`pencil`,12)}</button>
        ${v}
      </div>
      ${a.nota?`<div class="nota mt12" style="margin-bottom:12px">${V(`lightbulb`,16)}<span>${p(a.nota)}</span></div>`:`<div class="mt12"></div>`}
    </section>
    ${y}
    <div class="row between" style="margin:16px 0 8px"><span class="caps mute">Execução · Séries</span><span class="sm mute">${l.series.filter(e=>e.concluida).length}/${l.series.length} concluídas</span></div>
    ${b}
    <button class="btn sec" data-a="add-serie">${V(`plus`,20)} Adicionar série</button>
    <div class="card mt16">
      <label class="caps mute" for="nota-ex">Anotações do exercício</label>
      <textarea id="nota-ex" class="field mt8" data-in="nota-ex" placeholder="Ex.: banco na inclinação 3, pegada neutra…">${p(l.nota)}</textarea>
    </div>
    ${ee}
  `;return{top:`${n}<h1 class="sub">Detalhes do exercício</h1>`,html:E,nav:!1}}function lt(e){let{d:t,ex:n,reg:r,treino:a}=q();if(!t.config.autoDescanso)return;let o=r.series.findIndex(e=>!e.concluida),s;if(o>=0)s={texto:`Série ${o+1} · ${j(r.series[o],i)}`,exId:n.id};else{let e=a.exercicios[a.exercicios.findIndex(e=>e.id===n.id)+1];s=e?{texto:`Próximo exercício: ${e.nome}`,exId:e.id}:{texto:`Treino completo! Finalize na tela inicial.`,exId:null}}Le({seg:n.descanso,tipo:`descanso`,ref:{exId:n.id,idx:e},proxima:s})}function ut(e){let{d:t}=q(),n=P.exAtual;D(()=>{Se(t.ativa,n,e),Ce(t.ativa.exercicios[n],e)},!1),P.aberta[n]=void 0,P.rolarAtiva=!0,lt(e),t.config.vibracao&&Ge(30)}function J(){D(()=>{})}F({"abrir-serie":e=>{P.aberta[P.exAtual]=Number(e.dataset.i),P.rolarAtiva=!0,J()},passo:e=>{let{campo:t,i:n,p:r,d:i}=e.dataset,{d:a,reg:o}=q(),s=o.series[Number(n)],c=Number(i);D(()=>{if(s.auto=!1,t===`cargaCluster`)s.carga=Math.max(0,Math.round(((s.carga||0)+c*a.config.passo)*100)/100);else if(t===`carga`){let e=s.partes[Number(r)];e.carga=Math.max(0,Math.round(((e.carga||0)+c*a.config.passo)*100)/100)}else{let e=s.partes[Number(r)];e.reps=Math.max(0,(e.reps||0)+c)}})},salvar:e=>{let t=Number(e.dataset.i),{reg:n}=q(),r=n.series[t];if(!(r.partes[0].reps>0))return I(`Informe as repetições`);D(()=>{r.partes[0].ok=!0},!1),ut(t),J()},"ok-parte":e=>{let t=Number(e.dataset.i),n=Number(e.dataset.p),{d:r,reg:i}=q(),a=i.series[t],o=a.partes[n];if(!o.ok&&!(o.reps>0))return I(`Informe as repetições`);D(()=>{o.ok=!o.ok},!1),o.ok&&r.config.vibracao&&Ge(20);let s=a.partes.every(e=>e.ok);o.ok&&s?ut(t):o.ok&&a.tipo===`cluster`&&Le({seg:a.pausa,tipo:`pausa`}),J()},"add-degrau":e=>{let t=q().reg.series[Number(e.dataset.i)];D(()=>xe(t))},"add-bloco":e=>{let t=q().reg.series[Number(e.dataset.i)];D(()=>t.partes.push({reps:t.partes.at(-1)?.reps??t.repsMax,ok:!1}))},"rem-parte":e=>{let t=q().reg.series[Number(e.dataset.i)];D(()=>t.partes.pop())},reabrir:e=>{let t=Number(e.dataset.i),n=q().reg.series[t];D(()=>{n.partes.forEach(e=>e.ok=!1),n.concluida=!1,n.recorde=!1,delete n.descansoReal},!1),P.aberta[P.exAtual]=t,P.rolarAtiva=!0,J()},tec:e=>{let t=Number(e.dataset.i),n=q().reg.series[t];L(`
        <h2 class="h-md">Técnica da série ${t+1}</h2>
        <p class="mute" style="margin:6px 0 14px">Vale só para esta série, neste treino.</p>
        ${[[`normal`,`Normal`,`Uma série com carga e repetições fixas.`],[`drop`,`Drop set`,`Degraus de carga menor, sem descanso entre eles.`],[`cluster`,`Cluster`,`Mini-blocos com pausa curta entre eles.`]].map(([e,r,i])=>`<button class="op ${n.tipo===e?`on`:``}" data-a="set-tec" data-i="${t}" data-tipo="${e}"><div class="grow"><b>${r}</b><span>${i}</span></div>${n.tipo===e?V(`check`,20,`lime`):``}</button>`).join(``)}`)},"set-tec":e=>{let t=Number(e.dataset.i),{reg:n}=q();D(()=>{n.series[t]=be(n.series[t],e.dataset.tipo)},!1),P.aberta[P.exAtual]=t,R(),J()},"add-serie":()=>{L(`
        <h2 class="h-md">Adicionar série</h2>
        <p class="mute" style="margin:6px 0 14px">Escolha a técnica da nova série.</p>
        ${[[`normal`,`Normal`],[`drop`,`Drop set`],[`cluster`,`Cluster`]].map(([e,t])=>`<button class="op" data-a="nova-serie" data-tipo="${e}"><div class="grow"><b>${t}</b></div>${V(`plus`,20)}</button>`).join(``)}`)},"nova-serie":e=>{let{reg:t}=q(),n=t.series.at(-1);D(()=>{let r=O(e.dataset.tipo,n?.repsMin??10,n?.repsMax??12);t.series.push(_e(r,n?{tipo:`normal`,partes:[{carga:M(n),reps:n.partes[0]?.reps}]}:null,{extra:!0}))},!1),P.aberta[P.exAtual]=t.series.length-1,P.rolarAtiva=!0,R(),J()},"editar-descanso":()=>{let{ex:e}=q();L(`
        <h2 class="h-md">Descanso deste exercício</h2>
        <p class="mute" style="margin:6px 0 14px">O timer usa este tempo ao concluir cada série. Fica salvo no treino.</p>
        <div class="presets">${S.map(t=>`<button class="${e.descanso===t?`on`:``}" data-a="set-descanso" data-v="${t}">${c(t)}</button>`).join(``)}</div>
        <div class="row between mt16">
          <button class="btn sec sm" data-a="set-descanso" data-v="${Math.max(15,e.descanso-15)}">−15s</button>
          <b class="h-md num">${c(e.descanso)}</b>
          <button class="btn sec sm" data-a="set-descanso" data-v="${e.descanso+15}">+15s</button>
        </div>
        <button class="btn mt16" data-a="fechar">Pronto</button>`)},"set-descanso":e=>{let{ex:t}=q();D(()=>{t.descanso=Number(e.dataset.v)},!1),document.querySelector(`[data-a="editar-descanso"]`)?.click(),J()}},{carga:(e,t)=>{let n=q().reg.series[Number(e.i)];D(()=>{n.auto=!1,n.partes[Number(e.p)].carga=u(t)??0},!1)},cargaCluster:(e,t)=>{let n=q().reg.series[Number(e.i)];D(()=>{n.auto=!1,n.carga=u(t)??0},!1)},reps:(e,t)=>{let n=q().reg.series[Number(e.i)];D(()=>{n.partes[Number(e.p)].reps=Math.max(0,Math.round(u(t)??0))},!1)},"nota-ex":(e,t)=>{let{reg:n}=q();D(()=>{n.nota=t},!1)}});function dt(e){let t=String(e).trim().toLowerCase().match(/^(\d+)\s*[x×]\s*(\d+)(?:\s*[-–a]\s*(\d+))?\s*(?:\+\s*(\d+)?\s*(drop|cluster)(?:\s*set)?s?)?$/);if(!t)return null;let n=Number(t[1]),r=Number(t[2]),i=t[3]?Number(t[3]):r,a=t[5]?Number(t[4]??1):0;if(n<1||n>10||r<1||i<r||i>100||a>6)return null;let o=[...Array.from({length:n},()=>O(`normal`,r,i)),...Array.from({length:a},()=>O(t[5],r,i))],s=r===i?`${r}`:`${r}-${i}`,c=t[5]===`drop`?`drop set`:`cluster`;return{series:o,texto:`${n} série${n>1?`s`:``} normai${n>1?`s`:``} (${s} reps)${a?` + ${a} série${a>1?`s`:``} de ${c} no final`:``}`}}function Y(e,t,n,r,i=``,a=``){return`<div class="grow">
    <span class="caps mute" style="display:block;margin-bottom:4px;font-size:10px">${e}</span>
    <div class="stepper-mini">
      <button data-a="ed-num" data-id="${r}" data-k="${t}" data-i="${i}" data-d="-1" aria-label="Diminuir ${e}">−</button>
      <div class="valor"><b class="num" style="font-size:18px">${n}${a}</b></div>
      <button data-a="ed-num" data-id="${r}" data-k="${t}" data-i="${i}" data-d="1" aria-label="Aumentar ${e}">+</button>
    </div>
  </div>`}function ft(e,t,n){let r=e.series[0]??O(),i=e.series.map((t,n)=>{let r=[`normal`,`drop`,`cluster`].map(r=>`<button class="${t.tipo===r?`on`:``}" data-a="ed-tec" data-id="${e.id}" data-i="${n}" data-tipo="${r}">${b[r]}</button>`).join(``),i=t.tipo===`drop`?`<div class="params">${Y(`Degraus`,`degraus`,t.degraus,e.id,n)}</div>`:t.tipo===`cluster`?`<div class="params">${Y(`Blocos`,`blocos`,t.blocos,e.id,n)}${Y(`Pausa`,`pausa`,t.pausa,e.id,n,`s`)}</div>`:``;return`<div class="serie-ed">
        <span class="num-b" style="width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--inset);font-family:var(--f-display);font-weight:700">${n+1}</span>
        <div class="tecs">${r}</div>
        ${i}
      </div>`}).join(``);return`<div class="corpo">
    <label class="lbl caps" for="ed-nome-${e.id}">Nome do exercício</label>
    <input id="ed-nome-${e.id}" class="field" data-in="ed-text" data-k="nome" data-id="${e.id}" value="${p(e.nome)}" autocomplete="off">
    <label class="lbl caps" for="ed-grupo-${e.id}">Grupo muscular (opcional)</label>
    <input id="ed-grupo-${e.id}" class="field" data-in="ed-text" data-k="grupo" data-id="${e.id}" value="${p(e.grupo)}" placeholder="Ex.: Peitoral maior · Isolador" autocomplete="off">

    <span class="lbl caps">Intensidade prescrita</span>
    <div class="seg">${Object.entries(x).map(([t,n])=>`<button class="${e.intensidade===t?`on ${t}`:``}" data-a="ed-int" data-id="${e.id}" data-v="${t}">${n}</button>`).join(``)}</div>

    <div class="row between"><span class="lbl caps">Pausa / descanso</span><b class="lime num">${c(e.descanso)} min</b></div>
    <div class="presets">${S.map(t=>`<button class="${e.descanso===t?`on`:``}" data-a="ed-desc" data-id="${e.id}" data-v="${t}">${c(t)}</button>`).join(``)}</div>
    <div class="row mt8" style="gap:8px">
      <button class="btn sec sm grow" data-a="ed-desc" data-id="${e.id}" data-v="${Math.max(15,e.descanso-15)}">−15s</button>
      <button class="btn sec sm grow" data-a="ed-desc" data-id="${e.id}" data-v="${e.descanso+15}">+15s</button>
    </div>

    <label class="lbl caps" for="ed-video-${e.id}">Vídeo demonstrativo (link)</label>
    <input id="ed-video-${e.id}" class="field" inputmode="url" data-in="ed-text" data-k="video" data-id="${e.id}" value="${p(e.video)}" placeholder="https://youtube.com/…" autocomplete="off">

    <label class="lbl caps" for="ed-nota-${e.id}">Orientação do personal</label>
    <textarea id="ed-nota-${e.id}" class="field" data-in="ed-text" data-k="nota" data-id="${e.id}" placeholder="Ex.: pausa de 1s na transição">${p(e.nota)}</textarea>

    <div class="row between" style="margin-top:20px"><b class="h-md" style="font-size:16px">Estrutura de séries</b><span class="caps ok">${e.series.length} configuradas</span></div>
    <div class="row mt8" style="gap:10px">
      ${Y(`Séries`,`nSeries`,e.series.length,e.id)}
      ${Y(`Reps mín.`,`repsMin`,r.repsMin,e.id)}
      ${Y(`Reps máx.`,`repsMax`,r.repsMax,e.id)}
    </div>
    <div class="mt8">${i}</div>
    <div class="resumo-ed"><span>Resumo: ${p(le(e.series))}</span><b class="num">Descanso ${c(e.descanso)}</b></div>

    <div class="row mt16" style="gap:8px">
      <button class="btn sec sm grow" data-a="ed-up" data-id="${e.id}" ${t===0?`disabled`:``}>${V(`arrow-up`,16)} Subir</button>
      <button class="btn sec sm grow" data-a="ed-down" data-id="${e.id}" ${t===n-1?`disabled`:``}>${V(`arrow-down`,16)} Descer</button>
      <button class="btn sec sm grow" data-a="ed-dup" data-id="${e.id}">${V(`copy`,16)} Duplicar</button>
    </div>
    <button class="btn sec danger mt8" data-a="ed-del-ex" data-id="${e.id}">${V(`trash-2`,18)} Excluir exercício</button>
  </div>`}function pt(){let e=T(),t=k(),n=`<a class="icon-btn" href="#/" aria-label="Voltar">${V(`arrow-left`,24)}</a>`;if(!t)return{top:`${n}<h1 class="sub">Editar treino</h1>`,html:`<div class="vazio"><p>Nenhum treino.</p><button class="btn" data-a="novo-treino">Criar treino</button></div>`,nav:!1};let r=t.exercicios.length,i=t.exercicios.find(e=>e.id===P.editEx),a=P.rapida?dt(P.rapida):null,o=t.exercicios.map((e,t)=>{let n=e.id===P.editEx;return`<article class="card ed-ex ${n?`aberto`:``}">
        <button class="cab" data-a="ed-toggle" data-id="${e.id}" style="width:100%;text-align:left" aria-expanded="${n}">
          <span class="num-b">${t+1}</span>
          <span class="grow"><b class="h-md" style="font-size:17px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p(e.nome)}</b>
          <span class="sm mute">${p(le(e.series))} · ${x[e.intensidade]} · Pausa ${c(e.descanso)}</span></span>
          ${V(n?`chevron-up`:`chevron-down`,20)}
        </button>
        ${n?ft(e,t,r):``}
      </article>`}).join(``),s=`
    <div class="periodos" style="margin-top:8px">
      ${e.treinos.map(e=>`<button class="chip ${e.id===t.id?`on`:``}" data-a="ed-treino" data-id="${e.id}">${p(e.nome.split(`–`)[0].trim())}</button>`).join(``)}
      <button class="chip" data-a="novo-treino">${V(`plus`,14)} Novo</button>
    </div>
    <section class="card">
      <span class="caps mute">Identificação do plano</span>
      <input class="field mt8" style="font-family:var(--f-display);font-weight:700;font-size:18px" data-in="treino-nome" value="${p(t.nome)}" aria-label="Nome do treino" autocomplete="off">
      <input class="field mt8" data-in="treino-foco" value="${p(t.foco)}" placeholder="Foco (ex.: Hipertrofia · Semana 4)" aria-label="Foco do treino" autocomplete="off">
      <p class="sm mute" style="margin:10px 0 0">As alterações são salvas automaticamente.</p>
    </section>
    <section class="card">
      <div class="row" style="gap:8px"><span class="lime">${V(`zap`,18)}</span><span class="caps lime">Entrada rápida</span></div>
      <div class="row mt8" style="gap:8px">
        <input class="field" data-in="rapida" value="${p(P.rapida)}" placeholder="3x10-12 + drop" aria-label="Entrada rápida" autocomplete="off" autocapitalize="off">
        <button class="btn sec sm" style="min-height:48px" data-a="ed-aplicar-rapida">Aplicar</button>
      </div>
      <div class="previa ${P.rapida&&!a?`err`:``}" data-previa>${mt(P.rapida,a,i)}</div>
      <p class="sm mute" style="margin:8px 0 0">Aplica no exercício aberto abaixo. Exemplos: <b>4x8-10</b> · <b>3x10-12 + drop</b> · <b>3x8 + 2 cluster</b></p>
    </section>
    <div class="row between" style="margin:20px 0 10px"><h2 class="h-lg" style="font-size:22px">Sequência prescrita</h2><span class="badge neutro">${r} ${r===1?`item`:`itens`}</span></div>
    ${o||`<div class="vazio">${V(`dumbbell`,36)}<p>Nenhum exercício ainda.</p></div>`}
    <button class="btn sec" data-a="ed-novo-ex">${V(`plus`,20)} Adicionar novo exercício</button>
    <button class="btn sec danger mt24" data-a="ed-del-treino">${V(`trash-2`,18)} Excluir este treino</button>
  `;return{top:`${n}<h1 class="sub">Editar treino</h1><a class="btn sm" href="#/">Concluir</a>`,html:s,nav:!1}}function mt(e,t,n){return e?t?n?`Prévia: ${p(t.texto)}`:`Prévia: ${p(t.texto)}. Abra um exercício para aplicar.`:`Não entendi. Tente algo como 3x10-12 + drop`:``}var X=e=>k()?.exercicios.find(t=>t.id===e);F({"ed-toggle":e=>{P.editEx=P.editEx===e.dataset.id?null:e.dataset.id,D(()=>{})},"ed-treino":e=>{P.editEx=null,D(t=>t.treinoAtual=e.dataset.id)},"ed-novo-ex":()=>{let e=ae();D(()=>k().exercicios.push(e)),P.editEx=e.id,D(()=>{}),setTimeout(()=>document.getElementById(`ed-nome-${e.id}`)?.select(),50)},"ed-del-ex":e=>{let t=X(e.dataset.id);z({titulo:`Excluir "${t.nome}"?`,texto:`O histórico já registrado desse exercício continua salvo.`,ok:`Excluir exercício`,fn:()=>{P.editEx=null,D(()=>{let e=k();e.exercicios=e.exercicios.filter(e=>e.id!==t.id)})}})},"ed-up":e=>ht(e.dataset.id,-1),"ed-down":e=>ht(e.dataset.id,1),"ed-dup":t=>{let n=k(),r=n.exercicios.findIndex(e=>e.id===t.dataset.id),i={...structuredClone(n.exercicios[r]),id:e()};i.nome+=` (cópia)`,D(()=>n.exercicios.splice(r+1,0,i),!1),P.editEx=i.id,D(()=>{})},"ed-int":e=>D(()=>X(e.dataset.id).intensidade=e.dataset.v),"ed-desc":e=>D(()=>X(e.dataset.id).descanso=Number(e.dataset.v)),"ed-tec":e=>{let t=X(e.dataset.id).series[Number(e.dataset.i)];D(()=>t.tipo=e.dataset.tipo)},"ed-num":e=>{let t=X(e.dataset.id),n=Number(e.dataset.d),r=e.dataset.i===``?null:Number(e.dataset.i);D(()=>{switch(e.dataset.k){case`nSeries`:n>0&&t.series.length<10?t.series.push({...t.series.at(-1)??O(),tipo:`normal`}):n<0&&t.series.length>1&&t.series.pop();break;case`repsMin`:t.series.forEach(e=>{e.repsMin=f(e.repsMin+n,1,100),e.repsMax<e.repsMin&&(e.repsMax=e.repsMin)});break;case`repsMax`:t.series.forEach(e=>{e.repsMax=f(e.repsMax+n,1,100),e.repsMin>e.repsMax&&(e.repsMin=e.repsMax)});break;case`degraus`:t.series[r].degraus=f(t.series[r].degraus+n,2,6);break;case`blocos`:t.series[r].blocos=f(t.series[r].blocos+n,2,10);break;case`pausa`:t.series[r].pausa=f(t.series[r].pausa+n*5,5,60)}})},"ed-aplicar-rapida":()=>{let e=X(P.editEx),t=dt(P.rapida);if(!t)return I(`Entrada inválida. Exemplo: 3x10-12 + drop`);if(!e)return I(`Abra um exercício abaixo para aplicar`);D(()=>{e.series=t.series}),P.rapida=``,D(()=>{}),I(`Séries aplicadas`)},"ed-del-treino":()=>{let e=k();z({titulo:`Excluir "${e.nome}"?`,texto:`O plano será apagado. As sessões já registradas continuam no histórico.`,ok:`Excluir treino`,fn:()=>{D(t=>{t.treinos=t.treinos.filter(t=>t.id!==e.id),t.treinoAtual=t.treinos[0]?.id??null},!1),P.editEx=null,B(`#/`),D(()=>{})}})}},{"ed-text":(e,t)=>{let n=X(e.id);n&&D(()=>n[e.k]=t,!1)},"treino-nome":(e,t)=>D(()=>k().nome=t,!1),"treino-foco":(e,t)=>D(()=>k().foco=t,!1),rapida:(e,t)=>{P.rapida=t;let n=document.querySelector(`[data-previa]`),r=t?dt(t):null;n&&(n.textContent=mt(t,r,X(P.editEx)).replace(/&amp;/g,`&`),n.classList.toggle(`err`,!!t&&!r))}});function ht(e,t){let n=k(),r=n.exercicios.findIndex(t=>t.id===e),i=r+t;i<0||i>=n.exercicios.length||D(()=>{[n.exercicios[r],n.exercicios[i]]=[n.exercicios[i],n.exercicios[r]]})}var gt=[[`1m`,`1 mês`,30],[`3m`,`3 meses`,90],[`6m`,`6 meses`,180],[`tudo`,`Tudo`,1/0]];function _t(e){let t=m(Date.now()),n=m(Date.now()-864e5),r=m(e);return r===t?`Hoje`:r===n?`Ontem`:g(e)}function vt(e){let t={l:40,r:16,t:28,b:26},n=e.map(e=>e.carga),r=Math.min(...n),a=Math.max(...n);r===a&&(r-=5,a+=5);let o=(a-r)*.15;r=Math.max(0,r-o),a+=o;let s=e[0].ts,c=e.at(-1).ts,l=e=>c===s?(t.l+(340-t.r))/2:t.l+(e-s)/(c-s)*(340-t.l-t.r),u=e=>t.t+(1-(e-r)/(a-r))*(200-t.t-t.b),d=Array.from({length:4},(e,n)=>{let o=r+(a-r)*n/3;return`<line x1="${t.l}" x2="${340-t.r}" y1="${u(o)}" y2="${u(o)}" stroke="#262c3b" stroke-width="1"/>
      <text x="${t.l-6}" y="${u(o)+4}" text-anchor="end" fill="#94a3b8" font-size="10" font-family="Space Grotesk">${i(Math.round(o*2)/2)}</text>`}).join(``),f=e.map((e,t)=>`${t?`L`:`M`}${l(e.ts).toFixed(1)},${u(e.carga).toFixed(1)}`).join(` `),m=`${f} L${l(c).toFixed(1)},${200-t.b} L${l(s).toFixed(1)},${200-t.b} Z`,h=e.map(e=>`<circle cx="${l(e.ts).toFixed(1)}" cy="${u(e.carga).toFixed(1)}" r="4" fill="#0c0e12" stroke="#d4ff00" stroke-width="2"/>`).join(``);n.indexOf(Math.max(...n));let _=e.at(-1),v=_.carga>=Math.max(...n)&&e.length>1,y=l(_.ts),b=u(_.carga),x=`${i(_.carga)} kg${v?` ★`:``}`,S=x.length*6.4+14,C=Math.min(340-t.r-S,Math.max(t.l,y-S/2)),w=`<rect x="${C}" y="${b-30}" width="${S}" height="20" rx="6" fill="#d4ff00"/>
    <text x="${C+S/2}" y="${b-16}" text-anchor="middle" fill="#0c0e12" font-size="11" font-weight="700" font-family="Space Grotesk">${x}</text>`,T=Math.min(4,e.length);return`<svg viewBox="0 0 340 200" role="img" aria-label="Evolução da carga máxima">
    <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d4ff00" stop-opacity=".35"/><stop offset="1" stop-color="#d4ff00" stop-opacity="0"/></linearGradient></defs>
    ${d}
    <path d="${m}" fill="url(#g)"/>
    <path d="${f}" fill="none" stroke="#d4ff00" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${h}${w}${Array.from({length:T},(t,n)=>{let r=e[T===1?0:Math.round(n*(e.length-1)/(T-1))];return`<text x="${l(r.ts)}" y="194" text-anchor="${n===0&&T>1?`start`:n===T-1&&T>1?`end`:`middle`}" fill="#94a3b8" font-size="10" font-family="Space Grotesk">${p(g(r.ts))}</text>`}).join(``)}
  </svg>`}function yt(e){return e.tipo===`drop`?`<span class="drop">Drop (${e.partes.map(e=>i(e.carga)).join(`/`)})</span>`:e.tipo===`cluster`?`<span class="drop">Cluster ${i(e.carga)} kg · ${e.partes.map(e=>e.reps).join(`+`)}</span>`:`<span>${a(e.partes[0].carga)} × ${e.partes[0].reps}</span>`}function bt(){let e=T(),t=we(),n=`<h1>Progresso</h1>`;if(!t.length)return{top:n,html:`<div class="vazio">${V(`trending-up`,40)}<p><b>Ainda não há histórico.</b><br>Finalize um treino e a evolução de carga de cada exercício aparece aqui.</p><a class="btn" href="#/">Ir para o treino</a></div>`,nav:!0};t.find(e=>e.id===P.progEx)||(P.progEx=t[0].id);let r=t.find(e=>e.id===P.progEx),[,,a]=gt.find(e=>e[0]===P.periodo)??gt[1],s=Date.now()-a*864e5,c=Te(r.id).filter(e=>e.ts>=s),l=e.sessoes.filter(e=>e.exercicios[r.id]&&e.exercicios[r.id].series.some(e=>e.concluida)),u=l.filter(e=>e.inicio>=s),d=null,f=0;for(let e of u)for(let t of e.exercicios[r.id].series){if(!t.concluida||(f+=de(t),t.tipo===`cluster`))continue;let e=M(t),n=t.partes[0].reps,r=pe(e,n);(!d||r>d.est)&&(d={est:r,c:e,r:n})}let m=c.length?Math.max(...c.map(e=>e.carga)):0,h=c[0]?.carga??0,g=c.at(-1)?.carga??0,_=h>0?(g-h)/h*100:0,v=gt.map(([e,t])=>`<button class="chip ${P.periodo===e?`on`:``}" data-a="periodo" data-v="${e}">${t}</button>`).join(``),y=c.length?`<section class="card grafico">
        <div class="row between"><span class="caps ok">● Evolução de carga máxima</span>${c.length>1&&g>=m?`<span class="badge neutro" style="color:var(--lime)">${V(`zap`,12)} Novo PR</span>`:``}</div>
        <div class="row mt8" style="gap:10px;align-items:baseline"><b class="h-lg">${i(g)} kg</b>${c.length>1?`<span class="ok num" style="font-weight:600">${_>=0?`+`:``}${i(Math.round(_*10)/10)}%</span>`:``}</div>
        ${vt(c)}
        <p class="sm mute" style="margin:6px 0 0">Séries normais / 1º degrau do drop set. ${c.length===1?`Com mais sessões, a linha de evolução aparece.`:``}</p>
      </section>`:`<section class="card"><p class="mute" style="margin:0">Sem sessões deste exercício no período. Escolha “Tudo” para ver o histórico completo.</p></section>`,b=`<div class="stats3">
      <div class="stat"><span class="caps mute">Carga máx.</span><b>${i(m)}<small>kg</small></b></div>
      <div class="stat"><span class="caps mute">Melhor série</span><b>${d?d.r:`—`}<small>reps</small></b><span class="sm mute">${d?`1RM est.: ${i(Math.round(d.est*10)/10)} kg`:``}</span></div>
      <div class="stat"><span class="caps mute">Volume</span><b>${o(f)}<small>kg</small></b></div>
    </div>`,x=[...l].reverse().slice(0,6).map(e=>{let t=e.exercicios[r.id],n=t.series.filter(e=>e.concluida),i=n.reduce((e,t)=>e+de(t),0);return`<article class="card">
        <div class="row between"><div class="row" style="gap:8px"><b class="h-md">${_t(e.inicio)}</b><span class="badge neutro">${n.length} série${n.length>1?`s`:``}</span></div>
        <span class="num"><span class="mute sm">VOL:</span> <b class="lime">${o(i)} kg</b></span></div>
        <div class="sess-chips">${n.map(yt).join(``)}</div>
        ${t.nota?`<p class="sm mute" style="margin:10px 0 0">${V(`notebook-pen`,14)} ${p(t.nota)}</p>`:``}
      </article>`}).join(``),S=l.at(-1),C=``;if(S){let t=S.exercicios[r.id].series.filter(e=>e.concluida&&e.tipo===`normal`);if(t.length){let n=Math.max(...t.map(M)),r=t[0].repsMax,a=t.every(e=>e.partes[0].reps>=r),o=e.config.passo;C=`<div class="reco">
        <span class="ic-b">${V(`trending-up`,20)}</span>
        <div><b class="lime" style="font-family:var(--f-display);font-size:12px;letter-spacing:.08em;text-transform:uppercase">Recomendação de carga</b>
        <p style="margin:2px 0 0">${a?`Você completou ${r} reps em todas as séries com ${i(n)} kg. Sugerimos testar <b>${i(n+o)} kg</b> na primeira série da próxima sessão.`:`Mantenha ${i(n)} kg e busque ${r} reps em todas as séries antes de subir a carga.`}</p></div>
      </div>`}}return{top:n,html:`
    <section class="card" style="margin-top:8px"><label class="seletor">
      <span class="icone-q">${V(`dumbbell`,20)}</span>
      <span class="grow"><span class="caps mute" style="display:block">Exercício monitorado</span><b class="h-md" style="font-size:18px">${p(r.nome)}</b></span>
      ${V(`chevron-down`,20)}
      <select data-in="prog-ex" aria-label="Escolher exercício">${t.map(e=>`<option value="${e.id}" ${e.id===r.id?`selected`:``}>${p(e.nome)}</option>`).join(``)}</select>
    </label></section>
    <div class="periodos">${v}</div>
    ${y}
    ${b}
    <h2 class="section-t"><span class="lime">${V(`history`,20)}</span> Sessões recentes <span class="grow"></span><span class="caps mute">${l.length} registro${l.length===1?``:`s`}</span></h2>
    ${x}
    ${C}
  `,nav:!0}}F({periodo:e=>{P.periodo=e.dataset.v,D(()=>{})}},{"prog-ex":(e,t)=>{P.progEx=t,D(()=>{})}});var xt=[`D`,`S`,`T`,`Q`,`Q`,`S`,`S`];function St(){if(!P.mes){let e=new Date;P.mes={ano:e.getFullYear(),mes:e.getMonth()}}return P.mes}function Ct(e){let t=m(e),n=h(e,{weekday:`long`}),r=h(e,{day:`2-digit`,month:`short`}).replace(`.`,``).toUpperCase();return t===m(Date.now())?`HOJE · ${r}`:`${r} · ${n.toUpperCase()}`}function wt(e,t){let n=new Map;for(let t of e){let e=v(t.inicio);n.set(e,(n.get(e)??0)+1)}let r=v(Date.now()),i=e=>(n.get(e)??0)>=t,a=r,o=0;for(i(a)||(a-=6048e5);i(a);)o++,a-=6048e5;let s=Array.from({length:5},(e,t)=>i(r-(4-t)*7*864e5));return{n:o,pilulas:s}}function Tt(){let e=T(),t=e.sessoes.filter(De),{ano:n,mes:r}=St(),a=new Date(n,r,1),s=new Date(n,r+1,0).getDate(),c=Ee(),u=m(Date.now()),d=e.config.metaSemanal,f=t.filter(e=>{let t=new Date(e.inicio);return t.getFullYear()===n&&t.getMonth()===r}),g=f.reduce((e,t)=>e+N(t).volume,0),v=new Date,y=d*(v.getFullYear()===n&&v.getMonth()===r?v.getDate():s)/7,b=y>=1?Math.min(100,Math.round(f.length/y*100)):null,{n:x,pilulas:S}=wt(t,d),C=[];for(let e=0;e<a.getDay();e++)C.push(`<span></span>`);for(let e=1;e<=s;e++){let t=m(new Date(n,r,e).getTime()),i=c.has(t)&&c.get(t).some(De);C.push(`<button class="dia ${i?`tem`:``} ${t===u?`hoje`:``} ${P.dia===t?`sel`:``}" data-a="dia" data-k="${t}" aria-label="${e} ${i?`(treinou)`:``}">${e}</button>`)}let w=(P.dia?t.filter(e=>m(e.inicio)===P.dia):[...t].reverse().slice(0,10)).slice();P.dia||w.sort((e,t)=>t.inicio-e.inicio);let ee=w.map(t=>{let n=N(t),r=e.treinos.find(e=>e.id===t.treinoId),i=r?r.exercicios.length:Object.keys(t.exercicios).length,a=Object.values(t.exercicios).map(e=>e.nome).join(`, `);return`<a class="card sess-card" href="#/sessao/${t.id}" style="display:block">
        <div class="row between wrap">
          <span class="row" style="gap:8px"><span class="badge ${m(t.inicio)===u?`lime`:`neutro`}">${p(Ct(t.inicio))}</span><span class="sm mute">Finalizado às ${_(t.fim??t.inicio)}</span></span>
          <span class="icon-btn" style="width:40px;height:40px;background:var(--inset)">${V(`arrow-right`,18)}</span>
        </div>
        <h3 class="h-md mt8" style="font-size:20px">${p(t.nome)}</h3>
        <div class="nums">
          <div><span class="caps k">Duração</span><b>${l(n.duracao)}</b></div>
          <div><span class="caps k">Carga total</span><b class="lime">${o(n.volume)}<small class="mute" style="font-size:12px"> kg</small></b></div>
          <div><span class="caps k">Exercícios</span><b class="ok">${n.feitos}/${Math.max(i,n.feitos)}</b></div>
          ${n.recordes?`<div><span class="caps k">Recordes</span><b style="color:var(--lime)">${n.recordes} ${V(`trophy`,16)}</b></div>`:``}
        </div>
        <p class="sm mute" style="margin:10px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${V(`circle-check`,14)} ${p(a)}</p>
      </a>`}).join(``),E=h(a.getTime(),{month:`long`,year:`numeric`});return{top:`<h1>Histórico</h1>`,html:`
    <section class="card fire" style="margin-top:8px">
      <span class="ic-b">${V(`flame`,28)}</span>
      <div class="grow"><b class="h-lg" style="font-size:22px">${x} ${x===1?`semana`:`semanas`}</b> ${x?`<span class="badge neutro" style="color:var(--ok)">No ritmo</span>`:``}
      <div class="sm mute">${x?`Sequência batendo a meta de ${d}x/sem`:`Meta: ${d} treinos por semana (ajuste em Ajustes)`}</div></div>
      <div class="pills" aria-hidden="true">${S.map(e=>`<i class="${e?`on`:``}"></i>`).join(``)}</div>
    </section>
    <section class="card">
      <div class="cal-h">
        <button class="icon-btn" data-a="mes" data-d="-1" aria-label="Mês anterior">${V(`chevron-left`,22)}</button>
        <div style="text-align:center"><b class="h-md">${p(E.charAt(0).toUpperCase()+E.slice(1))}</b></div>
        <button class="icon-btn" data-a="mes" data-d="1" aria-label="Próximo mês">${V(`chevron-right`,22)}</button>
      </div>
      <div class="stats3 mt12" style="margin-bottom:0">
        <div class="stat"><span class="caps mute">Treinos</span><b>${f.length}</b></div>
        <div class="stat"><span class="caps mute">Frequência</span><b class="ok">${b==null?`—`:b+`%`}</b></div>
        <div class="stat"><span class="caps mute">Volume</span><b class="lime">${g>=1e3?i(Math.round(g/100)/10)+`<small>t</small>`:o(g)+`<small>kg</small>`}</b></div>
      </div>
      <div class="cal-grid">${xt.map(e=>`<span class="dow">${e}</span>`).join(``)}${C.join(``)}</div>
    </section>
    <h2 class="section-t"><span class="lime">${V(`history`,20)}</span> ${P.dia?`Treinos de ${p(h(new Date(P.dia+`T12:00:00`).getTime(),{day:`numeric`,month:`long`}))}`:`Sessões recentes`}
      <span class="grow"></span>${P.dia?`<button class="link-btn" data-a="dia" data-k="${P.dia}">Limpar</button>`:`<span class="caps mute">Exibindo ${w.length} de ${t.length}</span>`}</h2>
    ${ee||`<div class="vazio">${V(`calendar`,36)}<p>${P.dia?`Nenhum treino neste dia.`:`Seus treinos finalizados aparecem aqui.`}</p></div>`}
    ${t.length?`<button class="btn sec mt8" data-a="csv">${V(`download`,18)} Exportar relatório (CSV)</button>`:``}
  `,nav:!0}}function Et({id:e}){let t=T().sessoes.find(t=>t.id===e),n=`<a class="icon-btn" href="#/historico" aria-label="Voltar">${V(`arrow-left`,24)}</a>`;if(!t)return{top:`${n}<h1 class="sub">Treino</h1>`,html:`<div class="vazio"><p>Sessão não encontrada.</p><a class="btn" href="#/historico">Voltar</a></div>`,nav:!1};let r=N(t),s=Object.entries(t.exercicios).map(([,e])=>{let t=e.series.map((e,t)=>{let n=e.tipo===`normal`?`${a(e.partes[0].carga)} kg × ${e.partes[0].reps}`:p(j(e,i));return`<div class="row between" style="padding:8px 0;border-top:1px solid var(--line)">
            <span><b class="num">Série ${t+1}</b> <span class="badge ${e.tipo===`normal`?`neutro`:`tec`}" style="margin-left:4px">${b[e.tipo]}</span> ${e.recorde?`<span class="badge recorde">${V(`trophy`,12)}</span>`:``}</span>
            <span class="num" style="text-align:right"><b>${n}</b>${e.descansoReal==null?``:`<span class="sm mute" style="display:block">descansou ${c(e.descansoReal)}</span>`}</span>
          </div>`}).join(``);return`<section class="card"><h3 class="h-md">${p(e.nome)}</h3>${t}${e.nota?`<p class="sm mute" style="margin:10px 0 0">${V(`notebook-pen`,14)} ${p(e.nota)}</p>`:``}</section>`}).join(``),u=`
    <section class="card hl" style="margin-top:8px">
      <span class="badge neutro">${p(Ct(t.inicio))}</span>
      <h2 class="h-lg mt8">${p(t.nome)}</h2>
      <div class="sess-card"><div class="nums">
        <div><span class="caps k">Duração</span><b>${l(r.duracao)}</b></div>
        <div><span class="caps k">Carga total</span><b class="lime">${o(r.volume)} kg</b></div>
        <div><span class="caps k">Séries</span><b>${r.series}</b></div>
        ${r.recordes?`<div><span class="caps k">Recordes</span><b class="lime">${r.recordes}</b></div>`:``}
      </div></div>
    </section>
    ${s}
    <button class="btn sec danger mt8" data-a="del-sessao" data-id="${t.id}">${V(`trash-2`,18)} Excluir este registro</button>`;return{top:`${n}<h1 class="sub">Treino registrado</h1>`,html:u,nav:!1}}function Dt(){let e=[[`data`,`treino`,`exercicio`,`serie`,`tecnica`,`parte`,`carga_kg`,`reps`,`descanso_real_s`,`recorde`]];for(let t of T().sessoes){let n=m(t.inicio);for(let r of Object.values(t.exercicios))r.series.forEach((i,a)=>{i.concluida&&i.partes.forEach((o,s)=>{e.push([n,t.nome,r.nome,a+1,b[i.tipo],s+1,i.tipo===`cluster`?i.carga:o.carga,o.reps,i.descansoReal??``,i.recorde?`sim`:``])})})}let t=e=>`"${String(e).replace(/"/g,`""`)}"`;return`﻿`+e.map(e=>e.map(t).join(`;`)).join(`
`)}function Ot(e,t,n){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),2e3)}F({mes:e=>{let t=St(),n=new Date(t.ano,t.mes+Number(e.dataset.d),1);P.mes={ano:n.getFullYear(),mes:n.getMonth()},P.dia=null,D(()=>{})},dia:e=>{P.dia=P.dia===e.dataset.k?null:e.dataset.k,D(()=>{})},csv:()=>{Ot(`fit-life-${m(Date.now())}.csv`,Dt(),`text/csv;charset=utf-8`),I(`Relatório exportado`)},"del-sessao":e=>z({titulo:`Excluir este registro?`,texto:`O treino sai do histórico e dos gráficos. Não dá para desfazer.`,ok:`Excluir registro`,fn:()=>{D(t=>t.sessoes=t.sessoes.filter(t=>t.id!==e.dataset.id),!1),B(`#/historico`),I(`Registro excluído`)}})});var kt=`0.1.0`,At=()=>window.matchMedia(`(display-mode: standalone)`).matches||navigator.standalone===!0;function jt(){try{return new Blob([localStorage.getItem(`fitlife:v1`)??``]).size}catch{return 0}}var Mt=(e,t,n,r,i)=>`
  <button class="opt" data-a="toggle" data-k="${e}" role="switch" aria-checked="${t}">
    <span class="ic-b">${V(n,22)}</span>
    <span class="grow"><b>${r}</b><span class="d">${i}</span></span>
    <span class="switch ${t?`on`:``}"></span>
  </button>`;function Nt(){let e=T(),t=e.config,n=jt(),r=n/1024,a=Math.min(100,n/5242880*100),o=!!navigator.serviceWorker?.controller;return{top:`<h1>Ajustes</h1>`,html:`
    <section class="card" style="margin-top:8px">
      <div class="row between"><b class="h-md">Fit Life</b><span class="badge neutro">v${kt}</span></div>
      <p class="mute" style="margin:6px 0 0">Seus treinos e cargas ficam salvos só neste aparelho. Sem conta, sem internet.</p>
    </section>
    ${At()?`<section class="card"><div class="row" style="gap:12px"><span class="ok">${V(`circle-check`,24)}</span><div><b class="h-md" style="font-size:17px">App instalado</b><div class="sm mute">Abrindo em tela cheia, direto da tela inicial.</div></div></div></section>`:`<section class="card install">
        <div class="row" style="gap:12px;align-items:flex-start"><span class="icone-q" style="width:52px;height:52px">${V(`smartphone`,26)}</span>
        <div class="grow"><b class="h-md">Instalar app no celular</b>
        <p class="mute" style="margin:6px 0 0">Ícone na tela inicial, tela cheia e uso 100% offline na academia.</p></div></div>
        ${P.instalar?`<button class="btn mt16" data-a="instalar">${V(`download`,20)} Instalar agora</button>`:`<p class="sm mute" style="margin:12px 0 0">No Chrome do Android: menu <b>⋮</b> → <b>Instalar app</b> (ou “Adicionar à tela inicial”).</p>`}
      </section>`}
    <section class="card">
      <div class="row between"><span class="caps ${o?`ok`:`mute`}">● ${o?`Modo offline pronto`:`Offline ainda não preparado`}</span><span class="sm mute">${navigator.onLine?`Online`:`Sem internet`}</span></div>
      <p class="sm mute" style="margin:8px 0 10px">${o?`O app abre mesmo sem sinal.`:`Abra o app uma vez com internet para ele ficar disponível offline.`}</p>
      <div class="bar"><i style="width:${Math.max(2,a)}%;background:var(--ok)"></i></div>
      <div class="row between mt8"><span class="caps mute">${i(Math.round(r*10)/10)} KB ocupados</span><span class="caps mute">Limite seguro ~5 MB</span></div>
    </section>

    <h2 class="section-t caps lime" style="font-size:12px;margin-bottom:4px">Treino e notificações</h2>
    <section class="card" style="padding:4px 16px">
      ${Mt(`som`,t.som,`volume-2`,`Sons do timer`,`Bip ao terminar o descanso`)}
      ${Mt(`vibracao`,t.vibracao,`smartphone`,`Vibração`,`Vibra ao fim do descanso e ao salvar série`)}
      ${Mt(`telaLigada`,t.telaLigada,`lock`,`Manter tela sempre acesa`,`Evita bloquear durante o treino`)}
      ${Mt(`autoDescanso`,t.autoDescanso,`timer`,`Iniciar descanso automático`,`Ao confirmar a série`)}
    </section>
    <section class="card">
      <b class="h-md" style="font-size:17px">Incremento padrão de carga</b>
      <p class="sm mute" style="margin:4px 0 12px">Passo dos botões + e − ao registrar.</p>
      <div class="passos">${[2.5,1,.5].map(e=>`<button class="${t.passo===e?`on`:``}" data-a="passo-padrao" data-v="${e}">+${i(e)} kg</button>`).join(``)}</div>
    </section>
    <section class="card">
      <div class="row between"><div><b class="h-md" style="font-size:17px">Meta semanal</b><p class="sm mute" style="margin:4px 0 0">Usada na frequência e na sequência do histórico.</p></div></div>
      <div class="stepper mt12" style="grid-template-columns:56px 1fr 56px">
        <button data-a="meta" data-d="-1" aria-label="Diminuir meta">−</button>
        <div class="valor"><b class="num" style="font-size:22px">${t.metaSemanal} treinos/sem</b></div>
        <button data-a="meta" data-d="1" aria-label="Aumentar meta">+</button>
      </div>
      <button class="btn sec mt12" data-a="testar-alerta">${V(`bell-ring`,18)} Testar alerta do timer</button>
    </section>

    <h2 class="section-t caps lime" style="font-size:12px;margin-bottom:4px">Dados e segurança local</h2>
    <section class="card" style="padding:4px 16px">
      <button class="opt" data-a="exportar"><span class="ic-b ok">${V(`upload`,22)}</span><span class="grow"><b>Exportar backup</b><span class="d">Baixa um arquivo .json com treinos e históricos</span></span>${V(`chevron-right`,18)}</button>
      <label class="opt" for="arq-backup" style="cursor:pointer"><span class="ic-b lime">${V(`download`,22)}</span><span class="grow"><b>Importar backup</b><span class="d">Restaura tudo a partir de um arquivo .json</span></span>${V(`chevron-right`,18)}</label>
      <input id="arq-backup" type="file" accept="application/json,.json" data-in="importar" hidden>
      <button class="opt" data-a="apagar"><span class="ic-b" style="color:var(--pes)">${V(`trash-2`,22)}</span><span class="grow"><b style="color:var(--pes)">Apagar todos os dados</b><span class="d">Remove treinos, histórico e ajustes deste aparelho</span></span></button>
    </section>
    <p class="sm mute" style="text-align:center;margin:8px 0 0">${e.ultimoBackup?`Último backup: ${p(h(e.ultimoBackup,{day:`2-digit`,month:`short`,hour:`2-digit`,minute:`2-digit`}))}`:`Nenhum backup feito ainda. Faça um de vez em quando!`}</p>
  `,nav:!0}}function Pt(e){let t=e?.dados??e;return!t||!Array.isArray(t.treinos)||!Array.isArray(t.sessoes)?null:t}F({toggle:e=>D(t=>t.config[e.dataset.k]=!t.config[e.dataset.k]),"passo-padrao":e=>D(t=>t.config.passo=Number(e.dataset.v)),meta:e=>D(t=>t.config.metaSemanal=f(t.config.metaSemanal+Number(e.dataset.d),1,7)),"testar-alerta":()=>{Ue(),Ke({tipo:`descanso`}),I(`Alerta disparado`)},instalar:async()=>{let e=P.instalar;e&&(e.prompt(),await e.userChoice,P.instalar=null,D(()=>{}))},exportar:()=>{let e={...T(),timer:null},t={app:`fit-life`,versao:1,exportadoEm:Date.now(),dados:e};Ot(`fit-life-backup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(t,null,2),`application/json`),D(e=>e.ultimoBackup=Date.now()),I(`Backup exportado`)},apagar:()=>z({titulo:`Apagar todos os dados?`,texto:`Treinos, histórico e ajustes deste aparelho serão removidos. Exporte um backup antes se quiser guardar.`,ok:`Apagar tudo`,fn:()=>{localStorage.removeItem(`fitlife:v1`),location.hash=`#/`,location.reload()}})},{importar:(e,t,n)=>{let r=n.files?.[0];if(n.value=``,!r)return;let i=new FileReader;i.onload=()=>{try{let e=Pt(JSON.parse(String(i.result)));if(!e)throw Error(`formato`);z({titulo:`Restaurar este backup?`,texto:`Contém ${e.treinos.length} treino(s) e ${e.sessoes.length} sessão(ões). Os dados atuais serão substituídos.`,ok:`Restaurar`,fn:()=>{re({...e,ativa:null,timer:null}),I(`Backup restaurado`)}})}catch{I(`Arquivo inválido. Use um backup exportado pelo app.`)}},i.readAsText(r)}});var Ft=118,It=2*Math.PI*Ft,Lt=()=>{let e=T().timer;return e?Math.min(1,Math.max(0,Fe()/(e.total*1e3))):0};function Rt(){let e=T().timer;if(!e)return``;let t=e.tipo===`pausa`,n=e.terminou?`Bora!`:Ie()?`Pausado`:t?`Pausa entre blocos`:`Descanso`,r=e.terminou&&e.proxima?e.proxima.texto:``,i=Lt();return`<div class="timer-bar ${e.terminou?`fim`:``}" role="timer" aria-label="Timer de descanso">
    <button class="esq" data-a="abrir-timer" aria-label="Abrir timer">
      <span class="dot"></span>
      <span style="min-width:0"><span class="caps rot" style="display:block">${n}</span>
      ${e.terminou?`<b class="disp" style="font-size:16px;line-height:20px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p(r||`Próxima série`)}</b>`:`<span class="tempo" data-timer-t>${s(U())}</span>`}</span>
    </button>
    ${e.terminou?`<button class="bt" data-a="timer-ok">OK</button>`:`<button class="bt" data-a="timer-add" data-s="-15" aria-label="Menos 15 segundos">−15s</button>
           <button class="bt" data-a="timer-add" data-s="15" aria-label="Mais 15 segundos">+15s</button>
           <button class="bt lime" data-a="timer-skip">Pular</button>`}
    <div class="prog"><i data-timer-p style="width:${(i*100).toFixed(1)}%"></i></div>
  </div>`}function zt(){let e=T().timer,t=`<button class="icon-btn" data-a="minimizar" aria-label="Minimizar">${V(`chevron-left`,24)}</button>`;if(!e)return{top:`${t}<h1 class="sub">Timer</h1>`,html:`<div class="vazio">${V(`timer`,40)}<p>Nenhum descanso em andamento.</p><a class="btn" href="#/">Voltar ao treino</a></div>`,nav:!1,semDock:!0};let n=e.ref?A(e.ref.exId):null,r=e.proxima?.exId?A(e.proxima.exId):null,i=Ie(),a=e.tipo===`pausa`?`Pausa entre blocos`:`Descanso${n?` · Série ${e.ref.idx+1} concluída`:``}`,o=It*(1-Lt()),l=e.tipo===`descanso`?`<div class="mt16"><div class="row between"><span class="caps mute">Ajuste de intervalo alvo</span><span class="caps lime">Salva no exercício</span></div>
          <div class="periodos" style="margin-top:8px">${S.map(t=>`<button class="chip big ${e.total===t?`on`:``}" data-a="timer-preset" data-v="${t}">${e.total===t?`✓ `:``}${c(t)}</button>`).join(``)}</div></div>`:``,u=e.proxima?`<section class="card">
        <span class="badge lime">A seguir</span>
        <div class="h-md mt8">${p(e.proxima.texto)}</div>
        ${r?.ex?`<p class="mute" style="margin:6px 0 0">${p(r.ex.nome)}</p>${r.ex.nota?`<div class="nota">${V(`lightbulb`,16)}<span>${p(r.ex.nota)}</span></div>`:``}`:``}
        ${r?`<a class="btn sec sm mt12" href="#/exercicio/${r.ex.id}">Abrir exercício ${V(`arrow-right`,16)}</a>`:``}
      </section>`:``,d=`
    ${e.terminou?`<div class="fim-box"><span class="caps">Alerta de conclusão</span><div class="t">FIM DO DESCANSO!</div>
        <div>${p(e.proxima?.texto??`Hora da próxima série.`)}</div>
        <button class="btn" data-a="timer-comecar" data-ex="${e.proxima?.exId??``}">Começar</button></div>`:``}
    <section class="card" style="margin-top:8px">
      <span class="caps lime">● ${p(a)}</span>
      <div class="anel-wrap">
        <svg viewBox="0 0 280 280" aria-hidden="true">
          <circle cx="140" cy="140" r="${Ft}" fill="none" stroke="#1c212d" stroke-width="14"/>
          <circle data-timer-ring cx="140" cy="140" r="${Ft}" fill="none" stroke="#d4ff00" stroke-width="14" stroke-linecap="round" stroke-dasharray="${It.toFixed(2)}" stroke-dashoffset="${o.toFixed(2)}"/>
        </svg>
        <div class="centro"><span class="grande" data-timer-t>${s(U())}</span><span class="caps mute" style="margin-top:6px">${V(`timer`,12)} Alvo: ${s(e.total)}</span></div>
      </div>
      <div class="ctrl3">
        <button data-a="timer-add" data-s="-15">${V(`rotate-ccw`,18)} −15s</button>
        <button data-a="timer-pausar" aria-label="${i?`Retomar`:`Pausar`}">${V(i?`play`:`pause`,22)}</button>
        <button data-a="timer-add" data-s="15">${V(`rotate-cw`,18)} +15s</button>
      </div>
      <button class="btn sec mt12" data-a="timer-skip">${V(`skip-forward`,18)} Pular descanso</button>
      ${l}
    </section>
    ${u}
  `;return{top:`${t}<h1 class="sub">Treino</h1><span class="tag-ativo">Ativo</span>`,html:d,nav:!1,semDock:!0}}function Bt(){if(!T().timer)return;let e=s(U());document.querySelectorAll(`[data-timer-t],[data-pausa-t]`).forEach(t=>{t.textContent!==e&&(t.textContent=e)});let t=Lt();document.querySelectorAll(`[data-timer-p]`).forEach(e=>e.style.width=`${(t*100).toFixed(1)}%`);let n=document.querySelector(`[data-timer-ring]`);n&&n.setAttribute(`stroke-dashoffset`,(It*(1-t)).toFixed(2))}F({"abrir-timer":()=>B(`#/timer`),minimizar:()=>history.length>1?history.back():B(`#/`),"timer-add":e=>{ze(Number(e.dataset.s)),Vt()},"timer-pausar":()=>{Ie()?Ve():Be(),Vt()},"timer-skip":()=>{let e=T().timer?.proxima?.exId;W(),location.hash===`#/timer`?B(e?`#/exercicio/${e}`:`#/`):Vt()},"timer-ok":()=>{W(),Vt()},"timer-comecar":e=>{W(),B(e.dataset.ex?`#/exercicio/${e.dataset.ex}`:`#/`)},"timer-preset":e=>{let t=Number(e.dataset.v),n=T().timer;He(t);let r=n?.ref?A(n.ref.exId):null;r&&D(()=>r.ex.descanso=t,!1),Vt()}});function Vt(){D(()=>{})}var Ht=`modulepreload`,Ut=function(e,t){return new URL(e,t).href},Wt={},Gt=function(e){return e.pathname.endsWith(`.css`)},Kt=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},qt=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Ut(t,n);let r=s(t),i=Gt(r);return Kt(Wt,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ht,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Z=e=>document.querySelector(e),Jt=null,Yt=null,Q={nome:`hoje`,arg:null};function Xt(){let e=location.hash.replace(/^#\/?/,``).split(`/`);return{nome:e[0]||`hoje`,arg:e[1]??null}}var Zt=[[`hoje`,`#/`,`dumbbell`,`Treino`,[`hoje`,`exercicio`,`editar`,`timer`]],[`progresso`,`#/progresso`,`trending-up`,`Progresso`,[`progresso`]],[`historico`,`#/historico`,`calendar`,`Histórico`,[`historico`,`sessao`]],[`ajustes`,`#/ajustes`,`sliders-horizontal`,`Ajustes`,[`ajustes`]]];function Qt(){Z(`#nav`).innerHTML=Zt.map(([,e,t,n,r])=>`<a href="${e}" class="${r.includes(Q.nome)?`on`:``}" ${r.includes(Q.nome)?`aria-current="page"`:``}>${V(t,24)}<span>${n}</span></a>`).join(``)}function $t(){let e=Z(`#dock`);e.innerHTML=`${Jt?.semDock||Q.nome===`timer`?``:Rt()}${Jt?.cta??``}`,document.documentElement.style.setProperty(`--dock-h`,e.children.length?`${e.offsetHeight}px`:`0px`)}function $(){Q=Xt();let e=T(),t;switch(Q.nome){case`exercicio`:et(Q.arg),t=ct({id:Q.arg});break;case`editar`:t=pt();break;case`timer`:t=zt();break;case`progresso`:t=bt();break;case`historico`:t=Tt();break;case`sessao`:t=Et({id:Q.arg});break;case`ajustes`:t=Nt();break;default:t=Qe()}Jt=t;let n=`${Q.nome}/${Q.arg??``}`,r=window.scrollY;Z(`#topbar`).innerHTML=t.top,Z(`#view`).innerHTML=t.html,document.body.classList.toggle(`sem-nav`,!t.nav),Qt(),$t(),n===Yt?window.scrollTo(0,r):window.scrollTo(0,0),Yt=n,P.rolarAtiva&&(P.rolarAtiva=!1,requestAnimationFrame(()=>document.querySelector(`.serie.ativa`)?.scrollIntoView({block:`center`,behavior:`smooth`}))),Ye(!!e.ativa&&e.config.telaLigada)}document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-a]`);if(!t)return;let n=Oe[t.dataset.a];n&&(e.preventDefault(),Ue(),n(t,e))}),document.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&e.target.matches?.(`[role="button"][data-a]`)&&(e.preventDefault(),e.target.click()),e.key===`Enter`&&e.target.matches?.(`input.num-input`)&&e.target.blur()}),document.addEventListener(`input`,e=>{let t=e.target,n=t.dataset?.in;n&&t.type!==`file`&&t.tagName!==`SELECT`&&ke[n]?.(t.dataset,t.value,t,`input`)}),document.addEventListener(`change`,e=>{let t=e.target,n=t.dataset?.in;if(n){if(t.type===`file`||t.tagName===`SELECT`)ke[n]?.(t.dataset,t.value,t,`change`);else if(t.dataset.fmt!=null){let e=u(t.value)??0;t.value=t.dataset.fmt===`1`?new Intl.NumberFormat(`pt-BR`,{minimumFractionDigits:1,maximumFractionDigits:2}).format(e):String(Math.round(e))}}}),window.addEventListener(`hashchange`,$),window.addEventListener(`online`,$),window.addEventListener(`offline`,$),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Ye(!!T().ativa&&T().config.telaLigada)}),window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),P.instalar=e,Q.nome===`ajustes`&&$()}),window.addEventListener(`appinstalled`,()=>{P.instalar=null,Q.nome===`ajustes`&&$()}),te(),ee($),H.mudou=()=>{$t(),Q.nome===`timer`&&$()},H.tick=()=>{Bt(),document.querySelectorAll(`[data-dur]`).forEach(e=>{e.textContent=l(Date.now()-Number(e.dataset.dur))})},Je(),new ResizeObserver(()=>{let e=Z(`#dock`);document.documentElement.style.setProperty(`--dock-h`,e.children.length?`${e.offsetHeight}px`:`0px`)}).observe(Z(`#dock`)),$(),qe(),qt(async()=>{let{registerSW:e}=await import(`./virtual_pwa-register-mr-5F_zx.js`);return{registerSW:e}},[],import.meta.url).then(({registerSW:e})=>e({immediate:!0})).catch(()=>{});export{qt as t};