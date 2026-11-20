/* Muse prototype engine — extracted from index.html */
let museInited=false;
export function resetMuseInit(){museInited=false;}
export function initMuseDemo() {
if(museInited)return;
const root=document.querySelector('.muse-app');
if(!root||!root.querySelector('#vp'))return;
museInited=true;
/* ================= helpers ================= */
const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DAY=864e5;
const dayStart=t=>{const d=new Date(t);d.setHours(0,0,0,0);return d.getTime();};
const D=(n,h,m)=>{const d=new Date();d.setDate(d.getDate()-n);d.setHours(h,m,0,0);return d.getTime();};
const fmtDay=t=>new Date(t).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
const fmtTime=t=>new Date(t).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
function relDay(t){const d=Math.round((dayStart(Date.now())-dayStart(t))/DAY);if(d===0)return 'Today';if(d===1)return 'Yesterday';if(d<7)return fmtDay(t);return new Date(t).toLocaleDateString('en-GB',{day:'numeric',month:'short'});}
const I={
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19.5 9.5l-5.7 1.9L12 17l-1.8-5.6L4.5 9.5l5.7-1.9z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="#111"><path d="M7 4.5v15l13-7.5z"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  img:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  canvas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  open:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  chevL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  chevR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
};

/* ================= illustrations (simple SVG stand-ins for saved images) ================= */
let svgN=0;
function S(h,bg,inner,defs=''){return `<svg viewBox="0 0 300 ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${defs}</defs><rect width="300" height="${h}" fill="${bg}"/>${inner}</svg>`;}
const ART={
  sofa(a){const h=a.h,c=a.c,y=h-38,s=a.seats||2,w=s===3?244:212,x0=(300-w)/2,bh=a.low?48:66;
    let cu='';const cw=(w-48)/s;for(let i=0;i<s;i++)cu+=`<rect x="${x0+24+i*cw+2}" y="${y-56}" width="${cw-4}" height="26" rx="8" fill="${c}"/><rect x="${x0+24+i*cw+2}" y="${y-56}" width="${cw-4}" height="10" rx="5" fill="#fff" opacity=".07"/>`;
    return S(h,a.bg,`<ellipse cx="150" cy="${y+13}" rx="${w/2+8}" ry="7" fill="#000" opacity=".09"/>
    <rect x="${x0+16}" y="${y}" width="6" height="13" fill="#2a2a2a"/><rect x="${x0+w-22}" y="${y}" width="6" height="13" fill="#2a2a2a"/>
    <rect x="${x0+14}" y="${y-56-bh+14}" width="${w-28}" height="${bh}" rx="14" fill="${c}"/><rect x="${x0+14}" y="${y-56-bh+14}" width="${w-28}" height="${bh}" rx="14" fill="#000" opacity=".16"/>
    <rect x="${x0+6}" y="${y-36}" width="${w-12}" height="38" rx="10" fill="${c}"/>${cu}
    <rect x="${x0}" y="${y-62}" width="30" height="64" rx="12" fill="${c}"/><rect x="${x0+w-30}" y="${y-62}" width="30" height="64" rx="12" fill="${c}"/>
    <rect x="${x0}" y="${y-62}" width="30" height="12" rx="6" fill="#fff" opacity=".07"/><rect x="${x0+w-30}" y="${y-62}" width="30" height="12" rx="6" fill="#fff" opacity=".07"/>`);},
  chair(a){const h=a.h,id='p'+(++svgN);
    const defs=`<pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.4" fill="#fff" opacity=".4"/><circle cx="0" cy="0" r="1" fill="#000" opacity=".06"/></pattern>`;
    return S(h,a.bg,`<ellipse cx="150" cy="${h-36}" rx="92" ry="9" fill="#000" opacity=".12"/>
    <rect x="88" y="${h-196}" width="124" height="124" rx="62" fill="${a.c}"/><rect x="88" y="${h-196}" width="124" height="124" rx="62" fill="url(#${id})"/>
    <rect x="68" y="${h-112}" width="164" height="60" rx="30" fill="${a.c}"/><rect x="68" y="${h-112}" width="164" height="60" rx="30" fill="url(#${id})"/><rect x="68" y="${h-82}" width="164" height="30" rx="15" fill="#000" opacity=".06"/>
    <rect x="128" y="${h-55}" width="44" height="18" rx="4" fill="#3a3229"/>`,defs);},
  lounge(a){const h=a.h,c='#141414';
    return S(h,a.bg,`<rect x="0" y="${h-70}" width="300" height="70" fill="#000" opacity=".05"/><ellipse cx="150" cy="${h-50}" rx="110" ry="8" fill="#000" opacity=".12"/>
    <path d="M62 ${h-52} L80 ${h-110} M238 ${h-52} L220 ${h-110}" stroke="#6b4a33" stroke-width="7" stroke-linecap="round"/>
    <rect x="70" y="${h-118}" width="160" height="14" rx="5" fill="#6b4a33"/>
    <rect x="84" y="${h-200}" width="120" height="96" rx="20" fill="${c}" transform="rotate(-10 144 ${h-150})"/>
    <rect x="76" y="${h-142}" width="156" height="36" rx="14" fill="${c}"/>
    <rect x="80" y="${h-140}" width="148" height="9" rx="4.5" fill="#fff" opacity=".08"/>
    <rect x="96" y="${h-196}" width="40" height="80" rx="16" fill="#fff" opacity=".05" transform="rotate(-10 144 ${h-150})"/>
    <rect x="236" y="${h-185}" width="3" height="132" fill="#2a2a2a"/><circle cx="237.5" cy="${h-190}" r="13" fill="#E9E2D3"/>`);},
  lamp(a){const h=a.h,id='g'+(++svgN);
    return S(h,a.bg,`<circle cx="205" cy="92" r="96" fill="url(#${id})"/>
    <ellipse cx="85" cy="${h-28}" rx="34" ry="7" fill="#1a1a1a"/>
    <path d="M85 ${h-30} L85 130 Q85 52 180 62" stroke="#1a1a1a" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M166 76 Q205 22 244 76 Z" fill="#1a1a1a"/><ellipse cx="205" cy="76" rx="38" ry="4.5" fill="#FFE3A0"/>`,
    `<radialGradient id="${id}"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".85"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></radialGradient>`);},
  pendant(a){const h=a.h,id='g'+(++svgN),cy=h*0.52;
    let ribs='';for(let i=-3;i<=3;i++){ribs+=`<ellipse cx="150" cy="${cy+i*15}" rx="${Math.sqrt(64*64-(i*15)**2)}" ry="5" fill="none" stroke="#D9D1C4" stroke-width="1.2"/>`;}
    return S(h,a.bg,`<circle cx="150" cy="${cy}" r="110" fill="url(#${id})"/><line x1="150" y1="0" x2="150" y2="${cy-64}" stroke="#333" stroke-width="2"/>
    <circle cx="150" cy="${cy}" r="64" fill="#FAF7F1"/>${ribs}`,
    `<radialGradient id="${id}"><stop offset="0" stop-color="#FFF4D8" stop-opacity=".9"/><stop offset="1" stop-color="#FFF4D8" stop-opacity="0"/></radialGradient>`);},
  sideboard(a){const h=a.h,y=h-60;
    return S(h,a.bg,`<ellipse cx="150" cy="${y+16}" rx="118" ry="6" fill="#000" opacity=".1"/>
    <rect x="40" y="${y-88}" width="220" height="88" rx="4" fill="#6B4A33"/><rect x="40" y="${y-88}" width="220" height="6" fill="#000" opacity=".12"/>
    <line x1="113" y1="${y-80}" x2="113" y2="${y-6}" stroke="#4F3523" stroke-width="2"/><line x1="187" y1="${y-80}" x2="187" y2="${y-6}" stroke="#4F3523" stroke-width="2"/>
    <rect x="72" y="${y-46}" width="12" height="3" rx="1.5" fill="#C9A57A"/><rect x="144" y="${y-46}" width="12" height="3" rx="1.5" fill="#C9A57A"/><rect x="216" y="${y-46}" width="12" height="3" rx="1.5" fill="#C9A57A"/>
    <path d="M56 ${y} l-4 16 M244 ${y} l4 16" stroke="#3d2a1c" stroke-width="5" stroke-linecap="round"/>
    <path d="M80 ${y-88} q-10 -30 6 -46 q16 16 6 46z" fill="#ECE6DC"/><rect x="196" y="${y-100}" width="44" height="6" fill="#B9B2A7"/><rect x="200" y="${y-108}" width="38" height="8" fill="#2B2B2B"/><rect x="198" y="${y-114}" width="40" height="6" fill="#C66B4A"/>`);},
  plant(a){const h=a.h,b=h-118;
    const L=[[-58,110,'#4E7A4A'],[-30,140,'#5F8F58'],[-6,160,'#3F6A3D'],[22,138,'#5F8F58'],[48,118,'#4E7A4A'],[-80,80,'#6A9A60'],[74,86,'#6A9A60']];
    const lv=L.map(([r,l,c])=>`<ellipse cx="150" cy="${b-l/2}" rx="${l*0.24}" ry="${l/2}" fill="${c}" transform="rotate(${r} 150 ${b})"/>`).join('');
    return S(h,a.bg,`<ellipse cx="150" cy="${h-38}" rx="54" ry="6" fill="#000" opacity=".1"/>${lv}
    <path d="M108 ${h-118} L192 ${h-118} L182 ${h-40} L118 ${h-40} Z" fill="#C98B62"/><rect x="104" y="${h-124}" width="92" height="14" rx="3" fill="#B97B54"/>`);},
  vase(a){const h=a.h,t=h-206;
    return S(h,a.bg,`<ellipse cx="150" cy="${h-38}" rx="58" ry="7" fill="#000" opacity=".12"/>
    <path d="M150 ${t} q-6 -40 -40 -70 M150 ${t} q10 -50 44 -64 M150 ${t-30} q-20 -10 -24 -30" stroke="#7a6650" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M132 ${t} L168 ${t} L166 ${t+16} Q214 ${t+64} 196 ${t+134} Q186 ${t+166} 150 ${t+166} Q114 ${t+166} 104 ${t+134} Q86 ${t+64} 134 ${t+16} Z" fill="#171717"/>
    <path d="M120 ${t+70} Q114 ${t+110} 126 ${t+140}" stroke="#fff" stroke-opacity=".14" stroke-width="7" fill="none" stroke-linecap="round"/>`);},
  table(a){const h=a.h,y=h-118;
    return S(h,a.bg,`<ellipse cx="150" cy="${h-34}" rx="120" ry="7" fill="#000" opacity=".1"/>
    <path d="M70 ${y+10} L60 ${h-36} L72 ${h-36} L84 ${y+10} Z M216 ${y+10} L228 ${h-36} L240 ${h-36} L230 ${y+10} Z" fill="#B48D61"/>
    <rect x="34" y="${y}" width="232" height="13" rx="3" fill="#CDA877"/><rect x="34" y="${y+9}" width="232" height="4" fill="#000" opacity=".1"/>
    <path d="M120 ${y} q4 -28 -4 -42 h20 q-8 14 -4 42z" fill="#F3EFE7"/>`);},
  palette(a){const h=a.h,cs=['#2B2A28','#6E6A63','#A8A29A','#D6CFC4','#EEEAE3'];
    return S(h,'#FFFFFF',cs.map((c,i)=>`<rect x="${i*60}" y="0" width="60" height="${h-34}" fill="${c}"/><text x="${i*60+8}" y="${h-13}" font-family="Geist,system-ui,sans-serif" font-size="10" fill="#6E6A63">${c}</text>`).join(''));},
  phone(a){const h=a.h,x=88,w=124;let rows='';
    for(let i=0;i<4;i++){const y=104+i*52;rows+=`<rect x="${x+12}" y="${y}" width="${w-24}" height="44" rx="10" fill="#222"/><rect x="${x+20}" y="${y+9}" width="26" height="26" rx="6" fill="${['#8FA2FF','#E8AE4C','#6FBF8B','#E07A6A'][i]}"/><rect x="${x+54}" y="${y+12}" width="${50-i*6}" height="6" rx="3" fill="#ddd"/><rect x="${x+54}" y="${y+24}" width="34" height="5" rx="2.5" fill="#666"/>`;}
    return S(h,a.bg,`<rect x="${x}" y="22" width="${w}" height="${h-44}" rx="22" fill="#0F0F10"/><rect x="${x+46}" y="30" width="32" height="7" rx="3.5" fill="#000"/>
    <rect x="${x+12}" y="56" width="62" height="10" rx="5" fill="#F1F1F1"/><rect x="${x+12}" y="74" width="40" height="6" rx="3" fill="#666"/>${rows}
    <rect x="${x+30}" y="${h-62}" width="${w-60}" height="20" rx="10" fill="#8FA2FF"/>`);},
  poster(a){const h=a.h,id='l'+(++svgN);
    return S(h,`url(#${id})`,`<circle cx="150" cy="${h*0.42}" r="92" fill="#fff" opacity=".28"/><circle cx="150" cy="${h*0.42}" r="56" fill="#fff" opacity=".35"/>
    <text x="24" y="${h-70}" font-family="Instrument Serif,Georgia,serif" font-size="58" fill="#2a1a10">Sunday</text>
    <text x="26" y="${h-42}" font-family="Geist,system-ui,sans-serif" font-size="12" letter-spacing="2" fill="#2a1a10">MARKET · 08:00 — 14:00</text>`,
    `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6C552"/><stop offset="1" stop-color="#F0703C"/></linearGradient>`);},
  joinery(a){const h=a.h;let g='';for(let i=0;i<14;i++)g+=`<line x1="${i*24-40}" y1="0" x2="${i*24+40}" y2="${h}" stroke="#000" stroke-opacity=".04" stroke-width="2"/>`;
    return S(h,a.bg,`${g}<path d="M60 ${h/2-24} h80 v14 h-20 v20 h20 v14 h-80z" fill="#9C7046"/><path d="M128 ${h/2-24} h112 v48 h-112 v-14 h-8 v-20 h8z" fill="#C08E5C" transform="translate(16 0)"/>
    <rect x="60" y="${h/2+24}" width="196" height="5" fill="#000" opacity=".1"/>`);},
  motion(a){const h=a.h;let c='';for(let i=0;i<7;i++){const t=i/6;const x=40+t*220,y=h*0.7-Math.sin(t*Math.PI)*h*0.42;c+=`<circle cx="${x}" cy="${y}" r="${6+t*12}" fill="#8095FF" opacity="${0.12+t*0.88}"/>`;}
    return S(h,a.bg,`<path d="M40 ${h*0.7} Q150 ${-h*0.12} 260 ${h*0.7}" stroke="#fff" stroke-opacity=".12" fill="none" stroke-dasharray="3 6"/>${c}`);},
  morning(a){const h=a.h;
    return S(h,a.bg,`<polygon points="70,30 150,30 260,${h} 120,${h}" fill="#FFF0C8" opacity=".75"/>
    <rect x="62" y="24" width="96" height="${h*0.52}" fill="none" stroke="#fff" stroke-width="6"/><line x1="110" y1="24" x2="110" y2="${24+h*0.52}" stroke="#fff" stroke-width="4"/>
    <rect x="0" y="${h-38}" width="300" height="38" fill="#C7B79D"/><rect x="196" y="${h-104}" width="58" height="66" rx="6" fill="#141414"/><rect x="190" y="${h-78}" width="70" height="20" rx="8" fill="#141414"/>`);}
};
const artCache={};
function mediaHTML(it){
  /* Prefer the real video file so Muse cards match the capture-page player */
  if(it.video){
    return `<video src="${it.video}" muted playsinline preload="metadata"></video>`;
  }
  if(it.img){
    return `<img src="${it.img}" alt="" loading="lazy" draggable="false">`;
  }
  if(!it.art)return '';
  return artCache[it.id]||(artCache[it.id]=ART[it.art.kind](it.art));
}
function artFor(it){return mediaHTML(it);}

/* ================= seed data ================= */
const LF=((new Date().getDay()+2)%7)||7; /* days since last Friday */
function seed(){
  /* Capture-page media (black-white / portfolio / blue / ui+interaction) stay OUT of seed
     so "Save to Muse" can demonstrate adding them fresh. */
  const items=[
    {id:'i3',type:'image',title:'EngagePro social suite',source:'behance.net',tags:['green','branding','social','mobile','bold'],savedAt:D(3,21,40),note:'',img:'/ux-pictures/cosmos_1209608251.webp'},
    {id:'i4',type:'article',title:'On designing for clarity',source:'clarity.journal',text:'Good UX design is not about making things look simple. It is about making complex things feel effortless.',tags:['ux','clarity','principle','minimalism'],savedAt:D(LF,9,30),note:'Same rule for Muse onboarding: one hero action, lots of air.'},
    {id:'i7',type:'image',title:'Oppo finance dashboard',source:'dribbble.com',tags:['dashboard','finance','serif','data','color'],savedAt:D(1,10,20),note:'Big numbers + color blocks. Candidate layout for Muse insights.',img:'/ux-pictures/portfolio-color.webp'},
    {id:'i9',type:'link',title:'Laws of UX · cognitive load',source:'lawsofux.com',tags:['ux','cognitive load','principle','reference'],savedAt:D(LF,14,5),note:'Bookmark for the clarity essay footnotes.'},
    {id:'i10',type:'article',title:'Onboarding that waits',source:'uxnotes.io',text:'The best onboarding shows up at the moment of need. A tooltip on day one is noise; the same tooltip at the first export is help.',tags:['ux','onboarding','timing'],savedAt:D(2,11,5),note:''},
    {id:'i11',type:'image',title:'Startup story templates',source:'behance.net',tags:['orange','social','templates','typography'],savedAt:D(4,15,30),note:'High contrast orange/black. Strong for short takeaway cards.',img:'/ux-pictures/red-black.webp'},
    {id:'i12',type:'video',title:'Green motion experiments',source:'youtube.com',duration:'0:32',tags:['motion','green','interaction','video'],savedAt:D(0,9,12),note:'',img:null,video:'/ux-pictures/interation-green.mp4'},
    {id:'i13',type:'article',title:'White space as a tool',source:'clarity.journal',text:'White space is not unfinished. It is the part of the interface that lets everything else breathe.',tags:['white space','clarity','layout','quote'],savedAt:D(LF,18,20),note:'Use this line in the capture intro.'},
    {id:'i15',type:'article',title:'Less is a decision',source:'clarity.journal',text:'Simplicity is not the absence of design. It is the result of thoughtful decisions about what to remove.',tags:['simplicity','ux','decision','quote'],savedAt:D(7,20,0),note:''}
  ];
  return {v:7,items,current:'all',newCol:null,canvases:[
    {id:'all',name:'All Inspiration',system:true,pos:{},view:null,savedAt:D(0,9,13),dirty:false,stickies:{},layout:{ids:items.map(i=>i.id),cols:4}},
    {id:'c1',name:'Clarity moodboard',pos:{},view:null,savedAt:D(LF,14,40),dirty:false,stickies:{},layout:{ids:['i4','i13','i7','i11','i9','i3'],cols:3}},
    {id:'c2',name:'Onboarding references',pos:{},view:null,savedAt:D(2,11,20),dirty:false,stickies:{},layout:{ids:['i10','i12','i15'],cols:3}}
  ]};
}

/* ================= state & persistence ================= */
const KEY='muse-demo-v7';
let state, selected=new Set();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.v===7)return s;}catch(e){}return null;}
const item=id=>state.items.find(i=>i.id===id);
const canvas=id=>state.canvases.find(c=>c.id===(id||state.current));
function ensureStickies(c){if(c&&!c.stickies)c.stickies={};return c?c.stickies:{};}
function ensureInk(c){if(c&&!Array.isArray(c.ink))c.ink=[];return c?c.ink:[];}

