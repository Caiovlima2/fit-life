(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4),t=new Intl.NumberFormat(`pt-BR`,{minimumFractionDigits:0,maximumFractionDigits:1}),n=new Intl.NumberFormat(`pt-BR`,{minimumFractionDigits:1,maximumFractionDigits:1}),r=new Intl.NumberFormat(`pt-BR`,{maximumFractionDigits:0}),i=e=>t.format(Number.isFinite(e)?e:0),a=e=>n.format(Number.isFinite(e)?e:0),o=e=>r.format(Number.isFinite(e)?e:0);function s(e){return e=Math.max(0,Math.round(e)),String(Math.floor(e/60)).padStart(2,`0`)+`:`+String(e%60).padStart(2,`0`)}function c(e){return e=Math.max(0,Math.round(e)),Math.floor(e/60)+`:`+String(e%60).padStart(2,`0`)}function l(e){let t=Math.max(0,Math.round(e/6e4));return t<60?`${t}m`:`${Math.floor(t/60)}h${String(t%60).padStart(2,`0`)}`}function u(e){let t=String(e??``).trim().replace(`,`,`.`);if(t===``)return null;let n=Number(t);return Number.isFinite(n)?n:null}var d=(e,t=.5)=>Math.round(e/t)*t,f=(e,t,n)=>Math.min(n,Math.max(t,e)),p=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function m(e){let t=new Date(e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}var h=(e,t)=>new Intl.DateTimeFormat(`pt-BR`,t).format(new Date(e)),g=e=>h(e,{day:`2-digit`,month:`short`}).replace(`.`,``),_=e=>h(e,{hour:`2-digit`,minute:`2-digit`});function v(e){let t=new Date(e);return t.setHours(0,0,0,0),t.setDate(t.getDate()-t.getDay()),t.getTime()}var y=[[`peito`,`Peito`],[`costas`,`Costas`],[`pernas`,`Pernas`],[`ombros`,`Ombros`],[`biceps`,`Bíceps`],[`triceps`,`Tríceps`],[`abdomen`,`Abdômen`],[`gluteos`,`Glúteos`],[`panturrilha`,`Panturrilha`],[`outro`,`Outro`]],b=Object.fromEntries(y),x=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),S=[[`panturrilha`,/panturrilha|gemeos|\bcalf\b|soleo/],[`gluteos`,/gluteo|hip thrust|elevacao pelvica|abdutora|coice/],[`abdomen`,/abdom|prancha|crunch|obliquo|\binfra\b/],[`triceps`,/triceps|testa|frances|paralelas|mergulho|\bdips\b/],[`biceps`,/biceps|rosca|martelo|scott/],[`ombros`,/ombro|desenvolvimento|elevacao lateral|elevacao frontal|crucifixo inverso|face pull|militar|arnold|encolhimento|trapezio/],[`peito`,/supino|peito|peitoral|crucifixo|crossover|voador|peck deck|\bfly\b|flexao de braco/],[`costas`,/puxada|remada|barra fixa|serrote|pulldown|costas|dorsal|pullover|hiperextensao|lombar/],[`pernas`,/agacha|\bleg\b|flexora|extensora|stiff|terra|afundo|passada|\bhack\b|avanco|bulgaro|perna|quadriceps|posterior|adutora|romeno/]];function C(e){let t=x(String(e??``));return S.find(([,e])=>e.test(t))?.[0]??``}var w=`fitlife:v1`,T={normal:`Normal`,drop:`Drop set`,cluster:`Cluster`,restpause:`Rest-pause`,tempo:`Por tempo`},ee={leve:`Leve`,moderada:`Moderada`,pesada:`Pesada`},te=[45,60,90,120,180],ne=.2,re=[.2,.3,.4],ie=[.5,.75,.9],ae=[12,6,3],E=e=>e===`cluster`||e===`restpause`,D,oe=()=>{},O=()=>D,se=e=>oe=e;function ce(){try{localStorage.setItem(w,JSON.stringify(D))}catch(e){console.warn(`Não foi possível salvar`,e)}}function k(e,t=!0){e(D),ce(),t&&oe()}function le(){try{let e=localStorage.getItem(w);if(e)return D=ue(JSON.parse(e)),D}catch(e){console.warn(`Dados ilegíveis, começando do zero`,e)}return D=fe(),ce(),D}function ue(e){let t=fe();e.config={...t.config,...e.config||{}},e.treinos=Array.isArray(e.treinos)?e.treinos:t.treinos,e.sessoes=Array.isArray(e.sessoes)?e.sessoes:[],e.ativa??=null,e.timer??=null,e.ultimoBackup??=null;for(let t of e.treinos)for(let e of t.exercicios??[])e.musculo??=C(e.nome);return e.treinos.find(t=>t.id===e.treinoAtual)||(e.treinoAtual=e.treinos[0]?.id??null),e}function de(e){D=ue(e),ce(),oe()}function fe(){let e=[he()];return{v:1,treinos:e,treinoAtual:e[0].id,sessoes:[],ativa:null,timer:null,ultimoBackup:null,config:{som:!0,vibracao:!0,telaLigada:!0,autoDescanso:!0,rpe:!0,sugestaoCarga:!0,passo:2.5,metaSemanal:4,volMin:10,volMax:20,tema:`escuro`,notificacao:!1}}}function A(e=`normal`,t=10,n=12){return{tipo:e,repsMin:t,repsMax:n,degraus:3,blocos:e===`restpause`?3:4,pausa:15,reducao:ne,segundos:45}}function pe(t=`Novo exercício`){return{id:e(),nome:t,grupo:``,musculo:``,intensidade:`moderada`,descanso:90,video:``,nota:``,series:[A(),A(),A()]}}function me(t=`Novo treino`){return{id:e(),nome:t,foco:``,exercicios:[]}}function he(){let t=(t,n,r,i,a,o=``)=>({id:e(),nome:t,grupo:n,musculo:C(t),intensidade:r,descanso:i,video:``,nota:o,series:a}),n=(e,t,n)=>Array.from({length:e},()=>A(`normal`,t,n));return{id:e(),nome:`Treino A – Peito e Tríceps`,foco:`Exemplo — edite ou apague à vontade`,exercicios:[t(`Supino Reto com Barra`,`Peitoral maior · Composto`,`pesada`,120,n(4,8,10),`Escápulas travadas no banco. Não estalar os cotovelos no topo.`),t(`Supino Inclinado com Halteres`,`Peitoral superior`,`moderada`,90,n(3,10,12)),t(`Crossover na Polia Média`,`Peitoral maior · Isolador`,`pesada`,90,[...n(3,10,12),A(`drop`,10,12)],`Segurar 1s no pico de contração antes de iniciar o drop.`),t(`Desenvolvimento Militar`,`Ombros`,`pesada`,150,n(4,6,8)),t(`Paralelas (Dips) com Carga`,`Peitoral inferior · Tríceps`,`pesada`,120,Array.from({length:3},()=>({...A(`cluster`,3,3),blocos:4,pausa:15})),`Foco no peitoral, tronco inclinado 30° à frente.`),t(`Tríceps Testa na Barra`,`Tríceps`,`moderada`,75,n(3,10,12)),t(`Tríceps Corda na Polia`,`Tríceps`,`leve`,60,[...n(3,12,15),A(`drop`,12,15)])]}}var j=()=>D.treinos.find(e=>e.id===D.treinoAtual)??D.treinos[0]??null;function M(e){for(let t of D.treinos){let n=t.exercicios.find(t=>t.id===e);if(n)return{treino:t,ex:n}}return null}var ge=e=>e.repsMin===e.repsMax?`${e.repsMin}`:`${e.repsMin}-${e.repsMax}`;function N(e,t){let n=e.slice(0,t+1);return e[t].aquecimento?`Aquec. ${n.filter(e=>e.aquecimento).length}`:`Série ${n.filter(e=>!e.aquecimento).length}`}function _e(e){let t=[];for(let n of e){let e=t.at(-1),r=`${n.tipo}|${n.repsMin}|${n.repsMax}|${n.degraus}|${n.blocos}|${n.pausa}|${n.reducao}|${n.segundos}`;e&&e.chave===r?e.qtd++:t.push({chave:r,qtd:1,s:n})}return t.map(({qtd:e,s:t})=>t.tipo===`normal`?`${e} × ${ge(t)}`:t.tipo===`drop`?`${e} drop`:t.tipo===`restpause`?`${e} rest-pause`:t.tipo===`tempo`?`${e} × ${t.segundos??45} s`:`${e} cluster`).join(` + `)}function ve(e,t){if(!e)return`—`;if(E(e.tipo))return`${t(e.carga)} kg · ${e.partes.map(e=>e.reps).join(`+`)}`;if(e.tipo===`tempo`){let n=e.partes[0];return`${n.segundos} s${n.carga>0?` · +${t(n.carga)} kg`:``}`}if(e.tipo===`drop`)return e.partes.map(e=>`${t(e.carga)}×${e.reps}`).join(` ▸ `);let n=e.partes[0];return`${t(n.carga)} kg × ${n.reps}`}var P=e=>E(e.tipo)?e.carga:e.partes[0]?.carga??0,ye=(e,t)=>E(e.tipo)?e.carga:t.carga;function be(e){return e.aquecimento||e.tipo===`tempo`?0:e.partes.reduce((t,n)=>n.ok?t+ye(e,n)*(n.reps||0):t,0)}function xe(e){let t=0;for(let n of Object.values(e.exercicios))for(let e of n.series)t+=be(e);return t}var Se=(e,t)=>t<=1?e:e*(1+t/30);function Ce(e,t=1/0){for(let n=D.sessoes.length-1;n>=0;n--){let r=D.sessoes[n];if(r.inicio>=t)continue;let i=r.exercicios[e];if(i&&i.series.some(e=>e.concluida&&!e.aquecimento))return{sessao:r,ex:i}}return null}function we(e,t,n){let r=0;for(let i of D.sessoes)if(i.id!==n)for(let n of i.exercicios[e]?.series??[])n.concluida&&!n.aquecimento&&n.tipo===t&&(r=Math.max(r,P(n)));return r}function Te(e,t,n,r,i=ne){let a=[];for(let o=0;o<n;o++)if(r?.tipo===`drop`&&r.partes[o])a.push({carga:r.partes[o].carga,reps:r.partes[o].reps,ok:!1});else{let n=o===0?e:d(a[o-1].carga*(1-i));a.push({carga:n,reps:t,ok:!1})}return a}function Ee(e,t,n={}){let r=t?P(t):0,i=t?.partes?.[0]?.reps||e.repsMax,a={tipo:e.tipo,repsMin:e.repsMin,repsMax:e.repsMax,concluida:!1,auto:!t,...n};if(E(e.tipo)){let n=t?.tipo===e.tipo,i=n?t.partes.length:e.blocos;return{...a,pausa:e.pausa,carga:r,partes:Array.from({length:i},(r,i)=>({reps:(n?t.partes[i]?.reps:null)??e.repsMax,ok:!1}))}}if(e.tipo===`drop`){let n=t?.tipo===`drop`&&t.reducao||e.reducao||.2,o=t?.tipo===`drop`?t.partes.length:e.degraus;return{...a,reducao:n,partes:Te(r,i,o,t,n)}}if(e.tipo===`tempo`){let n=t?.tipo===`tempo`,i=n?t.partes[0].segundos:e.segundos??45;return{...a,partes:[{carga:n?r:0,reps:0,segundos:i,ok:!1}]}}return{...a,partes:[{carga:r,reps:i,ok:!1}]}}function De(e,t,n){if(!e||e.tipo!==`normal`||e.aquecimento||!e.concluida)return null;let{carga:r,reps:i}=e.partes?.[0]??{};return!(r>0)||!(i>=t)||e.rpe>=9?null:{carga:r+n,de:r,reps:i}}function Oe(e,t){let n=e.exercicios[t.id];if(!n){let r=Ce(t.id,e.inicio),i=r?r.ex.series.filter(e=>!(e.aquecimento&&e.extra)):[];n={nome:t.nome,nota:``,series:t.series.map((e,t)=>{let n=i.length?i[t]??i.at(-1):null,r=Ee(e,n);n?.aquecimento&&(r.aquecimento=!0);let a=D.config.sugestaoCarga?De(n,e.repsMax,D.config.passo):null;return a&&!r.aquecimento&&(r.partes[0].carga=a.carga,r.sugestao={de:a.de,reps:a.reps}),r})},e.exercicios[t.id]=n}return n}function ke(t){return D.ativa={id:e(),treinoId:t.id,nome:t.nome,inicio:Date.now(),fim:null,exercicios:{}},D.ativa}function Ae(e,t){if(e.tipo===t)return e;let n=e.tipo===`tempo`?0:P(e),r=e.partes[0]?.reps||e.repsMax,i=Ee({tipo:t,repsMin:e.repsMin,repsMax:e.repsMax,degraus:3,blocos:t===`restpause`?3:4,pausa:15,reducao:e.reducao??.2,segundos:45},{tipo:`normal`,partes:[{carga:n,reps:r,ok:!1}]},{extra:e.extra,aquecimento:e.aquecimento});return i.auto=!1,i}function je(e){let t=e.partes.at(-1),n=e.reducao??.2;e.partes.push({carga:Math.max(0,d(t.carga*(1-n))),reps:t.reps,ok:!1})}function Me(e,t){e.reducao=t;for(let n=1;n<e.partes.length;n++)e.partes[n].ok||(e.partes[n].carga=Math.max(0,d(e.partes[n-1].carga*(1-t))))}function Ne(e,t=null){let n=e=>e.filter(e=>e.aquecimento&&e.extra),r=n(e.series).length,i=t?n(t.series)[r]:null,a=Math.min(r,ie.length-1),o=e.series.find(e=>!e.aquecimento),s=i?P(i):d((o?P(o):0)*ie[a],2.5),c=i?.partes[0].reps||ae[a],l={tipo:`normal`,repsMin:c,repsMax:c,aquecimento:!0,extra:!0,concluida:!1,auto:!i,partes:[{carga:s,reps:c,ok:!1}]},u=e.series.findLastIndex(e=>e.aquecimento&&e.extra)+1;return e.series.splice(u,0,l),u}function Pe(e,t,n){let r=e.exercicios[t],i=r.series[n],a=i.partes.length>0&&i.partes.every(e=>e.ok);if(i.concluida=a,!a||i.aquecimento){i.recorde=!1;return}let o=P(i),s=we(t,i.tipo,e.id);r.series.forEach((e,t)=>{t!==n&&e.concluida&&!e.aquecimento&&e.tipo===i.tipo&&(s=Math.max(s,P(e)))}),i.recorde=s>0&&o>s}function Fe(e,t){let n=e.series[t],r=e.series[t+1];if(n.aquecimento||n.tipo===`tempo`||!r||!r.auto||r.concluida||r.aquecimento||r.tipo===`tempo`)return;let i=P(n);E(r.tipo)?r.carga=i:r.tipo===`drop`?r.partes=Te(i,r.partes[0].reps,r.partes.length,null,r.reducao??.2):r.partes[0].carga=i}function F(e){let t=0,n=0,r=0;for(let i of Object.values(e.exercicios)){let e=i.series.filter(e=>e.concluida&&!e.aquecimento);t+=e.length,n+=e.filter(e=>e.recorde).length,e.length&&r++}return{series:t,recordes:n,feitos:r,volume:xe(e),duracao:(e.fim??Date.now())-e.inicio}}function Ie(){let e=new Map;for(let t of D.sessoes)for(let[n,r]of Object.entries(t.exercicios))r.series.some(e=>e.concluida&&!e.aquecimento)&&e.set(n,r.nome);return[...e].map(([e,t])=>({id:e,nome:t}))}function Le(e){let t=[];for(let n of D.sessoes){let r=n.exercicios[e];if(!r)continue;let i=r.series.filter(e=>e.concluida&&!e.aquecimento&&(e.tipo===`normal`||e.tipo===`drop`));if(!i.length)continue;let a=i.reduce((e,t)=>P(t)>P(e)?t:e,i[0]);t.push({ts:n.inicio,carga:P(a),reps:a.partes[0].reps,sessao:n})}return t}function Re(){let e=new Map;for(let t of D.sessoes){let n=m(t.inicio);e.has(n)||e.set(n,[]),e.get(n).push(t)}return e}var ze=e=>F(e).series>0;function Be(e,t){return M(e)?.ex.musculo||C(t)||`outro`}var I={aberta:{},editEx:null,rapida:``,progEx:null,periodo:`3m`,progAba:`evolucao`,recGrupo:`todos`,volSemana:0,volGrupo:null,mes:null,dia:null,rolarAtiva:!1,rpe:null,instalar:null},Ve={},He={};function L(e={},t={}){Object.assign(Ve,e),Object.assign(He,t)}var Ue=e=>document.querySelector(e),We;function R(e){let t=Ue(`#toast`);t.textContent=e,t.classList.add(`on`),clearTimeout(We),We=setTimeout(()=>t.classList.remove(`on`),2200)}function z(e){let t=Ue(`#sheet`);t.innerHTML=`<div class="fundo" data-a="fechar"></div><div class="painel" role="dialog" aria-modal="true"><div class="alca"></div>${e}</div>`,t.classList.add(`aberto`)}function B(){let e=Ue(`#sheet`);e.classList.remove(`aberto`),e.innerHTML=``}var Ge=null;function Ke({titulo:e,texto:t=``,ok:n=`Confirmar`,perigo:r=!0,fn:i}){Ge=i,z(`
    <h2 class="h-md">${p(e)}</h2>
    ${t?`<p class="mute" style="margin:8px 0 16px">${p(t)}</p>`:`<div class="mt16"></div>`}
    <button class="btn ${r?`sec danger`:``}" data-a="confirmado">${p(n)}</button>
    <button class="btn sec mt8" data-a="fechar">Cancelar</button>`)}L({fechar:()=>B(),confirmado:()=>{let e=Ge;Ge=null,B(),e?.()}});var V=e=>{location.hash=e},qe=Object.assign({"/node_modules/lucide-static/icons/arrow-down.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
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
`,"/node_modules/lucide-static/icons/gauge.svg":`<!-- @license lucide-static v1.61.0 - ISC -->
<svg
  class="lucide lucide-gauge"
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
  <path d="m12 14 4-4" />
  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
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
`}),Je={};for(let[e,t]of Object.entries(qe)){let n=e.split(`/`).pop().replace(`.svg`,``);Je[n]=t}function H(e,t=20,n=``){let r=Je[e];return r?r.replace(/<!--[\s\S]*?-->/g,``).replace(/width="24"/,`width="${t}"`).replace(/height="24"/,`height="${t}"`).replace(/class="[^"]*"/,`class="ic ${n}" aria-hidden="true"`):``}var Ye=()=>typeof Notification<`u`&&`serviceWorker`in navigator,Xe=()=>Ye()?Notification.permission:`unsupported`;async function Ze(){if(!Ye())return`unsupported`;if(Notification.permission!=="default")return Notification.permission;try{return await Notification.requestPermission()}catch{return`denied`}}function Qe(e){return e.tipo===`pausa`?{titulo:`Pausa terminou`,corpo:e.proxima?.texto??`Continue a série.`}:e.tipo===`tempo`?{titulo:`Tempo acabou`,corpo:e.proxima?.texto??`Série por tempo concluída.`}:{titulo:`Descanso terminou`,corpo:e.proxima?.texto??`Hora da próxima série.`}}async function $e(e){if(Xe()===`granted`)try{let t=await navigator.serviceWorker.getRegistration(),{titulo:n,corpo:r}=Qe(e);await t?.showNotification(n,{body:r,tag:`timer`,icon:`icon-192.png`,badge:`icon-192.png`,vibrate:[250,100,250,100,500],renotify:!0})}catch{}}async function et(){if(Ye())try{(await(await navigator.serviceWorker.getRegistration())?.getNotifications({tag:`timer`}))?.forEach(e=>e.close())}catch{}}var U={mudou:()=>{},tick:()=>{}};function tt(){let e=O().timer;return e?e.fim==null?e.restante??0:Math.max(0,e.fim-Date.now()):0}var W=()=>Math.ceil(tt()/1e3),nt=()=>!!O().timer&&O().timer.fim==null;function rt({seg:e,tipo:t=`descanso`,ref:n=null,proxima:r=null}){it();let i=Date.now();k(a=>{a.timer={inicio:i,fim:i+e*1e3,restante:null,total:e,tipo:t,ref:n,proxima:r,terminou:!1}},!1),U.mudou()}function it(){let e=O(),t=e.timer;if(!t||t.tipo!==`descanso`||!t.ref||!e.ativa)return;let n=e.ativa.exercicios[t.ref.exId]?.series[t.ref.idx];if(!n)return;let r=Math.round((Date.now()-t.inicio)/1e3);k(()=>{n.descansoReal=Math.min(r,3600)},!1)}function at(){it(),k(e=>{e.timer=null},!1),U.mudou()}function ot(e){let t=O().timer;t&&(k(()=>{t.fim==null?t.restante=Math.max(0,(t.restante??0)+e*1e3):t.fim+=e*1e3,t.total=Math.max(t.total,Math.ceil(tt()/1e3)),t.terminou=tt()<=0},!1),U.mudou())}function st(){let e=O().timer;e&&e.fim!=null&&(k(()=>{e.restante=Math.max(0,e.fim-Date.now()),e.fim=null},!1),U.mudou())}function ct(){let e=O().timer;e&&e.fim==null&&(k(()=>{e.fim=Date.now()+(e.restante??0),e.restante=null},!1),U.mudou())}function lt(e){let t=O().timer;t&&(k(()=>{t.total=e,t.fim=t.inicio+e*1e3,t.restante=null,t.terminou=t.fim<=Date.now()},!1),U.mudou())}var G=null;function ut(){try{G??=new(window.AudioContext||window.webkitAudioContext),G.state===`suspended`&&G.resume()}catch{}}function dt(e=3){try{if(ut(),!G)return;for(let t=0;t<e;t++){let n=G.createOscillator(),r=G.createGain(),i=G.currentTime+t*.28;n.type=`square`,n.frequency.value=t===e-1?1320:880,r.gain.setValueAtTime(1e-4,i),r.gain.exponentialRampToValueAtTime(.25,i+.02),r.gain.exponentialRampToValueAtTime(1e-4,i+.2),n.connect(r).connect(G.destination),n.start(i),n.stop(i+.22)}}catch{}}function ft(e=15){try{navigator.vibrate?.(e)}catch{}}function pt(e){let{som:t,vibracao:n,notificacao:r}=O().config,i=e.tipo!==`descanso`;t&&dt(i?2:3),n&&ft(i?[150,80,150]:[250,100,250,100,500]),r&&document.visibilityState===`hidden`&&$e(e)}function mt(){let e=O().timer;e&&(e.fim!=null&&!e.terminou&&Date.now()>=e.fim?(k(()=>{e.terminou=!0},!1),pt(e),U.mudou()):U.tick())}function ht(){setInterval(mt,250),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&(et(),mt())})}var K=null;async function gt(e){if(`wakeLock`in navigator)try{e&&!K?(K=await navigator.wakeLock.request(`screen`),K.addEventListener(`release`,()=>{K=null})):!e&&K&&(await K.release(),K=null)}catch{}}var _t=[[`escuro`,`Escuro`],[`claro`,`Claro`],[`auto`,`Automático`]],vt={escuro:`#0C0E12`,claro:`#F3F5F9`},yt=(e,t)=>e===`claro`||e===`auto`&&t?`claro`:`escuro`;function bt(e){let t=yt(e,window.matchMedia?.(`(prefers-color-scheme: light)`).matches??!1);document.documentElement.dataset.tema=t,document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,vt[t])}function xt(e){let t;try{t=new URL(String(e).trim())}catch{return null}let n=t.hostname.replace(/^(www|m|music)\./,``),r=``;if(n===`youtu.be`)r=t.pathname.slice(1).split(`/`)[0];else if(n===`youtube.com`||n===`youtube-nocookie.com`){let[,e,n]=t.pathname.split(`/`);e===`watch`?r=t.searchParams.get(`v`)??``:[`shorts`,`embed`,`live`,`v`].includes(e)&&(r=n??``)}return/^[\w-]{11}$/.test(r)?{id:r,inicio:St(t.searchParams.get(`t`)??t.searchParams.get(`start`)??``)}:null}function St(e){if(/^\d+$/.test(e))return Number(e);let t=/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(e);return t&&e?Number(t[1]??0)*3600+Number(t[2]??0)*60+Number(t[3]??0):0}function Ct({id:e,inicio:t}){let n=new URLSearchParams({rel:`0`,playsinline:`1`,modestbranding:`1`});return t>0&&n.set(`start`,String(t)),`https://www.youtube-nocookie.com/embed/${e}?${n}`}var wt=({id:e,inicio:t})=>`https://youtu.be/${e}${t>0?`?t=${t}`:``}`,Tt=e=>`https://www.youtube.com/results?${new URLSearchParams({search_query:`${e} execução`})}`;function Et(e,t,n=24){let r=e.video?`Ver vídeo de ${p(e.nome)}`:`Sem vídeo cadastrado`;return`<button class="${t}${e.video&&t===`vid`?` on`:``}" data-a="${e.video?`ver-video`:`sem-video`}" data-id="${e.id}" aria-label="${r}">${H(`circle-play`,n)}${t===`chip`?` Ver vídeo`:``}</button>`}function Dt(e){let t=xt(e.video);return t?`${navigator.onLine?`<div class="video-box"><iframe src="${p(Ct(t))}" title="${p(e.nome)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`:`<div class="video-box off">${H(`wifi-off`,32)}<p>Sem internet. O vídeo precisa de conexão.</p></div>`}<a class="btn sec mt12" href="${p(wt(t))}" target="_blank" rel="noopener">${H(`external-link`,18)} Abrir no YouTube</a>`:`<p class="mute" style="margin:8px 0 16px">Este link não é do YouTube, então não dá para tocar aqui dentro.</p>
      <a class="btn" href="${p(e.video)}" target="_blank" rel="noopener">${H(`external-link`,18)} Abrir link</a>`}L({"ver-video":e=>{let t=M(e.dataset.id)?.ex;if(!t?.video)return R(`Sem vídeo cadastrado. Adicione o link em Editar treino.`);z(`<h2 class="h-md" style="margin-bottom:12px">${p(t.nome)}</h2>${Dt(t)}
      <button class="btn sec mt8" data-a="fechar">Fechar</button>`)}});function Ot(e){let t={leve:`Leve`,moderada:`Moderada`,pesada:`Pesada`}[e]??e;return`<span class="badge ${p(e)}">${t}</span>`}var kt={drop:`Drop set`,cluster:`Cluster set`,restpause:`Rest-pause`,tempo:`Por tempo`};function At(e){let t=[];for(let[n,r]of Object.entries(kt)){let i=e.series.map((e,t)=>e.tipo===n?t+1:0).filter(Boolean);if(!i.length)continue;let a=n===`drop`?` · Série ${i.join(`, `)}`:i.length>1?` ×${i.length}`:``;t.push(`<span class="badge tec">${H(`layers`,12)} ${r}${a}</span>`)}return t.join(``)}function jt(){let e=O(),t=e.ativa,n=t?e.treinos.find(e=>e.id===t.treinoId)??j():j();if(!n)return{top:`<h1>Treino</h1>`,html:`<div class="vazio">${H(`dumbbell`,40)}<p>Você ainda não tem nenhum treino.</p><button class="btn" data-a="novo-treino">Criar primeiro treino</button></div>`,nav:!0};let r=h(Date.now(),{weekday:`long`,day:`numeric`,month:`long`}),i=n.exercicios.length,a=n.exercicios.filter(e=>{let n=t?.exercicios[e.id];return n&&n.series.filter(e=>!e.extra).every(e=>e.concluida)}).length,s=i?Math.round(a/i*100):0,u=t?F(t):null,d=e.treinos.length>1||!t?`<div class="periodos" style="margin:12px 0 0">
          ${e.treinos.map(e=>`<button class="chip ${e.id===n.id?`on`:``}" ${t?`disabled style="opacity:.5"`:`data-a="escolher-treino" data-id="${e.id}"`}>${p(e.nome.split(`–`)[0].trim())}</button>`).join(``)}
          ${t?``:`<button class="chip" data-a="novo-treino">${H(`plus`,14)} Novo</button>`}
        </div>`:``,f=n.exercicios.map((e,r)=>{let i=t?.exercicios[e.id],a=i?i.series.filter(e=>e.concluida).length:0,o=i?i.series.length:e.series.length,s=!!i&&i.series.filter(e=>!e.extra).every(e=>e.concluida),l=!s&&a>0,u=n.exercicios.find(e=>{let n=t?.exercicios[e.id];return!(n&&n.series.filter(e=>!e.extra).every(e=>e.concluida))}),d=t&&u?.id===e.id,f=s?`<span class="stat-ok">${H(`circle-check`,16)} Concluído (${a}/${o} séries)</span>`:l?`<span class="stat-and">Em andamento · ${a}/${o} séries</span>`:`<span class="stat-pend">PENDENTE</span>`,m=s?`Registro`:l?`Continuar`:`Iniciar`,h=Et(e,`vid`);return`
      <article class="card ex-card ${d?`hl`:``}">
        <div class="row between">
          <div class="row wrap grow" style="gap:6px">
            ${Ot(e.intensidade)}
            ${At(e)}
            <span class="badge neutro">${H(`hourglass`,12)} ${c(e.descanso)}</span>
          </div>
          ${h}
        </div>
        <a href="#/exercicio/${e.id}"><div class="nome">${r+1}. ${p(e.nome)}</div></a>
        <div class="resumo">${p(_e(e.series))}${e.grupo?` <span class="mute" style="font-weight:400">· ${p(e.grupo)}</span>`:``}</div>
        ${e.nota?`<div class="nota">${H(`lightbulb`,16)}<span>${p(e.nota)}</span></div>`:``}
        <div class="ex-foot">
          ${f}
          <a class="btn ${s||!d?`sec`:``} sm" href="#/exercicio/${e.id}">${m}${s?``:H(`arrow-right`,16)}</a>
        </div>
      </article>`}).join(``),m=`
    <section class="card hl" style="margin-top:8px">
      <div class="row wrap" style="gap:8px">
        <span class="badge neutro" style="text-transform:uppercase">${H(`calendar`,12)} ${p(r)}</span>
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
        <a class="link-btn" href="#/editar">${H(`pencil`,14)} Editar treino</a>
      </div>
    </section>
    ${i?f:`<div class="vazio">${H(`list-checks`,36)}<p>Este treino ainda não tem exercícios.</p><a class="btn" href="#/editar">Adicionar exercícios</a></div>`}
  `,g=i?t?`<button class="btn cta-dock" data-a="finalizar">${H(`circle-check`,20)} FINALIZAR TREINO</button>`:`<button class="btn cta-dock" data-a="iniciar">${H(`play`,20)} INICIAR TREINO</button>`:``;return{top:`<h1>Treino</h1><span class="tag-ativo ${navigator.onLine?``:`off`}">${navigator.onLine?`Pronto`:`Offline`}</span>`,html:m,cta:g,nav:!0}}function Mt(){let e=O().ativa,t=F(e);t.series===0?z(`
      <h2 class="h-md">Nenhuma série registrada</h2>
      <p class="mute" style="margin:8px 0 16px">Você ainda não concluiu nenhuma série neste treino. Quer continuar ou descartar a sessão?</p>
      <button class="btn" data-a="fechar">Continuar treinando</button>
      <button class="btn sec danger mt8" data-a="descartar">Descartar sessão</button>`):z(`
    <h2 class="h-md">Finalizar treino?</h2>
    <div class="metrics">
      <div class="metric"><span class="caps mute">Duração</span><b>${l(t.duracao)}</b></div>
      <div class="metric"><span class="caps mute">Carga total</span><b>${o(t.volume)} kg</b></div>
      <div class="metric"><span class="caps mute">Séries</span><b>${t.series}</b></div>
      <div class="metric"><span class="caps mute">Recordes</span><b class="lime">${t.recordes}</b></div>
    </div>
    <button class="btn mt16" data-a="salvar-treino">Salvar treino</button>
    <button class="btn sec mt8" data-a="fechar">Continuar treinando</button>
    <button class="btn sec danger mt8" data-a="descartar">Descartar sessão</button>`)}L({iniciar:()=>{k(e=>ke(j()??e.treinos[0])),R(`Treino iniciado. Bom treino!`)},"escolher-treino":e=>k(t=>t.treinoAtual=e.dataset.id),"novo-treino":()=>{k(e=>{let t=me(`Treino ${String.fromCharCode(65+e.treinos.length)}`);e.treinos.push(t),e.treinoAtual=t.id},!1),I.editEx=null,V(`#/editar`)},"sem-video":()=>R(`Sem vídeo cadastrado. Adicione o link em Editar treino.`),finalizar:Mt,"salvar-treino":()=>{at();let e=O().ativa;k(t=>{e.fim=Date.now();for(let t of Object.keys(e.exercicios))e.exercicios[t].series=e.exercicios[t].series.filter(e=>e.concluida),e.exercicios[t].series.length||delete e.exercicios[t];t.sessoes.push(e),t.ativa=null},!1),B(),R(`Treino salvo no histórico`),V(`#/sessao/${e.id}`)},descartar:()=>{at(),k(e=>e.ativa=null),B(),V(`#/`),R(`Sessão descartada`)}});function Nt({campo:e,i:t,p:n=0,valor:r,passo:o,un:s,casas:c}){let l=c===1?a(r):String(Math.round(r||0)),u={reps:`Repetições`,segundos:`Segundos`}[e]??`Carga em kg`;return`<div class="stepper">
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="-1" aria-label="Diminuir">−${i(o)}</button>
    <div class="valor"><input class="num-input" inputmode="${c===1?`decimal`:`numeric`}" data-in="${e}" data-i="${t}" data-p="${n}" data-fmt="${c}" value="${l}" aria-label="${u}"><span class="un">${s}</span></div>
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="1" aria-label="Aumentar">+${i(o)}</button>
  </div>`}function Pt({campo:e,i:t,p:n=0,valor:r,casas:i}){let o=i===1?a(r):String(Math.round(r||0));return`<div class="stepper-mini">
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="-1" aria-label="Diminuir">−</button>
    <div class="valor"><input class="num-input" inputmode="${i===1?`decimal`:`numeric`}" data-in="${e}" data-i="${t}" data-p="${n}" data-fmt="${i}" value="${o}" aria-label="${e===`reps`?`Repetições`:`Carga em kg`}"></div>
    <button data-a="passo" data-campo="${e}" data-i="${t}" data-p="${n}" data-d="1" aria-label="Aumentar">+</button>
  </div>`}function Ft(e,t){if(e.tipo===`tempo`||t.tipo===`tempo`){let n=(e.partes[0]?.segundos??0)-(t.partes[0]?.segundos??0);return n>0?`<span class="trend up">↑ +${n} s</span>`:n<0?`<span class="trend dn">↓ ${n} s</span>`:`<span class="trend eq">=</span>`}let n=P(e)-P(t);if(Math.abs(n)>.001)return n>0?`<span class="trend up">↑ +${i(n)}</span>`:`<span class="trend dn">↓ ${i(n)}</span>`;let r=(e.partes[0]?.reps??0)-(t.partes[0]?.reps??0);return r>0?`<span class="trend up">↑ +${r} rep</span>`:r<0?`<span class="trend dn">↓ ${r} rep</span>`:`<span class="trend eq">=</span>`}function It(e){return e.aquecimento?`Sem alvo`:e.tipo===`tempo`?`Meta: ${e.partes[0].segundos} s`:e.tipo===`restpause`?`Até a falha`:e.tipo===`cluster`?`Meta: ${e.partes.length} × ${ge(e)} reps`:`Meta: ${ge(e)} reps`}function Lt(e,t,n){let r=e.series[t],i=r.aquecimento?`Aquecimento`:T[r.tipo],a=r.aquecimento?`aq`:r.tipo,o=r.concluida?`<span class="tec-chip ${a}">${i}</span>`:`<button class="tec-chip ${a}" data-a="tec" data-i="${t}" aria-label="Mudar técnica de ${N(e.series,t)}">${i} ${H(`chevron-down`,12)}</button>`;return`<div class="serie-h">
    <span class="t">${N(e.series,t)}</span>${o}
    ${r.recorde?`<span class="badge recorde">${H(`trophy`,12)} Recorde</span>`:``}
    ${r.extra&&!r.aquecimento?`<span class="badge neutro">Extra</span>`:``}
    <span class="grow"></span>
    ${n?`<span class="caps ${r.aquecimento?`az`:`lime`}">Em andamento</span>`:`<span class="sm mute">${It(r)}</span>`}
  </div>`}function Rt(e,t,n,r){if(!e.concluida)return``;let i=e.rpe?`<span class="badge neutro">RPE ${e.rpe}</span>`:``,a=e.aquecimento?30:n.descanso;return r&&r.tipo===`descanso`&&r.ref&&r.ref.exId===n.id&&r.ref.idx===t&&!r.terminou?`<div class="descanso-real">${H(`timer`,14)} Descansando… <b class="num lime" data-timer-t>${s(W())}</b>${i}</div>`:e.descansoReal==null?`<div class="descanso-real">${H(`circle-check`,14)} Concluído${i}</div>`:`<div class="descanso-real">${H(`circle-check`,14)} Concluído · descansou ${c(e.descansoReal)} <span class="sub">(meta ${c(a)})</span>${i}</div>`}function zt(e){let t=`<span class="check ${e.concluida?`on`:``}" aria-hidden="true">${H(`check`,24)}</span>`;if(e.tipo===`normal`)return`<div class="serie-resumo">
      <div><span class="caps k">Carga</span><div class="v">${a(e.partes[0].carga)}<small>kg</small></div></div>
      <div><span class="caps k">Reps</span><div class="v">${e.partes[0].reps}</div></div>
      <span class="grow"></span>${t}
    </div>`;if(e.tipo===`tempo`){let n=e.partes[0];return`<div class="serie-resumo">
      <div><span class="caps k">Tempo</span><div class="v">${n.segundos}<small>s</small></div></div>
      ${n.carga>0?`<div><span class="caps k">Peso extra</span><div class="v">${a(n.carga)}<small>kg</small></div></div>`:``}
      <span class="grow"></span>${t}
    </div>`}return`<div class="serie-resumo">
    <div class="grow"><span class="caps k">${e.tipo===`drop`?`${e.partes.length} degraus`:`Carga fixa ${a(e.carga)} kg`}</span>
    <div class="v" style="font-size:20px;line-height:26px">${p(ve(e,i))}</div></div>
    ${t}
  </div>`}function Bt(e,t,n,r){let i=t.series[n],a=i.concluida?``:`data-a="abrir-serie" data-i="${n}" role="button" tabindex="0"`;return`<div class="serie ${i.aquecimento?`aq`:``}" ${a}>
    ${Lt(t,n,!1)}
    ${zt(i)}
    ${Rt(i,n,e,r)}
    ${i.concluida?`<button class="link-btn" style="margin-top:4px" data-a="reabrir" data-i="${n}">${H(`rotate-ccw`,14)} Reabrir série</button>`:``}
  </div>`}function Vt(e,t,n,r){let i=e.series[t],a=i.partes[0],o=i.aquecimento;return`<div class="serie ativa ${o?`aq`:``}">
    ${Lt(e,t,!0)}
    <div class="row between mt12"><span class="caps mute">${o?`Carga`:`Carga de trabalho`}</span><span class="sm mute">${r}</span></div>
    <div class="mt8">${Nt({campo:`carga`,i:t,valor:a.carga,passo:n,un:`kg`,casas:1})}</div>
    <div class="row between mt12"><span class="caps mute">Repetições</span>${o?`<span class="sm az">Sem alvo, o que sentir</span>`:`<span class="sm lime">Alvo: ${ge(i)} reps</span>`}</div>
    <div class="mt8">${Nt({campo:`reps`,i:t,valor:a.reps,passo:1,un:`reps`,casas:0})}</div>
    <button class="btn ${o?`aq`:``} mt16" data-a="salvar" data-i="${t}">${H(`circle-check`,20)} ${o?`Salvar aquecimento`:`Salvar ${N(e.series,t)}`}</button>
  </div>`}function Ht(e,t){let n=e.series[t],r=n.reducao??.2,i=n.partes.map((e,r)=>{let i=n.partes[r-1],a=i&&i.carga>0?Math.round((1-e.carga/i.carga)*100):0,o=r===0?`Base`:`${r===n.partes.length-1?`Drop final`:`Drop`} −${a}%`;return`<div class="parte ${e.ok?`ok`:``}">
        <div class="topo">
          <span class="caps ${r===0?`lime`:`ok`}">Degrau ${r+1} · ${o}</span>
          <span class="row" style="gap:4px">
            ${r===n.partes.length-1&&n.partes.length>1&&!e.ok?`<button class="icon-btn" style="width:40px;height:40px" data-a="rem-parte" data-i="${t}" aria-label="Remover degrau">${H(`x`,16)}</button>`:``}
            <button class="check sm ${e.ok?`on`:``}" data-a="ok-parte" data-i="${t}" data-p="${r}" aria-label="Confirmar degrau ${r+1}" aria-pressed="${e.ok}">${H(`check`,22)}</button>
          </span>
        </div>
        <div class="grid2">
          <div><span class="caps">Carga (kg)</span>${Pt({campo:`carga`,i:t,p:r,valor:e.carga,casas:1})}</div>
          <div><span class="caps">Reps</span>${Pt({campo:`reps`,i:t,p:r,valor:e.reps,casas:0})}</div>
        </div>
      </div>`}).join(``),a=re.map(e=>`<button class="${Math.abs(e-r)<.001?`on`:``}" data-a="set-reducao" data-i="${t}" data-v="${e}" aria-pressed="${Math.abs(e-r)<.001}">${Math.round(e*100)}%</button>`).join(``);return`<div class="serie ativa">
    ${Lt(e,t,!0)}
    <p class="sm mute" style="margin:6px 0 0">Reduza a carga logo após a falha em cada degrau. O descanso só começa ao final do bloco.</p>
    <div class="row between mt12"><span class="caps mute">Redução por degrau</span><span class="sm mute">Recalcula os degraus</span></div>
    <div class="seg mt8" role="group" aria-label="Redução por degrau">${a}</div>
    <div class="bloco">${i}</div>
    <button class="link-btn" data-a="add-degrau" data-i="${t}">${H(`plus`,16)} Adicionar degrau (−${Math.round(r*100)}%)</button>
  </div>`}function Ut(e,t,n,r,i){let a=e.series[t],o=a.tipo===`restpause`,c=i&&i.tipo===`pausa`&&!i.terminou,l=a.partes.map((e,n)=>{let r=c&&e.ok&&n===a.partes.findLastIndex(e=>e.ok);return`<div class="parte ${e.ok?`ok`:``}">
        <div class="topo">
          <span><span class="caps">Bloco ${n+1}</span>${o?`<span class="sm mute" style="display:block">até a falha</span>`:``}</span>
          <span class="row" style="gap:6px">
            ${r?`<span class="pausa-chip">${H(`timer`,14)} <span data-pausa-t>${s(W())}</span></span>`:``}
            ${n===a.partes.length-1&&a.partes.length>1&&!e.ok?`<button class="icon-btn" style="width:40px;height:40px" data-a="rem-parte" data-i="${t}" aria-label="Remover bloco">${H(`x`,16)}</button>`:``}
            <button class="check sm ${e.ok?`on`:``}" data-a="ok-parte" data-i="${t}" data-p="${n}" aria-label="Confirmar bloco ${n+1}" aria-pressed="${e.ok}">${H(`check`,22)}</button>
          </span>
        </div>
        <div><span class="caps" style="display:block;margin-bottom:4px;color:var(--mute);font-size:10px">Reps</span>${Pt({campo:`reps`,i:t,p:n,valor:e.reps,casas:0})}</div>
      </div>`}).join(``),u=o?`Vá até a falha, descanse ${a.pausa} s e continue com a mesma carga. O descanso normal só começa depois do último bloco.`:`Pausa curta de ${a.pausa}s entre os blocos. O descanso normal começa após o último.`;return`<div class="serie ativa">
    ${Lt(e,t,!0)}
    <p class="sm mute" style="margin:6px 0 0">${u}</p>
    <div class="row between mt12"><span class="caps mute">Carga fixa</span><span class="sm mute">${r}</span></div>
    <div class="mt8">${Nt({campo:`cargaCluster`,i:t,valor:a.carga,passo:n,un:`kg`,casas:1})}</div>
    <div class="bloco">${l}</div>
    <button class="link-btn" data-a="add-bloco" data-i="${t}">${H(`plus`,16)} Adicionar bloco</button>
  </div>`}function Wt(e,t,n,r,i){let a=t.series[n].partes[0],o=!!i&&i.tipo===`tempo`&&i.ref?.exId===e.id&&i.ref.idx===n,c=o&&nt(),l=o?Math.min(1,Math.max(0,tt()/(i.total*1e3))):0,u=o?`<div class="cron">
        <span class="caps mute">${i.terminou?`Tempo!`:c?`Pausado`:`Segurando`}</span>
        <div class="grande ${i.terminou?`fim`:``}" role="timer" data-timer-t>${s(W())}</div>
        <div class="bar"><i data-timer-p style="width:${(l*100).toFixed(1)}%"></i></div>
        <span class="sm mute">Meta ${i.total} s</span>
      </div>`:`<div class="cron">
        <span class="caps mute">Cronômetro</span>
        <div class="grande">${s(a.segundos)}</div>
        <button class="btn sec" data-a="tempo-iniciar" data-i="${n}">${H(`play`,18)} Iniciar cronômetro</button>
      </div>`,d=o?`<div class="row mt16" style="gap:8px">
        <button class="btn sec grow" data-a="tempo-pausar" data-i="${n}">${H(c?`play`:`pause`,18)} ${c?`Retomar`:`Pausar`}</button>
        <button class="btn grow" data-a="tempo-concluir" data-i="${n}">${H(`circle-check`,18)} Concluir série</button>
      </div>`:`<button class="btn mt16" data-a="salvar" data-i="${n}">${H(`circle-check`,20)} Salvar ${N(t.series,n)} sem cronômetro</button>`;return`<div class="serie ativa">
    ${Lt(t,n,!0)}
    ${u}
    <div class="row between mt12"><span class="caps mute">Tempo da série</span><span class="sm mute">Ajuste de 5 em 5 s</span></div>
    <div class="mt8">${Nt({campo:`segundos`,i:n,valor:a.segundos,passo:5,un:`s`,casas:0})}</div>
    <div class="row between mt12"><span class="caps mute">Peso extra</span><span class="sm mute">Opcional</span></div>
    <div class="mt8">${Nt({campo:`carga`,i:n,valor:a.carga,passo:r,un:`kg`,casas:1})}</div>
    ${d}
  </div>`}function Gt(e,t,n,r,a,o){let s=t.series[n],c=a?`Última: ${p(ve(a,i))}`:``;return s.tipo===`tempo`?Wt(e,t,n,r,o):s.tipo===`drop`?Ht(t,n):E(s.tipo)?Ut(t,n,r,c,o):Vt(t,n,r,c)}function Kt(e){let t=M(e);t&&k(e=>{e.ativa||ke(t.treino),Oe(e.ativa,t.ex)},!1)}var q=()=>{let e=O(),{ex:t,treino:n}=M(I.exAtual);return{d:e,ex:t,treino:n,reg:e.ativa.exercicios[t.id]}};function qt({id:e}){let t=M(e),n=`<a class="icon-btn" href="#/" aria-label="Voltar">${H(`arrow-left`,24)}</a>`;if(!t)return{top:`${n}<h1 class="sub">Exercício</h1>`,html:`<div class="vazio">${H(`x`,36)}<p>Exercício não encontrado.</p><a class="btn" href="#/">Voltar ao treino</a></div>`,nav:!1};I.exAtual=e;let r=O(),{ex:a,treino:s}=t,l=r.ativa.exercicios[a.id],u=Ce(a.id,r.ativa.inicio),d=r.config.passo,f=r.timer,m=l.series.findIndex(e=>!e.concluida),g=I.aberta[a.id],_=g!=null&&l.series[g]&&!l.series[g].concluida?g:m,v=Et(a,`chip`,16),y=u?u.ex.series.filter(e=>!e.aquecimento):[],b=u?`<section class="card ultima">
        <div class="row between"><span class="row" style="gap:6px"><span class="lime">${H(`history`,16)}</span><b>Última vez</b> <span class="mute">(${h(u.sessao.inicio,{day:`numeric`,month:`short`}).replace(`.`,``)})</span></span>
        <span class="caps ok">Vol. ${o(u.ex.series.reduce((e,t)=>e+be(t),0))} kg</span></div>
        <div class="grid">${y.map((e,t)=>{let n=l.series.filter(e=>!e.aquecimento)[t],r=n?.concluida?Ft(n,e):``;return`<div class="it"><span class="mute">S${t+1}</span> <b>${p(ve(e,i))}</b> ${r}</div>`}).join(``)}</div>
      </section>`:`<section class="card"><div class="row" style="gap:8px"><span class="lime">${H(`sparkles`,18)}</span><span class="mute">Primeira vez neste exercício. Os valores que você registrar hoje viram a referência da próxima sessão.</span></div></section>`,x=l.series.map((e,t)=>{if(t===_){let e=u?u.ex.series[t]??u.ex.series.at(-1):null;return Gt(a,l,t,d,e,f)}return Bt(a,l,t,f)}).join(``),S=s.exercicios.findIndex(e=>e.id===a.id),C=s.exercicios[S+1],w=l.series.every(e=>e.concluida),T=C?`<a class="card row between" href="#/exercicio/${C.id}" style="${w?`border-color:var(--lime-t)`:``}">
        <div><span class="caps mute">Próximo exercício</span><div class="h-md" style="margin-top:2px">${p(C.nome)}</div></div>
        <span class="icon-btn" style="background:var(--inset)">${H(`arrow-right`,20)}</span></a>`:`<a class="card row between" href="#/" style="${w?`border-color:var(--lime-t)`:``}">
        <div><span class="caps mute">Último exercício</span><div class="h-md" style="margin-top:2px">Voltar e finalizar o treino</div></div>
        <span class="icon-btn" style="background:var(--inset)">${H(`arrow-right`,20)}</span></a>`,te=`
    <section style="margin-top:8px">
      ${a.grupo?`<div class="caps lime">${p(a.grupo)}</div>`:``}
      <h2 class="h-lg" style="margin-top:4px">${p(a.nome)}</h2>
      <div class="mt8"><span class="badge lime" style="text-transform:none;letter-spacing:0;font-size:13px">${p(_e(a.series))}</span></div>
      <div class="row wrap mt12" style="gap:8px">
        <span class="badge ${p(a.intensidade)}">${ee[a.intensidade]??a.intensidade}</span>
        <button class="chip" data-a="editar-descanso">${H(`timer`,16)} Descanso: ${c(a.descanso)} ${H(`pencil`,12)}</button>
        ${v}
      </div>
      ${a.nota?`<div class="nota mt12" style="margin-bottom:12px">${H(`lightbulb`,16)}<span>${p(a.nota)}</span></div>`:`<div class="mt12"></div>`}
    </section>
    ${b}
    <div class="row between" style="margin:16px 0 8px"><span class="caps mute">Execução · Séries</span><span class="sm mute">${l.series.filter(e=>e.concluida).length}/${l.series.length} concluídas</span></div>
    <button class="dash-btn" data-a="add-aquecimento">${H(`plus`,18)} Série de aquecimento</button>
    ${x}
    <button class="btn sec" data-a="add-serie">${H(`plus`,20)} Adicionar série</button>
    <div class="card mt16">
      <label class="caps mute" for="nota-ex">Anotações do exercício</label>
      <textarea id="nota-ex" class="field mt8" data-in="nota-ex" placeholder="Ex.: banco na inclinação 3, pegada neutra…">${p(l.nota)}</textarea>
    </div>
    ${T}
  `;return{top:`${n}<h1 class="sub">Detalhes do exercício</h1>`,html:te,nav:!1}}var Jt={6:`Moderado: ainda sobrariam cerca de 4 repetições.`,7:`Pesado: sobrariam cerca de 3 repetições.`,8:`Pesado, mas com cerca de 2 repetições sobrando.`,9:`No limite: 1 repetição sobrando.`,10:`Falha total: nenhuma repetição sobrando.`};function Yt(){let{reg:e}=q(),{i:t,v:n}=I.rpe;z(`
    <div class="caps ok">${N(e.series,t)} salva</div>
    <h2 class="h-md" style="margin-top:2px">Quão pesada foi?</h2>
    <p class="mute" style="margin:2px 0 12px">Esforço percebido (RPE). Opcional.</p>
    <div class="rpe-escala" role="group" aria-label="RPE de 6 a 10">
      ${Object.keys(Jt).map(e=>`<button class="${Number(e)===n?`on`:``}" data-a="rpe-sel" data-v="${e}" aria-pressed="${Number(e)===n}">${e}</button>`).join(``)}
    </div>
    <div class="rpe-leg"><b>RPE ${n}</b><span>${Jt[n]}</span></div>
    <p class="sm mute" style="margin:10px 0 0">Notas 9 e 10 seguram a sugestão de carga na próxima vez.</p>
    <button class="btn mt16" data-a="rpe-salvar">Salvar esforço</button>
    <button class="btn sec mt8" data-a="fechar">Pular</button>`)}function Xt(e){let{d:t,ex:n,reg:r,treino:a}=q();if(!t.config.autoDescanso)return;let o=r.series[e].aquecimento,s=r.series.findIndex(e=>!e.concluida),c;if(s>=0)c={texto:`${N(r.series,s)} · ${ve(r.series[s],i)}`,exId:n.id};else{let e=a.exercicios[a.exercicios.findIndex(e=>e.id===n.id)+1];c=e?{texto:`Próximo exercício: ${e.nome}`,exId:e.id}:{texto:`Treino completo! Finalize na tela inicial.`,exId:null}}rt({seg:o?30:n.descanso,tipo:`descanso`,ref:{exId:n.id,idx:e},proxima:c})}function Zt(e){let{d:t,reg:n}=q(),r=I.exAtual;k(()=>{Pe(t.ativa,r,e),Fe(t.ativa.exercicios[r],e)},!1),I.aberta[r]=void 0,I.rolarAtiva=!0,Xt(e),t.config.vibracao&&ft(30),t.config.rpe&&!n.series[e].aquecimento&&(I.rpe={i:e,v:8},Yt())}function J(){k(()=>{})}var Qt=e=>{let t=O().timer;return!!t&&t.tipo===`tempo`&&t.ref?.exId===I.exAtual&&t.ref.idx===e};function $t(e){let{reg:t}=q(),n=t.series[e],r=n.partes[0];if(n.tipo===`tempo`?!(r.segundos>0):!(r.reps>0))return R(n.tipo===`tempo`?`Informe o tempo`:`Informe as repetições`);Qt(e)&&at(),k(()=>{r.ok=!0},!1),Zt(e),J()}var en=[[`normal`,`Carga e repetições fixas.`],[`drop`,`Degraus de carga menor, sem descanso.`],[`cluster`,`Mini-blocos com pausa curta entre eles.`],[`restpause`,`Vai até a falha, pausa curta e continua.`],[`tempo`,`Segurar por segundos, com cronômetro.`]],tn=new Set([`restpause`,`tempo`]),nn=e=>tn.has(e)?`<em class="novo">NOVO</em>`:``;L({"abrir-serie":e=>{I.aberta[I.exAtual]=Number(e.dataset.i),I.rolarAtiva=!0,J()},passo:e=>{let{campo:t,i:n,p:r,d:i}=e.dataset,{d:a,reg:o}=q(),s=o.series[Number(n)],c=Number(i);k(()=>{if(s.auto=!1,delete s.sugestao,t===`cargaCluster`)s.carga=Math.max(0,Math.round(((s.carga||0)+c*a.config.passo)*100)/100);else if(t===`carga`){let e=s.partes[Number(r)];e.carga=Math.max(0,Math.round(((e.carga||0)+c*a.config.passo)*100)/100)}else if(t===`segundos`){let e=s.partes[Number(r)];e.segundos=Math.max(5,(e.segundos||0)+c*5)}else{let e=s.partes[Number(r)];e.reps=Math.max(0,(e.reps||0)+c)}})},salvar:e=>$t(Number(e.dataset.i)),"ok-parte":e=>{let t=Number(e.dataset.i),n=Number(e.dataset.p),{d:r,reg:i}=q(),a=i.series[t],o=a.partes[n];if(!o.ok&&!(o.reps>0))return R(`Informe as repetições`);k(()=>{o.ok=!o.ok},!1),o.ok&&r.config.vibracao&&ft(20);let s=a.partes.every(e=>e.ok);o.ok&&s?Zt(t):o.ok&&E(a.tipo)&&rt({seg:a.pausa,tipo:`pausa`}),J()},"manter-carga":e=>{let t=q().reg.series[Number(e.dataset.i)];k(()=>{t.partes[0].carga=t.sugestao.de,delete t.sugestao})},"add-degrau":e=>{let t=q().reg.series[Number(e.dataset.i)];k(()=>je(t))},"set-reducao":e=>{let t=q().reg.series[Number(e.dataset.i)];k(()=>Me(t,Number(e.dataset.v)))},"add-bloco":e=>{let t=q().reg.series[Number(e.dataset.i)];k(()=>t.partes.push({reps:t.partes.at(-1)?.reps??t.repsMax,ok:!1}))},"rem-parte":e=>{let t=q().reg.series[Number(e.dataset.i)];k(()=>t.partes.pop())},reabrir:e=>{let t=Number(e.dataset.i),n=q().reg.series[t];k(()=>{n.partes.forEach(e=>e.ok=!1),n.concluida=!1,n.recorde=!1,delete n.descansoReal,delete n.rpe},!1),I.aberta[I.exAtual]=t,I.rolarAtiva=!0,J()},tec:e=>{let t=Number(e.dataset.i),{reg:n}=q(),r=n.series[t];z(`
        <h2 class="h-md">Técnica de ${N(n.series,t)}</h2>
        <p class="mute" style="margin:6px 0 14px">Vale só para esta série, neste treino.</p>
        ${en.map(([e,n])=>`<button class="op ${r.tipo===e&&!r.aquecimento?`on`:``}" data-a="set-tec" data-i="${t}" data-tipo="${e}"><div class="grow"><b>${T[e]}${nn(e)}</b><span>${n}</span></div>${r.tipo===e&&!r.aquecimento?H(`check`,20,`lime`):``}</button>`).join(``)}
        <div class="sep"></div>
        <button class="op ${r.aquecimento?`on`:``}" data-a="set-aq" data-i="${t}" role="switch" aria-checked="${!!r.aquecimento}"><div class="grow"><b>Série de aquecimento<em class="novo">NOVO</em></b><span>Fica fora de recordes, volume e sugestão.</span></div><span class="switch ${r.aquecimento?`on`:``}"></span></button>`)},"set-tec":e=>{let t=Number(e.dataset.i),{reg:n}=q();k(()=>{n.series[t]=Ae({...n.series[t],aquecimento:!1},e.dataset.tipo)},!1),I.aberta[I.exAtual]=t,B(),J()},"set-aq":e=>{let t=Number(e.dataset.i),{reg:n}=q(),r=!n.series[t].aquecimento;k(()=>{n.series[t]=r?{...Ae(n.series[t],`normal`),aquecimento:!0}:{...n.series[t],aquecimento:!1}},!1),I.aberta[I.exAtual]=t,B(),J()},"add-aquecimento":()=>{let{d:e,ex:t,reg:n}=q(),r=Ce(t.id,e.ativa.inicio)?.ex??null,i=0;k(()=>{i=Ne(n,r);let a=e.timer;a?.ref?.exId===t.id&&a.ref.idx>=i&&a.ref.idx++},!1),I.aberta[t.id]=i,I.rolarAtiva=!0,J()},"add-serie":()=>{z(`
        <h2 class="h-md">Adicionar série</h2>
        <p class="mute" style="margin:6px 0 14px">Escolha a técnica da nova série.</p>
        ${en.map(([e])=>`<button class="op" data-a="nova-serie" data-tipo="${e}"><div class="grow"><b>${T[e]}${nn(e)}</b></div>${H(`plus`,20)}</button>`).join(``)}`)},"nova-serie":e=>{let{reg:t}=q(),n=t.series.findLast(e=>!e.aquecimento&&e.tipo!==`tempo`)??t.series.at(-1);k(()=>{let r=A(e.dataset.tipo,n?.repsMin??10,n?.repsMax??12),i=n?{tipo:`normal`,partes:[{carga:P(n),reps:n.partes[0]?.reps}]}:null;t.series.push(Ee(r,i,{extra:!0}))},!1),I.aberta[I.exAtual]=t.series.length-1,I.rolarAtiva=!0,B(),J()},"tempo-iniciar":e=>{let t=Number(e.dataset.i),{ex:n,reg:r}=q(),i=r.series[t].partes[0].segundos;ut(),rt({seg:i,tipo:`tempo`,ref:{exId:n.id,idx:t},proxima:{texto:`${N(r.series,t)}: tempo concluído. Toque em Concluir série.`,exId:n.id}}),J()},"tempo-pausar":()=>{nt()?ct():st(),J()},"tempo-concluir":e=>$t(Number(e.dataset.i)),"editar-descanso":()=>{let{ex:e}=q();z(`
        <h2 class="h-md">Descanso deste exercício</h2>
        <p class="mute" style="margin:6px 0 14px">O timer usa este tempo ao concluir cada série. Fica salvo no treino.</p>
        <div class="presets">${te.map(t=>`<button class="${e.descanso===t?`on`:``}" data-a="set-descanso" data-v="${t}">${c(t)}</button>`).join(``)}</div>
        <div class="row between mt16">
          <button class="btn sec sm" data-a="set-descanso" data-v="${Math.max(15,e.descanso-15)}">−15s</button>
          <b class="h-md num">${c(e.descanso)}</b>
          <button class="btn sec sm" data-a="set-descanso" data-v="${e.descanso+15}">+15s</button>
        </div>
        <button class="btn mt16" data-a="fechar">Pronto</button>`)},"set-descanso":e=>{let{ex:t}=q();k(()=>{t.descanso=Number(e.dataset.v)},!1),document.querySelector(`[data-a="editar-descanso"]`)?.click(),J()},"rpe-sel":e=>{I.rpe.v=Number(e.dataset.v),Yt()},"rpe-salvar":()=>{let{reg:e}=q(),t=e.series[I.rpe.i];k(()=>{t&&(t.rpe=I.rpe.v)},!1),B(),J()}},{carga:(e,t)=>{let n=q().reg.series[Number(e.i)];k(()=>{n.auto=!1,delete n.sugestao,n.partes[Number(e.p)].carga=u(t)??0},!1)},cargaCluster:(e,t)=>{let n=q().reg.series[Number(e.i)];k(()=>{n.auto=!1,n.carga=u(t)??0},!1)},reps:(e,t)=>{let n=q().reg.series[Number(e.i)];k(()=>{n.partes[Number(e.p)].reps=Math.max(0,Math.round(u(t)??0))},!1)},segundos:(e,t)=>{let n=q().reg.series[Number(e.i)];k(()=>{n.partes[Number(e.p)].segundos=Math.max(0,Math.round(u(t)??0))},!1)},"nota-ex":(e,t)=>{let{reg:n}=q();k(()=>{n.nota=t},!1)}});var rn={drop:`drop set`,cluster:`cluster`,restpause:`rest-pause`};function an(e){return e===`drop`||e===`cluster`?e:`restpause`}function on(e){let t=String(e).trim().toLowerCase(),n=t.match(/^(\d+)\s*[x×]\s*(\d+)\s*(?:s|seg|segundos?)$/);if(n){let e=Number(n[1]),t=Number(n[2]);return e<1||e>10||t<5||t>600?null:{series:Array.from({length:e},()=>({...A(`tempo`,1,1),segundos:t})),texto:`${e} série${e>1?`s`:``} por tempo de ${t} s`}}let r=t.match(/^(\d+)\s*[x×]\s*(\d+)(?:\s*[-–a]\s*(\d+))?\s*(?:\+\s*(\d+)?\s*(drop|cluster|rest[\s-]?pause|rp)(?:\s*set)?s?)?$/);if(!r)return null;let i=Number(r[1]),a=Number(r[2]),o=r[3]?Number(r[3]):a,s=r[5]?Number(r[4]??1):0;if(i<1||i>10||a<1||o<a||o>100||s>6)return null;let c=r[5]?an(r[5]):null,l=[...Array.from({length:i},()=>A(`normal`,a,o)),...Array.from({length:s},()=>A(c,a,o))],u=a===o?`${a}`:`${a}-${o}`;return{series:l,texto:`${i} série${i>1?`s`:``} normai${i>1?`s`:``} (${u} reps)${s?` + ${s} série${s>1?`s`:``} de ${rn[c]} no final`:``}`}}function Y(e,t,n,r,i=``,a=``){return`<div class="grow">
    <span class="caps mute" style="display:block;margin-bottom:4px;font-size:10px">${e}</span>
    <div class="stepper-mini">
      <button data-a="ed-num" data-id="${r}" data-k="${t}" data-i="${i}" data-d="-1" aria-label="Diminuir ${e}">−</button>
      <div class="valor"><b class="num" style="font-size:18px">${n}${a}</b></div>
      <button data-a="ed-num" data-id="${r}" data-k="${t}" data-i="${i}" data-d="1" aria-label="Aumentar ${e}">+</button>
    </div>
  </div>`}function sn(e,t,n){let r=e.series[0]??A(),i=e.series.map((t,n)=>{let r=Object.keys(T).map(r=>`<button class="${t.tipo===r?`on`:``}" data-a="ed-tec" data-id="${e.id}" data-i="${n}" data-tipo="${r}">${T[r]}</button>`).join(``),i={drop:()=>`${Y(`Degraus`,`degraus`,t.degraus,e.id,n)}${Y(`Redução`,`reducao`,Math.round((t.reducao??.2)*100),e.id,n,`%`)}`,cluster:()=>`${Y(`Blocos`,`blocos`,t.blocos,e.id,n)}${Y(`Pausa`,`pausa`,t.pausa,e.id,n,`s`)}`,restpause:()=>`${Y(`Blocos`,`blocos`,t.blocos,e.id,n)}${Y(`Pausa`,`pausa`,t.pausa,e.id,n,`s`)}`,tempo:()=>Y(`Tempo`,`segundos`,t.segundos??45,e.id,n,`s`)}[t.tipo];return`<div class="serie-ed">
        <span class="num-b" style="width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--inset);font-family:var(--f-display);font-weight:700">${n+1}</span>
        <div class="tecs">${r}</div>
        ${i?`<div class="params">${i()}</div>`:``}
      </div>`}).join(``);return`<div class="corpo">
    <label class="lbl caps" for="ed-nome-${e.id}">Nome do exercício</label>
    <input id="ed-nome-${e.id}" class="field" data-in="ed-text" data-k="nome" data-id="${e.id}" value="${p(e.nome)}" autocomplete="off">
    <label class="lbl caps" for="ed-grupo-${e.id}">Descrição do músculo (texto livre)</label>
    <input id="ed-grupo-${e.id}" class="field" data-in="ed-text" data-k="grupo" data-id="${e.id}" value="${p(e.grupo)}" placeholder="Ex.: Peitoral maior · Isolador" autocomplete="off">

    <span class="lbl caps lime">Grupo muscular (conta no volume)</span>
    <div class="chips-wrap" role="group" aria-label="Grupo muscular">${y.map(([t,n])=>`<button class="chip ${e.musculo===t?`on`:``}" aria-pressed="${e.musculo===t}" data-a="ed-musculo" data-id="${e.id}" data-v="${t}">${n}</button>`).join(``)}</div>
    ${cn(e)}

    <span class="lbl caps">Intensidade prescrita</span>
    <div class="seg">${Object.entries(ee).map(([t,n])=>`<button class="${e.intensidade===t?`on ${t}`:``}" data-a="ed-int" data-id="${e.id}" data-v="${t}">${n}</button>`).join(``)}</div>

    <div class="row between"><span class="lbl caps">Pausa / descanso</span><b class="lime num">${c(e.descanso)} min</b></div>
    <div class="presets">${te.map(t=>`<button class="${e.descanso===t?`on`:``}" data-a="ed-desc" data-id="${e.id}" data-v="${t}">${c(t)}</button>`).join(``)}</div>
    <div class="row mt8" style="gap:8px">
      <button class="btn sec sm grow" data-a="ed-desc" data-id="${e.id}" data-v="${Math.max(15,e.descanso-15)}">−15s</button>
      <button class="btn sec sm grow" data-a="ed-desc" data-id="${e.id}" data-v="${e.descanso+15}">+15s</button>
    </div>

    <label class="lbl caps" for="ed-video-${e.id}">Vídeo demonstrativo (link)</label>
    <input id="ed-video-${e.id}" class="field" inputmode="url" data-in="ed-text" data-k="video" data-id="${e.id}" value="${p(e.video)}" placeholder="https://youtube.com/…" autocomplete="off">
    <a class="btn sec sm mt8" href="${p(Tt(e.nome))}" target="_blank" rel="noopener">${H(`external-link`,16)} Buscar no YouTube</a>
    <p class="sm mute" style="margin:6px 0 0">Escolha o vídeo, copie o link e cole acima.</p>

    <label class="lbl caps" for="ed-nota-${e.id}">Orientação do personal</label>
    <textarea id="ed-nota-${e.id}" class="field" data-in="ed-text" data-k="nota" data-id="${e.id}" placeholder="Ex.: pausa de 1s na transição">${p(e.nota)}</textarea>

    <div class="row between" style="margin-top:20px"><b class="h-md" style="font-size:16px">Estrutura de séries</b><span class="caps ok">${e.series.length} configuradas</span></div>
    <div class="row mt8" style="gap:10px">
      ${Y(`Séries`,`nSeries`,e.series.length,e.id)}
      ${Y(`Reps mín.`,`repsMin`,r.repsMin,e.id)}
      ${Y(`Reps máx.`,`repsMax`,r.repsMax,e.id)}
    </div>
    <div class="mt8">${i}</div>
    <div class="resumo-ed"><span>Resumo: ${p(_e(e.series))}</span><b class="num">Descanso ${c(e.descanso)}</b></div>

    <div class="row mt16" style="gap:8px">
      <button class="btn sec sm grow" data-a="ed-up" data-id="${e.id}" ${t===0?`disabled`:``}>${H(`arrow-up`,16)} Subir</button>
      <button class="btn sec sm grow" data-a="ed-down" data-id="${e.id}" ${t===n-1?`disabled`:``}>${H(`arrow-down`,16)} Descer</button>
      <button class="btn sec sm grow" data-a="ed-dup" data-id="${e.id}">${H(`copy`,16)} Duplicar</button>
    </div>
    <button class="btn sec danger mt8" data-a="ed-del-ex" data-id="${e.id}">${H(`trash-2`,18)} Excluir exercício</button>
  </div>`}function cn(e){let t=C(e.nome);return!t||t===e.musculo?``:`<div class="sug-musc">${H(`sparkles`,20)}<div class="grow"><b>Sugerido pelo nome: ${b[t]}</b><div class="sm mute">Confira antes de aplicar.</div></div><button class="btn sm" data-a="ed-musculo" data-id="${e.id}" data-v="${t}">Aplicar</button></div>`}function ln(){let e=O(),t=j(),n=`<a class="icon-btn" href="#/" aria-label="Voltar">${H(`arrow-left`,24)}</a>`;if(!t)return{top:`${n}<h1 class="sub">Editar treino</h1>`,html:`<div class="vazio"><p>Nenhum treino.</p><button class="btn" data-a="novo-treino">Criar treino</button></div>`,nav:!1};let r=t.exercicios.length,i=t.exercicios.find(e=>e.id===I.editEx),a=I.rapida?on(I.rapida):null,o=t.exercicios.map((e,t)=>{let n=e.id===I.editEx;return`<article class="card ed-ex ${n?`aberto`:``}">
        <button class="cab" data-a="ed-toggle" data-id="${e.id}" style="width:100%;text-align:left" aria-expanded="${n}">
          <span class="num-b">${t+1}</span>
          <span class="grow"><b class="h-md" style="font-size:17px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p(e.nome)}</b>
          <span class="sm mute">${p(_e(e.series))} · ${ee[e.intensidade]} · Pausa ${c(e.descanso)}</span></span>
          ${H(n?`chevron-up`:`chevron-down`,20)}
        </button>
        ${n?sn(e,t,r):``}
      </article>`}).join(``),s=`
    <div class="periodos" style="margin-top:8px">
      ${e.treinos.map(e=>`<button class="chip ${e.id===t.id?`on`:``}" data-a="ed-treino" data-id="${e.id}">${p(e.nome.split(`–`)[0].trim())}</button>`).join(``)}
      <button class="chip" data-a="novo-treino">${H(`plus`,14)} Novo</button>
    </div>
    <section class="card">
      <span class="caps mute">Identificação do plano</span>
      <input class="field mt8" style="font-family:var(--f-display);font-weight:700;font-size:18px" data-in="treino-nome" value="${p(t.nome)}" aria-label="Nome do treino" autocomplete="off">
      <input class="field mt8" data-in="treino-foco" value="${p(t.foco)}" placeholder="Foco (ex.: Hipertrofia · Semana 4)" aria-label="Foco do treino" autocomplete="off">
      <p class="sm mute" style="margin:10px 0 0">As alterações são salvas automaticamente.</p>
    </section>
    <section class="card">
      <div class="row" style="gap:8px"><span class="lime">${H(`zap`,18)}</span><span class="caps lime">Entrada rápida</span></div>
      <div class="row mt8" style="gap:8px">
        <input class="field" data-in="rapida" value="${p(I.rapida)}" placeholder="3x10-12 + drop" aria-label="Entrada rápida" autocomplete="off" autocapitalize="off">
        <button class="btn sec sm" style="min-height:48px" data-a="ed-aplicar-rapida">Aplicar</button>
      </div>
      <div class="previa ${I.rapida&&!a?`err`:``}" data-previa>${un(I.rapida,a,i)}</div>
      <p class="sm mute" style="margin:8px 0 0">Aplica no exercício aberto abaixo. Exemplos: <b>4x8-10</b> · <b>3x10-12 + drop</b> · <b>3x8 + 2 cluster</b> · <b>3x10 + rest-pause</b> · <b>3x45s</b></p>
    </section>
    <div class="row between" style="margin:20px 0 10px"><h2 class="h-lg" style="font-size:22px">Sequência prescrita</h2><span class="badge neutro">${r} ${r===1?`item`:`itens`}</span></div>
    ${o||`<div class="vazio">${H(`dumbbell`,36)}<p>Nenhum exercício ainda.</p></div>`}
    <button class="btn sec" data-a="ed-novo-ex">${H(`plus`,20)} Adicionar novo exercício</button>
    <button class="btn sec danger mt24" data-a="ed-del-treino">${H(`trash-2`,18)} Excluir este treino</button>
  `;return{top:`${n}<h1 class="sub">Editar treino</h1><a class="btn sm" href="#/">Concluir</a>`,html:s,nav:!1}}function un(e,t,n){return e?t?n?`Prévia: ${p(t.texto)}`:`Prévia: ${p(t.texto)}. Abra um exercício para aplicar.`:`Não entendi. Tente algo como 3x10-12 + drop`:``}var X=e=>j()?.exercicios.find(t=>t.id===e);L({"ed-toggle":e=>{I.editEx=I.editEx===e.dataset.id?null:e.dataset.id,k(()=>{})},"ed-treino":e=>{I.editEx=null,k(t=>t.treinoAtual=e.dataset.id)},"ed-novo-ex":()=>{let e=pe();k(()=>j().exercicios.push(e)),I.editEx=e.id,k(()=>{}),setTimeout(()=>document.getElementById(`ed-nome-${e.id}`)?.select(),50)},"ed-del-ex":e=>{let t=X(e.dataset.id);Ke({titulo:`Excluir "${t.nome}"?`,texto:`O histórico já registrado desse exercício continua salvo.`,ok:`Excluir exercício`,fn:()=>{I.editEx=null,k(()=>{let e=j();e.exercicios=e.exercicios.filter(e=>e.id!==t.id)})}})},"ed-up":e=>dn(e.dataset.id,-1),"ed-down":e=>dn(e.dataset.id,1),"ed-dup":t=>{let n=j(),r=n.exercicios.findIndex(e=>e.id===t.dataset.id),i={...structuredClone(n.exercicios[r]),id:e()};i.nome+=` (cópia)`,k(()=>n.exercicios.splice(r+1,0,i),!1),I.editEx=i.id,k(()=>{})},"ed-musculo":e=>k(()=>X(e.dataset.id).musculo=e.dataset.v),"ed-int":e=>k(()=>X(e.dataset.id).intensidade=e.dataset.v),"ed-desc":e=>k(()=>X(e.dataset.id).descanso=Number(e.dataset.v)),"ed-tec":e=>{let t=X(e.dataset.id).series[Number(e.dataset.i)];k(()=>t.tipo=e.dataset.tipo)},"ed-num":e=>{let t=X(e.dataset.id),n=Number(e.dataset.d),r=e.dataset.i===``?null:Number(e.dataset.i);k(()=>{switch(e.dataset.k){case`nSeries`:n>0&&t.series.length<10?t.series.push({...t.series.at(-1)??A(),tipo:`normal`}):n<0&&t.series.length>1&&t.series.pop();break;case`repsMin`:t.series.forEach(e=>{e.repsMin=f(e.repsMin+n,1,100),e.repsMax<e.repsMin&&(e.repsMax=e.repsMin)});break;case`repsMax`:t.series.forEach(e=>{e.repsMax=f(e.repsMax+n,1,100),e.repsMin>e.repsMax&&(e.repsMin=e.repsMax)});break;case`degraus`:t.series[r].degraus=f(t.series[r].degraus+n,2,6);break;case`blocos`:t.series[r].blocos=f(t.series[r].blocos+n,2,10);break;case`reducao`:t.series[r].reducao=f(Math.round((t.series[r].reducao??.2)*100)+n*5,10,60)/100;break;case`segundos`:t.series[r].segundos=f((t.series[r].segundos??45)+n*5,5,600);break;case`pausa`:t.series[r].pausa=f(t.series[r].pausa+n*5,5,60)}})},"ed-aplicar-rapida":()=>{let e=X(I.editEx),t=on(I.rapida);if(!t)return R(`Entrada inválida. Exemplo: 3x10-12 + drop`);if(!e)return R(`Abra um exercício abaixo para aplicar`);k(()=>{e.series=t.series}),I.rapida=``,k(()=>{}),R(`Séries aplicadas`)},"ed-del-treino":()=>{let e=j();Ke({titulo:`Excluir "${e.nome}"?`,texto:`O plano será apagado. As sessões já registradas continuam no histórico.`,ok:`Excluir treino`,fn:()=>{k(t=>{t.treinos=t.treinos.filter(t=>t.id!==e.id),t.treinoAtual=t.treinos[0]?.id??null},!1),I.editEx=null,V(`#/`),k(()=>{})}})}},{"ed-text":(e,t)=>{let n=X(e.id);n&&k(()=>n[e.k]=t,!1)},"treino-nome":(e,t)=>k(()=>j().nome=t,!1),"treino-foco":(e,t)=>k(()=>j().foco=t,!1),rapida:(e,t)=>{I.rapida=t;let n=document.querySelector(`[data-previa]`),r=t?on(t):null;n&&(n.textContent=un(t,r,X(I.editEx)).replace(/&amp;/g,`&`),n.classList.toggle(`err`,!!t&&!r))}});function dn(e,t){let n=j(),r=n.exercicios.findIndex(t=>t.id===e),i=r+t;i<0||i>=n.exercicios.length||k(()=>{[n.exercicios[r],n.exercicios[i]]=[n.exercicios[i],n.exercicios[r]]})}var fn=864e5,pn=e=>e.concluida&&!e.aquecimento&&(e.tipo===`normal`||e.tipo===`drop`);function mn(e,t=Date.now()){let n=[...e].sort((e,t)=>e.inicio-t.inicio),r=new Map,i=0;for(let e of n)for(let[n,a]of Object.entries(e.exercicios)){let o=null;for(let e of a.series.filter(pn)){let t=P(e),n=e.partes[0].reps;if(!(t>0)||!(n>0))continue;let r=Se(t,n);(!o||r>o.est)&&(o={carga:t,reps:n,est:r})}if(!o)continue;let s=r.get(n);s?o.est>s.est&&(t-e.inicio<=30*fn&&i++,r.set(n,{id:n,nome:a.nome,...o,ts:e.inicio,anterior:{carga:s.carga,reps:s.reps},batido:!0})):r.set(n,{id:n,nome:a.nome,...o,ts:e.inicio,anterior:null,batido:!1})}let a=[...r.values()].map(e=>({...e,delta:e.anterior?Math.round((e.carga-e.anterior.carga)*10)/10:null,novo:e.batido&&t-e.ts<=7*fn})).sort((e,t)=>t.ts-e.ts),o=a.find(e=>e.batido)??null;return{itens:a,batidos30:i,recente:o}}function hn(e){let t=Math.round((Date.now()-e)/864e5);return t<=0||m(e)===m(Date.now())?`hoje`:t===1?`ontem`:t<30?`há ${t} dias`:g(e)}function gn(e){let t=e.novo?`<span class="tag-novo">${H(`trophy`,12)} Novo</span>`:`<span class="tag-data">${p(g(e.ts))}</span>`;return`<article class="card rec">
    <div class="row between"><b class="h-md" style="font-size:16px">${p(e.nome)}</b>${t}</div>
    <div class="row between"><span class="rec-v num">${i(e.carga)} <small>kg × ${e.reps}</small></span>${e.delta>0?`<span class="ok sm" style="font-weight:600">↑ +${i(e.delta)} kg</span>`:``}</div>
    <div class="row between sm mute"><span>1RM estimado ${i(Math.round(e.est))} kg</span><span>${hn(e.ts)}</span></div>
  </article>`}function _n(){let{itens:e,batidos30:t,recente:n}=mn(O().sessoes);if(!e.length)return`<div class="vazio">${H(`trophy`,40)}<p><b>Nenhum recorde ainda.</b><br>Finalize séries normais ou drop e suas melhores marcas aparecem aqui. Aquecimento não conta.</p></div>`;let r=e.map(e=>({...e,g:Be(e.id,e.nome)})),i=y.filter(([e])=>r.some(t=>t.g===e));I.recGrupo!==`todos`&&!i.some(([e])=>e===I.recGrupo)&&(I.recGrupo=`todos`);let a=r.filter(e=>I.recGrupo===`todos`||e.g===I.recGrupo),o=[[`todos`,`Todos`],...i].map(([e,t])=>`<button class="chip ${I.recGrupo===e?`on`:``}" data-a="rec-grupo" data-v="${e}">${t}</button>`).join(``);return`
    <div class="tiles2">
      <div class="card tile"><span class="caps mute">Últimos 30 dias</span><b class="lime">${t}</b><span class="sm mute">recorde${t===1?``:`s`} batido${t===1?``:`s`}</span></div>
      <div class="card tile"><span class="caps mute">Marca mais recente</span><b style="font-size:18px;line-height:32px">${n?p(n.nome):`—`}</b><span class="sm mute">${n?hn(n.ts):``}</span></div>
    </div>
    <div class="periodos">${o}</div>
    ${a.map(gn).join(``)||`<p class="mute">Sem recordes neste grupo.</p>`}
    <p class="sm mute">Recorde = maior 1RM estimado em séries normais e drop (1º degrau). Aquecimento, cluster, rest-pause e séries por tempo não entram.</p>`}L({"rec-grupo":e=>{I.recGrupo=e.dataset.v,k(()=>{})}});function vn(e=0,t=Date.now()){let n=new Date(v(t));return n.setDate(n.getDate()+7*e),n.getTime()}var yn=e=>{let t=new Date(e);return t.setDate(t.getDate()+7),t.getTime()},bn=e=>e.series.filter(e=>e.concluida&&!e.aquecimento).length;function xn(e,t,n){let r=yn(t),i={},a=0;for(let o of e)if(!(o.inicio<t||o.inicio>=r))for(let[e,t]of Object.entries(o.exercicios)){let r=bn(t);if(!r)continue;let s=n(e,t.nome)||`outro`,c=i[s]??={series:0,exercicios:[]};c.series+=r,a+=r;let l=c.exercicios.find(t=>t.id===e&&t.ts===o.inicio);l?l.series+=r:c.exercicios.push({id:e,nome:t.nome,series:r,ts:o.inicio})}return{total:a,grupos:i}}function Sn(e,t,n,r,i=Date.now()){return Array.from({length:n},(a,o)=>{let s=vn(o-(n-1),i);return{ini:s,series:xn(e,s,r).grupos[t]?.series??0}})}function Cn(e,t,n){return e<t?`abaixo`:e>n?`acima`:`faixa`}var wn={abaixo:`Abaixo da faixa`,faixa:`Na faixa`,acima:`Acima da faixa`},Tn={abaixo:`var(--mod)`,faixa:`var(--lime)`,acima:`var(--pes)`};function En(e){let t=new Date(e);t.setDate(t.getDate()+6);let n=`${h(e,{day:`numeric`})}–${h(t,{day:`numeric`,month:`short`}).replace(`.`,``)}`;return I.volSemana===0?`Esta semana · ${n}`:n}function Dn(e){return`<div class="semana">
    <button class="ib" data-a="vol-sem" data-d="-1" aria-label="Semana anterior">${H(`chevron-left`,20)}</button>
    <b class="grow" style="text-align:center">${p(En(e))}</b>
    <button class="ib" data-a="vol-sem" data-d="1" aria-label="Próxima semana" ${I.volSemana>=0?`disabled`:``}>${H(`chevron-right`,20)}</button>
  </div>`}function On(e,t,n,r){return e===`abaixo`?`Abaixo da faixa · ${n-t===1?`falta 1`:`faltam ${n-t}`}`:e===`acima`?`Acima da faixa · ${t-r} a mais`:wn[e]}function kn(){let e=O(),{volMin:t,volMax:n}=e.config,r=vn(I.volSemana),{total:i,grupos:a}=xn(e.sessoes,r,Be),o=Math.max(n*1.2,...Object.values(a).map(e=>e.series)),s=y.map(([e])=>e).filter(e=>a[e]).sort((e,t)=>a[t].series-a[e].series).map(e=>{let r=a[e].series,i=Cn(r,t,n);return`<button class="grp" data-a="vol-grupo" data-v="${e}">
        <span class="row"><b class="h-md" style="font-size:15px">${b[e]}</b><span class="grow"></span><b class="num" style="color:${Tn[i]}">${r}</b></span>
        <span class="barra"><i class="faixa" style="left:${t/o*100}%;width:${(n-t)/o*100}%"></i><i class="enche" style="width:${r/o*100}%;background:${Tn[i]}"></i></span>
        <span class="sm mute">${On(i,r,t,n)}</span>
      </button>`}).join(``);return`
    ${Dn(r)}
    <div class="row between" style="margin:14px 0 10px"><div><span class="caps mute">Séries de trabalho</span><div class="h-lg num">${i} <small class="mute" style="font-size:14px;font-weight:500">na semana</small></div></div><span class="sm mute"><i class="leg-faixa"></i>${t}–${n}</span></div>
    ${s?`<section class="card grupos">${s}</section>`:`<div class="vazio">${H(`trending-up`,36)}<p>Nenhuma série de trabalho nesta semana.</p></div>`}
    <p class="sm mute">Só séries de trabalho. Aquecimento fica de fora. Toque num grupo para ver os exercícios.</p>`}function An(){let e=O(),t=I.volGrupo,n=vn(I.volSemana),{grupos:r}=xn(e.sessoes,n,Be),i=r[t]??{series:0,exercicios:[]},a=Cn(i.series,e.config.volMin,e.config.volMax),o=Sn(e.sessoes,t,4,Be,n+2592e5),s=Math.max(1,...o.map(e=>e.series)),c=o.map((e,t)=>`<div class="col ${t===3?`on`:``}"><b class="${t===3?``:`mute`}">${e.series}</b><i style="height:${Math.max(4,e.series/s*90)}px"></i><span class="sm mute">${t===3&&I.volSemana===0?`Atual`:p(g(e.ini))}</span></div>`).join(``),l=[...i.exercicios].sort((e,t)=>e.ts-t.ts).map(e=>`<div class="ex-vol"><div class="grow"><b>${p(e.nome)}</b><div class="sm mute">${p(h(e.ts,{weekday:`short`}).replace(`.`,``))} · ${e.series} série${e.series===1?``:`s`}</div></div><b class="h-md num">${e.series}</b></div>`).join(``);return`
    <div><div class="caps lime">${p(En(n))}</div><h2 class="h-lg" style="margin:2px 0">${b[t]??`Grupo`}</h2>
    <div class="mute"><b style="color:var(--txt)">${i.series} série${i.series===1?``:`s`}</b> de trabalho · ${wn[a].toLowerCase()} (${e.config.volMin} a ${e.config.volMax})</div></div>
    <section class="card mt12"><span class="caps mute">Últimas 4 semanas</span><div class="cols4">${c}</div></section>
    <section class="card mt12"><span class="caps mute">Exercícios desta semana</span>${l||`<p class="mute" style="margin:8px 0 0">Nada nesta semana.</p>`}</section>
    <p class="sm mute">Aquecimento não entra na conta. Drop, cluster e rest-pause contam como 1 série.</p>`}L({"vol-sem":e=>{I.volSemana=Math.min(0,I.volSemana+Number(e.dataset.d)),k(()=>{})},"vol-grupo":e=>{I.volGrupo=e.dataset.v,k(()=>{})},"vol-voltar":()=>{I.volGrupo=null,k(()=>{})}});var jn=[[`1m`,`1 mês`,30],[`3m`,`3 meses`,90],[`6m`,`6 meses`,180],[`tudo`,`Tudo`,1/0]];function Mn(e){let t=m(Date.now()),n=m(Date.now()-864e5),r=m(e);return r===t?`Hoje`:r===n?`Ontem`:g(e)}function Nn(e){let t={l:40,r:16,t:28,b:26},n=e.map(e=>e.carga),r=Math.min(...n),a=Math.max(...n);r===a&&(r-=5,a+=5);let o=(a-r)*.15;r=Math.max(0,r-o),a+=o;let s=e[0].ts,c=e.at(-1).ts,l=e=>c===s?(t.l+(340-t.r))/2:t.l+(e-s)/(c-s)*(340-t.l-t.r),u=e=>t.t+(1-(e-r)/(a-r))*(200-t.t-t.b),d=Array.from({length:4},(e,n)=>{let o=r+(a-r)*n/3;return`<line x1="${t.l}" x2="${340-t.r}" y1="${u(o)}" y2="${u(o)}" style="stroke:var(--line)" stroke-width="1"/>
      <text x="${t.l-6}" y="${u(o)+4}" text-anchor="end" style="fill:var(--mute)" font-size="10" font-family="Space Grotesk">${i(Math.round(o*2)/2)}</text>`}).join(``),f=e.map((e,t)=>`${t?`L`:`M`}${l(e.ts).toFixed(1)},${u(e.carga).toFixed(1)}`).join(` `),m=`${f} L${l(c).toFixed(1)},${200-t.b} L${l(s).toFixed(1)},${200-t.b} Z`,h=e.map(e=>`<circle cx="${l(e.ts).toFixed(1)}" cy="${u(e.carga).toFixed(1)}" r="4" style="fill:var(--bg);stroke:var(--lime-t)" stroke-width="2"/>`).join(``);n.indexOf(Math.max(...n));let _=e.at(-1),v=_.carga>=Math.max(...n)&&e.length>1,y=l(_.ts),b=u(_.carga),x=`${i(_.carga)} kg${v?` ★`:``}`,S=x.length*6.4+14,C=Math.min(340-t.r-S,Math.max(t.l,y-S/2)),w=`<rect x="${C}" y="${b-30}" width="${S}" height="20" rx="6" style="fill:var(--lime)"/>
    <text x="${C+S/2}" y="${b-16}" text-anchor="middle" style="fill:var(--on-lime)" font-size="11" font-weight="700" font-family="Space Grotesk">${x}</text>`,T=Math.min(4,e.length);return`<svg viewBox="0 0 340 200" role="img" aria-label="Evolução da carga máxima">
    <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--lime-t)" stop-opacity=".35"/><stop offset="1" style="stop-color:var(--lime-t)" stop-opacity="0"/></linearGradient></defs>
    ${d}
    <path d="${m}" fill="url(#g)"/>
    <path d="${f}" fill="none" style="stroke:var(--lime-t)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${h}${w}${Array.from({length:T},(t,n)=>{let r=e[T===1?0:Math.round(n*(e.length-1)/(T-1))];return`<text x="${l(r.ts)}" y="194" text-anchor="${n===0&&T>1?`start`:n===T-1&&T>1?`end`:`middle`}" style="fill:var(--mute)" font-size="10" font-family="Space Grotesk">${p(g(r.ts))}</text>`}).join(``)}
  </svg>`}var Pn={cluster:`Cluster`,restpause:`Rest-pause`};function Fn(e){return e.tipo===`drop`?`<span class="drop">Drop (${e.partes.map(e=>i(e.carga)).join(`/`)})</span>`:E(e.tipo)?`<span class="drop">${Pn[e.tipo]} ${i(e.carga)} kg · ${e.partes.map(e=>e.reps).join(`+`)}</span>`:e.tipo===`tempo`?`<span class="drop">${p(ve(e,i))}</span>`:`<span>${a(e.partes[0].carga)} × ${e.partes[0].reps}</span>`}var In=[[`evolucao`,`Evolução`],[`recordes`,`Recordes`],[`volume`,`Volume`]],Ln=()=>`<div class="abas3" role="tablist">${In.map(([e,t])=>`<button role="tab" aria-selected="${I.progAba===e}" class="${I.progAba===e?`on`:``}" data-a="prog-aba" data-v="${e}">${t}</button>`).join(``)}</div>`;function Rn(){return I.progAba===`volume`&&I.volGrupo?{top:`<button class="icon-btn" data-a="vol-voltar" aria-label="Voltar">${H(`arrow-left`,24)}</button><h1 class="sub">Volume semanal</h1>`,html:An(),nav:!0}:I.progAba===`recordes`?{top:`<h1>Progresso</h1>`,html:Ln()+_n(),nav:!0}:I.progAba===`volume`?{top:`<h1>Progresso</h1>`,html:Ln()+kn(),nav:!0}:zn()}function zn(){let e=O(),t=Ie(),n=`<h1>Progresso</h1>`;if(!t.length)return{top:n,html:`${Ln()}<div class="vazio">${H(`trending-up`,40)}<p><b>Ainda não há histórico.</b><br>Finalize um treino e a evolução de carga de cada exercício aparece aqui.</p><a class="btn" href="#/">Ir para o treino</a></div>`,nav:!0};t.find(e=>e.id===I.progEx)||(I.progEx=t[0].id);let r=t.find(e=>e.id===I.progEx),[,,a]=jn.find(e=>e[0]===I.periodo)??jn[1],s=Date.now()-a*864e5,c=Le(r.id).filter(e=>e.ts>=s),l=e.sessoes.filter(e=>e.exercicios[r.id]&&e.exercicios[r.id].series.some(e=>e.concluida&&!e.aquecimento)),u=l.filter(e=>e.inicio>=s),d=null,f=0;for(let e of u)for(let t of e.exercicios[r.id].series){if(!t.concluida||t.aquecimento||(f+=be(t),t.tipo!==`normal`&&t.tipo!==`drop`))continue;let e=P(t),n=t.partes[0].reps,r=Se(e,n);(!d||r>d.est)&&(d={est:r,c:e,r:n})}let m=c.length?Math.max(...c.map(e=>e.carga)):0,h=c[0]?.carga??0,g=c.at(-1)?.carga??0,_=h>0?(g-h)/h*100:0,v=jn.map(([e,t])=>`<button class="chip ${I.periodo===e?`on`:``}" data-a="periodo" data-v="${e}">${t}</button>`).join(``),y=c.length?`<section class="card grafico">
        <div class="row between"><span class="caps ok">● Evolução de carga máxima</span>${c.length>1&&g>=m?`<span class="badge neutro" style="color:var(--lime-t)">${H(`zap`,12)} Novo PR</span>`:``}</div>
        <div class="row mt8" style="gap:10px;align-items:baseline"><b class="h-lg">${i(g)} kg</b>${c.length>1?`<span class="ok num" style="font-weight:600">${_>=0?`+`:``}${i(Math.round(_*10)/10)}%</span>`:``}</div>
        ${Nn(c)}
        <p class="sm mute" style="margin:6px 0 0">Séries normais / 1º degrau do drop set. ${c.length===1?`Com mais sessões, a linha de evolução aparece.`:``}</p>
      </section>`:`<section class="card"><p class="mute" style="margin:0">Sem sessões deste exercício no período. Escolha “Tudo” para ver o histórico completo.</p></section>`,b=`<div class="stats3">
      <div class="stat"><span class="caps mute">Carga máx.</span><b>${i(m)}<small>kg</small></b></div>
      <div class="stat"><span class="caps mute">Melhor série</span><b>${d?d.r:`—`}<small>reps</small></b><span class="sm mute">${d?`1RM est.: ${i(Math.round(d.est*10)/10)} kg`:``}</span></div>
      <div class="stat"><span class="caps mute">Volume</span><b>${o(f)}<small>kg</small></b></div>
    </div>`,x=[...l].reverse().slice(0,6).map(e=>{let t=e.exercicios[r.id],n=t.series.filter(e=>e.concluida&&!e.aquecimento),i=n.reduce((e,t)=>e+be(t),0);return`<article class="card">
        <div class="row between"><div class="row" style="gap:8px"><b class="h-md">${Mn(e.inicio)}</b><span class="badge neutro">${n.length} série${n.length>1?`s`:``}</span></div>
        <span class="num"><span class="mute sm">VOL:</span> <b class="lime">${o(i)} kg</b></span></div>
        <div class="sess-chips">${n.map(Fn).join(``)}</div>
        ${t.nota?`<p class="sm mute" style="margin:10px 0 0">${H(`notebook-pen`,14)} ${p(t.nota)}</p>`:``}
      </article>`}).join(``),S=l.at(-1),C=``;if(S){let t=S.exercicios[r.id].series.filter(e=>e.concluida&&!e.aquecimento&&e.tipo===`normal`);if(t.length){let n=Math.max(...t.map(P)),r=t[0].repsMax,a=t.every(e=>e.partes[0].reps>=r),o=e.config.passo;C=`<div class="reco">
        <span class="ic-b">${H(`trending-up`,20)}</span>
        <div><b class="lime" style="font-family:var(--f-display);font-size:12px;letter-spacing:.08em;text-transform:uppercase">Recomendação de carga</b>
        <p style="margin:2px 0 0">${a?`Você completou ${r} reps em todas as séries com ${i(n)} kg. Sugerimos testar <b>${i(n+o)} kg</b> na primeira série da próxima sessão.`:`Mantenha ${i(n)} kg e busque ${r} reps em todas as séries antes de subir a carga.`}</p></div>
      </div>`}}return{top:n,html:`
    ${Ln()}
    <section class="card" style="margin-top:8px"><label class="seletor">
      <span class="icone-q">${H(`dumbbell`,20)}</span>
      <span class="grow"><span class="caps mute" style="display:block">Exercício monitorado</span><b class="h-md" style="font-size:18px">${p(r.nome)}</b></span>
      ${H(`chevron-down`,20)}
      <select data-in="prog-ex" aria-label="Escolher exercício">${t.map(e=>`<option value="${e.id}" ${e.id===r.id?`selected`:``}>${p(e.nome)}</option>`).join(``)}</select>
    </label></section>
    <div class="periodos">${v}</div>
    ${y}
    ${b}
    <h2 class="section-t"><span class="lime">${H(`history`,20)}</span> Sessões recentes <span class="grow"></span><span class="caps mute">${l.length} registro${l.length===1?``:`s`}</span></h2>
    ${x}
    ${C}
  `,nav:!0}}L({"prog-aba":e=>{I.progAba=e.dataset.v,I.volGrupo=null,k(()=>{})},periodo:e=>{I.periodo=e.dataset.v,k(()=>{})}},{"prog-ex":(e,t)=>{I.progEx=t,k(()=>{})}});var Bn=[`D`,`S`,`T`,`Q`,`Q`,`S`,`S`];function Vn(){if(!I.mes){let e=new Date;I.mes={ano:e.getFullYear(),mes:e.getMonth()}}return I.mes}function Hn(e){let t=m(e),n=h(e,{weekday:`long`}),r=h(e,{day:`2-digit`,month:`short`}).replace(`.`,``).toUpperCase();return t===m(Date.now())?`HOJE · ${r}`:`${r} · ${n.toUpperCase()}`}function Un(e,t){let n=new Map;for(let t of e){let e=v(t.inicio);n.set(e,(n.get(e)??0)+1)}let r=v(Date.now()),i=e=>(n.get(e)??0)>=t,a=r,o=0;for(i(a)||(a-=6048e5);i(a);)o++,a-=6048e5;let s=Array.from({length:5},(e,t)=>i(r-(4-t)*7*864e5));return{n:o,pilulas:s}}function Wn(){let e=O(),t=e.sessoes.filter(ze),{ano:n,mes:r}=Vn(),a=new Date(n,r,1),s=new Date(n,r+1,0).getDate(),c=Re(),u=m(Date.now()),d=e.config.metaSemanal,f=t.filter(e=>{let t=new Date(e.inicio);return t.getFullYear()===n&&t.getMonth()===r}),g=f.reduce((e,t)=>e+F(t).volume,0),v=new Date,y=d*(v.getFullYear()===n&&v.getMonth()===r?v.getDate():s)/7,b=y>=1?Math.min(100,Math.round(f.length/y*100)):null,{n:x,pilulas:S}=Un(t,d),C=[];for(let e=0;e<a.getDay();e++)C.push(`<span></span>`);for(let e=1;e<=s;e++){let t=m(new Date(n,r,e).getTime()),i=c.has(t)&&c.get(t).some(ze);C.push(`<button class="dia ${i?`tem`:``} ${t===u?`hoje`:``} ${I.dia===t?`sel`:``}" data-a="dia" data-k="${t}" aria-label="${e} ${i?`(treinou)`:``}">${e}</button>`)}let w=(I.dia?t.filter(e=>m(e.inicio)===I.dia):[...t].reverse().slice(0,10)).slice();I.dia||w.sort((e,t)=>t.inicio-e.inicio);let T=w.map(t=>{let n=F(t),r=e.treinos.find(e=>e.id===t.treinoId),i=r?r.exercicios.length:Object.keys(t.exercicios).length,a=Object.values(t.exercicios).map(e=>e.nome).join(`, `);return`<a class="card sess-card" href="#/sessao/${t.id}" style="display:block">
        <div class="row between wrap">
          <span class="row" style="gap:8px"><span class="badge ${m(t.inicio)===u?`lime`:`neutro`}">${p(Hn(t.inicio))}</span><span class="sm mute">Finalizado às ${_(t.fim??t.inicio)}</span></span>
          <span class="icon-btn" style="width:40px;height:40px;background:var(--inset)">${H(`arrow-right`,18)}</span>
        </div>
        <h3 class="h-md mt8" style="font-size:20px">${p(t.nome)}</h3>
        <div class="nums">
          <div><span class="caps k">Duração</span><b>${l(n.duracao)}</b></div>
          <div><span class="caps k">Carga total</span><b class="lime">${o(n.volume)}<small class="mute" style="font-size:12px"> kg</small></b></div>
          <div><span class="caps k">Exercícios</span><b class="ok">${n.feitos}/${Math.max(i,n.feitos)}</b></div>
          ${n.recordes?`<div><span class="caps k">Recordes</span><b style="color:var(--lime-t)">${n.recordes} ${H(`trophy`,16)}</b></div>`:``}
        </div>
        <p class="sm mute" style="margin:10px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${H(`circle-check`,14)} ${p(a)}</p>
      </a>`}).join(``),ee=h(a.getTime(),{month:`long`,year:`numeric`});return{top:`<h1>Histórico</h1>`,html:`
    <section class="card fire" style="margin-top:8px">
      <span class="ic-b">${H(`flame`,28)}</span>
      <div class="grow"><b class="h-lg" style="font-size:22px">${x} ${x===1?`semana`:`semanas`}</b> ${x?`<span class="badge neutro" style="color:var(--ok)">No ritmo</span>`:``}
      <div class="sm mute">${x?`Sequência batendo a meta de ${d}x/sem`:`Meta: ${d} treinos por semana (ajuste em Ajustes)`}</div></div>
      <div class="pills" aria-hidden="true">${S.map(e=>`<i class="${e?`on`:``}"></i>`).join(``)}</div>
    </section>
    <section class="card">
      <div class="cal-h">
        <button class="icon-btn" data-a="mes" data-d="-1" aria-label="Mês anterior">${H(`chevron-left`,22)}</button>
        <div style="text-align:center"><b class="h-md">${p(ee.charAt(0).toUpperCase()+ee.slice(1))}</b></div>
        <button class="icon-btn" data-a="mes" data-d="1" aria-label="Próximo mês">${H(`chevron-right`,22)}</button>
      </div>
      <div class="stats3 mt12" style="margin-bottom:0">
        <div class="stat"><span class="caps mute">Treinos</span><b>${f.length}</b></div>
        <div class="stat"><span class="caps mute">Frequência</span><b class="ok">${b==null?`—`:b+`%`}</b></div>
        <div class="stat"><span class="caps mute">Volume</span><b class="lime">${g>=1e3?i(Math.round(g/100)/10)+`<small>t</small>`:o(g)+`<small>kg</small>`}</b></div>
      </div>
      <div class="cal-grid">${Bn.map(e=>`<span class="dow">${e}</span>`).join(``)}${C.join(``)}</div>
    </section>
    <h2 class="section-t"><span class="lime">${H(`history`,20)}</span> ${I.dia?`Treinos de ${p(h(new Date(I.dia+`T12:00:00`).getTime(),{day:`numeric`,month:`long`}))}`:`Sessões recentes`}
      <span class="grow"></span>${I.dia?`<button class="link-btn" data-a="dia" data-k="${I.dia}">Limpar</button>`:`<span class="caps mute">Exibindo ${w.length} de ${t.length}</span>`}</h2>
    ${T||`<div class="vazio">${H(`calendar`,36)}<p>${I.dia?`Nenhum treino neste dia.`:`Seus treinos finalizados aparecem aqui.`}</p></div>`}
    ${t.length?`<button class="btn sec mt8" data-a="csv">${H(`download`,18)} Exportar relatório (CSV)</button>`:``}
  `,nav:!0}}function Gn({id:e}){let t=O().sessoes.find(t=>t.id===e),n=`<a class="icon-btn" href="#/historico" aria-label="Voltar">${H(`arrow-left`,24)}</a>`;if(!t)return{top:`${n}<h1 class="sub">Treino</h1>`,html:`<div class="vazio"><p>Sessão não encontrada.</p><a class="btn" href="#/historico">Voltar</a></div>`,nav:!1};let r=F(t),s=Object.entries(t.exercicios).map(([,e])=>{let t=e.series.map((t,n)=>{let r=t.tipo===`normal`?`${a(t.partes[0].carga)} kg × ${t.partes[0].reps}`:p(ve(t,i));return`<div class="row between" style="padding:8px 0;border-top:1px solid var(--line)">
            <span><b class="num">${N(e.series,n)}</b> <span class="badge ${t.tipo===`normal`||t.aquecimento?`neutro`:`tec`}" style="margin-left:4px">${t.aquecimento?`Aquecimento`:T[t.tipo]}</span>${t.rpe?` <span class="badge neutro">RPE ${t.rpe}</span>`:``} ${t.recorde?`<span class="badge recorde">${H(`trophy`,12)}</span>`:``}</span>
            <span class="num" style="text-align:right"><b>${r}</b>${t.descansoReal==null?``:`<span class="sm mute" style="display:block">descansou ${c(t.descansoReal)}</span>`}</span>
          </div>`}).join(``);return`<section class="card"><h3 class="h-md">${p(e.nome)}</h3>${t}${e.nota?`<p class="sm mute" style="margin:10px 0 0">${H(`notebook-pen`,14)} ${p(e.nota)}</p>`:``}</section>`}).join(``),u=`
    <section class="card hl" style="margin-top:8px">
      <span class="badge neutro">${p(Hn(t.inicio))}</span>
      <h2 class="h-lg mt8">${p(t.nome)}</h2>
      <div class="sess-card"><div class="nums">
        <div><span class="caps k">Duração</span><b>${l(r.duracao)}</b></div>
        <div><span class="caps k">Carga total</span><b class="lime">${o(r.volume)} kg</b></div>
        <div><span class="caps k">Séries</span><b>${r.series}</b></div>
        ${r.recordes?`<div><span class="caps k">Recordes</span><b class="lime">${r.recordes}</b></div>`:``}
      </div></div>
    </section>
    ${s}
    <button class="btn sec danger mt8" data-a="del-sessao" data-id="${t.id}">${H(`trash-2`,18)} Excluir este registro</button>`;return{top:`${n}<h1 class="sub">Treino registrado</h1>`,html:u,nav:!1}}function Kn(){let e=[[`data`,`treino`,`exercicio`,`serie`,`tecnica`,`parte`,`carga_kg`,`reps`,`segundos`,`rpe`,`descanso_real_s`,`recorde`]];for(let t of O().sessoes){let n=m(t.inicio);for(let r of Object.values(t.exercicios))r.series.forEach((i,a)=>{i.concluida&&i.partes.forEach((o,s)=>{e.push([n,t.nome,r.nome,a+1,i.aquecimento?`Aquecimento`:T[i.tipo],s+1,ye(i,o),i.tipo===`tempo`?``:o.reps,i.tipo===`tempo`?o.segundos:``,i.rpe??``,i.descansoReal??``,i.recorde?`sim`:``])})})}let t=e=>`"${String(e).replace(/"/g,`""`)}"`;return`﻿`+e.map(e=>e.map(t).join(`;`)).join(`
