/* ===== AeroPlanner additions: inline editing, media backlog, Tunis prayer times ===== */
var ZX=(t,p,...c)=>(0,E.jsxs)(t,c.length?{...p,children:c}:p);
(function(){if(typeof document>`u`||document.getElementById(`zx-style`))return;var st=document.createElement(`style`);st.id=`zx-style`;st.textContent=`
.zx-edit{display:inline-flex;align-items:center;gap:.25rem;border-radius:999px;padding:.1rem .45rem;font-size:.62rem;font-weight:800;letter-spacing:.03em;color:var(--ocean);background:linear-gradient(180deg,#fff,#dbe7f3);border:1px solid #a9bbcf;cursor:pointer;line-height:1.2}
.zx-edit:hover{background:linear-gradient(180deg,#fff,#c7ddf3);border-color:var(--electric)}
.zx-fab{position:absolute;right:.5rem;top:2.7rem;z-index:6;box-shadow:0 1px 4px rgba(0,40,90,.35)}
#games article .aero-btn,#gym article .aero-btn{white-space:nowrap}
.zx-form{display:grid;gap:.4rem;min-width:0;flex:1}
.zx-row{display:grid;gap:.4rem;grid-template-columns:repeat(var(--zx-cols,2),minmax(0,1fr))}
.zx-lbl{display:grid;gap:.1rem;font-size:.58rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--steel)}
.zx-form .aero-field{padding:.25rem .45rem;font-size:.78rem;min-width:0;width:100%}
.zx-actions{display:flex;gap:.4rem;justify-content:flex-end;align-items:center;flex-wrap:wrap}
.zx-details{font-size:.68rem;font-weight:600;color:var(--steel);line-height:1.25}
.zx-pop{position:absolute;z-index:60;width:272px;max-width:80vw;padding:.65rem;border-radius:.9rem;background:linear-gradient(180deg,#fff,#e9f1f9);border:1px solid #8fb0d1;box-shadow:0 10px 28px rgba(5,40,90,.38);color:var(--ocean)}
.zx-poster{position:relative;display:flex;flex-direction:column;justify-content:flex-end;width:100%;height:100%;padding:.7rem .7rem 2.1rem;overflow:hidden;color:#fff;text-align:left}
.zx-poster:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 25% 15%,rgba(255,255,255,.35),transparent 55%),linear-gradient(0deg,rgba(0,0,0,.55),transparent 55%)}
.zx-poster>*{position:relative}
.zx-poster-emoji{position:absolute!important;top:.9rem;left:50%;transform:translateX(-50%);font-size:2.6rem;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4))}
.zx-poster-title{font-family:var(--font-display,inherit);font-weight:800;font-size:.95rem;line-height:1.1;text-shadow:0 1px 3px rgba(0,0,0,.6)}
.zx-poster-sub{font-size:.62rem;font-weight:700;opacity:.9;margin-top:.15rem;text-shadow:0 1px 2px rgba(0,0,0,.6)}
.zx-pt-row{display:flex;align-items:center;gap:.6rem;padding:.4rem .6rem;border-radius:.75rem;border:1px solid transparent;font-weight:700;color:var(--ocean)}
.zx-pt-row .zx-pt-time{margin-left:auto;font-variant-numeric:tabular-nums;font-weight:800;font-size:1.02rem}
.zx-pt-row.is-next{background:linear-gradient(180deg,#4fb4ff,#1573d8);color:#fff;border-color:#0b4fa0;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 2px 6px rgba(10,80,170,.35)}
.zx-pt-row.is-past{opacity:.5}
.zx-pt-ar{font-size:.9rem;opacity:.75;font-weight:600;margin-left:.15rem}
.zx-b{color:#fff;border-color:rgba(0,0,0,.28)}.zx-b-movies{background:linear-gradient(180deg,#d9534f,#8c1d18)}.zx-b-tv{background:linear-gradient(180deg,#3d8bfd,#0b3d99)}.zx-b-anime{background:linear-gradient(180deg,#ff7aa8,#c2185b)}
.zx-pt-hero{border-radius:1rem;padding:.7rem .9rem;color:#fff;background:linear-gradient(160deg,#0f4c96,#072a57);position:relative;overflow:hidden}
.zx-pt-hero:before{content:"";position:absolute;inset:0 0 50% 0;background:linear-gradient(180deg,rgba(255,255,255,.22),transparent)}
.zx-pt-hero>*{position:relative}
`;document.head.appendChild(st)})();