const STICKY_PALETTE=[
  {bg:'#F7F0DD',ink:'#8A7040'},
  {bg:'#F5D6D0',ink:'#8F5A55'},
  {bg:'#D6E8F0',ink:'#4A6B7C'},
  {bg:'#D9ECD8',ink:'#4F7350'},
  {bg:'#EDE0F0',ink:'#6E5578'}
];
const STICKY_FONTS=[
  {id:'sans',label:'Sans',family:'var(--body)'},
  {id:'serif',label:'Serif',family:'Georgia,"Times New Roman",serif'},
  {id:'mono',label:'Mono',family:'ui-monospace,SFMono-Regular,Menlo,monospace'}
];
const STICKY_SIZES=[12,14,16,18];
let stickyStyle={color:'#F7F0DD',font:'sans',size:14};
const BRUSH_COLORS=['#2C2A27','#A67C52','#C45C4A','#4A6B7C','#EDEBE8'];
const BRUSH_SIZES=[2,4,8,14];
let brushStyle={color:'#2C2A27',width:4};
let inkTool=null; /* null | 'draw' | 'erase' */
let inkStroke=null;
let ignoreToolCloseUntil=0;
function armFilePick(){ignoreToolCloseUntil=Date.now()+1000;}
function stickyInk(bg){return(STICKY_PALETTE.find(p=>p.bg===bg)||STICKY_PALETTE[0]).ink;}
function stickyFontFamily(id){return(STICKY_FONTS.find(f=>f.id===id)||STICKY_FONTS[0]).family;}
function clientToWorld(cx,cy){const r=vp.getBoundingClientRect(),v=V();return{x:(cx-r.left-v.x)/v.z,y:(cy-r.top-v.y)/v.z};}
function pointsToPath(pts){return pts.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');}
function readFileAsDataURL(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});}

/* ================= card rendering ================= */
function cardHTML(it,pos){
  const noted=!!(it.note||'').trim();
  let body='';
  if(it.type==='image'||it.type==='video'){
    body=`<div class="media">${artFor(it)}${it.type==='video'?`<span class="play">${I.play}</span><span class="dur">${esc(it.duration)}</span>`:''}</div>`;
  }else if(it.type==='article'){
    body=`<blockquote class="quote">${esc(it.text)}</blockquote>`;
  }else{
    body=`<div class="linkbox"><span class="fav">${esc(it.source[0].toUpperCase())}</span><div><div class="lt">${esc(it.title)}</div><div class="lu">${I.link}${esc(it.source)}</div></div></div>`;
  }
  const title=it.type==='link'?'':`<div class="mt">${esc(it.title)}</div>`;
  const tags=it.tags.slice(0,4).map(t=>`<span class="tag" data-t="${esc(t)}">${esc(t)}</span>`).join('');
  return `<div class="card t-${it.type}${noted?' noted':''}${it.isNew?' is-new':''}" data-id="${it.id}" style="left:${pos.x}px;top:${pos.y}px">
    ${body}
    <div class="meta">${title}<div class="ms"><span>${esc(it.type==='link'?'Link':it.source)}</span><span>${relDay(it.savedAt)}</span></div><div class="tags">${tags}</div></div>
    ${noted?`<div class="note"><div class="nl">${I.pen}NOTE</div><p>${esc(it.note)}</p></div>`:`<button class="add-note" type="button">${I.pen}Add note</button>`}
  </div>`;
}