`)}function qn(e,t,n){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),2e3)}L({mes:e=>{let t=Vn(),n=new Date(t.ano,t.mes+Number(e.dataset.d),1);I.mes={ano:n.getFullYear(),mes:n.getMonth()},I.dia=null,k(()=>{})},dia:e=>{I.dia=I.dia===e.dataset.k?null:e.dataset.k,k(()=>{})},csv:()=>{qn(`fit-life-${m(Date.now())}.csv`,Kn(),`text/csv;charset=utf-8`),R(`Relatório exportado`)},"del-sessao":e=>Ke({titulo:`Excluir este registro?`,texto:`O treino sai do histórico e dos gráficos. Não dá para desfazer.`,ok:`Excluir registro`,fn:()=>{k(t=>t.sessoes=t.sessoes.filter(t=>t.id!==e.dataset.id),!1),V(`#/historico`),R(`Registro excluído`)}})});var Jn=`fit-life`;function Yn(e,t=Date.now()){return{app:Jn,versao:1,exportadoEm:t,dados:{...e,timer:null}}}function Xn(e){let t=e?.dados??e;return!t||!Array.isArray(t.treinos)||!Array.isArray(t.sessoes)?null:t}var Zn=`0.1.0`,Qn=()=>window.matchMedia(`(display-mode: standalone)`).matches||navigator.standalone===!0;function $n(){try{return new Blob([localStorage.getItem(`fitlife:v1`)??``]).size}catch{return 0}}var er=()=>Xe()===`denied`?`Bloqueado no navegador. Libere em Configurações do site.`:Xe()===`unsupported`?`Este navegador não suporta notificações`:`Notificação quando o descanso acaba. Se o Android suspender o app, o aviso pode atrasar`,Z=(e,t,n,r,i)=>`
  <button class="opt" data-a="toggle" data-k="${e}" role="switch" aria-checked="${t}">
    <span class="ic-b">${H(n,22)}</span>
    <span class="grow"><b>${r}</b><span class="d">${i}</span></span>
    <span class="switch ${t?`on`:``}"></span>
  </button>`;function tr(){let e=O(),t=e.config,n=$n(),r=n/1024,a=Math.min(100,n/5242880*100),o=!!navigator.serviceWorker?.controller;return{top:`<h1>Ajustes</h1>`,html:`
    <section class="card" style="margin-top:8px">
      <div class="row between"><b class="h-md">Fit Life</b><span class="badge neutro">v${Zn}</span></div>
      <p class="mute" style="margin:6px 0 0">Seus treinos e cargas ficam salvos só neste aparelho. Sem conta, sem internet.</p>
    </section>
    ${Qn()?`<section class="card"><div class="row" style="gap:12px"><span class="ok">${H(`circle-check`,24)}</span><div><b class="h-md" style="font-size:17px">App instalado</b><div class="sm mute">Abrindo em tela cheia, direto da tela inicial.</div></div></div></section>`:`<section class="card install">
        <div class="row" style="gap:12px;align-items:flex-start"><span class="icone-q" style="width:52px;height:52px">${H(`smartphone`,26)}</span>
        <div class="grow"><b class="h-md">Instalar app no celular</b>
        <p class="mute" style="margin:6px 0 0">Ícone na tela inicial, tela cheia e uso 100% offline na academia.</p></div></div>
        ${I.instalar?`<button class="btn mt16" data-a="instalar">${H(`download`,20)} Instalar agora</button>`:`<p class="sm mute" style="margin:12px 0 0">No Chrome do Android: menu <b>⋮</b> → <b>Instalar app</b> (ou “Adicionar à tela inicial”).</p>`}
      </section>`}
    <section class="card">
      <div class="row between"><span class="caps ${o?`ok`:`mute`}">● ${o?`Modo offline pronto`:`Offline ainda não preparado`}</span><span class="sm mute">${navigator.onLine?`Online`:`Sem internet`}</span></div>
      <p class="sm mute" style="margin:8px 0 10px">${o?`O app abre mesmo sem sinal.`:`Abra o app uma vez com internet para ele ficar disponível offline.`}</p>
      <div class="bar"><i style="width:${Math.max(2,a)}%;background:var(--ok)"></i></div>
      <div class="row between mt8"><span class="caps mute">${i(Math.round(r*10)/10)} KB ocupados</span><span class="caps mute">Limite seguro ~5 MB</span></div>
    </section>

    <h2 class="section-t caps lime" style="font-size:12px;margin-bottom:4px">Aparência</h2>
    <section class="card">
      <b class="h-md" style="font-size:17px">Tema</b>
      <div class="seg mt8" role="group" aria-label="Tema">${_t.map(([e,n])=>`<button class="${t.tema===e?`on`:``}" aria-pressed="${t.tema===e}" data-a="tema" data-v="${e}">${n}</button>`).join(``)}</div>
    </section>

    <h2 class="section-t caps lime" style="font-size:12px;margin-bottom:4px">Treino e notificações</h2>
    <section class="card" style="padding:4px 16px">
      ${Z(`som`,t.som,`volume-2`,`Sons do timer`,`Bip ao terminar o descanso`)}
      ${Z(`vibracao`,t.vibracao,`smartphone`,`Vibração`,`Vibra ao fim do descanso e ao salvar série`)}
      ${Z(`telaLigada`,t.telaLigada,`lock`,`Manter tela sempre acesa`,`Evita bloquear durante o treino`)}
      ${Z(`notificacao`,t.notificacao&&Xe()===`granted`,`bell-ring`,`Avisar com o app em segundo plano`,er())}
      ${Z(`autoDescanso`,t.autoDescanso,`timer`,`Iniciar descanso automático`,`Ao confirmar a série`)}
      ${Z(`sugestaoCarga`,t.sugestaoCarga,`trending-up`,`Sugerir aumento de carga`,`Quando você bate o máximo de reps na última vez`)}
      ${Z(`rpe`,t.rpe,`gauge`,`Perguntar o esforço (RPE)`,`Depois de cada série de trabalho`)}
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
      <button class="btn sec mt12" data-a="testar-alerta">${H(`bell-ring`,18)} Testar alerta do timer</button>
    </section>

    <section class="card">
      <b class="h-md" style="font-size:17px">Faixa de volume semanal</b>
      <p class="sm mute" style="margin:4px 0 12px">Séries de trabalho por grupo muscular na semana. A referência comum é 10 a 20.</p>
      <div class="row" style="gap:10px">
        ${[`volMin`,`volMax`].map(e=>`<div class="grow"><span class="caps mute">${e===`volMin`?`Mínimo`:`Máximo`}</span><div class="stepper mt8" style="grid-template-columns:48px 1fr 48px"><button data-a="vol-faixa" data-k="${e}" data-d="-1" aria-label="Diminuir">−</button><div class="valor"><b class="num" style="font-size:20px">${t[e]}</b></div><button data-a="vol-faixa" data-k="${e}" data-d="1" aria-label="Aumentar">+</button></div></div>`).join(``)}
      </div>
    </section>

    <h2 class="section-t caps lime" style="font-size:12px;margin-bottom:4px">Dados e segurança local</h2>
    <section class="card" style="padding:4px 16px">
      <button class="opt" data-a="exportar"><span class="ic-b ok">${H(`upload`,22)}</span><span class="grow"><b>Exportar backup</b><span class="d">Baixa um arquivo .json com treinos e históricos</span></span>${H(`chevron-right`,18)}</button>
      <label class="opt" for="arq-backup" style="cursor:pointer"><span class="ic-b lime">${H(`download`,22)}</span><span class="grow"><b>Importar backup</b><span class="d">Restaura tudo a partir de um arquivo .json</span></span>${H(`chevron-right`,18)}</label>
      <input id="arq-backup" type="file" accept="application/json,.json" data-in="importar" hidden>
      <button class="opt" data-a="apagar"><span class="ic-b" style="color:var(--pes)">${H(`trash-2`,22)}</span><span class="grow"><b style="color:var(--pes)">Apagar todos os dados</b><span class="d">Remove treinos, histórico e ajustes deste aparelho</span></span></button>
    </section>
    <p class="sm mute" style="text-align:center;margin:8px 0 0">${e.ultimoBackup?`Último backup: ${p(h(e.ultimoBackup,{day:`2-digit`,month:`short`,hour:`2-digit`,minute:`2-digit`}))}`:`Nenhum backup feito ainda. Faça um de vez em quando!`}</p>
  `,nav:!0}}L({tema:e=>k(t=>t.config.tema=e.dataset.v),toggle:async e=>{if(e.dataset.k!==`notificacao`)return k(t=>t.config[e.dataset.k]=!t.config[e.dataset.k]);let t=!(O().config.notificacao&&Xe()===`granted`);if(t&&await Ze()!==`granted`)return R(`Permissão de notificação não concedida.`);k(e=>e.config.notificacao=t)},"passo-padrao":e=>k(t=>t.config.passo=Number(e.dataset.v)),meta:e=>k(t=>t.config.metaSemanal=f(t.config.metaSemanal+Number(e.dataset.d),1,7)),"vol-faixa":e=>k(t=>{let{k:n,d:r}=e.dataset,i=f(t.config[n]+Number(r),1,60);t.config[n]=i,t.config.volMin>t.config.volMax&&(t.config[n===`volMin`?`volMax`:`volMin`]=i)}),"testar-alerta":()=>{ut(),pt({tipo:`descanso`}),R(`Alerta disparado`)},instalar:async()=>{let e=I.instalar;e&&(e.prompt(),await e.userChoice,I.instalar=null,k(()=>{}))},exportar:()=>{let e=Yn(O());qn(`fit-life-backup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(e,null,2),`application/json`),k(e=>e.ultimoBackup=Date.now()),R(`Backup exportado`)},apagar:()=>Ke({titulo:`Apagar todos os dados?`,texto:`Treinos, histórico e ajustes deste aparelho serão removidos. Exporte um backup antes se quiser guardar.`,ok:`Apagar tudo`,fn:()=>{localStorage.removeItem(w),location.hash=`#/`,location.reload()}})},{importar:(e,t,n)=>{let r=n.files?.[0];if(n.value=``,!r)return;let i=new FileReader;i.onload=()=>{try{let e=Xn(JSON.parse(String(i.result)));if(!e)throw Error(`formato`);Ke({titulo:`Restaurar este backup?`,texto:`Contém ${e.treinos.length} treino(s) e ${e.sessoes.length} sessão(ões). Os dados atuais serão substituídos.`,ok:`Restaurar`,fn:()=>{de({...e,ativa:null,timer:null}),R(`Backup restaurado`)}})}catch{R(`Arquivo inválido. Use um backup exportado pelo app.`)}},i.readAsText(r)}});var nr={descanso:`Descanso`,pausa:`Pausa entre blocos`,tempo:`Série por tempo`},rr=118,ir=2*Math.PI*rr,ar=()=>{let e=O().timer;return e?Math.min(1,Math.max(0,tt()/(e.total*1e3))):0};function or(){let e=O().timer;if(!e)return``;let t=e.terminou?`Bora!`:nt()?`Pausado`:nr[e.tipo],n=e.terminou&&e.proxima?e.proxima.texto:``,r=ar();return`<div class="timer-bar ${e.terminou?`fim`:``}" role="timer" aria-label="Timer de descanso">
    <button class="esq" data-a="abrir-timer" aria-label="Abrir timer">
      <span class="dot"></span>
      <span style="min-width:0"><span class="caps rot" style="display:block">${t}</span>
      ${e.terminou?`<b class="disp" style="font-size:16px;line-height:20px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p(n||`Próxima série`)}</b>`:`<span class="tempo" data-timer-t>${s(W())}</span>`}</span>
    </button>
    ${e.terminou?`<button class="bt" data-a="timer-ok">OK</button>`:`<button class="bt" data-a="timer-add" data-s="-15" aria-label="Menos 15 segundos">−15s</button>
           <button class="bt" data-a="timer-add" data-s="15" aria-label="Mais 15 segundos">+15s</button>
           <button class="bt lime" data-a="timer-skip">Pular</button>`}
    <div class="prog"><i data-timer-p style="width:${(r*100).toFixed(1)}%"></i></div>
  </div>`}function sr(){let e=O(),t=e.timer,n=`<button class="icon-btn" data-a="minimizar" aria-label="Minimizar">${H(`chevron-left`,24)}</button>`;if(!t)return{top:`${n}<h1 class="sub">Timer</h1>`,html:`<div class="vazio">${H(`timer`,40)}<p>Nenhum descanso em andamento.</p><a class="btn" href="#/">Voltar ao treino</a></div>`,nav:!1,semDock:!0};let r=t.ref?e.ativa?.exercicios[t.ref.exId]?.series:null,i=t.proxima?.exId?M(t.proxima.exId):null,a=nt(),o=t.tipo===`descanso`&&r?`Descanso · ${N(r,t.ref.idx)} concluída`:nr[t.tipo],l=ir*(1-ar()),u=t.tipo===`descanso`?`<div class="mt16"><div class="row between"><span class="caps mute">Ajuste de intervalo alvo</span><span class="caps lime">Salva no exercício</span></div>
          <div class="periodos" style="margin-top:8px">${te.map(e=>`<button class="chip big ${t.total===e?`on`:``}" data-a="timer-preset" data-v="${e}">${t.total===e?`✓ `:``}${c(e)}</button>`).join(``)}</div></div>`:``,d=t.proxima?`<section class="card">
        <span class="badge lime">A seguir</span>
        <div class="h-md mt8">${p(t.proxima.texto)}</div>
        ${i?.ex?`<p class="mute" style="margin:6px 0 0">${p(i.ex.nome)}</p>${i.ex.nota?`<div class="nota">${H(`lightbulb`,16)}<span>${p(i.ex.nota)}</span></div>`:``}`:``}
        ${i?`<a class="btn sec sm mt12" href="#/exercicio/${i.ex.id}">Abrir exercício ${H(`arrow-right`,16)}</a>`:``}
      </section>`:``,f=`
    ${t.terminou?`<div class="fim-box"><span class="caps">Alerta de conclusão</span><div class="t">FIM DO DESCANSO!</div>
        <div>${p(t.proxima?.texto??`Hora da próxima série.`)}</div>
        <button class="btn" data-a="timer-comecar" data-ex="${t.proxima?.exId??``}">Começar</button></div>`:``}
    <section class="card" style="margin-top:8px">
      <span class="caps lime">● ${p(o)}</span>
      <div class="anel-wrap">
        <svg viewBox="0 0 280 280" aria-hidden="true">
          <circle cx="140" cy="140" r="${rr}" fill="none" style="stroke:var(--inset)" stroke-width="14"/>
          <circle data-timer-ring cx="140" cy="140" r="${rr}" fill="none" style="stroke:var(--lime-t)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${ir.toFixed(2)}" stroke-dashoffset="${l.toFixed(2)}"/>
        </svg>
        <div class="centro"><span class="grande" data-timer-t>${s(W())}</span><span class="caps mute" style="margin-top:6px">${H(`timer`,12)} Alvo: ${s(t.total)}</span></div>
      </div>
      <div class="ctrl3">
        <button data-a="timer-add" data-s="-15">${H(`rotate-ccw`,18)} −15s</button>
        <button data-a="timer-pausar" aria-label="${a?`Retomar`:`Pausar`}">${H(a?`play`:`pause`,22)}</button>
        <button data-a="timer-add" data-s="15">${H(`rotate-cw`,18)} +15s</button>
      </div>
      <button class="btn sec mt12" data-a="timer-skip">${H(`skip-forward`,18)} Pular descanso</button>
      ${u}
    </section>
    ${d}
  `;return{top:`${n}<h1 class="sub">Treino</h1><span class="tag-ativo">Ativo</span>`,html:f,nav:!1,semDock:!0}}function cr(){if(!O().timer)return;let e=s(W());document.querySelectorAll(`[data-timer-t],[data-pausa-t]`).forEach(t=>{t.textContent!==e&&(t.textContent=e)});let t=ar();document.querySelectorAll(`[data-timer-p]`).forEach(e=>e.style.width=`${(t*100).toFixed(1)}%`);let n=document.querySelector(`[data-timer-ring]`);n&&n.setAttribute(`stroke-dashoffset`,(ir*(1-t)).toFixed(2))}L({"abrir-timer":()=>V(`#/timer`),minimizar:()=>history.length>1?history.back():V(`#/`),"timer-add":e=>{ot(Number(e.dataset.s)),lr()},"timer-pausar":()=>{nt()?ct():st(),lr()},"timer-skip":()=>{let e=O().timer?.proxima?.exId;at(),location.hash===`#/timer`?V(e?`#/exercicio/${e}`:`#/`):lr()},"timer-ok":()=>{at(),lr()},"timer-comecar":e=>{at(),V(e.dataset.ex?`#/exercicio/${e.dataset.ex}`:`#/`)},"timer-preset":e=>{let t=Number(e.dataset.v),n=O().timer;lt(t);let r=n?.ref?M(n.ref.exId):null;r&&k(()=>r.ex.descanso=t,!1),lr()}});function lr(){k(()=>{})}var ur=`modulepreload`,dr=function(e,t){return new URL(e,t).href},fr={},pr=function(e){return e.pathname.endsWith(`.css`)},mr=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},hr=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=dr(t,n);let r=s(t),i=pr(r);return mr(fr,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:ur,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},gr=e=>document.querySelector(e),_r=null,vr=null,Q={nome:`hoje`,arg:null};function yr(){let e=location.hash.replace(/^#\/?/,``).split(`/`);return{nome:e[0]||`hoje`,arg:e[1]??null}}var br=[[`hoje`,`#/`,`dumbbell`,`Treino`,[`hoje`,`exercicio`,`editar`,`timer`]],[`progresso`,`#/progresso`,`trending-up`,`Progresso`,[`progresso`]],[`historico`,`#/historico`,`calendar`,`Histórico`,[`historico`,`sessao`]],[`ajustes`,`#/ajustes`,`sliders-horizontal`,`Ajustes`,[`ajustes`]]];function xr(){gr(`#nav`).innerHTML=br.map(([,e,t,n,r])=>`<a href="${e}" class="${r.includes(Q.nome)?`on`:``}" ${r.includes(Q.nome)?`aria-current="page"`:``}>${H(t,24)}<span>${n}</span></a>`).join(``)}function Sr(){let e=gr(`#dock`);e.innerHTML=`${_r?.semDock||Q.nome===`timer`?``:or()}${_r?.cta??``}`,document.documentElement.style.setProperty(`--dock-h`,e.children.length?`${e.offsetHeight}px`:`0px`)}function $(){Q=yr();let e=O(),t;switch(Q.nome){case`exercicio`:Kt(Q.arg),t=qt({id:Q.arg});break;case`editar`:t=ln();break;case`timer`:t=sr();break;case`progresso`:t=Rn();break;case`historico`:t=Wn();break;case`sessao`:t=Gn({id:Q.arg});break;case`ajustes`:t=tr();break;default:t=jt()}_r=t;let n=`${Q.nome}/${Q.arg??``}`,r=window.scrollY;gr(`#topbar`).innerHTML=t.top,gr(`#view`).innerHTML=t.html,document.body.classList.toggle(`sem-nav`,!t.nav),xr(),Sr(),n===vr?window.scrollTo(0,r):window.scrollTo(0,0),vr=n,I.rolarAtiva&&(I.rolarAtiva=!1,requestAnimationFrame(()=>document.querySelector(`.serie.ativa`)?.scrollIntoView({block:`center`,behavior:`smooth`}))),gt(!!e.ativa&&e.config.telaLigada),bt(e.config.tema)}window.matchMedia?.(`(prefers-color-scheme: light)`).addEventListener(`change`,()=>bt(O().config.tema)),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-a]`);if(!t)return;let n=Ve[t.dataset.a];n&&(e.preventDefault(),ut(),n(t,e))}),document.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&e.target.matches?.(`[role="button"][data-a]`)&&(e.preventDefault(),e.target.click()),e.key===`Enter`&&e.target.matches?.(`input.num-input`)&&e.target.blur()}),document.addEventListener(`input`,e=>{let t=e.target,n=t.dataset?.in;n&&t.type!==`file`&&t.tagName!==`SELECT`&&He[n]?.(t.dataset,t.value,t,`input`)}),document.addEventListener(`change`,e=>{let t=e.target,n=t.dataset?.in;if(n){if(t.type===`file`||t.tagName===`SELECT`)He[n]?.(t.dataset,t.value,t,`change`);else if(t.dataset.fmt!=null){let e=u(t.value)??0;t.value=t.dataset.fmt===`1`?new Intl.NumberFormat(`pt-BR`,{minimumFractionDigits:1,maximumFractionDigits:2}).format(e):String(Math.round(e))}}}),window.addEventListener(`hashchange`,$),window.addEventListener(`online`,$),window.addEventListener(`offline`,$),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&gt(!!O().ativa&&O().config.telaLigada)}),window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),I.instalar=e,Q.nome===`ajustes`&&$()}),window.addEventListener(`appinstalled`,()=>{I.instalar=null,Q.nome===`ajustes`&&$()}),le(),se($),U.mudou=()=>{Sr(),Q.nome===`timer`&&$()},U.tick=()=>{cr(),document.querySelectorAll(`[data-dur]`).forEach(e=>{e.textContent=l(Date.now()-Number(e.dataset.dur))})},ht(),new ResizeObserver(()=>{let e=gr(`#dock`);document.documentElement.style.setProperty(`--dock-h`,e.children.length?`${e.offsetHeight}px`:`0px`)}).observe(gr(`#dock`)),$(),mt(),hr(async()=>{let{registerSW:e}=await import(`./virtual_pwa-register-DaVUTMAA.js`);return{registerSW:e}},[],import.meta.url).then(({registerSW:e})=>e({immediate:!0})).catch(()=>{});export{hr as t};