export const FACTS = `
360techx builds enterprise software: HR, Accounts, POS, School Management, plus CRM, ERP, and FMS.
Contact email: contact@360techx.com. There is no public phone number on the website.
Pricing is quoted after a demo, based on modules, users, and deployment. Do not invent prices.
A solutions expert replies to demo requests within 2–4 business hours.

HR360techx (https://hr360techx.com): payroll, attendance, leave, employee self-service, recruitment, and statutory reports (EOBI, PESSI, tax).
Accounts360techx (https://accounts360techx.com): chart of accounts, double-entry accounting, AR/AP, bank reconciliation, P&L, balance sheet, cash flow, invoicing, purchase orders, and tax reports.
POS: retail and supermarket point of sale, stock sync, and supplier reorders.
School Management: staff HR, fee management, and academic ERP for schools and academies.
ERP connects finance, operations, procurement, and HR. CRM covers pipelines, follow-ups, and support tickets.
`;

const topics = [
  {
    keywords: ["price", "pricing", "cost", "quote", "charges", "fee"],
    answer:
      "Pricing is quoted after a short demo. It depends on the modules you need (HR, Accounts, POS, School), how many users you have, and whether you want cloud or your own server. I can open the demo form if you want a quote.",
  },
  {
    keywords: ["hr360", "payroll", "attendance", "leave", "hrm", "human resource", "employee"],
    answer:
      "HR360techx covers payroll, biometric and GPS attendance, leave approvals, employee self-service, recruitment, and statutory reports such as EOBI, PESSI, and tax. You can see it at hr360techx.com, or I can book a demo.",
  },
  {
    keywords: ["account", "invoice", "accounting", "finance", "fms", "ledger", "reconcil"],
    answer:
      "Accounts360techx is the finance system: chart of accounts, double-entry books, receivables and payables, bank reconciliation, invoicing, purchase orders, and live P&L, balance sheet, and cash flow. Details are at accounts360techx.com.",
  },
  {
    keywords: ["pos", "point of sale", "retail", "supermarket", "cashier", "barcode"],
    answer:
      "The POS module is built for retail and supermarkets: checkout, stock sync across outlets, and supplier reorders. Tell me your store count and I can line up a demo around that.",
  },
  {
    keywords: ["school", "academy", "student", "fee", "campus", "education"],
    answer:
      "School Management covers staff HR, fee collection, and academic operations for schools and academies. A demo is the fastest way to see admissions, fees, and staff in one place.",
  },
  {
    keywords: ["erp", "crm", "suite", "service", "product", "module", "software"],
    answer:
      "The suite is HR360techx, Accounts360techx, POS, and School Management, with CRM and ERP when you want sales, finance, procurement, and HR in one system. Which of those should we start with?",
  },
  {
    keywords: ["demo", "consult", "book", "meeting", "call"],
    answer:
      "I can open the demo form. Share your name, work email, and the product you care about. A solutions expert usually replies within 2–4 business hours.",
  },
  {
    keywords: ["contact", "email", "phone", "reach", "address"],
    answer:
      "Email contact@360techx.com, or use Book a Demo on this site. A solutions expert replies within 2–4 business hours.",
  },
];

export function answerFromKnowledge(message) {
  const text = String(message || "").toLowerCase();
  if (/^(hi|hello|hey|salam|assalam|aoa)\b/.test(text.trim())) {
    return "Hi, I’m 360techx Bot. We build HR, Accounts, POS, and School Management software. What would you like to look at?";
  }

  let best = null;
  let score = 0;
  for (const topic of topics) {
    let next = 0;
    for (const word of topic.keywords) {
      if (text.includes(word)) next += word.length > 4 ? 2 : 1;
    }
    if (next > score) {
      score = next;
      best = topic;
    }
  }

  if (best && score > 0) return best.answer;
  return "I can help with HR, Accounts, POS, and School Management, or book a demo with the team. What do you want to know?";
}