/* ---------- Tunis prayer times (astronomical calc: Fajr 18°, Isha 18°, Asr shadow ×1, UTC+1) ---------- */
var ZT_LAT=36.8065,ZT_LNG=10.1815,ZT_ELEV=10,ZD=Math.PI/180,zsin=e=>Math.sin(e*ZD),zcos=e=>Math.cos(e*ZD),ztan=e=>Math.tan(e*ZD),zasin=e=>Math.asin(e)/ZD,zacos=e=>Math.acos(e)/ZD,zatan2=(e,t)=>Math.atan2(e,t)/ZD,zacot=e=>Math.atan(1/e)/ZD,zfix=(e,t)=>{e-=t*Math.floor(e/t);return e<0?e+t:e};
function zJulian(e,t,n){t<=2&&(e-=1,t+=12);let r=Math.floor(e/100),i=2-r+Math.floor(r/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(t+1))+n+i-1524.5}
function zSun(e){let t=e-2451545,n=zfix(357.529+.98560028*t,360),r=zfix(280.459+.98564736*t,360),i=zfix(r+1.915*zsin(n)+.02*zsin(2*n),360),a=23.439-36e-8*t,o=zfix(zatan2(zcos(a)*zsin(i),zcos(i))/15,24);return{decl:zasin(zsin(a)*zsin(i)),eqt:r/15-o}}
function zPrayerTimes(e,t,n,r){let i=zJulian(e,t,n)-ZT_LNG/360,a=e=>zfix(12-zSun(i+e).eqt,24),o=(e,t,n)=>{let r=zSun(i+t).decl,o=a(t),s=(-zsin(e)-zsin(r)*zsin(ZT_LAT))/(zcos(r)*zcos(ZT_LAT)),c=zacos(Math.max(-1,Math.min(1,s)))/15;return o+(n?-c:c)},s=(e,t)=>{let n=zSun(i+t).decl;return o(-zacot(e+ztan(Math.abs(ZT_LAT-n))),t,!1)},c=.833+.0347*Math.sqrt(ZT_ELEV),l={fajr:5,sunrise:6,dhuhr:12,asr:13,maghrib:18,isha:18};for(let e=0;e<2;e++)l={fajr:o(18,l.fajr/24,!0),sunrise:o(c,l.sunrise/24,!0),dhuhr:a(l.dhuhr/24),asr:s(1,l.asr/24),maghrib:o(c,l.maghrib/24,!1),isha:o(18,l.isha/24,!1)};let u=r-ZT_LNG/15,d={};for(let e in l)d[e]=l[e]+u;return d}
var ZTZ=`Africa/Tunis`,ZTunisFmt=new Intl.DateTimeFormat(`en-GB`,{timeZone:ZTZ,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hourCycle:`h23`});
function zTunisNow(e){let t={};for(let n of ZTunisFmt.formatToParts(e))t[n.type]=n.value;return{y:+t.year,m:+t.month,d:+t.day,secs:+t.hour*3600+ +t.minute*60+ +t.second}}
function zAddDay(e,t,n,r){let i=new Date(Date.UTC(e,t-1,n+r));return[i.getUTCFullYear(),i.getUTCMonth()+1,i.getUTCDate()]}
var ZPRAYERS=[{k:`fajr`,en:`Fajr`,ar:`الفجر`},{k:`dhuhr`,en:`Dhuhr`,ar:`الظهر`},{k:`asr`,en:`Asr`,ar:`العصر`},{k:`maghrib`,en:`Maghrib`,ar:`المغرب`},{k:`isha`,en:`Isha`,ar:`العشاء`}];
function zHM(e){let t=Math.round(e*60);return`${String(Math.floor(t/60)%24).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}
function zCountdown(e){e=Math.max(0,Math.floor(e));return`${String(Math.floor(e/3600)).padStart(2,`0`)}:${String(Math.floor(e%3600/60)).padStart(2,`0`)}:${String(e%60).padStart(2,`0`)}`}
var ZMoon=s({name:`moon-star`,size:24,node:[[`path`,{d:`M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z`,key:`zmoon1`}]]}),ZBell=s({name:`bell`,size:24,node:[[`path`,{d:`M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9`,key:`zbell1`}],[`path`,{d:`M10.3 21a1.94 1.94 0 0 0 3.4 0`,key:`zbell2`}]]});
function zChime(){try{let e=new(window.AudioContext||window.webkitAudioContext),t=e.currentTime;[523.25,659.25,783.99,1046.5].forEach((n,r)=>{let i=e.createOscillator(),a=e.createGain();i.type=`sine`;i.frequency.value=n;a.gain.setValueAtTime(1e-4,t+r*.45);a.gain.exponentialRampToValueAtTime(.25,t+r*.45+.05);a.gain.exponentialRampToValueAtTime(1e-4,t+r*.45+1.6);i.connect(a).connect(e.destination);i.start(t+r*.45);i.stop(t+r*.45+1.7)});setTimeout(()=>e.close(),4e3)}catch{}}
function ZPrayer(){
  let tick=vi(1e3),[alertOn,setAlertOn]=(0,T.useState)(!1),lastFired=(0,T.useRef)(``);
  (0,T.useEffect)(()=>{try{setAlertOn(localStorage.getItem(`aeroplanner:prayer-alert`)===`1`)}catch{}},[]);
  let now=zTunisNow(tick),nowS=now.secs,today=zPrayerTimes(now.y,now.m,now.d,1),list=ZPRAYERS.map(p=>({...p,h:Math.round(today[p.k]*60)*60})),next=list.find(p=>p.h>nowS),tomorrow=null;
  if(!next){let[y,m,d]=zAddDay(now.y,now.m,now.d,1);tomorrow=zPrayerTimes(y,m,d,1);next={...ZPRAYERS[0],h:Math.round(tomorrow.fajr*60)*60+86400}}
  let prev=[...list].reverse().find(p=>p.h<=nowS),prevH=prev?prev.h:Math.round((zPrayerTimes(...zAddDay(now.y,now.m,now.d,-1),1).isha)*60)*60-86400,span=next.h-prevH,prog=Math.min(1,Math.max(0,(nowS-prevH)/span)),left=next.h-nowS;
  (0,T.useEffect)(()=>{if(!alertOn)return;let hit=list.find(p=>nowS>=p.h&&nowS<p.h+2);if(hit){let key=`${now.y}-${now.m}-${now.d}-${hit.k}`;if(lastFired.current!==key){lastFired.current=key;zChime();a(`🕌 ${hit.en} — time for prayer (Tunis)`)}}});
  let toggle=()=>{let v=!alertOn;setAlertOn(v);try{localStorage.setItem(`aeroplanner:prayer-alert`,v?`1`:`0`)}catch{}v&&(zChime(),a(`Prayer alerts on — a soft chime plays at each prayer time while this tab is open.`))};
  let dateLabel=new Intl.DateTimeFormat(`en-GB`,{timeZone:ZTZ,weekday:`long`,day:`numeric`,month:`long`}).format(tick);
  return si({id:`prayer`,blue:!0,title:`Prayer Times · Tunis`,icon:(0,E.jsx)(ZMoon,{className:`size-3.5`}),bodyClassName:`flex flex-col gap-3`,
    actions:ZX(`button`,{type:`button`,className:`aero-btn is-silver !py-1 !text-[0.7rem]`,"data-active":alertOn,onClick:toggle,title:`Play a soft chime at each prayer time while this tab is open`},(0,E.jsx)(ZBell,{className:`size-3.5`}),alertOn?` Alerts on`:` Alerts off`),
    children:[
      ZX(`div`,{className:`zx-pt-hero`},
        ZX(`div`,{className:`flex items-start justify-between gap-3`},
          ZX(`div`,{},
            ZX(`p`,{style:{fontSize:`.62rem`,fontWeight:800,letterSpacing:`.12em`,textTransform:`uppercase`,opacity:.8}},`Next prayer`),
            ZX(`p`,{className:`font-display`,style:{fontSize:`1.6rem`,fontWeight:800,lineHeight:1.1}},next.en,ZX(`span`,{className:`zx-pt-ar`},next.ar)),
            ZX(`p`,{style:{fontSize:`.72rem`,opacity:.8}},zHM(next.h/3600%24),` · ${dateLabel}`)),
          ZX(`div`,{style:{textAlign:`right`}},
            ZX(`p`,{style:{fontSize:`.62rem`,fontWeight:800,letterSpacing:`.12em`,textTransform:`uppercase`,opacity:.8}},`In`),
            ZX(`p`,{className:`font-display digit`,style:{fontSize:`1.6rem`,fontWeight:800,fontVariantNumeric:`tabular-nums`,lineHeight:1.1}},zCountdown(left)))),
        ZX(`div`,{className:`aero-inset`,style:{height:`.55rem`,marginTop:`.6rem`,borderRadius:`999px`,padding:0,overflow:`hidden`,background:`rgba(0,0,0,.3)`}},
          ZX(`div`,{className:`kind-gym kind-fill`,style:{height:`100%`,width:`${Math.max(prog*100,3)}%`,borderRadius:`999px`,transition:`width 1s linear`}}))),
      ZX(`ul`,{className:`grid gap-1`,style:{listStyle:`none`,margin:0,padding:0}},
        list.map(p=>ZX(`li`,{key:p.k,className:o(`zx-pt-row`,p.k===next.k&&`is-next`,p.h<=nowS&&p.k!==next.k&&`is-past`)},
          ZX(`span`,{},p.en),ZX(`span`,{className:`zx-pt-ar`},p.ar),ZX(`span`,{className:`zx-pt-time`},zHM(p.h/3600))))),
      ZX(`p`,{className:`text-[0.65rem] text-[var(--steel)]`,style:{display:`flex`,justifyContent:`space-between`,gap:`.5rem`,flexWrap:`wrap`}},
        ZX(`span`,{},`☀ Sunrise ${zHM(today.sunrise)}`),ZX(`span`,{},`Tunis local time (UTC+1) · Fajr & Isha 18°, Asr ×1`))
    ]})}

/* ---------- Media (Movies / TV Shows / Anime) ---------- */
var ZMEDIA={Movies:{emoji:`🎬`,word:`Movie`,g:[[`#5b2a86`,`#1b0f3b`],[`#b3262f`,`#3b0a12`],[`#0f7b8a`,`#06303a`],[`#c9772b`,`#4a2208`]]},"TV Shows":{emoji:`📺`,word:`Show`,g:[[`#1e5fd1`,`#0a1f4d`],[`#2a8a4b`,`#0b2e1a`],[`#8a2a6e`,`#2d0b24`],[`#d1481e`,`#4d1608`]]},Anime:{emoji:`⛩️`,word:`Anime`,g:[[`#e0457b`,`#4a0f2c`],[`#6a4bd8`,`#1a1252`],[`#14a3a3`,`#073a3a`],[`#f09a28`,`#5a2c05`]]}};
var ZMEDIA_SAMPLES=[[`Inception`,`Movies`,`2010 · Sci-Fi thriller · 2h 28m`,2],[`The Dark Knight`,`Movies`,`2008 · Action · 2h 32m`,3],[`Spirited Away`,`Movies`,`2001 · Animated fantasy · 2h 5m`,2],[`Interstellar`,`Movies`,`2014 · Sci-Fi · 2h 49m`,3],[`Parasite`,`Movies`,`2019 · Thriller · 2h 12m`,2],[`Dune: Part Two`,`Movies`,`2024 · Sci-Fi epic · 2h 46m`,3],
[`Breaking Bad`,`TV Shows`,`2008–2013 · Crime drama · 5 seasons`,1],[`The Office (US)`,`TV Shows`,`2005–2013 · Comedy · 9 seasons`,1],[`Dark`,`TV Shows`,`2017–2020 · Sci-Fi thriller · 3 seasons`,2],[`Better Call Saul`,`TV Shows`,`2015–2022 · Crime drama · 6 seasons`,1],[`Chernobyl`,`TV Shows`,`2019 · Historical drama · 5 episodes`,2],[`Arcane`,`TV Shows`,`2021–2024 · Animated fantasy · 2 seasons`,1],
[`Fullmetal Alchemist: Brotherhood`,`Anime`,`2009–2010 · Adventure · 64 episodes`,2],[`Death Note`,`Anime`,`2006–2007 · Psychological thriller · 37 episodes`,2],[`Cowboy Bebop`,`Anime`,`1998 · Space western · 26 episodes`,2],[`Steins;Gate`,`Anime`,`2011 · Sci-Fi thriller · 24 episodes`,2],[`Attack on Titan`,`Anime`,`2013–2023 · Dark fantasy · 4 seasons`,2],[`Your Name`,`Anime`,`2016 · Romance fantasy film · 1h 46m`,2]].map((r,i)=>({id:`m-${r[1].toLowerCase().replace(/\W/g,``)}-${i}`,title:r[0],platform:r[1],details:r[2],status:i%5===0?`playing`:`backlog`,sessionHours:r[3]}));
function zMigrate(e){if(!e||e.mediaSeeded)return e;let have=new Set((e.games||[]).map(g=>g.id));return{...e,games:[...(e.games||[]),...ZMEDIA_SAMPLES.filter(g=>!have.has(g.id))],mediaSeeded:!0}}
function zHash(e){let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)|0;return Math.abs(t)}
function ZPoster({game:e}){let m=ZMEDIA[e.platform],g=m.g[zHash(e.title)%m.g.length];return ZX(`div`,{className:`zx-poster`,style:{background:`linear-gradient(160deg,${g[0]},${g[1]})`}},ZX(`span`,{className:`zx-poster-emoji`,"aria-hidden":!0},m.emoji),ZX(`p`,{className:`zx-poster-title`},e.title),e.details&&ZX(`p`,{className:`zx-poster-sub`},e.details))}
function zStatusLabel(e){return ZMEDIA[e.platform]?{backlog:`Watchlist`,playing:`Watching`,beaten:`Finished ★`}[e.status]:ji[e.status].label}

