import "./styles/chatbot.css";

const QUICK_ACTIONS = [
  { id: "demo", label: "Book a Demo" },
  { id: "consult", label: "Free Consultation" },
  { id: "services", label: "Our Services" },
  { id: "request", label: "Submit a Request" },
  { id: "other", label: "Something Else" },
];

function apiBase() {
  if (import.meta.env.VITE_CHATBOT_API_URL) {
    return import.meta.env.VITE_CHATBOT_API_URL.replace(/\/$/, "");
  }
  const host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "http://localhost:8000";
  return "https://360techx.com";
}

function openConsultation(product) {
  const modal = document.getElementById("consultation-modal");
  if (!modal) return;
  const select = document.getElementById("f-product");
  if (select && product) select.value = product;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

export function initChatbot() {
  const root = document.createElement("div");
  root.className = "tx-chat";
  root.innerHTML = `
    <div class="tx-chat__panel" role="dialog" aria-label="360techx chat">
      <div class="tx-chat__header">
        <div>
          <div class="tx-chat__title">360techx Bot</div>
          <div class="tx-chat__subtitle">HR · Accounts · POS · School</div>
        </div>
        <button class="tx-chat__close" type="button" aria-label="Close chat">✕</button>
      </div>
      <div class="tx-chat__messages"></div>
      <form class="tx-chat__composer">
        <div class="tx-chat__input">
          <input type="text" name="message" placeholder="Type a message…" autocomplete="off" maxlength="2000" />
        </div>
        <button class="tx-chat__send" type="submit">Send</button>
      </form>
    </div>
    <button class="tx-chat__launcher" type="button" aria-label="Open chat" aria-expanded="false">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v6A3.5 3.5 0 0 1 15.5 16H9l-4 4v-4.2A3.5 3.5 0 0 1 5 12.5v-6Z" stroke="currentColor" stroke-width="1.8"/>
      </svg>
    </button>
  `;
  document.body.appendChild(root);

  const panel = root.querySelector(".tx-chat__panel");
  const launcher = root.querySelector(".tx-chat__launcher");
  const messages = root.querySelector(".tx-chat__messages");
  const form = root.querySelector(".tx-chat__composer");
  const input = form.querySelector("input");
  const sendBtn = form.querySelector(".tx-chat__send");
  const history = [];

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = `tx-chat__msg tx-chat__msg--${role}`;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    history.push({ role, content: text });
    return el;
  }

  function addQuickReplies() {
    const wrap = document.createElement("div");
    wrap.className = "tx-chat__quick";
    QUICK_ACTIONS.forEach((action) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tx-chat__chip";
      button.textContent = action.label;
      button.addEventListener("click", () => handleAction(action));
      wrap.appendChild(button);
    });
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function setOpen(open) {
    root.classList.toggle("is-open", open);
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "Close chat" : "Open chat");
    if (open) input.focus();
  }

  function showLeadForm() {
    const card = document.createElement("form");
    card.className = "tx-chat__form";
    card.innerHTML = `
      <input name="name" placeholder="Full name" required />
      <input name="email" type="email" placeholder="Work email" required />
      <input name="phone" type="tel" placeholder="Phone (optional)" />
      <select name="interest" required>
        <option value="">Product of interest</option>
        <option value="hr">HR360techx</option>
        <option value="accounts">Accounts360techx</option>
        <option value="pos">POS</option>
        <option value="school">School Management</option>
        <option value="erp">Full ERP suite</option>
        <option value="other">Something else</option>
      </select>
      <textarea name="message" rows="3" placeholder="What do you need?"></textarea>
      <button class="tx-chat__submit" type="submit">Send request</button>
    `;
    card.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(card).entries());
      const button = card.querySelector("button");
      button.disabled = true;
      try {
        const response = await fetch(`${apiBase()}/api/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Lead failed");
        card.remove();
        addMessage("assistant", "Request received. A solutions expert will reply within 2–4 business hours.");
      } catch {
        button.disabled = false;
        addMessage("assistant", "I couldn’t save that request. Email contact@360techx.com and the team will pick it up.");
      }
    });
    messages.appendChild(card);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleAction(action) {
    addMessage("user", action.label);
    if (action.id === "demo" || action.id === "consult") {
      addMessage("assistant", "Opening the demo form. Add your name, work email, and the product you want to see.");
      setOpen(false);
      openConsultation();
      return;
    }
    if (action.id === "services") {
      addMessage(
        "assistant",
        "We build four systems:\n• HR360techx — payroll, attendance, and HR\n• Accounts360techx — accounting and finance\n• POS — retail checkout and stock\n• School Management — fees, staff, and academics\n\nWhich one should we look at?"
      );
      return;
    }
    if (action.id === "request") {
      addMessage("assistant", "Send your details and a solutions expert will follow up.");
      showLeadForm();
      return;
    }
    addMessage("assistant", "Tell me what you need — HR, accounts, POS, school, or a custom ERP.");
    input.focus();
  }

  async function sendMessage(text) {
    const prior = history.slice(-8);
    addMessage("user", text);
    sendBtn.disabled = true;
    try {
      const response = await fetch(`${apiBase()}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: prior,
        }),
      });
      if (!response.ok) throw new Error("Chat failed");
      const data = await response.json();
      addMessage("assistant", data.reply || "I didn’t catch that. Try Book a Demo or email contact@360techx.com.");
    } catch {
      addMessage(
        "assistant",
        "I can’t reach the assistant right now. Email contact@360techx.com or use Book a Demo."
      );
    } finally {
      sendBtn.disabled = false;
    }
  }

  launcher.addEventListener("click", () => setOpen(!root.classList.contains("is-open")));
  root.querySelector(".tx-chat__close").addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    sendMessage(text);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !root.classList.contains("is-open")) return;
    const modal = document.getElementById("consultation-modal");
    if (modal?.classList.contains("active")) return;
    setOpen(false);
  });

  addMessage("assistant", "Hi, I’m 360techx Bot. How can we help?");
  addQuickReplies();
}