function measureHeights(ids){
  const m=document.createElement('div');m.className='measure';
  m.innerHTML=ids.map(id=>cardHTML(item(id),{x:0,y:0})).join('');
  document.body.appendChild(m);
  const out={};$$('.card',m).forEach(el=>out[el.dataset.id]=el.offsetHeight);
  m.remove();return out;
}
function masonry(c,ids,cols,x0=0,y0=0){
  const hs=measureHeights(ids),colH=Array(cols).fill(y0);
  ids.forEach(id=>{const k=colH.indexOf(Math.min(...colH));c.pos[id]={x:x0+k*(240+40),y:colH[k]};colH[k]+=(hs[id]||260)+40;});
}
function runPendingLayouts(){
  state.canvases.forEach(c=>{if(c.layout){masonry(c,c.layout.ids,c.layout.cols);delete c.layout;}});
}

/* ================= canvas engine ================= */
const vp=$('#vp'),world=$('#world');
function V(){const c=canvas();if(!c.view)c.view={x:0,y:0,z:1};return c.view;}
function applyView(){const v=V();world.style.transform=`translate(${v.x}px,${v.y}px) scale(${v.z})`;vp.style.backgroundPosition=`${v.x}px ${v.y}px`;vp.style.backgroundSize=`${24*v.z}px ${24*v.z}px`;$('#zLabel').textContent=Math.round(v.z*100)+'%';}
let zTop=10;
/* Bind step switching early so tabs always respond, even if later demo code throws */
let switchView=(v)=>{
  $$('.steps button').forEach(b=>b.classList.toggle('on',b.dataset.view===v));
  $('#view-capture')?.classList.toggle('on',v==='capture');
  $('#view-muse')?.classList.toggle('on',v==='muse');
};
$$('.steps button').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
function stickyHTML(id,s){
  const bg=s.color||'#F7F0DD',ink=stickyInk(bg),font=stickyFontFamily(s.font||'sans'),size=(s.size||14)+'px';
  /* single-quoted style so font-family commas/quotes don't break the attribute */
  return `<div class="sticky" data-sid="${id}" style='left:${s.x}px;top:${s.y}px;--sticky-bg:${bg};--sticky-ink:${ink};--sticky-font:${font};--sticky-size:${size}'>
    <div class="sticky-bar">
      <span>Sticky</span>
      <button type="button" class="sticky-del" data-del="${id}" aria-label="Delete sticky note">${I.x}</button>
    </div>
    <textarea class="sticky-text" data-sid="${id}" placeholder="Write an idea…" rows="5">${esc(s.text||'')}</textarea>
  </div>`;
}
function inkLayerHTML(c){
  ensureInk(c);
  return `<svg class="ink-layer" aria-hidden="true">${c.ink.map(s=>`<path d="${s.d}" stroke="${esc(s.color)}" stroke-width="${s.width}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</svg>`;
}
function exitStickyEdit(){
  $$('.sticky.editing',world).forEach(el=>{
    el.classList.remove('editing');
    const ta=el.querySelector('.sticky-text');
    if(ta)ta.blur();
  });
}
function enterStickyEdit(el){
  if(!el)return;
  exitStickyEdit();
  el.classList.add('editing');
  el.style.zIndex=++zTop;
  const ta=el.querySelector('.sticky-text');
  if(ta){ta.focus();const n=ta.value.length;try{ta.setSelectionRange(n,n);}catch(_){}}
}
function bindStickies(){
  $$('.sticky-text',world).forEach(ta=>{
    ta.oninput=()=>{
      const c=canvas(),sid=ta.dataset.sid;
      ensureStickies(c);
      if(!c.stickies[sid])return;
      c.stickies[sid].text=ta.value;markDirty();
    };
    ta.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();exitStickyEdit();}};
  });
  $$('.sticky-del',world).forEach(btn=>{
    btn.onpointerdown=e=>e.stopPropagation();
    btn.onclick=e=>{
      e.stopPropagation();
      const c=canvas(),sid=btn.dataset.del;
      ensureStickies(c);
      const note=c.stickies[sid];
      if(!note)return;
      if((note.text||'').trim()&&!confirm('Delete this sticky note?'))return;
      delete c.stickies[sid];markDirty();renderCanvas();
    };
  });
}
function addSticky(){
  const c=canvas();ensureStickies(c);
  const id='s'+Date.now().toString(36);
  const v=V();
  c.stickies[id]={
    x:Math.round((vp.clientWidth*0.45-v.x)/v.z),
    y:Math.round((vp.clientHeight*0.35-v.y)/v.z),
    text:'',
    color:stickyStyle.color,
    font:stickyStyle.font,
    size:stickyStyle.size
  };
  markDirty();renderCanvas();
  closeToolPops();
  setTimeout(()=>enterStickyEdit(stickyEl(id)),40);
}
function renderCanvas(){
  const c=canvas();ensureStickies(c);ensureInk(c);
  const cards=Object.keys(c.pos).filter(id=>item(id)).map(id=>cardHTML(item(id),c.pos[id])).join('');
  const notes=Object.entries(c.stickies).map(([id,s])=>stickyHTML(id,s)).join('');
  world.innerHTML=inkLayerHTML(c)+cards+notes;
  selected.forEach(id=>{const el=cardEl(id);if(el)el.classList.add('selected');});
  bindStickies();
  const empty=!c.system&&Object.keys(c.pos).length===0&&Object.keys(c.stickies).length===0&&!c.ink.length;
  $('#empty').classList.toggle('on',empty);
  $('#addCardsBtn').style.display=c.system?'none':'';
  renderPanel();renderSaveState();renderSelbar();applySearch(false);applyView();
}
const cardEl=id=>world.querySelector(`.card[data-id="${id}"]`);
const stickyEl=id=>world.querySelector(`.sticky[data-sid="${id}"]`);
function rerenderCard(id){const c=canvas(),el=cardEl(id);if(!el||!c.pos[id])return;const tmp=document.createElement('div');tmp.innerHTML=cardHTML(item(id),c.pos[id]);const n=tmp.firstElementChild;n.style.zIndex=el.style.zIndex;if(el.classList.contains('selected'))n.classList.add('selected');el.replaceWith(n);applySearch(false);}

function bounds(ids){
  const c=canvas();let x1=Infinity,y1=Infinity,x2=-Infinity,y2=-Infinity;
  ids.forEach(id=>{const p=c.pos[id];if(!p)return;const el=cardEl(id);const h=el?el.offsetHeight:260;x1=Math.min(x1,p.x);y1=Math.min(y1,p.y);x2=Math.max(x2,p.x+240);y2=Math.max(y2,p.y+h);});
  return x1===Infinity?null:{x1,y1,x2,y2};
}
function fitTo(ids,maxZ=1){
  const b=bounds(ids||Object.keys(canvas().pos));const v=V();const W=vp.clientWidth,H=vp.clientHeight;
  if(!b||!W){v.x=W/2-120;v.y=120;v.z=1;applyView();return;}
  const padL=260,padT=80,padR=60,padB=70;
  const z=Math.max(.2,Math.min(maxZ,(W-padL-padR)/(b.x2-b.x1),(H-padT-padB)/(b.y2-b.y1)));
  v.z=z;v.x=padL+((W-padL-padR)-(b.x2-b.x1)*z)/2-b.x1*z;v.y=padT+((H-padT-padB)-(b.y2-b.y1)*z)/2-b.y1*z;
  if((b.y2-b.y1)*z>H-padT-padB)v.y=padT-b.y1*z;
  applyView();
}
function zoomAt(f,px,py){const v=V();const nz=Math.max(.2,Math.min(2.5,v.z*f));const wx=(px-v.x)/v.z,wy=(py-v.y)/v.z;v.z=nz;v.x=px-wx*nz;v.y=py-wy*nz;applyView();}