/* ---------- Inline editing helpers ---------- */
function ZSwap({editing:e,editor:t,children:n,className:r}){return e?t:(0,E.jsx)(`div`,{className:r,children:n})}
function ZEditBtn({onClick:e,label:t=`Edit`,fab:n,active:r}){return ZX(`button`,{type:`button`,className:`zx-edit${n?` zx-fab`:``}`,"aria-label":t,"data-active":r,onClick:t=>{t.stopPropagation();e()},onMouseDown:e=>e.stopPropagation()},(0,E.jsx)(ne,{className:`size-3`}),t)}
function ZField({label:e,children:t}){return ZX(`label`,{className:`zx-lbl`},e,t)}
var zKeys=(save,cancel)=>e=>{e.key===`Enter`&&e.target.tagName===`INPUT`&&e.target.type!==`checkbox`&&(e.preventDefault(),save());e.key===`Escape`&&(e.stopPropagation(),cancel())};
function ZActions({onSave:e,onCancel:t,extra:n,saveDisabled:r}){return ZX(`div`,{className:`zx-actions`},n,ZX(`button`,{type:`button`,className:`aero-btn is-silver !py-1 !text-[0.7rem]`,onClick:t},`Cancel`),ZX(`button`,{type:`button`,className:`aero-btn !py-1 !text-[0.7rem]`,disabled:r,onClick:e},`Save`))}

