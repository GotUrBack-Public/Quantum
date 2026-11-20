"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "./icon";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UserAvatar } from "./user-avatar";

type GraphemeSegmenter = {
  segment(input: string): Iterable<{ segment: string }>;
};

const graphemeSegmenter = typeof Intl !== "undefined" && "Segmenter" in Intl
  ? new (Intl as unknown as { Segmenter: new (locales?: string | string[], options?: { granularity: "grapheme" }) => GraphemeSegmenter }).Segmenter("de", { granularity: "grapheme" })
  : null;

// Keep valid Unicode (including emoji ZWJ sequences), but discard malformed
// surrogate code points, invisible spoofing controls and non-printing controls.
function safeUserText(input: string, maxGraphemes: number): string {
  const normalized = input.normalize("NFC");
  const safe = Array.from(normalized).filter((character) => {
    const point = character.codePointAt(0) ?? 0;
    if (point >= 0xd800 && point <= 0xdfff) return false;
    if (point <= 0x1f || (point >= 0x7f && point <= 0x9f)) return false;
    if (point === 0x00ad || point === 0x034f || point === 0x061c ||
        point === 0x200b || point === 0x200e || point === 0x200f ||
        point === 0x202a || (point >= 0x202b && point <= 0x202e) ||
        point === 0x2060 || (point >= 0x2066 && point <= 0x2069) ||
        point === 0xfeff) return false;
    if ((point >= 0xfdd0 && point <= 0xfdef) || (point & 0xffff) >= 0xfffe) return false;
    return true;
  }).join("");

  const clusters = graphemeSegmenter
    ? Array.from(graphemeSegmenter.segment(safe), (part) => part.segment)
    : Array.from(safe);
  return clusters.slice(0, maxGraphemes).join("");
}

type Message = { id: string; author: "you" | "them"; text: string; time: string };
type Chat = { id: string; name: string; initials: string; avatarUrl?: string; preview: string; time: string; kind: "direct" | "public" | "private" | "p2p"; online?: boolean; unread?: number; messages: Message[] };

const seedChats: Chat[] = [
  { id:"lea",name:"Lea",initials:"L",preview:"Alles klar, bis später!",time:"09:42",kind:"direct",online:true,unread:2,messages:[
    {id:"m1",author:"them",text:"Hey! Hast du kurz Zeit?",time:"09:38"},{id:"m2",author:"you",text:"Ja, was gibt's?",time:"09:39"},{id:"m3",author:"them",text:"Ich wollte dir Quantum zeigen.",time:"09:41"},{id:"m4",author:"them",text:"Alles klar, bis später!",time:"09:42"}]},
  { id:"dev",name:"Dev Community",initials:"D",preview:"Mika: Neues Update ist online",time:"08:56",kind:"public",messages:[{id:"m5",author:"them",text:"Willkommen im Entwicklungsraum.",time:"08:50"},{id:"m6",author:"them",text:"Mika: Neues Update ist online",time:"08:56"}]},
  { id:"alex",name:"Alex",initials:"A",preview:"Lass uns morgen sprechen.",time:"Gestern",kind:"p2p",messages:[{id:"m7",author:"them",text:"Lass uns morgen sprechen.",time:"18:20"}]},
  { id:"design",name:"Design Lab",initials:"D",preview:"Raum mit Zugangscode",time:"Mo",kind:"private",messages:[{id:"m8",author:"them",text:"Willkommen im privaten Testraum.",time:"12:05"}]},
];

const navItems = [
  {id:"chats",label:"Nachrichten",icon:"messages"},
  {id:"discover",label:"Entdecken",icon:"compass"},
  {id:"friends",label:"Kontakte",icon:"users"},
  {id:"profile",label:"Profil",icon:"user"},
  {id:"settings",label:"Einstellungen",icon:"settings"},
] as const;
type View = typeof navItems[number]["id"] | "support";