let drag=null;
function capturePtr(id){
  try{vp.setPointerCapture(id);}catch(_){}
}
vp.addEventListener('pointerdown',e=>{
  if(e.button!==0)return;
  if(e.target.closest('.floating,.side,.add-note,.sticky-del,.muse-pop'))return;
  hideMenus();
  const sticky=e.target.closest('.sticky');
  const card=e.target.closest('.card');
  if(inkTool&&!sticky&&!card){
    exitStickyEdit();
    const w=clientToWorld(e.clientX,e.clientY);
    if(inkTool==='erase'){
      drag={kind:'erase',sx:e.clientX,sy:e.clientY,moved:false};
      if(eraseAt(w.x,w.y)){drag.moved=true;renderCanvas();}
    }else{
      inkStroke={color:brushStyle.color,width:brushStyle.width,pts:[{x:w.x,y:w.y}]};
      drag={kind:'ink',sx:e.clientX,sy:e.clientY,moved:false};
    }
    capturePtr(e.pointerId);
    e.preventDefault();
    return;
  }
  if(sticky){
    const sid=sticky.dataset.sid,c=canvas();ensureStickies(c);
    const s=c.stickies[sid];if(!s)return;
    // Editing: text area keeps caret/selection; drag from the bar (or anywhere when not editing)
    if(sticky.classList.contains('editing')&&e.target.closest('.sticky-text'))return;
    sticky.style.zIndex=++zTop;
    sticky.classList.remove('editing');
    const ta=sticky.querySelector('.sticky-text');
    if(ta)ta.blur();
    drag={kind:'sticky',id:sid,sx:e.clientX,sy:e.clientY,moved:false,ox:s.x,oy:s.y,el:sticky};
    capturePtr(e.pointerId);
    e.preventDefault();
  }else if(card){
    exitStickyEdit();
    const id=card.dataset.id,c=canvas();
    const group=selected.has(id)?[...selected]:[id];
    card.style.zIndex=++zTop;
    drag={kind:'card',id,sx:e.clientX,sy:e.clientY,moved:false,shift:e.shiftKey||e.metaKey||e.ctrlKey,start:group.map(g=>({id:g,x:c.pos[g].x,y:c.pos[g].y,el:cardEl(g)}))};
    capturePtr(e.pointerId);
  }else{
    exitStickyEdit();
    const v=V();drag={kind:'pan',sx:e.clientX,sy:e.clientY,ox:v.x,oy:v.y,moved:false};
    capturePtr(e.pointerId);
  }
});
function eraseAt(wx,wy){
  const c=canvas(),ink=ensureInk(c),rad=Math.max(14,brushStyle.width*5),r2=rad*rad;
  const next=ink.filter(s=>{
    const pts=s.pts;if(!pts||!pts.length)return true;
    return !pts.some(p=>{const dx=p.x-wx,dy=p.y-wy;return dx*dx+dy*dy<=r2;});
  });
  if(next.length===ink.length)return false;
  c.ink=next;markDirty(c);return true;
}
vp.addEventListener('pointermove',e=>{
  if(!drag)return;
  if(drag.kind==='erase'){
    const w=clientToWorld(e.clientX,e.clientY);
    if(eraseAt(w.x,w.y)){drag.moved=true;renderCanvas();}
    return;
  }
  if(drag.kind==='ink'){
    if(!inkStroke)return;
    const w=clientToWorld(e.clientX,e.clientY);
    inkStroke.pts.push({x:w.x,y:w.y});
    drag.moved=true;
    let svg=world.querySelector('.ink-layer');
    if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('ink-layer');svg.setAttribute('aria-hidden','true');world.prepend(svg);}
    let live=svg.querySelector('.ink-live');
    if(!live){
      live=document.createElementNS('http://www.w3.org/2000/svg','path');
      live.classList.add('ink-live');
      live.setAttribute('fill','none');
      live.setAttribute('stroke-linecap','round');
      live.setAttribute('stroke-linejoin','round');
      svg.appendChild(live);
    }
    live.setAttribute('stroke',inkStroke.color);
    live.setAttribute('stroke-width',String(inkStroke.width));
    live.setAttribute('d',pointsToPath(inkStroke.pts));
    return;
  }
  const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;
  if(!drag.moved&&Math.hypot(dx,dy)<4)return;
  if(!drag.moved){
    drag.moved=true;
    if(drag.kind==='card')drag.start.forEach(s=>s.el&&s.el.classList.add('dragging'));
    else if(drag.kind==='sticky')drag.el&&drag.el.classList.add('dragging');
    else vp.classList.add('panning');
  }
  if(drag.kind==='card'){const z=V().z,c=canvas();drag.start.forEach(s=>{c.pos[s.id]={x:Math.round(s.x+dx/z),y:Math.round(s.y+dy/z)};if(s.el){s.el.style.left=c.pos[s.id].x+'px';s.el.style.top=c.pos[s.id].y+'px';}});}
  else if(drag.kind==='sticky'){
    const z=V().z,c=canvas();ensureStickies(c);
    const s=c.stickies[drag.id];if(!s)return;
    s.x=Math.round(drag.ox+dx/z);s.y=Math.round(drag.oy+dy/z);
    if(drag.el){drag.el.style.left=s.x+'px';drag.el.style.top=s.y+'px';}
  }
  else{const v=V();v.x=drag.ox+dx;v.y=drag.oy+dy;applyView();}
});
function endDrag(){
  if(!drag)return;const d=drag;drag=null;vp.classList.remove('panning');
  if(d.kind==='erase'){return;}
  if(d.kind==='ink'){
    if(inkStroke&&inkStroke.pts.length>1){
      ensureInk(canvas()).push({d:pointsToPath(inkStroke.pts),pts:inkStroke.pts.slice(),color:inkStroke.color,width:inkStroke.width});
      markDirty();
    }
    inkStroke=null;
    renderCanvas();
    return;
  }
  if(d.kind==='card'){
    d.start.forEach(s=>s.el&&s.el.classList.remove('dragging'));
    if(d.moved){markDirty();}
    else if(d.shift){toggleSelect(d.id);}
    else{openDetail(d.id);}
  }else if(d.kind==='sticky'){
    if(d.el)d.el.classList.remove('dragging');
    if(d.moved)markDirty();
    else enterStickyEdit(d.el);
  }else if(!d.moved){clearSelection();closeSide();}
}
vp.addEventListener('pointerup',endDrag);vp.addEventListener('pointercancel',endDrag);
vp.addEventListener('wheel',e=>{
  if(e.target.closest('.side,.floating,.sticky-text'))return;
  e.preventDefault();
  const r=vp.getBoundingClientRect();
  if(e.ctrlKey||e.metaKey){zoomAt(Math.exp(-e.deltaY*0.01),e.clientX-r.left,e.clientY-r.top);}
  else{const v=V();v.x-=e.deltaX;v.y-=e.deltaY;applyView();}
},{passive:false});
vp.addEventListener('click',e=>{const b=e.target.closest('.add-note');if(b){openDetail(b.closest('.card').dataset.id,true);}});
$('#zIn').onclick=()=>zoomAt(1.2,vp.clientWidth/2,vp.clientHeight/2);
$('#zOut').onclick=()=>zoomAt(1/1.2,vp.clientWidth/2,vp.clientHeight/2);
$('#zFit').onclick=()=>fitTo();

/* ================= bottom tool dock ================= */
function closeToolPops(){
  ['stickyPop','cardPop'].forEach(id=>{const el=$('#'+id);if(el)el.hidden=true;});
  if(inkTool!=='draw'){const bp=$('#brushPop');if(bp)bp.hidden=true;}
  if(inkTool!=='erase'){const ep=$('#erasePop');if(ep)ep.hidden=true;}
  ['addStickyBtn','newCardBtn'].forEach(id=>{
    const b=$('#'+id);if(b)b.setAttribute('aria-expanded','false');
  });
}
function openToolPop(popId,btnId){
  const pop=$('#'+popId),btn=$('#'+btnId);
  const opening=pop.hidden;
  closeToolPops();
  if(inkTool==='draw'){const bp=$('#brushPop');if(bp)bp.hidden=false;}
  if(inkTool==='erase'){const ep=$('#erasePop');if(ep)ep.hidden=false;}
  if(!opening)return;
  if(popId!=='brushPop'&&popId!=='erasePop')setInkTool(null);
  pop.hidden=false;
  if(btn)btn.setAttribute('aria-expanded','true');
}
function setInkTool(tool){
  inkTool=tool||null;
  vp.classList.toggle('drawing',inkTool==='draw');
  vp.classList.toggle('erasing',inkTool==='erase');
  const brush=$('#brushBtn'),erase=$('#eraseBtn');
  if(brush)brush.setAttribute('aria-pressed',inkTool==='draw'?'true':'false');
  if(erase)erase.setAttribute('aria-pressed',inkTool==='erase'?'true':'false');
  const bp=$('#brushPop'),ep=$('#erasePop');
  if(bp)bp.hidden=inkTool!=='draw';
  if(ep)ep.hidden=inkTool!=='erase';
  if(inkTool){exitStickyEdit();clearSelection();closeSide();}
}
function renderStickyPop(){
  const colors=$('#stickyColors'),fonts=$('#stickyFonts'),sizes=$('#stickySizes');
  if(!colors)return;
  colors.innerHTML=STICKY_PALETTE.map(p=>`<button type="button" class="swatch${stickyStyle.color===p.bg?' on':''}" data-bg="${p.bg}" style="background:${p.bg}" aria-label="Sticky color ${p.bg}"></button>`).join('');
  fonts.innerHTML=STICKY_FONTS.map(f=>`<button type="button" class="chip-opt${stickyStyle.font===f.id?' on':''}" data-font="${f.id}" style="font-family:${f.family}">${f.label}</button>`).join('');
  sizes.innerHTML=STICKY_SIZES.map(n=>`<button type="button" class="chip-opt${stickyStyle.size===n?' on':''}" data-size="${n}">${n}</button>`).join('');
  $$('[data-bg]',colors).forEach(b=>b.onclick=()=>{stickyStyle.color=b.dataset.bg;renderStickyPop();});
  $$('[data-font]',fonts).forEach(b=>b.onclick=()=>{stickyStyle.font=b.dataset.font;renderStickyPop();});
  $$('[data-size]',sizes).forEach(b=>b.onclick=()=>{stickyStyle.size=+b.dataset.size;renderStickyPop();});
}
function renderBrushPop(){
  const colors=$('#brushColors'),sizes=$('#brushSizes');
  if(!colors)return;
  colors.innerHTML=BRUSH_COLORS.map(c=>`<button type="button" class="swatch${brushStyle.color===c?' on':''}" data-ink="${c}" style="background:${c}" aria-label="Ink ${c}"></button>`).join('');
  sizes.innerHTML=BRUSH_SIZES.map(n=>`<button type="button" class="chip-opt${brushStyle.width===n?' on':''}" data-bw="${n}">${n}px</button>`).join('');
  $$('[data-ink]',colors).forEach(b=>b.onclick=()=>{brushStyle.color=b.dataset.ink;renderBrushPop();});
  $$('[data-bw]',sizes).forEach(b=>b.onclick=()=>{brushStyle.width=+b.dataset.bw;renderBrushPop();});
}
function setCardTab(tab){
  $$('.tool-tab').forEach(b=>{const on=b.dataset.cardTab===tab;b.classList.toggle('on',on);b.setAttribute('aria-selected',on?'true':'false');});
  $$('.card-tab-pane').forEach(p=>p.classList.toggle('on',p.dataset.pane===tab));
}
function showUploadPreview(dropId,previewId,file){
  const drop=$('#'+dropId),preview=$('#'+previewId);
  if(!drop||!file)return;
  const url=URL.createObjectURL(file);
  drop.classList.add('has-file');
  const media=file.type.startsWith('video')
    ?`<video src="${url}" muted playsinline></video>`
    :`<img src="${url}" alt="">`;
  drop.insertAdjacentHTML('beforeend',media);
  if(preview){preview.hidden=true;preview.innerHTML='';}
}
function clearUploadPreview(dropId,inputId){
  const drop=$('#'+dropId),input=$('#'+inputId);
  if(drop){drop.classList.remove('has-file');$$('img,video',drop).forEach(el=>el.remove());}
  if(input)input.value='';
}
function bindUpload(inputId,dropId,previewId,kind){
  const input=$('#'+inputId),drop=$('#'+dropId);
  if(!input||!drop)return;
  drop.addEventListener('click',armFilePick);
  input.addEventListener('click',armFilePick);
  input.onchange=()=>{
    const file=input.files?.[0];
    if(!file)return;
    $$('img,video',drop).forEach(el=>el.remove());
    showUploadPreview(dropId,previewId,file);
    /* same flow as Save from the web — open Muse save sheet after pick */
    beginCreatedSave(kind,file).catch(()=>toast('Could not open that file'));
  };
  drop.addEventListener('dragover',e=>{e.preventDefault();drop.style.borderColor='var(--accent)';});
  drop.addEventListener('dragleave',()=>{drop.style.borderColor='';});
  drop.addEventListener('drop',e=>{
    e.preventDefault();drop.style.borderColor='';
    const file=e.dataTransfer?.files?.[0];
    if(!file)return;
    if(kind==='photo'&&!file.type.startsWith('image/')){toast('Please drop an image');return;}
    if(kind==='video'&&!file.type.startsWith('video/')){toast('Please drop a video');return;}
    const dt=new DataTransfer();dt.items.add(file);input.files=dt.files;
    input.dispatchEvent(new Event('change'));
  });
}
async function beginCreatedSave(kind,file){
  const id='n'+Date.now().toString(36);
  let it,finalTags;
  if(kind==='photo'){
    const url=await readFileAsDataURL(file);
    finalTags=['upload','photo','image'];
    it={id,type:'image',title:file.name.replace(/\.[^.]+$/,'')||'Uploaded photo',source:'uploaded',tags:[],savedAt:Date.now(),note:'',img:url,isNew:true};
  }else if(kind==='video'){
    const url=URL.createObjectURL(file);
    finalTags=['upload','video'];
    it={id,type:'video',title:file.name.replace(/\.[^.]+$/,'')||'Uploaded video',source:'uploaded',tags:[],savedAt:Date.now(),note:'',img:null,video:url,duration:'—',isNew:true};
  }else{
    return;
  }
  closeToolPops();
  clearUploadPreview(kind==='photo'?'photoDrop':'videoDrop',kind==='photo'?'photoFile':'videoFile');
  openSaveSheet(it,finalTags,{mount:'#musePop',sourceLabel:'uploaded'});
}
function createTextInspiration(){
  const title=$('#cardTitle').value.trim()||'Untitled note';
  const text=$('#cardBody').value.trim();
  if(!text){toast('Write some text first');return;}
  const id='n'+Date.now().toString(36);
  const it={id,type:'article',title,source:'written',text,tags:[],savedAt:Date.now(),note:'',isNew:true};
  const finalTags=tagsForText(text);
  $('#cardTitle').value='';$('#cardBody').value='';
  closeToolPops();
  openSaveSheet(it,finalTags,{mount:'#musePop',sourceLabel:'written'});
}
$('#addStickyBtn').onclick=()=>{setInkTool(null);renderStickyPop();openToolPop('stickyPop','addStickyBtn');};
$('#stickyPlace').onclick=addSticky;
$('#newCardBtn').onclick=()=>{setInkTool(null);setCardTab($$('.tool-tab.on')[0]?.dataset.cardTab||'photo');openToolPop('cardPop','newCardBtn');};
$$('.tool-tab').forEach(b=>b.onclick=()=>setCardTab(b.dataset.cardTab));
$('#cardCreate').onclick=()=>{
  const tab=$$('.tool-tab.on')[0]?.dataset.cardTab||'photo';
  if(tab==='text')createTextInspiration();
  else if(tab==='photo'){const f=$('#photoFile').files?.[0];if(!f){toast('Choose a photo first');return;}beginCreatedSave('photo',f).catch(()=>toast('Could not open that file'));}
  else{const f=$('#videoFile').files?.[0];if(!f){toast('Choose a video first');return;}beginCreatedSave('video',f).catch(()=>toast('Could not open that file'));}
};
bindUpload('photoFile','photoDrop','photoPreview','photo');
bindUpload('videoFile','videoDrop','videoPreview','video');
$('#brushBtn').onclick=()=>{
  closeToolPops();
  const next=inkTool==='draw'?null:'draw';
  setInkTool(next);
  if(next==='draw')renderBrushPop();
};
$('#eraseBtn').onclick=()=>{
  const ep=$('#erasePop');
  const open=ep&&!ep.hidden;
  closeToolPops();
  setInkTool(null);
  if(open)return;
  if(ep)ep.hidden=false;
};
$('#eraseSelectedBtn').onclick=()=>{
  setInkTool('erase');
  const ep=$('#erasePop');if(ep)ep.hidden=false;
};
$('#brushClear').onclick=()=>{
  const c=canvas();ensureInk(c);if(!c.ink.length)return;
  c.ink=[];markDirty();renderCanvas();toast('All drawings cleared');
};
renderStickyPop();
renderBrushPop();