function ZExamInline({exam:e,onClose:t}){let{dispatch:n}=H(),[r,i]=(0,T.useState)(e),save=()=>{if(!r.subject.trim()||!r.date)return a.error(`Subject and date are required.`);n({type:`upsertExam`,exam:{...r,subject:r.subject.trim()}});a.success(`Exam updated`);t()},k=zKeys(save,t);
  return ZX(`div`,{className:`zx-form`,onKeyDown:k},
    ZField({label:`Subject`,children:(0,E.jsx)(`input`,{autoFocus:!0,className:`aero-field`,value:r.subject,onChange:e=>i({...r,subject:e.target.value})})}),
    ZX(`div`,{className:`zx-row`,style:{"--zx-cols":2}},
      ZField({label:`Date`,children:(0,E.jsx)(`input`,{type:`date`,className:`aero-field`,value:r.date,onChange:e=>i({...r,date:e.target.value})})}),
      ZField({label:`Time`,children:(0,E.jsx)(`input`,{type:`time`,className:`aero-field`,value:r.time,onChange:e=>i({...r,time:e.target.value})})}),
      ZField({label:`Room`,children:(0,E.jsx)(`input`,{className:`aero-field`,value:r.room??``,onChange:e=>i({...r,room:e.target.value})})}),
      ZField({label:`Priority`,children:(0,E.jsx)(`select`,{className:`aero-field`,value:r.priority,onChange:e=>i({...r,priority:e.target.value}),children:Object.keys(Si).map(e=>(0,E.jsx)(`option`,{value:e,children:Si[e]},e))})})),
    ZActions({onSave:save,onCancel:t}))}