export function AppShell() {
  const prefersReducedMotion = useReducedMotion();
  const [view,setView]=useState<View>("chats");
  const [theme,setTheme]=useState<"dark"|"light">("dark");
  useEffect(()=>{const saved=window.localStorage.getItem("quantum-theme");const initial=saved==="light"||saved==="dark"?saved:"dark";setTheme(initial);document.documentElement.dataset.theme=initial},[]);
  const [chats,setChats]=useState(seedChats);
  const [activeId,setActiveId]=useState("lea");
  const [draft,setDraft]=useState("");
  const [search,setSearch]=useState("");
  const [mobileMenu,setMobileMenu]=useState(false);
  const [guardian,setGuardian]=useState(true);
  const [guardianFilter,setGuardianFilter]=useState(true);
  const [showSupport,setShowSupport]=useState(false);
  const [requests,setRequests]=useState(["Mika","Nova"]);
  const [friends,setFriends]=useState(["Lea","Alex"]);
  const [joined,setJoined]=useState<string[]>([]);
  const [notice,setNotice]=useState("Lokale Demo: Änderungen werden nicht an einen Server übertragen.");
  const active=chats.find(c=>c.id===activeId)??chats[0];
  const filtered=useMemo(()=>chats.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())),[chats,search]);

  function send(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const text=safeUserText(draft,1000).trim();if(!text)return;
    const time=new Intl.DateTimeFormat("de-DE",{hour:"2-digit",minute:"2-digit"}).format(new Date());
    setChats(items=>items.map(c=>c.id===activeId?{...c,preview:text,time,messages:[...c.messages,{id:crypto.randomUUID(),author:"you" as const,text,time}].slice(-100)}:c));
    setDraft("");setNotice("Demo-Nachricht lokal hinzugefügt – nicht versendet.");
  }
  function openChat(id:string){setActiveId(id);setView("chats");setMobileMenu(false)}
  function toast(text:string){setNotice(text)}
  const title=navItems.find(n=>n.id===view)?.label??"Support";

  return <main className="quantum-app" data-theme={theme}>
    <aside className={`left-rail ${mobileMenu?"mobile-open":""}`}>
      <button className="brand" onClick={()=>setView("chats")}><span className="brand-symbol">Q</span><span>quantum</span><em>PREVIEW</em></button>
      <button className="mini-profile" onClick={()=>setView("profile")}><UserAvatar name="Dein Quantum" className="self" /><span><b>Dein Quantum</b><small>Lokales Demo-Profil</small></span><i className="profile-chevron"><Icon name="chevron-down" size={14}/></i></button>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="primary-nav">{navItems.map(item=><button key={item.id} className={view===item.id?"nav-active":""} onClick={()=>{setView(item.id);setMobileMenu(false)}}><span className="nav-icon"><Icon name={item.icon} size={17}/></span>{item.label}{item.id==="friends"&&requests.length>0&&<b className="nav-count">{requests.length}</b>}</button>)}</nav>
      <div className="nav-caption rooms-caption">DEINE CHATS <button aria-label="Neuen Chat starten" onClick={()=>toast("Neue Chats werden nach Identitäts- und Schlüsselregistrierung aktiviert.")}><Icon name="plus" size={15}/></button></div>
      <div className="rail-chats">{chats.slice(0,4).map(c=><button key={c.id} className={view==="chats"&&activeId===c.id?"rail-chat-active":""} onClick={()=>openChat(c.id)}><UserAvatar name={c.name} src={c.avatarUrl} size="small" /><span>{c.name}</span>{c.kind==="private"&&<small aria-label="Privater Chat"><Icon name="lock" size={12}/></small>}</button>)}</div>
      <div className="rail-bottom">
        <button className={view==="support"?"nav-active":""} onClick={()=>setView("support")}><span className="nav-icon"><Icon name="life-buoy" size={17}/></span>Support-Konsole <em>DEMO</em></button>
        <div className="privacy-state"><span/> Privacy-first UI · Offline</div>
      </div>
    </aside>

    <section className="main-area">
      <header className="topbar"><button className="mobile-toggle" onClick={()=>setMobileMenu(v=>!v)} aria-label="Menü öffnen"><Icon name="menu" size={19}/></button><div className="breadcrumb">Quantum <span>/</span> {title}</div><div className="top-actions"><span className="local-pill"><i/> Lokale Vorschau</span><button className="theme-switch" type="button" onClick={()=>setTheme(v=>{const next=v==="dark"?"light":"dark";window.localStorage.setItem("quantum-theme",next);document.documentElement.dataset.theme=next;return next})} aria-label={theme==="dark"?"Zum hellen Design wechseln":"Zum dunklen Design wechseln"}><Icon name={theme==="dark"?"sun":"moon"} size={16}/><span>{theme==="dark"?"Light":"Dark"}</span></button><button className="top-avatar" onClick={()=>setView("profile")} aria-label="Profil öffnen"><Icon name="user" size={17}/></button></div></header>
      <div className="toast-line" role="status">{notice}</div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={view} className="view-transition" initial={prefersReducedMotion?false:{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={prefersReducedMotion?undefined:{opacity:0,y:-5}} transition={{duration:0.2,ease:[0.22,1,0.36,1]}}>

      {view==="chats"&&<div className="chat-layout">
        <section className="chat-list-panel"><div className="page-heading"><div><p className="eyebrow">DEIN WORKSPACE</p><h1>Nachrichten</h1><p>Deine Unterhaltungen an einem Ort.</p></div><button className="primary-button" onClick={()=>toast("Neue Unterhaltung: Backend und sichere Geräteidentität fehlen noch.")}><Icon name="message-circle" size={15}/> Neuer Chat</button></div>
          <label className="search-field"><span className="field-icon"><Icon name="search" size={16}/></span><input value={search} onChange={e=>setSearch(safeUserText(e.target.value,80))} placeholder="Unterhaltungen suchen" aria-label="Unterhaltungen suchen"/></label>
          <div className="chat-list">{filtered.map((c,index)=><motion.button key={c.id} onClick={()=>setActiveId(c.id)} className={activeId===c.id?"chat-list-item active":"chat-list-item"} layout initial={prefersReducedMotion?false:{opacity:0,x:-8}} animate={{opacity:1,x:0}} whileHover={prefersReducedMotion?undefined:{x:3}} whileTap={prefersReducedMotion?undefined:{scale:0.99}} transition={{duration:0.18,delay:prefersReducedMotion?0:Math.min(index*0.025,0.12)}}><UserAvatar name={c.name} src={c.avatarUrl} online={c.online} /><span className="chat-list-copy"><b>{c.name}</b><small>{c.preview}</small></span><span className="chat-list-meta"><time>{c.time}</time>{c.unread&&<i>{c.unread}</i>}</span></motion.button>)}</div>
        </section>
        <section className="conversation-panel"><header className="conversation-header"><UserAvatar name={active.name} src={active.avatarUrl} online={active.online} /><div><b>{active.name}</b><small>{active.online?"Online · Demo-Status":"Unterhaltung"}</small></div><span className="conversation-type">{active.kind==="p2p"?"P2P":active.kind==="public"?"ÖFFENTLICH":active.kind==="private"?"PRIVAT":"DIREKT"}</span><div className="conversation-actions"><button className="icon-action" aria-label="Videoanruf" title="Videoanruf" onClick={()=>toast("Videoanrufe werden nach der Medien- und E2EE-Implementierung aktiviert.")}><Icon name="video" size={18}/></button><button className="icon-action" aria-label="Sprachanruf" title="Sprachanruf" onClick={()=>toast("Sprachanrufe werden nach der Medien- und E2EE-Implementierung aktiviert.")}><Icon name="phone" size={17}/></button><button className="icon-action" aria-label="Chat-Details" title="Chat-Details" onClick={()=>toast("Chat-Details sind Teil der nächsten UI-Ausbaustufe.")}><Icon name="dots" size={19}/></button></div></header>
          <div className="security-warning"><span><Icon name="shield-lock" size={18}/></span><div><b>E2EE ist noch nicht aktiv</b><small>Dies ist eine lokale UI-Demo. Keine echten oder vertraulichen Nachrichten eingeben.</small></div></div>
          <div className="message-feed"><div className="day-label"><span>HEUTE · DEMO</span></div><AnimatePresence initial={false}>{active.messages.map((m,index)=><motion.div key={m.id} layout initial={prefersReducedMotion?false:{opacity:0,y:12,scale:0.985}} animate={{opacity:1,y:0,scale:1}} transition={{type:"spring",stiffness:420,damping:32,delay:prefersReducedMotion?0:Math.min(index*0.018,0.1)}} className={m.author==="you"?"message-line own":"message-line"}><div className="bubble"><p>{m.text}</p><time>{m.time}{m.author==="you"&&" · ✓"}</time></div></motion.div>)}</AnimatePresence></div>
          <form className="message-composer" onSubmit={send}><button type="button" aria-label="Datei anhängen" onClick={()=>toast("Dateianhänge werden nach E2EE implementiert.")}><Icon name="paperclip" size={17}/></button><input value={draft} onChange={e=>setDraft(safeUserText(e.target.value,1000))} placeholder="Demo-Nachricht eingeben …" aria-label="Demo-Nachricht eingeben"/><span title="Noch nicht verschlüsselt"><Icon name="lock" size={15}/></span><motion.button className="send-action" disabled={!draft.trim()} aria-label="Lokal hinzufügen" whileHover={prefersReducedMotion?undefined:{scale:1.06}} whileTap={prefersReducedMotion?undefined:{scale:0.9,rotate:-7}} transition={{type:"spring",stiffness:520,damping:24}}><Icon name="arrow-up" size={18}/></motion.button></form><small className="composer-caption">Nur lokale Demo · kein Netzwerkversand</small>
        </section>
      </div>}

      {view==="discover"&&<section className="content-page"><div className="page-heading"><div><p className="eyebrow">COMMUNITY</p><h1>Entdecken</h1><p>Öffentliche Räume finden und privaten Räumen beitreten.</p></div><span className="section-chip">3 DEMO-RÄUME</span></div><div className="filter-row"><button className="filter-active">Alle Räume</button><button>Technologie</button><button>Gaming</button><button>Kreativ</button></div><div className="room-grid">{[{id:"public-dev",name:"Quantum Developers",desc:"Entwicklung, Architektur und Open Source.",members:"1.284 Mitglieder",tag:"TECHNOLOGIE",initial:"Q"},{id:"public-gaming",name:"Gaming Lounge",desc:"Spiele, Community und gemeinsame Sessions.",members:"842 Mitglieder",tag:"GAMING",initial:"G"},{id:"private-lab",name:"Private Design Lab",desc:"Ein geschlossener Testraum mit Zugangscode.",members:"24 Mitglieder",tag:"PRIVAT",initial:"P"}].map(room=><article className="room-card" key={room.id}><div className="room-art"><Icon name={room.id==="private-lab"?"key":room.id==="public-gaming"?"users-group":"world"} size={34} strokeWidth={1.5}/><small>{room.tag}</small></div><div className="room-body"><h3>{room.name}</h3><p>{room.desc}</p><div className="room-meta"><span>{room.members}</span><span className="room-visibility"><Icon name={room.id==="private-lab"?"lock":"world"} size={13}/>{room.id==="private-lab"?"Privat":"Öffentlich"}</span></div><button className="secondary-button" onClick={()=>{setJoined(v=>v.includes(room.id)?v:[...v,room.id]);toast(room.id==="private-lab"?"Demo: Zugangscode-Dialog folgt.":"Raum in der lokalen Vorschau vorgemerkt.")}}>{joined.includes(room.id)?<><Icon name="check" size={14}/> Vorgemerkt</>:room.id==="private-lab"?<><Icon name="key" size={14}/> Zugangscode eingeben</>:<>Raum ansehen <Icon name="chevron-down" size={14}/></>}</button></div></article>)}</div><div className="info-panel"><b>Raum-Sichtbarkeit ist nicht Nachrichten-Sichtbarkeit.</b><p>Auch öffentliche Räume sollen Nachrichten ausschließlich Ende-zu-Ende-verschlüsselt übertragen. Die öffentliche Kennzeichnung betrifft Auffindbarkeit und Beitritt.</p></div></section>}

      {view==="friends"&&<section className="content-page"><div className="page-heading"><div><p className="eyebrow">SOZIALES</p><h1>Kontakte</h1><p>Freunde, Anfragen und deine Verbindungen.</p></div><button className="primary-button" onClick={()=>toast("Suche nach Quantum-ID wird später mit dem Identitätsdienst verbunden.")}><Icon name="user-plus" size={15}/> Kontakt finden</button></div><div className="two-column"><div className="surface-card"><div className="card-heading"><h2>Freundschaftsanfragen</h2><span>{requests.length}</span></div>{requests.length?requests.map(name=><div className="person-row" key={name}><UserAvatar name={name} /><div><b>{name}</b><small>Möchte sich mit dir verbinden</small></div><button className="small-primary" onClick={()=>{setFriends(v=>[...v,name]);setRequests(v=>v.filter(n=>n!==name));toast(name+" als Demo-Kontakt hinzugefügt.")}}>Annehmen</button><button className="small-quiet" aria-label="Anfrage ablehnen" onClick={()=>setRequests(v=>v.filter(n=>n!==name))}><Icon name="x" size={14}/></button></div>):<p className="muted-copy">Keine offenen Anfragen.</p>}</div><div className="surface-card"><div className="card-heading"><h2>Deine Kontakte</h2><span>{friends.length}</span></div>{friends.map(name=><div className="person-row" key={name}><UserAvatar name={name} /><div><b>{name}</b><small>Quantum-Mitglied · Demo</small></div><button className="small-quiet" onClick={()=>toast("Profilansicht wird ergänzt.")}>Profil</button></div>)}</div></div></section>}

      {view==="profile"&&<section className="content-page narrow-page"><div className="page-heading"><div><p className="eyebrow">DEIN AUFTRITT</p><h1>Profil</h1><p>Deine öffentliche Quantum-Identität.</p></div><button className="secondary-button" onClick={()=>toast("Profiländerungen sind in dieser Vorschau lokal.")}><Icon name="pencil" size={14}/> Profil bearbeiten</button></div><div className="profile-hero"><UserAvatar name="Quantum User" className="profile-avatar" size="large" /><div><h2>Quantum User</h2><p>@quantum-demo · QID wird später erzeugt</p><span className="profile-badge"><Icon name="sparkles" size={13}/> Early Explorer · Demo-Badge</span></div></div><div className="stats-grid"><div><b>2</b><small>Freunde</small></div><div><b>12</b><small>Follower</small></div><div><b>7 Tage</b><small>Mitglied seit · Demo</small></div></div><div className="surface-card"><div className="card-heading"><h2>Badges</h2><span>2 DEMO</span></div><div className="badge-list"><span><Icon name="sparkles" size={13}/> Early Explorer</span><span><Icon name="shield-check" size={13}/> Privacy Advocate</span><span className="locked-badge"><Icon name="users" size={13}/> Community Builder · gesperrt</span></div></div><div className="info-panel"><b>Datensparsamkeit</b><p>Follower-Zahlen, Beitrittsdatum und Profilfelder sollen einzeln kontrollierbar sein. Die Demo zeigt Beispieldaten, keine echten Nutzerinformationen.</p></div></section>}

      {view==="settings"&&<section className="content-page narrow-page"><div className="page-heading"><div><p className="eyebrow">KONTROLLE</p><h1>Einstellungen</h1><p>Datenschutz und Client-Verhalten konfigurieren.</p></div></div><div className="surface-card settings-card"><div className="card-heading"><h2>Quantum Guardian</h2><span className="status-label">CLIENT-SEITIG GEPLANT</span></div><p className="muted-copy">Lokale Inhaltsprüfung auf deinem Gerät. Diese Vorschau analysiert keine Nachrichten.</p><div className="setting-row"><div><b>Guardian aktivieren</b><small>Lokale Erkennung problematischer Inhalte (später)</small></div><button className={guardian?"toggle on":"toggle"} onClick={()=>setGuardian(v=>!v)} aria-pressed={guardian}><i/></button></div><div className="setting-row"><div><b>Beleidigungen und Belästigung</b><small>Nur relevant, wenn Guardian aktiv ist</small></div><button className={guardianFilter?"toggle on":"toggle"} onClick={()=>setGuardianFilter(v=>!v)} aria-pressed={guardianFilter}><i/></button></div></div><div className="surface-card settings-card"><div className="card-heading"><h2>Privatsphäre</h2><span className="status-label">VORSCHAU</span></div>{["Lesebestätigungen","Online-Status anzeigen","Profil in öffentlicher Suche anzeigen","Follower-Liste öffentlich anzeigen"].map((label,i)=><div className="setting-row" key={label}><div><b>{label}</b><small>{i===0?"Kontrolliere, ob andere deine Lesebestätigung sehen.":"Diese Einstellung wird später lokal gespeichert."}</small></div><span className="coming-soon">Später</span></div>)}</div><div className="surface-card settings-card"><div className="card-heading"><h2>Sitzung und Geräte</h2></div><p className="muted-copy">Geräteverwaltung, aktive Sitzungen, Schlüsselprüfung und sichere Wiederherstellung werden vor dem Backend-Start spezifiziert.</p></div></section>}

      {view==="support"&&<section className="content-page"><div className="page-heading"><div><p className="eyebrow">STAFF WORKSPACE</p><h1>Support-Konsole</h1><p>Moderationsoberfläche als reine Designvorschau.</p></div><span className="section-chip warning-chip">KEIN ECHTER STAFF-ZUGRIFF</span></div><div className="info-panel warning-panel"><b>Nur Demo-Daten.</b><p>Es gibt noch keine Anmeldung, Rollenprüfung oder Moderationsaktionen. Später muss jede Aktion serverseitig autorisiert und revisionssicher protokolliert werden.</p></div><div className="support-stats"><div><small>Offene Reports</small><b>08</b></div><div><small>In Prüfung</small><b>03</b></div><div><small>Konten eingefroren</small><b>02</b></div><div><small>Aktionen heute</small><b>14</b></div></div><div className="surface-card"><div className="card-heading"><h2>Report-Warteschlange</h2><span>BEISPIELDATEN</span></div>{[{name:"Demo User 104",reason:"Belästigung · Chat",status:"Neu"},{name:"Demo User 208",reason:"Spam · Öffentlicher Raum",status:"In Prüfung"},{name:"Demo User 312",reason:"Unangemessener Inhalt · Nutzerreport",status:"Neu"}].map((r,i)=><div className="report-row" key={r.name}><div><b>{r.name}</b><small>{r.reason}</small></div><span className="report-status">{r.status}</span><button className="small-quiet" onClick={()=>toast("Report-Detailansicht wird später mit echten, berechtigten Supportkonten verbunden.")}>Öffnen</button></div>)}</div></section>}
        </motion.div>
      </AnimatePresence>
    </section>
  </main>;
}
