import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FACTS, answerFromKnowledge } from "./knowledge.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8000;
const dataDir = path.join(__dirname, "data");

const allowedOrigins = (process.env.CORS_ORIGINS || process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,https://360techx.com,https://www.360techx.com")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  })
);
app.use(express.json({ limit: "32kb" }));

const hits = new Map();

function isLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 30) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function appendRecord(fileName, record) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.appendFileSync(path.join(dataDir, fileName), `${JSON.stringify(record)}\n`);
}

function clean(value, max = 500) {
  return String(value || "").trim().slice(0, max);
}

async function answerWithModel(message, history) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const prior = history
    .filter((item) => item && (item.role === "user" || item.role === "assistant"))
    .slice(-8)
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: clean(item.content, 2000),
    }));

  const response = await fetch(
    `${process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"}/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `You are 360techx Bot on 360techx.com. Be concise and professional. Never invent prices, phone numbers, or customer results. If you cannot answer, offer a demo or contact@360techx.com. Do not ask for passwords or payment details.\n\n${FACTS}`,
          },
          ...prior,
          { role: "user", content: message },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    }
  );

  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Empty AI reply");
  return reply;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  const ip = req.ip || "unknown";
  if (isLimited(ip)) {
    res.status(429).json({ error: "Too many messages. Please try again in a minute." });
    return;
  }

  const message = clean(req.body?.message, 2000);
  if (!message) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  const history = Array.isArray(req.body?.history) ? req.body.history : [];
  let reply = answerFromKnowledge(message);
  let source = "knowledge";

  try {
    const modelReply = await answerWithModel(message, history);
    if (modelReply) {
      reply = modelReply;
      source = "model";
    }
  } catch (error) {
    console.error("AI fallback:", error.message);
  }

  appendRecord("conversations.jsonl", {
    at: new Date().toISOString(),
    ip,
    message,
    reply,
    source,
  });

  res.json({ reply });
});

app.post("/api/leads", (req, res) => {
  const ip = req.ip || "unknown";
  if (isLimited(ip)) {
    res.status(429).json({ error: "Too many requests. Please try again in a minute." });
    return;
  }

  const name = clean(req.body?.name, 120);
  const email = clean(req.body?.email, 180);
  const phone = clean(req.body?.phone, 40);
  const interest = clean(req.body?.interest, 40);
  const message = clean(req.body?.message, 2000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Name and a valid email are required." });
    return;
  }

  appendRecord("leads.jsonl", {
    at: new Date().toISOString(),
    ip,
    name,
    email,
    phone,
    interest,
    message,
  });

  res.json({ ok: true });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Chatbot API running on port ${port}`);
});
