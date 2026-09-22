/**
 * productsData.js
 * Data for 360techx — HR & Accounts flagship products plus suite, industries, testimonials
 */

export const flagshipProducts = [
  {
    id: 'hr360techx',
    name: 'HR360techx',
    fullName: 'Human Resource Management System',
    acronym: 'HRM',
    badge: 'HRM · Payroll · Attendance',
    icon: '👥',
    color: 'blue',
    url: 'https://hr360techx.com',
    tagline: 'Complete HR & Payroll Automation for Modern Businesses',
    description:
      'An all-in-one Human Resource Management System (HRM) that automates payroll processing, attendance tracking, leave management, and employee lifecycle operations — from hire to retire.',
    keyFeatures: [
      'Automated gross-to-net payroll with direct deposit (ACH/NACHA)',
      'Biometric & GPS-based attendance and shift management',
      'Leave & PTO approval workflows with holiday calendars',
      'Employee self-service portal for payslips, tax forms & requests',
      'Recruitment, onboarding & offboarding workflows',
      'Statutory compliance, EOBI, PESSI & tax deduction reports',
    ],
    stats: [
      { label: 'Payroll Processing Time', value: '−85%' },
      { label: 'Tax Accuracy', value: '100%' },
      { label: 'Employee Self-Service', value: '94%' },
    ],
    ctaLabel: 'Explore HR360techx →',
  },
  {
    id: 'accounts360techx',
    name: 'Accounts360techx',
    fullName: 'Financial Management System',
    acronym: 'FMS',
    badge: 'FMS · ERP · Accounting',
    icon: '📊',
    color: 'teal',
    url: 'https://accounts360techx.com',
    tagline: 'Intelligent Financial Management & Accounting ERP',
    description:
      'A comprehensive Financial Management System (FMS) and Accounting ERP that handles your entire financial lifecycle — from invoicing and bank reconciliation to P&L statements and tax compliance.',
    keyFeatures: [
      'Chart of Accounts & double-entry bookkeeping engine',
      'Accounts Receivable (AR) & Accounts Payable (AP) automation',
      'Bank reconciliation with automated statement import',
      'Real-time P&L, Balance Sheet & Cash Flow statements',
      'Invoicing, purchase orders & expense management',
      'GST, VAT & multi-currency tax compliance reporting',
    ],
    stats: [
      { label: 'Invoice Processing Speed', value: '4× Faster' },
      { label: 'Reconciliation Accuracy', value: '99.9%' },
      { label: 'Financial Close Time', value: '−70%' },
    ],
    ctaLabel: 'Explore Accounts360techx →',
  },
];

export const solutionSuite = [
  {
    id: 'crm',
    label: 'CRM',
    fullName: 'Customer Relationship Management',
    icon: '🤝',
    description:
      'Manage customer pipelines, sales funnels, follow-ups, and support tickets in one unified platform.',
  },
  {
    id: 'hrm',
    label: 'HRM',
    fullName: 'Human Resource Management',
    icon: '👥',
    description:
      'End-to-end HR automation covering payroll, attendance, leave, recruitment, and compliance.',
  },
  {
    id: 'erp',
    label: 'ERP',
    fullName: 'Enterprise Resource Planning',
    icon: '🏗️',
    description:
      'Integrate finance, operations, procurement, and HR into a single connected business platform.',
  },
  {
    id: 'fms',
    label: 'FMS',
    fullName: 'Financial Management System',
    icon: '📊',
    description:
      'Full-cycle accounting, budgeting, invoicing, bank reconciliation, and real-time financial reporting.',
  },
];

export const whyUs = [
  {
    icon: '📜',
    title: 'US-Registered Entity',
    desc: 'Incorporated in Delaware, USA — giving you enforceable IP ownership and US-standard contracts.',
  },
  {
    icon: '🔒',
    title: 'Security & Compliance',
    desc: 'SOC 2 ready, HIPAA-aligned, AES-256 encryption at rest and TLS 1.3 in transit.',
  },
  {
    icon: '⚡',
    title: 'Cloud-Native Architecture',
    desc: 'Multi-AZ AWS deployment with 99.99% uptime SLA, auto-scaling, and zero-downtime releases.',
  },
  {
    icon: '🛠️',
    title: 'Dedicated Support',
    desc: 'Dedicated account manager, same-day SLA for critical issues, and proactive monitoring 24/7.',
  },
];

export const clientIndustries = [
  { name: 'Manufacturing & Industry', icon: '🏭', desc: 'ERP for production planning, procurement & inventory' },
  { name: 'Retail & Supermarkets', icon: '🏪', desc: 'Omnichannel POS, stock sync & supplier reorders' },
  { name: 'Corporate Enterprises', icon: '🏢', desc: 'HRM, global payroll & employee life-cycle management' },
  { name: 'Healthcare & Clinics', icon: '🏥', desc: 'HIPAA-compliant billing, HR & patient management' },
  { name: 'Education & Academies', icon: '🏫', desc: 'HR for staff, fee management & academic ERP' },
  { name: 'Logistics & Supply Chain', icon: '🚚', desc: 'Fleet HR, warehouse management & financial tracking' },
];

export const clientTestimonials = [
  {
    quote:
      'HR360techx completely transformed our payroll operations. We went from 3 days of manual processing down to a few clicks. The biometric attendance integration alone saved our HR team 30+ hours per month.',
    author: 'Imran Khalid',
    role: 'CEO',
    company: 'Khalid Industries (Lahore, PK)',
    avatar: 'IK',
    rating: 5,
  },
  {
    quote:
      'Accounts360techx gave us real-time visibility into our financials for the first time. Bank reconciliation that used to take 2 days now finishes in under an hour. The P&L and Balance Sheet reports are exactly what our auditors need.',
    author: 'Sarah Mahmood',
    role: 'CFO',
    company: 'Mahmood Trading Group (Karachi, PK)',
    avatar: 'SM',
    rating: 5,
  },
  {
    quote:
      'We deployed both the HR and Accounts modules across our 4 branches. The seamless payroll-to-accounts integration means our books are always reconciled. Exceptional product quality and responsive support team.',
    author: 'Ahmed Raza',
    role: 'Director of Operations',
    company: 'Raza Textiles Ltd (Faisalabad, PK)',
    avatar: 'AR',
    rating: 5,
  },
];