/* selection */
function toggleSelect(id){selected.has(id)?selected.delete(id):selected.add(id);const el=cardEl(id);if(el)el.classList.toggle('selected',selected.has(id));renderSelbar();}
function clearSelection(){selected.forEach(id=>{const el=cardEl(id);if(el)el.classList.remove('selected');});selected.clear();renderSelbar();}
function renderSelbar(){
  const sb=$('#selbar'),n=selected.size,c=canvas();
  sb.classList.toggle('on',n>0);if(!n)return;
  sb.innerHTML=`<span>${n} selected</span><span class="sep"></span><button type="button" id="sbAdd">Add to canvas…</button>${c.system?'':'<button type="button" id="sbRemove">Remove from canvas</button>'}<button type="button" id="sbClear">Clear</button>`;
  $('#sbAdd').onclick=e=>{const r=e.target.getBoundingClientRect();openPicker([...selected],r.left,r.top,'up');};
  if($('#sbRemove'))$('#sbRemove').onclick=()=>removeFromCanvas([...selected]);
  $('#sbClear').onclick=clearSelection;
}

/* save state */
function markDirty(c){c=c||canvas();c.dirty=true;persist();if(c===canvas())renderSaveState();renderPanel();}
function renderSaveState(){
  const c=canvas(),el=$('#saveState'),btn=$('#saveBtn');
  el.classList.toggle('dirty',!!c.dirty);
  el.textContent=c.dirty?'Unsaved changes':(c.savedAt?`Saved ${relDay(c.savedAt).toLowerCase()==='today'?'today':relDay(c.savedAt)}, ${fmtTime(c.savedAt)}`:'Not saved yet');
  btn.disabled=false;btn.className='btn '+(c.dirty?'primary':'');
  btn.innerHTML=c.dirty?'Save canvas':`${I.check}Saved`;
}
function saveCanvas(){const c=canvas();c.dirty=false;c.savedAt=Date.now();persist();renderSaveState();renderPanel();toast(`“${c.name}” saved`);}
$('#saveBtn').onclick=saveCanvas;

/* canvases panel */
let renaming=null;
let panelCollapsed=false;
function renderPanel(){
  const p=$('#cvPanel');
  const cur=canvas();
  p.classList.toggle('collapsed',panelCollapsed);
  if(panelCollapsed){
    p.innerHTML=`<button type="button" class="cv-collapsed" id="cvExpand" title="Show canvases">
      <span class="nm">${esc(cur.name)}</span>${cur.dirty?'<span class="dot" title="Unsaved changes"></span>':''}
      <span class="cv-toggle" aria-hidden="true">${I.chevR}</span>
    </button>`;
    $('#cvExpand').onclick=()=>{panelCollapsed=false;renderPanel();};
    return;
  }
  p.innerHTML=`<h3><span>Canvases</span><button type="button" class="cv-toggle" id="cvCollapse" title="Hide canvases" aria-label="Hide canvases">${I.chevL}</button></h3>`+state.canvases.map(c=>{
    const n=Object.keys(c.pos).length;
    if(renaming===c.id)return `<div class="cv-item on"><span class="sw"></span><input id="renameIn" value="${esc(c.name)}" aria-label="Canvas name"></div>`;
    return `<button type="button" class="cv-item${c.id===state.current?' on':''}" data-cv="${c.id}" title="${c.system?'All your saves':'Double-click to rename'}"><span class="sw"></span><span class="nm">${esc(c.name)}</span>${c.dirty?'<span class="dot" title="Unsaved changes"></span>':''}<span class="ct">${n}</span></button>`;
  }).join('')+`<button type="button" class="cv-item cv-new" id="newCv">${I.plus}<span class="nm">New blank canvas</span></button>`;
  $('#cvCollapse').onclick=()=>{panelCollapsed=true;renderPanel();};
  $$('[data-cv]',p).forEach(b=>{
    b.onclick=()=>switchCanvas(b.dataset.cv);
    b.ondblclick=()=>{const c=canvas(b.dataset.cv);if(c.system)return;renaming=c.id;renderPanel();};
  });
  $('#newCv').onclick=()=>{const c=newCanvas('Untitled canvas');switchCanvas(c.id);renaming=c.id;renderPanel();};
  const ri=$('#renameIn');
  if(ri){ri.focus();ri.select();const done=()=>{const c=canvas(renaming);if(c&&ri.value.trim())c.name=ri.value.trim();renaming=null;persist();renderPanel();renderSearchSummary();};ri.onkeydown=e=>{if(e.key==='Enter')done();if(e.key==='Escape'){renaming=null;renderPanel();}};ri.onblur=done;}
}
function newCanvas(name){const c={id:'c'+Date.now().toString(36),name,pos:{},view:null,savedAt:null,dirty:true,stickies:{},ink:[]};state.canvases.push(c);persist();return c;}
function switchCanvas(id){
  if(id===state.current){return;}
  state.current=id;clearSelection();closeSide();persist();renderCanvas();
  if(!canvas().viewSet){fitTo();canvas().viewSet=true;}
}

/* add/remove cards */
function addToCanvas(cid,ids,opts={}){
  const t=canvas(cid),src=canvas();const fresh=ids.filter(id=>!t.pos[id]);if(!fresh.length)return 0;
  const tIds=Object.keys(t.pos);let ox=0,oy=0;
  if(opts.at){ox=opts.at.x;oy=opts.at.y;}
  else if(tIds.length){let mx=-Infinity,my=Infinity;tIds.forEach(i=>{mx=Math.max(mx,t.pos[i].x+240);my=Math.min(my,t.pos[i].y);});ox=mx+80;oy=my;}
  const srcPos=fresh.map(id=>src.pos[id]).filter(Boolean);
  if(srcPos.length===fresh.length&&src!==t){
    const mx=Math.min(...srcPos.map(p=>p.x)),my=Math.min(...srcPos.map(p=>p.y));
    fresh.forEach(id=>t.pos[id]={x:ox+src.pos[id].x-mx,y:oy+src.pos[id].y-my});
  }else{
    const hs=measureHeights(fresh),colH=[oy,oy,oy];
    fresh.forEach(id=>{const k=colH.indexOf(Math.min(...colH));t.pos[id]={x:ox+k*280,y:colH[k]};colH[k]+=(hs[id]||260)+40;});
  }
  t.viewSet=false;t.view=null;
  markDirty(t);return fresh.length;
}
function removeFromCanvas(ids){const c=canvas();if(c.system)return;ids.forEach(id=>{delete c.pos[id];selected.delete(id);});markDirty();renderCanvas();toast(`Removed ${ids.length} card${ids.length>1?'s':''} from “${c.name}”`);}

/* picker */
const picker=$('#picker');
function openPicker(ids,x,y,dir){
  const others=state.canvases.filter(c=>!c.system&&c.id!==state.current);
  picker.innerHTML=`<h5>Add ${ids.length} card${ids.length>1?'s':''} to</h5>`+
    others.map(c=>{const all=ids.every(id=>c.pos[id]);return `<button type="button" class="ctx-like it${all?' dis':''}" data-pc="${c.id}" ${all?'disabled':''} style="display:flex;width:100%;border:0;background:transparent;text-align:left;padding:7px 10px;border-radius:6px;gap:8px;align-items:center;font-size:13px">${I.canvas.replace('<svg','<svg width="15" height="15" style="color:var(--muted)"')}<span style="flex:1">${esc(c.name)}</span>${all?'<span style="font-size:11px;color:var(--muted)">Added</span>':''}</button>`;}).join('')+
    `<div class="newrow"><input class="field" id="pcName" placeholder="New canvas name" aria-label="New canvas name"><button class="btn primary" type="button" id="pcCreate">Create</button></div>`;
  picker.classList.add('on');
  const r=picker.getBoundingClientRect();let px=Math.min(x,innerWidth-r.width-10),py=dir==='up'?y-r.height-8:y;py=Math.max(10,Math.min(py,innerHeight-r.height-10));
  picker.style.left=px+'px';picker.style.top=py+'px';
  $$('[data-pc]',picker).forEach(b=>{b.onmouseenter=()=>b.style.background='var(--chip)';b.onmouseleave=()=>b.style.background='transparent';b.onclick=()=>{const c=canvas(b.dataset.pc);const n=addToCanvas(c.id,ids);hideMenus();clearSelection();renderPanel();toast(`Added ${n} card${n!==1?'s':''} to “${c.name}”`,'Open',()=>switchCanvas(c.id));};});
  const create=()=>{const name=$('#pcName').value.trim()||'Untitled canvas';const c=newCanvas(name);addToCanvas(c.id,ids);hideMenus();clearSelection();renderPanel();toast(`Created “${name}” with ${ids.length} card${ids.length>1?'s':''}`,'Open',()=>switchCanvas(c.id));};
  $('#pcCreate').onclick=create;$('#pcName').onkeydown=e=>{if(e.key==='Enter')create();};
}