function ZExerciseInline({splitId:e,ex:t,onClose:n}){let{dispatch:r}=H(),[i,o]=(0,T.useState)(t),save=()=>{if(!i.name.trim())return a.error(`Give the exercise a name.`);r({type:`upsertExercise`,splitId:e,exercise:{...i,name:i.name.trim(),muscle:i.muscle.trim()||`Full body`,sets:Math.max(1,Number(i.sets)||1),minutes:Math.max(1,Number(i.minutes)||1)}});a.success(`Exercise updated`);n()},k=zKeys(save,n);
  return ZX(`div`,{className:`flex flex-1 flex-col gap-1.5 p-2.5`},ZX(`div`,{className:`zx-form`,onKeyDown:k},
    ZField({label:`Exercise`,children:(0,E.jsx)(`input`,{autoFocus:!0,className:`aero-field`,value:i.name,onChange:e=>o({...i,name:e.target.value})})}),
    ZField({label:`Muscle`,children:(0,E.jsx)(`input`,{className:`aero-field`,value:i.muscle,onChange:e=>o({...i,muscle:e.target.value})})}),
    ZX(`div`,{className:`zx-row`,style:{"--zx-cols":3}},
      ZField({label:`Sets`,children:(0,E.jsx)(`input`,{type:`number`,min:1,max:12,className:`aero-field`,value:i.sets,onChange:e=>o({...i,sets:e.target.value})})}),
      ZField({label:`Reps`,children:(0,E.jsx)(`input`,{className:`aero-field`,value:i.reps,onChange:e=>o({...i,reps:e.target.value})})}),
      ZField({label:`Min`,children:(0,E.jsx)(`input`,{type:`number`,min:1,max:120,className:`aero-field`,value:i.minutes,onChange:e=>o({...i,minutes:e.target.value})})})),
    ZActions({onSave:save,onCancel:n})))}

