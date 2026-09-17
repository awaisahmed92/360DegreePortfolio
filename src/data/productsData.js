/**
 * productsData.js
 * Comprehensive data for the 6 core software product lines and services
 */

export const companyProducts = [
  {
    id: 'hr-payroll',
    name: 'HR & Global Payroll Suite',
    badge: 'Enterprise SaaS',
    icon: '👥',
    tagline: 'Automated Multi-State Payroll, Time Tracking & Employee Lifecycle Management',
    description: 'An all-in-one Human Resource Information System (HRIS) designed to streamline payroll processing, tax compliance, employee onboarding, benefits administration, and biometric attendance for growing businesses and enterprises.',
    keyFeatures: [
      'Automated gross-to-net payroll runs with direct deposit (ACH/NACHA)',
      'Multi-state US tax withholding and year-end W-2 / 1099 auto-generation',
      'Biometric and mobile GPS clock-in / clock-out attendance tracking',
      'Custom PTO policies, leave approval workflows, and holiday calendars',
      'Employee self-service portal for payslips, tax forms, and expense claims',
      'Seamless accounting sync with QuickBooks, Xero, and enterprise ERPs'
    ],
    stats: [
      { label: 'Payroll Processing Time', value: '-85%' },
      { label: 'Tax Compliance Accuracy', value: '100%' },
      { label: 'Employee Self-Service Rate', value: '94%' }
    ],
    techStack: ['Node.js / Express', 'PostgreSQL', 'React / Next.js', 'Redis Queue', 'AWS SES / S3'],
    mockupType: 'hr-dashboard'
  },
  {
    id: 'school-management',
    name: 'School & Campus Management ERP',
    badge: 'EdTech Solution',
    icon: '🎓',
    tagline: 'Complete Student Information System (SIS), Academic Grading & Automated Fee Billing',
    description: 'A comprehensive campus management platform for K-12 schools, colleges, and training academies. Empowers administrators, educators, students, and parents with centralized digital workflows.',
    keyFeatures: [
      'Online student admissions, document verification, and enrollment records',
      'Interactive gradebook, GPA calculation, report card generation, and transcripts',
      'Automated tuition fee invoicing, online payment gateway, and overdue reminders',
      'Real-time timetable scheduling, classroom allocation, and teacher workload planner',
      'Dedicated iOS & Android Parent Portal for live attendance and homework updates',
      'Library management, campus transport tracking, and hostel allocations'
    ],
    stats: [
      { label: 'Fee Collection Speed', value: '3.5x Faster' },
      { label: 'Administrative Paperwork', value: '-90%' },
      { label: 'Parent Engagement', value: '98%' }
    ],
    techStack: ['Python / Django / FastApi', 'PostgreSQL', 'Vue / React', 'Stripe / Bank APIs', 'Docker'],
    mockupType: 'school-dashboard'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Multi-Vendor Marketplaces',
    badge: 'Omnichannel Commerce',
    icon: '🛒',
    tagline: 'High-Converting Headless Storefronts, Multi-Vendor Portals & Order Fulfillment',
    description: 'Custom e-commerce platforms engineered for lightning-fast page speeds, high conversion rates, multi-currency global checkout, and seamless inventory management across web and mobile.',
    keyFeatures: [
      'Headless Next.js storefronts with sub-second page loads and dynamic SEO',
      'Multi-vendor marketplace support with vendor payouts and commission rules',
      'Integrated payment gateways (Stripe, PayPal, Apple Pay, Google Pay, Klarna)',
      'Real-time inventory sync, SKU variations, and low-stock automated alerts',
      'Smart discount engines, abandoned cart recovery emails, and loyalty programs',
      'Shipping carrier rate calculator (FedEx, UPS, USPS, DHL) with label generation'
    ],
    stats: [
      { label: 'Average Page Load', value: '0.6s' },
      { label: 'Cart Conversion Uplift', value: '+42%' },
      { label: 'Orders Processed / Sec', value: '5,000+' }
    ],
    techStack: ['Next.js 15', 'Node.js', 'PostgreSQL / MongoDB', 'Stripe Connect', 'Algolia Search'],
    mockupType: 'ecommerce-store'
  },
  {
    id: 'pos-systems',
    name: 'Point of Sale (POS) Systems',
    badge: 'Retail & Restaurant',
    icon: '💳',
    tagline: 'Cloud-Powered POS with Offline Mode, Barcode Scanning & Instant Billing',
    description: 'A fast, reliable Point of Sale system built for retail stores, supermarkets, restaurants, and franchise chains. Operates seamlessly on touch terminals, iPads, Android tablets, and desktop workstations.',
    keyFeatures: [
      'Lightning-fast checkout with barcode scanner and touch-screen product grid',
      'Offline-first architecture (keeps selling during internet outages and auto-syncs)',
      'Table management, kitchen display system (KDS), and split-bill for restaurants',
      'Hardware integration with thermal receipt printers, cash drawers, and card readers',
      'Centralized multi-store inventory sync and branch stock transfer management',
      'End-of-day Z-Report generation, cash drawer reconciliation, and staff shifts'
    ],
    stats: [
      { label: 'Checkout Transaction Speed', value: '< 2 Seconds' },
      { label: 'Offline Resilience', value: '100% Uptime' },
      { label: 'Inventory Shrinkage', value: '-35%' }
    ],
    techStack: ['Electron / Web', 'SQLite / IndexedDB (Offline)', 'PostgreSQL', 'WebSockets', 'Esc/Pos Drivers'],
    mockupType: 'pos-terminal'
  },
  {
    id: 'web-apps',
    name: 'Custom Web Applications & SaaS',
    badge: 'Enterprise Engineering',
    icon: '🌐',
    tagline: 'Tailor-Made Enterprise Portals, SaaS Platforms & Internal Business Tools',
    description: 'Custom web software engineered specifically for your business logic. We build scalable multi-tenant SaaS platforms, CRM solutions, customer self-service portals, and operational management systems.',
    keyFeatures: [
      'Multi-tenant cloud architecture with isolated database schemas or Row-Level Security',
      'Enterprise Role-Based Access Control (RBAC), Single Sign-On (SSO) & Audit Logs',
      'Interactive analytics dashboards with real-time charts and exportable reports',
      'RESTful & GraphQL API development for third-party software integrations',
      'SOC 2, HIPAA, and GDPR compliant data storage and encryption protocols',
      'Automated CI/CD deployment pipelines on AWS, Google Cloud, or Microsoft Azure'
    ],
    stats: [
      { label: 'System Availability SLA', value: '99.99%' },
      { label: 'API Response Time', value: '< 30ms' },
      { label: 'Custom Integrations', value: '500+ APIs' }
    ],
    techStack: ['React / Next.js', 'Node.js / Go / Python', 'PostgreSQL / Redis', 'AWS Cloud', 'Docker / K8s'],
    mockupType: 'saas-dashboard'
  },
  {
    id: 'mobile-apps',
    name: 'iOS & Android Mobile Applications',
    badge: 'Mobile Engineering',
    icon: '📱',
    tagline: 'High-Performance Native & Cross-Platform Mobile Apps for Modern Users',
    description: 'Engaging, responsive, and secure mobile applications published to the Apple App Store and Google Play Store. Crafted with smooth 60fps animations, intuitive UI, and offline-capable sync.',
    keyFeatures: [
      'Cross-platform development using React Native & Flutter for 2x faster time-to-market',
      'Native iOS (Swift) and Android (Kotlin) development for specialized performance needs',
      'Push notification campaigns with personalized user segmentation (Firebase / OneSignal)',
      'In-app purchases, subscription billing, and secure biometric login (FaceID / TouchID)',
      'Offline data caching with automated cloud synchronization when connected',
      'Real-time GPS location tracking, mapping, camera scanning, and BLE device pairing'
    ],
    stats: [
      { label: 'App Store Rating Avg', value: '4.8 ★' },
      { label: 'Crash-Free Sessions', value: '99.9%' },
      { label: 'Active Mobile Users', value: '1M+' }
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    mockupType: 'mobile-app'
  }
];

export const clientIndustries = [
  { name: 'Education & Universities', icon: '🏫', desc: 'SIS, fee automation, grading systems' },
  { name: 'Retail & Supermarkets', icon: '🏪', desc: 'Omnichannel POS, inventory sync, loyalty' },
  { name: 'Corporate & Enterprises', icon: '🏢', desc: 'HR & global payroll, employee self-service' },
  { name: 'Healthcare & Clinics', icon: '🏥', desc: 'Patient management, HIPAA billing, scheduling' },
  { name: 'Restaurants & Hospitality', icon: '🍽️', desc: 'Touch POS, kitchen display, table booking' },
  { name: 'Logistics & Supply Chain', icon: '🚚', desc: 'Fleet tracking, warehouse management, WMS' }
];

export const clientTestimonials = [
  {
    quote: "Their HR & Payroll platform completely eliminated our manual spreadsheet errors across 450 employees and 6 US states. The automated tax calculations and direct deposits save our HR team 25+ hours every month.",
    author: "David Vance",
    role: "Chief Operating Officer",
    company: "Global Logistics Corp (Austin, TX)",
    avatar: "DV",
    rating: 5
  },
  {
    quote: "We deployed their School Management ERP across our 3 campus locations. Parents love the mobile app for real-time grade notifications, and our tuition fee collection rate jumped by 35% in the first semester.",
    author: "Dr. Evelyn Wright",
    role: "Superintendent",
    company: "Oakridge Preparatory Academy (Chicago, IL)",
    avatar: "EW",
    rating: 5
  },
  {
    quote: "The POS and E-Commerce solution they engineered operates flawlessly. Even during Black Friday traffic surges and in-store internet blips, our retail registers didn't miss a single sale.",
    author: "Marcus Chen",
    role: "Founder & CEO",
    company: "Urban Retail Brands (Seattle, WA)",
    avatar: "MC",
    rating: 5
  }
];