/* ================= detail panel (notes + tags) ================= */
const detail=$('#detail');let detailId=null;
function openDetail(id,focusNote){
  const it=item(id);if(!it)return;detailId=id;$('#tray').classList.remove('on');
  if(it.isNew){it.isNew=false;persist();rerenderCard(id);}
  const inCanvases=state.canvases.filter(c=>c.pos[id]).map(c=>c.name);
  let media='';
  if(it.type==='video'&&it.video){
    media=`<div class="d-media d-media-video"><video src="${esc(it.video)}" muted playsinline loop autoplay controls preload="auto"></video></div>`;
  }else if(it.type==='image'||it.type==='video'){
    media=`<div class="d-media">${artFor(it)}</div>`;
  }else if(it.type==='article')media=`<blockquote class="d-quote">“${esc(it.text)}”</blockquote>`;
  detail.innerHTML=`<div class="side-head"><h3>${{image:'Image',video:'Video',article:'Text snippet',link:'Link'}[it.type]}</h3><button class="icon-x" type="button" data-close="detail" aria-label="Close">${I.x}</button></div>
  <div class="side-body">
    ${media}
    <div><input class="d-title" id="dTitle" value="${esc(it.title)}" aria-label="Edit title"><div class="d-sub">Saved ${fmtDay(it.savedAt)}, ${fmtTime(it.savedAt)} from ${esc(it.source)}</div></div>
    <div class="d-sec"><h4><span>${I.pen.replace('<svg','<svg style="color:var(--note)"')}Your note</span><span class="note-state" id="noteState"></span></h4>
      <textarea class="note-area${it.note.trim()?'':' empty-note'}" id="noteArea" placeholder="What does this make you think of? Write a thought, a question, a next step…">${esc(it.note)}</textarea></div>
    <div class="d-sec"><h4><span>${I.spark}Tags</span></h4>
      <div class="chips" id="dTags"></div></div>
    <div class="d-sec"><h4><span>On canvases</span></h4>
      <div class="chips">${inCanvases.map(n=>`<span class="chip">${esc(n)}</span>`).join('')}<button class="btn" type="button" id="dAdd" style="padding:3px 10px;font-size:12px">${I.plus}Add to canvas</button></div></div>
  </div>`;
  detail.classList.add('on');
  renderDetailTags(it);
  const vid=$('.d-media-video video',detail);
  if(vid){vid.muted=true;const play=()=>vid.play().catch(()=>{});if(vid.readyState>=2)play();else vid.addEventListener('loadeddata',play,{once:true});}
  const titleEl=$('#dTitle');let titleTmr;
  if(titleEl){
    titleEl.oninput=()=>{
      const next=titleEl.value.trim()||'Untitled';
      it.title=next;
      clearTimeout(titleTmr);
      titleTmr=setTimeout(()=>{persist();rerenderCard(id);},300);
    };
    titleEl.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();titleEl.blur();}};
  }
  const na=$('#noteArea');let tmr;
  na.oninput=()=>{it.note=na.value;na.classList.toggle('empty-note',!na.value.trim());$('#noteState').textContent='Saving…';clearTimeout(tmr);tmr=setTimeout(()=>{persist();rerenderCard(id);$('#noteState').textContent='Note saved';},350);};
  $('#dAdd').onclick=e=>{const r=e.target.getBoundingClientRect();openPicker([id],r.left,r.bottom+6);};
  if(focusNote)setTimeout(()=>na.focus(),260);
}
function renderDetailTags(it){
  const box=$('#dTags');
  box.innerHTML=it.tags.map((t,i)=>`<span class="chip">${esc(t)}<button type="button" data-rm="${i}" aria-label="Remove tag ${esc(t)}">${I.x}</button></span>`).join('')+`<input class="tag-input" id="tagIn" placeholder="+ Add tag" aria-label="Add tag">`;
  $$('[data-rm]',box).forEach(b=>b.onclick=()=>{it.tags.splice(+b.dataset.rm,1);persist();renderDetailTags(it);rerenderCard(it.id);});
  $('#tagIn').onkeydown=e=>{if(e.key==='Enter'&&e.target.value.trim()){it.tags.push(e.target.value.trim().toLowerCase());persist();renderDetailTags(it);rerenderCard(it.id);$('#tagIn').focus();}};
}
function closeSide(){detail.classList.remove('on');$('#tray').classList.remove('on');detailId=null;}
document.addEventListener('click',e=>{const c=e.target.closest('[data-close]');if(c){closeSide();}});

/* tray */
function openTray(){closeSide();$('#tray').classList.add('on');$('#trayQ').value='';renderTray();setTimeout(()=>$('#trayQ').focus(),200);}
let trayK=0;
function renderTray(){
  const c=canvas(),f=$('#trayQ').value.trim().toLowerCase();
  const p=f?parseQuery(f):null;
  const list=state.items.filter(it=>!p||isEmptyQ(p)||matches(it,p)).sort((a,b)=>b.savedAt-a.savedAt);
  $('#trayList').innerHTML=list.map(it=>{const on=!!c.pos[it.id];const th=(it.img||it.video||it.art)?artFor(it):`<b>${it.type==='article'?'“':esc(it.source[0].toUpperCase())}</b>`;
    return `<button type="button" class="tray-it${on?' added':''}" data-tid="${it.id}"><span class="th">${th}</span><span class="tx"><span class="tt" style="display:block">${esc(it.title)}</span><span class="tg" style="display:block">${esc(it.tags.join(' · '))}</span></span><span class="ad">${on?'Added':'Add'}</span></button>`;}).join('')||'<p style="color:var(--muted);padding:10px">No saves match.</p>';
  $$('[data-tid]',$('#trayList')).forEach(b=>b.onclick=()=>{
    const id=b.dataset.tid;if(c.pos[id])return;
    const v=V();const cx=(vp.clientWidth/2-v.x)/v.z-120+(trayK%4)*30,cy=(vp.clientHeight/2-v.y)/v.z-140+(trayK%4)*30;trayK++;
    c.pos[id]={x:Math.round(cx),y:Math.round(cy)};markDirty();renderCanvas();$('#tray').classList.add('on');renderTray();
    const el=cardEl(id);if(el)el.style.zIndex=++zTop;
  });
}
$('#trayQ').oninput=renderTray;
$('#addCardsBtn').onclick=openTray;$('#emptyAdd').onclick=openTray;

/* ================= search ================= */
const WD=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const WDS={sun:0,mon:1,tue:2,tues:2,wed:3,thu:4,thur:4,thurs:4,fri:5,sat:6};
const ZHD='日一二三四五六';
const ZH=[[/上周([一二三四五六日天])/g,(m,d)=>' last '+WD[ZHD.indexOf(d==='天'?'日':d)]+' '],[/(?:周|星期)([一二三四五六日天])/g,(m,d)=>' '+WD[ZHD.indexOf(d==='天'?'日':d)]+' '],[/上周/g,' last week '],[/(本周|这周)/g,' this week '],[/今天/g,' today '],[/昨天/g,' yesterday '],[/黑色?/g,' black '],[/简洁|清晰/g,' clarity '],[/留白/g,' white space '],[/用户体验|体验/g,' ux '],[/视频/g,' video '],[/文章/g,' article '],[/有?笔记/g,' with notes '],[/极简/g,' minimalism ']];
const SYN={couch:'sofa',couches:'sofa',settee:'sofa',dark:'black',noir:'black',lamps:'lamp',light:'lighting',chairs:'chair',plants:'plant',colour:'color',vases:'vase',wooden:'wood'};
const STOP=new Set(['saved','save','from','in','the','a','an','and','on','of','with','my','i','me','that','things','stuff','show','find','all']);
function parseQuery(raw){
  let q=' '+raw.toLowerCase()+' ';ZH.forEach(([re,r])=>q=q.replace(re,r));
  const out={terms:[],range:null,dateLabel:'',notes:false,type:null};
  const t0=dayStart(Date.now()),dow=new Date().getDay(),mon=t0-((dow+6)%7)*DAY;
  const set=(f,t,l)=>{out.range={from:f,to:t};out.dateLabel=l;};
  q=q.replace(/\b(?:last|past)\s+(\d+)\s+days?\b/g,(m,n)=>{n=+n;set(t0-(n-1)*DAY,t0+DAY,`last ${n} days`);return ' ';});
  q=q.replace(/\btoday\b/g,()=>{set(t0,t0+DAY,'today');return ' ';});
  q=q.replace(/\byesterday\b/g,()=>{set(t0-DAY,t0,'yesterday');return ' ';});
  q=q.replace(/\blast\s+week\b/g,()=>{set(mon-7*DAY,mon,`last week (${fmtDay(mon-7*DAY)} – ${fmtDay(mon-DAY)})`);return ' ';});
  q=q.replace(/\bthis\s+week\b/g,()=>{set(mon,t0+DAY,'this week');return ' ';});
  q=q.replace(/\b(last|this)\s+month\b/g,(m,w)=>{const d=new Date(t0);d.setDate(1);const s=d.getTime();if(w==='last'){const p=new Date(s);p.setMonth(p.getMonth()-1);set(p.getTime(),s,'last month');}else set(s,t0+DAY,'this month');return ' ';});
  q=q.replace(/\b(?:(last|on|this)\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tues|tue|wed|thurs|thur|thu|fri|sat)\b/g,(m,pre,d)=>{const tg=WD.includes(d)?WD.indexOf(d):WDS[d];let diff=(dow-tg+7)%7;if(diff===0&&pre==='last')diff=7;const s=t0-diff*DAY;set(s,s+DAY,fmtDay(s));return ' ';});
  q=q.replace(/\b(?:with|has)[\s:]*notes?\b|\bnotes?\b|\bnoted\b/g,()=>{out.notes=true;return ' ';});
  q=q.replace(/\b(videos?|articles?|quotes?|snippets?|texts?|links?|images?|photos?|pictures?)\b/g,(m)=>{out.type=/^vid/.test(m)?'video':/^(art|quo|sni|tex)/.test(m)?'article':/^lin/.test(m)?'link':'image';return ' ';});
  q.split(/[\s,]+/).forEach(w=>{w=w.replace(/[^\p{L}\p{N}-]/gu,'');if(!w||STOP.has(w))return;w=SYN[w]||w;if(w.length>4&&w.endsWith('s')&&!w.endsWith('ss'))w=w.slice(0,-1);out.terms.push(w);});
  return out;
}
const isEmptyQ=p=>!p.terms.length&&!p.range&&!p.notes&&!p.type;
function matches(it,p){
  if(p.type&&it.type!==p.type)return false;
  if(p.notes&&!(it.note||'').trim())return false;
  if(p.range&&(it.savedAt<p.range.from||it.savedAt>=p.range.to))return false;
  const hay=(it.title+' '+(it.text||'')+' '+(it.note||'')+' '+it.source).toLowerCase();
  return p.terms.every(t=>it.tags.some(g=>g===t||(t.length>=3&&g.includes(t)))||(t.length>=3&&hay.includes(t)));
}
const qIn=$('#q');let lastP=null;
function applySearch(fit){
  const raw=qIn.value.trim();$('#searchBox').classList.toggle('has',!!raw);
  const p=raw?parseQuery(raw):null;lastP=p;
  const active=p&&!isEmptyQ(p);const c=canvas();const hits=[];
  $$('.card',world).forEach(el=>{const it=item(el.dataset.id);const m=active&&matches(it,p);el.classList.toggle('hit',!!m);el.classList.toggle('dim',!!active&&!m);if(m)hits.push(it.id);
    $$('.tag',el).forEach(t=>t.classList.toggle('hl',!!m&&p.terms.some(term=>t.dataset.t===term||(term.length>=3&&t.dataset.t.includes(term)))));});
  renderSearchSummary(p,hits);
  if(fit&&active&&hits.length)fitTo(hits,1);
  return hits;
}
function renderSearchSummary(p=lastP,hits){
  const s=$('#sum');if(!p||isEmptyQ(p)){s.innerHTML=qIn.value.trim()?'<span>Type a tag, a word or a date</span>':'<span>Search by tag, a word from a note, or when you saved it</span>';return;}
  hits=hits||$$('.card.hit',world).map(e=>e.dataset.id);
  const c=canvas();const total=state.items.filter(it=>matches(it,p)).length;const elsewhere=total-hits.length;
  const chips=[...p.terms.map(t=>`<span class="chip">${esc(t)}</span>`),p.type?`<span class="chip">${p.type}s</span>`:'',p.notes?`<span class="chip">with notes</span>`:'',p.dateLabel?`<span class="chip d">saved ${esc(p.dateLabel)}</span>`:''].join('');
  s.innerHTML=`<strong>${hits.length} result${hits.length!==1?'s':''}</strong> on ${esc(c.name)} ${chips}`+(elsewhere>0&&!c.system?` · <a id="seeAll">${elsewhere} more in All Inspiration</a>`:'')+(hits.length?' · <a id="zoomHits">Zoom to results</a>':'');
  if($('#seeAll'))$('#seeAll').onclick=()=>{switchCanvas('all');applySearch(true);};
  if($('#zoomHits'))$('#zoomHits').onclick=()=>applySearch(true);
}
qIn.addEventListener('input',()=>{applySearch(false);$('#suggest').classList.toggle('on',!qIn.value.trim());});
qIn.addEventListener('keydown',e=>{if(e.key==='Enter'){applySearch(true);$('#suggest').classList.remove('on');}if(e.key==='Escape'){qIn.value='';applySearch(false);qIn.blur();}});
qIn.addEventListener('focus',()=>{if(!qIn.value.trim())renderSuggest();});
qIn.addEventListener('blur',()=>setTimeout(()=>$('#suggest').classList.remove('on'),150));
$('#qClear').onclick=()=>{qIn.value='';applySearch(false);fitTo();};
function renderSuggest(){
  const counts={};state.items.forEach(it=>it.tags.forEach(t=>counts[t]=(counts[t]||0)+1));
  const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(e=>e[0]);
  const tries=['white space','yesterday','clarity','ux','videos','with notes'];
  const sg=$('#suggest');
  sg.innerHTML=`<h4>Try a search</h4><div class="chips">${tries.map(t=>`<span class="chip" data-s="${t}">${t}</span>`).join('')}</div><h4>Your most used tags</h4><div class="chips">${top.map(t=>`<span class="chip" data-s="${esc(t)}">${esc(t)}</span>`).join('')}</div>`;
  sg.classList.add('on');
  $$('[data-s]',sg).forEach(ch=>ch.onmousedown=e=>{e.preventDefault();qIn.value=ch.dataset.s;sg.classList.remove('on');applySearch(true);});
}

