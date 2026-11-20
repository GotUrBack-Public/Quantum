"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = { id: string; author: "you" | "them"; text: string; time: string };
type Conversation = { id: string; name: string; initials: string; preview: string; time: string; unread?: number; online?: boolean; messages: Message[] };

const initialConversations: Conversation[] = [
  { id: "lea", name: "Lea", initials: "L", preview: "Alles klar, bis später!", time: "09:42", unread: 2, online: true, messages: [
    { id: "1", author: "them", text: "Hey! Hast du kurz Zeit?", time: "09:38" },
    { id: "2", author: "you", text: "Ja, was gibt's?", time: "09:39" },
    { id: "3", author: "them", text: "Ich wollte dir Quantum zeigen.", time: "09:41" },
    { id: "4", author: "them", text: "Alles klar, bis später!", time: "09:42" },
  ]},
  { id: "dev", name: "Dev Community", initials: "D", preview: "Mika: Neues Update ist online", time: "08:56", messages: [
    { id: "5", author: "them", text: "Willkommen im Entwicklungsraum.", time: "08:50" },
    { id: "6", author: "them", text: "Mika: Neues Update ist online", time: "08:56" },
  ]},
  { id: "alex", name: "Alex", initials: "A", preview: "Sprachnachricht", time: "Gestern", messages: [
    { id: "7", author: "them", text: "Lass uns morgen sprechen.", time: "18:20" },
  ]},
];

export default function Home() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState("lea");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const active = conversations.find((item) => item.id === activeId) ?? conversations[0];
  const filtered = useMemo(() => conversations.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [conversations, query]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const now = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(new Date());
    setConversations((items) => items.map((item) => item.id === activeId ? {
      ...item,
      preview: text,
      time: now,
      messages: [...item.messages, { id: crypto.randomUUID(), author: "you", text, time: now }],
    } : item));
    setDraft("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">Q</div><span>quantum</span><span className="beta">PREVIEW</span></div>
        <div className="profile-strip"><div className="avatar self">Q</div><div className="profile-copy"><strong>Dein Quantum</strong><span>Lokale Vorschau</span></div><button className="icon-button" aria-label="Einstellungen">⌘</button></div>
        <div className="section-heading"><span>NACHRICHTEN</span><button className="icon-button add" onClick={() => setShowNewChat((value) => !value)} aria-label="Neuer Chat">＋</button></div>
        {showNewChat && <div className="notice">Neue Chats werden freigeschaltet, sobald Identität und Schlüsselregistrierung implementiert sind.</div>}
        <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Chats durchsuchen" /></label>
        <div className="conversation-list">
          {filtered.map((conversation) => <button key={conversation.id} className={`conversation ${activeId === conversation.id ? "selected" : ""}`} onClick={() => setActiveId(conversation.id)}>
            <div className="avatar">{conversation.initials}{conversation.online && <i />}</div>
            <div className="conversation-main"><div className="conversation-top"><strong>{conversation.name}</strong><time>{conversation.time}</time></div><div className="conversation-bottom"><span>{conversation.preview}</span>{conversation.unread && <b>{conversation.unread}</b>}</div></div>
          </button>)}
          {filtered.length === 0 && <p className="empty-search">Keine Chats gefunden.</p>}
        </div>
        <div className="sidebar-footer"><span className="lock-dot">◆</span> Privacy-first by design</div>
      </aside>

      <section className="chat-panel">
        <header className="chat-header">
          <div className="avatar">{active.initials}{active.online && <i />}</div>
          <div className="chat-heading"><strong>{active.name}</strong><span>{active.online ? "Online" : "Zuletzt aktiv"}</span></div>
          <div className="header-actions"><span className="e2ee-pill"><span>▣</span> E2EE geplant</span><button className="icon-button" aria-label="Weitere Optionen">···</button></div>
        </header>
        <div className="security-banner"><span>◇</span><div><strong>Private Kommunikation ist das Ziel.</strong><p>Diese Vorschau ist noch nicht verschlüsselt und sendet keine Nachrichten.</p></div></div>
        <div className="messages-area">
          <div className="date-divider"><span>HEUTE</span></div>
          {active.messages.map((message) => <div key={message.id} className={`message-row ${message.author === "you" ? "outgoing" : ""}`}>
            <div className="message-bubble"><p>{message.text}</p><time>{message.time}{message.author === "you" && <span className="ticks"> ✓</span>}</time></div>
          </div>)}
        </div>
        <form className="composer" onSubmit={sendMessage}>
          <button type="button" className="attach-button" aria-label="Anhang" title="Anhänge folgen später">＋</button>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Nachricht schreiben …" aria-label="Nachricht" />
          <span className="composer-lock" title="E2EE noch nicht implementiert">◇</span>
          <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Nachricht lokal hinzufügen">↑</button>
        </form>
        <div className="composer-footnote">Lokale UI-Demo · Nachrichten bleiben nur in diesem Browser-Tab</div>
      </section>
      <aside className="details-panel">
        <div className="details-top"><span>CHAT-INFORMATIONEN</span><button className="icon-button" aria-label="Schließen">×</button></div>
        <div className="contact-card"><div className="avatar large">{active.initials}</div><h2>{active.name}</h2><p>{active.online ? "Online" : "Quantum Mitglied"}</p><span className="contact-id">QID · DEMO-{active.id.toUpperCase()}</span></div>
        <div className="detail-divider" />
        <div className="detail-block"><span className="detail-label">SICHERHEIT</span><div className="detail-line"><span className="detail-icon">◇</span><div><strong>Ende-zu-Ende-Verschlüsselung</strong><small>Noch nicht verfügbar</small></div></div><div className="detail-line"><span className="detail-icon">⌁</span><div><strong>Schlüsselverifizierung</strong><small>Wird implementiert</small></div></div></div>
        <div className="detail-divider" />
        <div className="detail-block"><span className="detail-label">GEPLANTE FUNKTIONEN</span><div className="feature-tag">Sichere Dateiübertragung</div><div className="feature-tag">Geräteverwaltung</div><div className="feature-tag">Quantum Guardian</div></div>
        <div className="details-bottom">QUANTUM · BUILD 0.1.0</div>
      </aside>
    </main>
  );
}