function ZGameInline({game:e,onClose:t}){let{dispatch:n}=H(),[r,i]=(0,T.useState)(e),save=()=>{if(!r.title.trim())return a.error(`Give it a title.`);n({type:`upsertGame`,game:{...r,title:r.title.trim(),details:(r.details||``).trim()||void 0}});a.success(`Updated “${r.title.trim()}”`);t()},k=zKeys(save,t),med=!!ZMEDIA[r.platform];
  return ZX(`div`,{className:`flex flex-1 flex-col gap-1.5 p-2.5`},ZX(`div`,{className:`zx-form`,onKeyDown:k},
    ZField({label:`Title`,children:(0,E.jsx)(`input`,{autoFocus:!0,className:`aero-field`,value:r.title,onChange:e=>i({...r,title:e.target.value})})}),
    ZField({label:`Details`,children:(0,E.jsx)(`input`,{className:`aero-field`,placeholder:med?`Year · genre · length`:`Notes`,value:r.details??``,onChange:e=>i({...r,details:e.target.value})})}),
    ZX(`div`,{className:`zx-row`,style:{"--zx-cols":2}},
      ZField({label:`Type`,children:(0,E.jsx)(`select`,{className:`aero-field`,value:r.platform,onChange:e=>i({...r,platform:e.target.value}),children:ki.map(e=>(0,E.jsx)(`option`,{children:e},e))})}),
      ZField({label:`Status`,children:(0,E.jsx)(`select`,{className:`aero-field`,value:r.status,onChange:e=>i({...r,status:e.target.value}),children:Object.keys(ji).map(e=>(0,E.jsx)(`option`,{value:e,children:ZMEDIA[r.platform]?{backlog:`Watchlist`,playing:`Watching`,beaten:`Finished ★`}[e]:ji[e].label},e))})})),
    ZField({label:`Session (hours)`,children:(0,E.jsx)(`select`,{className:`aero-field`,value:r.sessionHours,onChange:e=>i({...r,sessionHours:Number(e.target.value)}),children:[1,2,3,4].map(e=>(0,E.jsxs)(`option`,{value:e,children:[e,`h`]},e))})}),
    ZActions({onSave:save,onCancel:t})))}