/* ================= context menus ================= */
const ctx=$('#ctx');
function hideMenus(){ctx.classList.remove('on');picker.classList.remove('on');closeToolPops();}
function showCtx(x,y,html){ctx.innerHTML=html;ctx.classList.add('on');const r=ctx.getBoundingClientRect();ctx.style.left=Math.min(x,innerWidth-r.width-8)+'px';ctx.style.top=Math.min(y,innerHeight-r.height-8)+'px';}
document.addEventListener('pointerdown',e=>{
  if(!e.target.closest('.ctx,.picker')){ctx.classList.remove('on');picker.classList.remove('on');}
  if(Date.now()<ignoreToolCloseUntil)return;
  if(!e.target.closest('.tool-dock,.muse-pop')){
    closeToolPops();
    $('#musePop')?.classList.remove('on');
  }
});
window.addEventListener('blur',hideMenus);

/* Muse card menu */
vp.addEventListener('contextmenu',e=>{
  e.preventDefault();const card=e.target.closest('.card');if(!card)return;
  const id=card.dataset.id,c=canvas();const ids=selected.has(id)?[...selected]:[id];
  showCtx(e.clientX,e.clientY,`<button class="it" data-a="open">${I.pen}Open and edit note</button><button class="it" data-a="add">${I.canvas}Add to canvas…</button>${c.system?'':`<button class="it" data-a="rm">${I.trash}Remove from this canvas</button>`}<hr><button class="it" data-a="sel">${I.check}${selected.has(id)?'Deselect':'Select'}</button>`);
  ctx.onclick=ev=>{const a=ev.target.closest('[data-a]');if(!a)return;const act=a.dataset.a;hideMenus();
    if(act==='open')openDetail(id,true);if(act==='add')openPicker(ids,e.clientX,e.clientY);if(act==='rm')removeFromCanvas(ids);if(act==='sel')toggleSelect(id);};
});

/* ================= capture (simulated web page) ================= */
const WEB={
  'w-hero':{type:'image',title:'Humane Design resource card',tags:['ux','humane','minimal','black','white','well-being'],img:'/ux-pictures/black-white.webp'},
  'w-side':{type:'image',title:'InkWell Books mobile UI',tags:['typography','books','mobile','hierarchy','tags'],img:'/ux-pictures/portfolio.webp'},
  'w-pend':{type:'image',title:'Unique Clay ecommerce UI',tags:['blue','ecommerce','white space','product'],img:'/ux-pictures/blue.webp'},
  'w-video':{type:'video',title:'Micro-interaction study',duration:'0:48',tags:['motion','ui','micro-interaction','video'],img:null,video:'/ux-pictures/interaction.mp4'},
  'w-link':{type:'link',title:'How to run a five-person usability test',tags:['usability','testing','research','ux'],img:null},
  'page':{type:'link',title:'Designing for Clarity: Why Less Is More in User Experience',tags:['ux','clarity','minimalism','white space'],img:null}
};
/* render the site's images */
['w-hero','w-side','w-pend','w-video'].forEach(k=>{
  const el=$('#'+k);const w=WEB[k];
  const media=w.video
    ?`<video src="${w.video}" muted playsinline loop autoplay preload="metadata"></video>`
    :`<img src="${w.img}" alt="" draggable="false">`;
  el.innerHTML=media+(k==='w-video'?`<div class="play"><span>${I.play.replace('<svg','<svg width="22" height="22" style="margin-left:3px"')}</span></div><div class="bar">0:12<i></i>0:48</div>`:'');
});

const KW=[[/clarit|simple|simplicit/,'clarity'],[/cognitive|choice|decision/,'cognitive load'],[/white\s*space|breath|empty/,'white space'],[/consist/,'consistency'],[/user|need|goal/,'user needs'],[/test|usabilit/,'usability'],[/hierarch/,'hierarchy'],[/minimal|less is more|remove/,'minimalism'],[/interface|ux|experience/,'ux'],[/onboard/,'onboarding']];
function tagsForText(t){const s=t.toLowerCase();const out=[];KW.forEach(([re,tag])=>{if(re.test(s)&&!out.includes(tag))out.push(tag);});return [...out.slice(0,4),'quote'];}

const page=$('#page');
page.addEventListener('contextmenu',e=>{
  e.preventDefault();
  const sel=window.getSelection();const text=sel&&!sel.isCollapsed&&page.contains(sel.anchorNode)?sel.toString().trim():'';
  const target=e.target.closest('[data-save]');
  let kind,html,payload;
  if(text){kind='text';payload={text};
    html=`<button class="it dis">${I.copy}Copy</button><button class="it dis">Search the web for “${esc(text.slice(0,18))}${text.length>18?'…':''}”</button><hr><button class="it muse" data-go="1"><span class="m">m</span>Save selection to Muse</button>`;}
  else if(target){const key=target.dataset.save;const w=WEB[key];payload={key};
    if(w.type==='image')html=`<button class="it dis">${I.open}Open image in new tab</button><button class="it dis">${I.img}Save image as…</button><button class="it dis">${I.copy}Copy image</button><hr><button class="it muse" data-go="1"><span class="m">m</span>Save image to Muse</button>`;
    else if(w.type==='video')html=`<button class="it dis">Loop</button><button class="it dis">Show controls</button><button class="it dis">${I.copy}Copy video address</button><hr><button class="it muse" data-go="1"><span class="m">m</span>Save video to Muse</button>`;
    else html=`<button class="it dis">${I.open}Open link in new tab</button><button class="it dis">${I.copy}Copy link address</button><hr><button class="it muse" data-go="1"><span class="m">m</span>Save link to Muse</button>`;}
  else{payload={key:'page'};html=`<button class="it dis">Back</button><button class="it dis">Reload</button><button class="it dis">Save as…</button><hr><button class="it muse" data-go="1"><span class="m">m</span>Save this page to Muse</button>`;}
  showCtx(e.clientX,e.clientY,html);
  ctx.onclick=ev=>{if(!ev.target.closest('[data-go]'))return;hideMenus();saveFromWeb(payload,target);};
});

let popTimers=[],savedCount=0,pendingFocus=[],pendingDest='all';
function placeOnCanvas(cid,id){
  const c=canvas(cid);if(!c||c.pos[id])return;
  const hs=measureHeights([id]);
  if(cid==='all'){
    if(!state.newCol){let mx=Infinity,my=Infinity;Object.values(c.pos).forEach(q=>{mx=Math.min(mx,q.x);my=Math.min(my,q.y);});state.newCol={x:(mx===Infinity?0:mx)-320,y:my===Infinity?0:my};}
    c.pos[id]={x:state.newCol.x,y:state.newCol.y};state.newCol.y+=(hs[id]||260)+40;
  }else{
    const ids=Object.keys(c.pos);let ox=40,oy=40;
    if(ids.length){let mx=-Infinity,my=Infinity;ids.forEach(i=>{mx=Math.max(mx,c.pos[i].x+240);my=Math.min(my,c.pos[i].y);});ox=mx+80;oy=my;}
    c.pos[id]={x:ox,y:oy};markDirty(c);
  }
  c.viewSet=false;
}
function renderEpTags(it){
  const box=document.querySelector('.muse-pop.on #epTags, .ext-pop.on #epTags');if(!box)return;
  box.innerHTML=it.tags.map((t,i)=>`<span class="chip">${esc(t)}<button type="button" data-rm="${i}" aria-label="Remove tag ${esc(t)}">${I.x}</button></span>`).join('')+`<input class="tag-input" id="epTagIn" placeholder="+ Add tag" aria-label="Add tag">`;
  $$('[data-rm]',box).forEach(b=>b.onclick=()=>{it.tags.splice(+b.dataset.rm,1);persist();renderEpTags(it);});
  const inp=box.querySelector('#epTagIn');
  if(inp)inp.onkeydown=e=>{if(e.key==='Enter'&&e.target.value.trim()){it.tags.push(e.target.value.trim().toLowerCase());persist();renderEpTags(it);setTimeout(()=>box.querySelector('#epTagIn')?.focus(),0);}};
}
function placeMusePopNearCardBtn(pop){
  const btn=$('#newCardBtn'),dock=$('#toolDock'),host=vp;
  if(!pop||!host)return;
  const place=()=>{
    pop.classList.add('anchor-card');
    const hr=host.getBoundingClientRect();
    const br=(btn||dock)?.getBoundingClientRect();
    const pw=pop.offsetWidth||320,ph=pop.offsetHeight||300;
    let left,bottom;
    if(br){
      left=br.left+br.width/2-hr.left-pw/2;
      bottom=hr.bottom-br.top+10;
    }else{
      left=(hr.width-pw)/2;
      bottom=70;
    }
    left=Math.max(10,Math.min(left,hr.width-pw-10));
    bottom=Math.max(64,Math.min(bottom,hr.height-ph-10));
    pop.style.left=left+'px';
    pop.style.bottom=bottom+'px';
    pop.style.right='auto';
    pop.style.transform='none';
  };
  place();
  requestAnimationFrame(place);
}
function openSaveSheet(it,finalTags,opts={}){
  popTimers.forEach(clearTimeout);popTimers=[];
  const id=it.id;
  const mount=opts.mount||'#extPop';
  const sourceLabel=opts.sourceLabel||it.source||'clarity.journal';
  it.isNew=true;it.tags=it.tags||[];
  pendingDest='all';
  if(!state.items.some(x=>x.id===id)){
    state.items.push(it);
    placeOnCanvas('all',id);
    pendingFocus.push(id);
  }
  /* also pin onto the canvas the user is currently arranging */
  const cur=canvas();
  if(cur&&!cur.system&&!cur.pos[id]&&mount==='#musePop'){
    placeOnCanvas(cur.id,id);
    pendingDest=cur.id;
  }
  $('#extPop')?.classList.remove('on');
  $('#musePop')?.classList.remove('on');
  if(mount==='#musePop'&&$('#view-muse')?.classList.contains('on'))renderCanvas();
  const destOpts=()=>state.canvases.map(c=>`<option value="${c.id}"${c.id===pendingDest?' selected':''}>${esc(c.name)}</option>`).join('')+`<option value="__new__">+ New canvas…</option>`;
  const pop=$(mount);if(!pop)return;
  const thumb=(it.img||it.video||it.art)?artFor(it):`<span class="q">${it.type==='article'?'“':'↗'}</span>`;
  const title=it.type==='article'?`“${it.text}”`:it.title;
  pop.innerHTML=`<div class="ep-head"><span class="logo">muse<i></i></span><span class="ep-head-spacer"></span><button class="icon-x" type="button" id="epX" aria-label="Close">${I.x}</button></div>
  <div class="ep-body"><div class="ep-thumb">${thumb}</div><div><div class="ep-title">${esc(title)}</div><div class="ep-src">${esc(sourceLabel)}</div></div></div>
  <div><div class="ai-label">${I.spark}<span id="epAi">AI is looking at it…</span></div><div class="chips" id="epTags"><span class="chip ghost"></span><span class="chip ghost"></span><span class="chip ghost"></span></div></div>
  <label class="ep-note-wrap"><span class="ep-note-label">Add a thought <em>optional</em></span><input class="field" id="epNote" placeholder="Press Enter to save"></label>
  <div class="ep-foot">
    <div class="ep-dest" id="epDestWrap">
      <span>Save to</span>
      <select id="epDest" aria-label="Save destination">${destOpts()}</select>
    </div>
    <button class="btn primary" type="button" id="epSave">Save</button>
  </div>`;
  pop.classList.add('on');
  if(mount==='#musePop')placeMusePopNearCardBtn(pop);
  const q=s=>pop.querySelector(s);
  const applyDest=next=>{
    const prev=pendingDest;
    if(next===prev)return;
    if(prev!=='all'){const old=canvas(prev);if(old){delete old.pos[id];markDirty(old);}}
    if(next!=='all')placeOnCanvas(next,id);
    pendingDest=next;persist();
  };
  const commitNewCanvas=()=>{
    const inp=q('#epNewCv');
    if(!inp)return false;
    const name=inp.value.trim()||'Untitled canvas';
    const c=newCanvas(name);
    placeOnCanvas(c.id,id);
    if(pendingDest!=='all'){const old=canvas(pendingDest);if(old){delete old.pos[id];markDirty(old);}}
    pendingDest=c.id;persist();renderPanel();
    const wrap=q('#epDestWrap');
    if(wrap){
      wrap.innerHTML=`<span>Save to</span><select id="epDest" aria-label="Save destination">${destOpts()}</select>`;
      bindDest();
    }
    return true;
  };
  const bindDest=()=>{
    const sel=q('#epDest');if(!sel)return;
    sel.onchange=e=>{
      if(e.target.value==='__new__'){
        const wrap=q('#epDestWrap');
        wrap.innerHTML=`<span>Save to</span><input class="field ep-new-cv" id="epNewCv" placeholder="Canvas name" aria-label="New canvas name"><button class="btn" type="button" id="epNewCancel">Cancel</button>`;
        const inp=q('#epNewCv');inp.focus();
        inp.onkeydown=ev=>{if(ev.key==='Enter'){ev.preventDefault();commitNewCanvas();}if(ev.key==='Escape'){q('#epNewCancel').click();}};
        q('#epNewCancel').onclick=()=>{
          wrap.innerHTML=`<span>Save to</span><select id="epDest" aria-label="Save destination">${destOpts()}</select>`;
          bindDest();
        };
        return;
      }
      applyDest(e.target.value);
    };
  };
  bindDest();
  q('#epX').onclick=()=>pop.classList.remove('on');
  q('#epSave').onclick=()=>{
    if(q('#epNewCv'))commitNewCanvas();
    persist();
    pop.classList.remove('on');
    if(mount==='#musePop'&&$('#view-muse').classList.contains('on'))renderCanvas();
    const dest=canvas(pendingDest);
    toast(`Saved to “${dest?dest.name:'All Inspiration'}”`);
  };
  q('#epNote').onkeydown=e=>{if(e.key==='Enter'){it.note=e.target.value;persist();e.target.value='';e.target.placeholder='Note saved ✓';}};
  q('#epNote').oninput=e=>{it.note=e.target.value;};
  (finalTags||[]).forEach((t,i)=>popTimers.push(setTimeout(()=>{
    if(!it.tags.includes(t))it.tags.push(t);
    renderEpTags(it);
    if(i===(finalTags.length-1)){const ai=q('#epAi');if(ai)ai.textContent='Auto-tagged';persist();}
  },1100+i*260)));
  persist();
}
function saveFromWeb(p,target){
  let it;const id='n'+Date.now().toString(36);
  if(p.text){const t=p.text.length>260?p.text.slice(0,257).trim()+'…':p.text;
    it={id,type:'article',title:'Designing for Clarity: Why Less Is More in User Experience',source:'clarity.journal',text:t,tags:[],savedAt:Date.now(),note:''};
    openSaveSheet(it,tagsForText(t),{mount:'#extPop',sourceLabel:'clarity.journal'});}
  else{const w=WEB[p.key];it={id,type:w.type,title:w.title,source:'clarity.journal',tags:[],savedAt:Date.now(),note:'',duration:w.duration,img:w.img||null,video:w.video||null,art:w.art?{...w.art}:null};
    openSaveSheet(it,w.tags.slice(),{mount:'#extPop',sourceLabel:'clarity.journal'});}
  if(target){target.classList.remove('flash');void target.offsetWidth;target.classList.add('flash');if(!target.querySelector('.saved-mark')&&target.dataset.save!=='w-link'){target.insertAdjacentHTML('beforeend','<span class="saved-mark"><i>m</i>Saved</span>');}}
  savedCount++;const b=$('#extBadge');b.textContent=savedCount;b.classList.add('on');
}

/* ================= views ================= */
let museReady=false;
function setView(v){
  $$('.steps button').forEach(b=>b.classList.toggle('on',b.dataset.view===v));
  $('#view-capture').classList.toggle('on',v==='capture');$('#view-muse').classList.toggle('on',v==='muse');
  const logo=$('#appLogo');
  if(logo){
    if(v==='capture'){
      logo.className='logo notice';
      logo.innerHTML=`<span class="hl">This is the website you're browsing, not the Muse interface.</span>`;
    }else{
      logo.className='logo';
      logo.innerHTML='muse<i></i>';
    }
  }
  hideMenus();
  if(v==='muse'){
    if(pendingFocus.length){state.current='all';clearSelection();qIn.value='';}
    renderCanvas();
    if(pendingFocus.length){const ids=pendingFocus.slice();pendingFocus=[];const all=canvas('all');
      /* show the new cards with their neighbours */
      fitTo(ids,1);const v=V();if(v.z>0.9){v.x+=0;} canvas().viewSet=true;}
    else if(!canvas().viewSet){fitTo();canvas().viewSet=true;}
    museReady=true;
  }
}
switchView=setView;
$('#extBtn').onclick=()=>setView('muse');

/* keyboard */
document.addEventListener('keydown',e=>{
  const typing=/INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if(e.key==='Escape'){hideMenus();$('#musePop')?.classList.remove('on');if(inkTool)setInkTool(null);if(!typing){closeSide();clearSelection();exitStickyEdit();}}
  if(!$('#view-muse').classList.contains('on'))return;
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveCanvas();}
  if(!typing&&e.key==='/'){e.preventDefault();qIn.focus();}
  if(!typing&&(e.key==='Delete'||e.key==='Backspace')&&selected.size&&!canvas().system){removeFromCanvas([...selected]);}
});

/* reset */
$('#resetBtn').onclick=()=>{
  try{localStorage.removeItem(KEY);}catch(e){}
  Object.keys(artCache).forEach(k=>{if(!k.startsWith('web-'))delete artCache[k];});
  state=seed();runPendingLayouts();persist();selected.clear();pendingFocus=[];savedCount=0;$('#extBadge').classList.remove('on');
  $$('.saved-mark').forEach(m=>m.remove());$('#extPop')?.classList.remove('on');$('#musePop')?.classList.remove('on');qIn.value='';closeSide();setInkTool(null);closeToolPops();
  if($('#view-muse').classList.contains('on')){renderCanvas();fitTo();canvas().viewSet=true;}
  toast('Demo reset to its starting data');
};

/* toast */
let toastT;
function toast(msg,label,fn){const t=$('#toast');$('#toastMsg').textContent=msg;const b=$('#toastBtn');b.textContent=label||'';b.onclick=()=>{t.classList.remove('on');fn&&fn();};t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),3800);}

/* ================= init ================= */
function init(){
  state=load();
  if(!state){state=seed();runPendingLayouts();persist();}
  state.canvases.forEach(c=>{c.viewSet=false;ensureStickies(c);ensureInk(c);});
  renderSearchSummary(null);
}
const ready=(document.fonts&&document.fonts.ready)?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1500))]):Promise.resolve();
ready.then(init);
}