function ZBlockEditor({id:e,dates:t,onClose:n}){let{state:r,dispatch:i}=H(),ent=r.entries.find(x=>x.id===e),[d,setD]=(0,T.useState)(ent);if(!ent||!d)return null;
  let col=t.indexOf(ent.date),row=Math.max(ent.start,6)-6+2,span=Math.max(1,ent.start+ent.duration-Math.max(ent.start,6)),maxH=Math.max(1,tn(r.entries,d.date,d.start,8,d.id)),right=col>=t.length-2,up=ent.start>=15;
  let save=()=>{if(!d.title.trim())return a.error(`Give the block a title.`);if(tn(r.entries,d.date,d.start,d.duration,d.id)<d.duration)return a.error(`That time overlaps another block.`);i({type:`updateEntry`,id:d.id,patch:{title:d.title.trim(),subtitle:d.subtitle||``,date:d.date,start:d.start,duration:d.duration,done:!!d.done}});a.success(`Block updated`);n()},k=zKeys(save,n);
  return ZX(`div`,{style:{gridRow:`${row} / span ${span}`,gridColumn:col+2,position:`relative`,zIndex:60,pointerEvents:`none`}},
    ZX(`div`,{className:`zx-pop`,style:{pointerEvents:`auto`,[up?`bottom`:`top`]:0,[right?`right`:`left`]:0},onKeyDown:k,onClick:e=>e.stopPropagation()},
      ZX(`div`,{className:`zx-form`},
        ZField({label:`Title`,children:(0,E.jsx)(`input`,{autoFocus:!0,className:`aero-field`,value:d.title,onChange:e=>setD({...d,title:e.target.value})})}),
        ZField({label:`Details`,children:(0,E.jsx)(`input`,{className:`aero-field`,value:d.subtitle??``,onChange:e=>setD({...d,subtitle:e.target.value})})}),
        ZX(`div`,{className:`zx-row`,style:{"--zx-cols":3}},
          ZField({label:`Day`,children:(0,E.jsx)(`select`,{className:`aero-field`,value:d.date,onChange:e=>setD({...d,date:e.target.value}),children:t.map(e=>(0,E.jsxs)(`option`,{value:e,children:[Ht(new Date(e+`T00:00`)),` `,e.slice(8)]},e))})}),
          ZField({label:`Start`,children:(0,E.jsx)(`select`,{className:`aero-field`,value:d.start,onChange:e=>setD({...d,start:Number(e.target.value)}),children:pi.map(e=>(0,E.jsx)(`option`,{value:e,children:B(e)},e))})}),
          ZField({label:`Hours`,children:(0,E.jsx)(`select`,{className:`aero-field`,value:d.duration,onChange:e=>setD({...d,duration:Number(e.target.value)}),children:Array.from({length:Math.max(maxH,d.duration)},(e,t)=>t+1).map(e=>(0,E.jsxs)(`option`,{value:e,children:[e,`h`]},e))})})),
        ZX(`label`,{className:`flex items-center gap-2 text-xs font-bold`},(0,E.jsx)(`input`,{type:`checkbox`,className:`size-4 accent-[var(--electric)]`,checked:!!d.done,onChange:e=>setD({...d,done:e.target.checked})}),`Completed`),
        ZActions({onSave:save,onCancel:n,extra:ZX(`button`,{type:`button`,className:`aero-btn is-silver !py-1 !text-[0.7rem] !text-[#b8321a] mr-auto`,onClick:()=>{i({type:`removeEntry`,id:d.id});n()}},`Remove`)}))))}
