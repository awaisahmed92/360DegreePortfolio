(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const f=[{id:"hr-payroll",name:"HR & Global Payroll Suite",badge:"Enterprise SaaS",icon:"👥",tagline:"Automated Multi-State Payroll, Time Tracking & Employee Lifecycle Management",description:"An all-in-one Human Resource Information System (HRIS) designed to streamline payroll processing, tax compliance, employee onboarding, benefits administration, and biometric attendance for growing businesses and enterprises.",keyFeatures:["Automated gross-to-net payroll runs with direct deposit (ACH/NACHA)","Multi-state US tax withholding and year-end W-2 / 1099 auto-generation","Biometric and mobile GPS clock-in / clock-out attendance tracking","Custom PTO policies, leave approval workflows, and holiday calendars","Employee self-service portal for payslips, tax forms, and expense claims","Seamless accounting sync with QuickBooks, Xero, and enterprise ERPs"],stats:[{label:"Payroll Processing Time",value:"-85%"},{label:"Tax Compliance Accuracy",value:"100%"},{label:"Employee Self-Service Rate",value:"94%"}],techStack:["Node.js / Express","PostgreSQL","React / Next.js","Redis Queue","AWS SES / S3"],mockupType:"hr-dashboard"},{id:"school-management",name:"School & Campus Management ERP",badge:"EdTech Solution",icon:"🎓",tagline:"Complete Student Information System (SIS), Academic Grading & Automated Fee Billing",description:"A comprehensive campus management platform for K-12 schools, colleges, and training academies. Empowers administrators, educators, students, and parents with centralized digital workflows.",keyFeatures:["Online student admissions, document verification, and enrollment records","Interactive gradebook, GPA calculation, report card generation, and transcripts","Automated tuition fee invoicing, online payment gateway, and overdue reminders","Real-time timetable scheduling, classroom allocation, and teacher workload planner","Dedicated iOS & Android Parent Portal for live attendance and homework updates","Library management, campus transport tracking, and hostel allocations"],stats:[{label:"Fee Collection Speed",value:"3.5x Faster"},{label:"Administrative Paperwork",value:"-90%"},{label:"Parent Engagement",value:"98%"}],techStack:["Python / Django / FastApi","PostgreSQL","Vue / React","Stripe / Bank APIs","Docker"],mockupType:"school-dashboard"},{id:"ecommerce",name:"E-Commerce & Multi-Vendor Marketplaces",badge:"Omnichannel Commerce",icon:"🛒",tagline:"High-Converting Headless Storefronts, Multi-Vendor Portals & Order Fulfillment",description:"Custom e-commerce platforms engineered for lightning-fast page speeds, high conversion rates, multi-currency global checkout, and seamless inventory management across web and mobile.",keyFeatures:["Headless Next.js storefronts with sub-second page loads and dynamic SEO","Multi-vendor marketplace support with vendor payouts and commission rules","Integrated payment gateways (Stripe, PayPal, Apple Pay, Google Pay, Klarna)","Real-time inventory sync, SKU variations, and low-stock automated alerts","Smart discount engines, abandoned cart recovery emails, and loyalty programs","Shipping carrier rate calculator (FedEx, UPS, USPS, DHL) with label generation"],stats:[{label:"Average Page Load",value:"0.6s"},{label:"Cart Conversion Uplift",value:"+42%"},{label:"Orders Processed / Sec",value:"5,000+"}],techStack:["Next.js 15","Node.js","PostgreSQL / MongoDB","Stripe Connect","Algolia Search"],mockupType:"ecommerce-store"},{id:"pos-systems",name:"Point of Sale (POS) Systems",badge:"Retail & Restaurant",icon:"💳",tagline:"Cloud-Powered POS with Offline Mode, Barcode Scanning & Instant Billing",description:"A fast, reliable Point of Sale system built for retail stores, supermarkets, restaurants, and franchise chains. Operates seamlessly on touch terminals, iPads, Android tablets, and desktop workstations.",keyFeatures:["Lightning-fast checkout with barcode scanner and touch-screen product grid","Offline-first architecture (keeps selling during internet outages and auto-syncs)","Table management, kitchen display system (KDS), and split-bill for restaurants","Hardware integration with thermal receipt printers, cash drawers, and card readers","Centralized multi-store inventory sync and branch stock transfer management","End-of-day Z-Report generation, cash drawer reconciliation, and staff shifts"],stats:[{label:"Checkout Transaction Speed",value:"< 2 Seconds"},{label:"Offline Resilience",value:"100% Uptime"},{label:"Inventory Shrinkage",value:"-35%"}],techStack:["Electron / Web","SQLite / IndexedDB (Offline)","PostgreSQL","WebSockets","Esc/Pos Drivers"],mockupType:"pos-terminal"},{id:"web-apps",name:"Custom Web Applications & SaaS",badge:"Enterprise Engineering",icon:"🌐",tagline:"Tailor-Made Enterprise Portals, SaaS Platforms & Internal Business Tools",description:"Custom web software engineered specifically for your business logic. We build scalable multi-tenant SaaS platforms, CRM solutions, customer self-service portals, and operational management systems.",keyFeatures:["Multi-tenant cloud architecture with isolated database schemas or Row-Level Security","Enterprise Role-Based Access Control (RBAC), Single Sign-On (SSO) & Audit Logs","Interactive analytics dashboards with real-time charts and exportable reports","RESTful & GraphQL API development for third-party software integrations","SOC 2, HIPAA, and GDPR compliant data storage and encryption protocols","Automated CI/CD deployment pipelines on AWS, Google Cloud, or Microsoft Azure"],stats:[{label:"System Availability SLA",value:"99.99%"},{label:"API Response Time",value:"< 30ms"},{label:"Custom Integrations",value:"500+ APIs"}],techStack:["React / Next.js","Node.js / Go / Python","PostgreSQL / Redis","AWS Cloud","Docker / K8s"],mockupType:"saas-dashboard"},{id:"mobile-apps",name:"iOS & Android Mobile Applications",badge:"Mobile Engineering",icon:"📱",tagline:"High-Performance Native & Cross-Platform Mobile Apps for Modern Users",description:"Engaging, responsive, and secure mobile applications published to the Apple App Store and Google Play Store. Crafted with smooth 60fps animations, intuitive UI, and offline-capable sync.",keyFeatures:["Cross-platform development using React Native & Flutter for 2x faster time-to-market","Native iOS (Swift) and Android (Kotlin) development for specialized performance needs","Push notification campaigns with personalized user segmentation (Firebase / OneSignal)","In-app purchases, subscription billing, and secure biometric login (FaceID / TouchID)","Offline data caching with automated cloud synchronization when connected","Real-time GPS location tracking, mapping, camera scanning, and BLE device pairing"],stats:[{label:"App Store Rating Avg",value:"4.8 ★"},{label:"Crash-Free Sessions",value:"99.9%"},{label:"Active Mobile Users",value:"1M+"}],techStack:["React Native","Flutter","Swift","Kotlin","Firebase","GraphQL"],mockupType:"mobile-app"}];document.addEventListener("DOMContentLoaded",()=>{x(),w(),k(),S(),A(),P()});function x(){const t=document.getElementById("theme-toggle");if(!t)return;const e=localStorage.getItem("theme")||"light";document.documentElement.setAttribute("data-theme",e),b(t,e),t.addEventListener("click",()=>{const a=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",a),localStorage.setItem("theme",a),b(t,a)})}function b(t,e){t.innerHTML=e==="dark"?"☀️":"🌙",t.title=e==="dark"?"Switch to Light Mode":"Switch to Dark Mode"}function w(){const t=document.getElementById("mobile-menu-toggle"),e=document.querySelector(".nav-links");!t||!e||t.addEventListener("click",()=>{const o=e.style.display==="flex";e.style.display=o?"none":"flex",e.style.flexDirection="column",e.style.position="absolute",e.style.top="76px",e.style.left="0",e.style.width="100%",e.style.background="var(--bg-surface)",e.style.padding="24px",e.style.boxShadow="var(--shadow-lg)"})}function k(){const t=document.getElementById("hero-showcase-tabs"),e=document.getElementById("hero-showcase-viewport");if(!t||!e)return;let o="pos-systems";function a(){t.innerHTML=f.map(n=>`
      <button class="showcase-tab-btn ${n.id===o?"active":""}" data-product-id="${n.id}">
        <span>${n.icon}</span>
        <span>${n.name}</span>
      </button>
    `).join(""),t.querySelectorAll(".showcase-tab-btn").forEach(n=>{n.addEventListener("click",()=>{o=n.dataset.productId,a(),s(o)})})}function s(n){if(!f.find(l=>l.id===n))return;let d="";switch(n){case"pos-systems":d=`
          <div class="mockup-app-window">
            <div class="mockup-window-header">
              <div class="mockup-window-dots">
                <span class="mockup-dot red"></span>
                <span class="mockup-dot yellow"></span>
                <span class="mockup-dot green"></span>
              </div>
              <div class="mockup-window-title">ApexPOS Cloud Terminal v4.2 • Register #01 [ONLINE]</div>
              <div style="font-size:0.75rem; color:var(--accent-success); font-weight:600;">● Cloud Sync Active</div>
            </div>
            <div class="pos-mockup-body">
              <div>
                <div style="font-weight:700; font-size:0.9rem; margin-bottom:12px; display:flex; justify-content:space-between;">
                  <span>Touch Product Catalog (Quick-Tap)</span>
                  <span style="color:var(--brand-primary); font-size:0.8rem;">Tap item to add to bill</span>
                </div>
                <div class="pos-catalog-grid" id="pos-items-grid">
                  <div class="pos-item-btn" data-name="Espresso Roast" data-price="4.50">
                    <span class="pos-item-icon">☕</span>
                    <span class="pos-item-name">Espresso Roast</span>
                    <span class="pos-item-price">$4.50</span>
                  </div>
                  <div class="pos-item-btn" data-name="Avocado Toast" data-price="12.00">
                    <span class="pos-item-icon">🥑</span>
                    <span class="pos-item-name">Avocado Toast</span>
                    <span class="pos-item-price">$12.00</span>
                  </div>
                  <div class="pos-item-btn" data-name="Artisan Croissant" data-price="5.25">
                    <span class="pos-item-icon">🥐</span>
                    <span class="pos-item-name">Artisan Croissant</span>
                    <span class="pos-item-price">$5.25</span>
                  </div>
                  <div class="pos-item-btn" data-name="Iced Matcha Latte" data-price="6.50">
                    <span class="pos-item-icon">🍵</span>
                    <span class="pos-item-name">Iced Matcha</span>
                    <span class="pos-item-price">$6.50</span>
                  </div>
                  <div class="pos-item-btn" data-name="Acai Super Bowl" data-price="14.00">
                    <span class="pos-item-icon">🫐</span>
                    <span class="pos-item-name">Acai Bowl</span>
                    <span class="pos-item-price">$14.00</span>
                  </div>
                  <div class="pos-item-btn" data-name="Sparkling Water" data-price="3.00">
                    <span class="pos-item-icon">🥤</span>
                    <span class="pos-item-name">Mineral Water</span>
                    <span class="pos-item-price">$3.00</span>
                  </div>
                </div>
              </div>

              <!-- POS Receipt Pane -->
              <div class="pos-receipt-pane">
                <div>
                  <div style="font-weight:700; border-bottom:1px solid var(--border-subtle); padding-bottom:8px; display:flex; justify-content:space-between;">
                    <span>Current Order #8841</span>
                    <span style="font-family:var(--font-mono); color:var(--text-muted);">Table 04</span>
                  </div>
                  <div id="pos-receipt-items" style="max-height:160px; overflow-y:auto; margin:10px 0; display:flex; flex-direction:column; gap:6px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.82rem;">
                      <span>1x Espresso Roast</span>
                      <span style="font-family:var(--font-mono);">$4.50</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.82rem;">
                      <span>1x Avocado Toast</span>
                      <span style="font-family:var(--font-mono);">$12.00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div style="border-top:1px dashed var(--border-strong); padding-top:8px; margin-bottom:10px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted);">
                      <span>Tax (8.25%):</span>
                      <span id="pos-tax" style="font-family:var(--font-mono);">$1.36</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:800; color:var(--text-primary); margin-top:4px;">
                      <span>TOTAL:</span>
                      <span id="pos-total" style="font-family:var(--font-mono); color:var(--brand-primary);">$17.86</span>
                    </div>
                  </div>
                  <button class="btn btn-primary btn-sm" id="pos-checkout-btn" style="width:100%;">
                    💳 Charge Card / Apple Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;break;case"hr-payroll":d=`
          <div class="mockup-app-window">
            <div class="mockup-window-header">
              <div class="mockup-window-dots">
                <span class="mockup-dot red"></span>
                <span class="mockup-dot yellow"></span>
                <span class="mockup-dot green"></span>
              </div>
              <div class="mockup-window-title">ApexHR Cloud // Payroll Cycle Oct 2026</div>
              <div class="mock-badge success">Direct Deposit Approved</div>
            </div>
            <div class="hr-mockup-body">
              <div class="hr-table-wrap">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="font-size:0.95rem;">Employee Payroll Roster (450 Active)</strong>
                  <span style="font-size:0.8rem; color:var(--text-muted);">Auto-Tax Calculations: US Federal & State</span>
                </div>
                <table class="mock-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Gross Pay</th>
                      <th>Tax (Fed/State)</th>
                      <th>Net Deposit</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Sarah Jenkins</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">EMP-1024</span></td>
                      <td>Engineering</td>
                      <td>$12,500.00</td>
                      <td>-$2,850.00</td>
                      <td><strong style="color:var(--accent-success);">$9,650.00</strong></td>
                      <td><span class="mock-badge success">Paid</span></td>
                    </tr>
                    <tr>
                      <td><strong>Michael Chang</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">EMP-1025</span></td>
                      <td>Product Design</td>
                      <td>$10,400.00</td>
                      <td>-$2,280.00</td>
                      <td><strong style="color:var(--accent-success);">$8,120.00</strong></td>
                      <td><span class="mock-badge success">Paid</span></td>
                    </tr>
                    <tr>
                      <td><strong>Jessica Miller</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">EMP-1026</span></td>
                      <td>Operations</td>
                      <td>$8,900.00</td>
                      <td>-$1,920.00</td>
                      <td><strong style="color:var(--accent-success);">$6,980.00</strong></td>
                      <td><span class="mock-badge success">Paid</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="hr-side-card">
                <strong style="font-size:0.9rem;">Payroll Run Summary</strong>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:0.85rem;">
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Total Gross:</span>
                    <strong style="font-family:var(--font-mono);">$485,200.00</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Tax Withholding:</span>
                    <strong style="font-family:var(--font-mono); color:#ef4444;">-$106,740.00</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Direct Deposits:</span>
                    <strong style="font-family:var(--font-mono); color:var(--accent-success);">$378,460.00</strong>
                  </div>
                </div>
                <button class="btn btn-secondary btn-sm" id="btn-download-payslips" style="width:100%;">
                  📄 Batch Export W-2 & Slips
                </button>
              </div>
            </div>
          </div>
        `;break;case"school-management":d=`
          <div class="mockup-app-window">
            <div class="mockup-window-header">
              <div class="mockup-window-dots">
                <span class="mockup-dot red"></span>
                <span class="mockup-dot yellow"></span>
                <span class="mockup-dot green"></span>
              </div>
              <div class="mockup-window-title">EduCore SIS // Grade 11 STEM Academy</div>
              <div class="mock-badge success">Semester 1 Active</div>
            </div>
            <div style="padding:24px; display:grid; grid-template-columns: 2fr 1fr; gap:20px;">
              <div>
                <strong style="font-size:0.95rem; display:block; margin-bottom:12px;">Student Performance & Attendance Roster</strong>
                <table class="mock-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>GPA</th>
                      <th>Attendance</th>
                      <th>Fee Status</th>
                      <th>Parent Portal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Alexander Reed</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">Roll #1101</span></td>
                      <td><span class="mock-badge success">3.95 (A)</span></td>
                      <td>98.4%</td>
                      <td><span class="mock-badge success">Paid</span></td>
                      <td><span style="color:var(--brand-primary); font-weight:600;">Linked ✓</span></td>
                    </tr>
                    <tr>
                      <td><strong>Sophia Martinez</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">Roll #1102</span></td>
                      <td><span class="mock-badge success">3.88 (A)</span></td>
                      <td>96.2%</td>
                      <td><span class="mock-badge success">Paid</span></td>
                      <td><span style="color:var(--brand-primary); font-weight:600;">Linked ✓</span></td>
                    </tr>
                    <tr>
                      <td><strong>Ethan Williams</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">Roll #1103</span></td>
                      <td><span class="mock-badge warning">3.45 (B+)</span></td>
                      <td>91.0%</td>
                      <td><span class="mock-badge warning">Due: $450</span></td>
                      <td><span style="color:var(--brand-primary); font-weight:600;">Linked ✓</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="hr-side-card">
                <strong style="font-size:0.9rem;">Automated Fee Invoicing</strong>
                <p style="font-size:0.8rem; color:var(--text-secondary);">Online tuition collection via Stripe/ACH with automated SMS & Parent App reminders.</p>
                <div style="padding:10px; background:var(--bg-surface); border-radius:var(--radius-md); font-size:0.82rem;">
                  <div style="color:var(--text-muted);">Collection Rate (Q3):</div>
                  <div style="font-size:1.3rem; font-weight:800; color:var(--accent-success); margin-top:2px;">96.8% ($1.2M)</div>
                </div>
                <button class="btn btn-primary btn-sm" id="btn-send-fee-notif" style="width:100%;">
                  📲 Send Automated Fee Notices
                </button>
              </div>
            </div>
          </div>
        `;break;case"ecommerce":d=`
          <div class="mockup-app-window">
            <div class="mockup-window-header">
              <div class="mockup-window-dots">
                <span class="mockup-dot red"></span>
                <span class="mockup-dot yellow"></span>
                <span class="mockup-dot green"></span>
              </div>
              <div class="mockup-window-title">ApexCommerce Storefront // Global Multi-Currency Checkout</div>
              <div class="mock-badge success">Speed: 0.4s P99</div>
            </div>
            <div style="padding:24px; display:grid; grid-template-columns: 2fr 1fr; gap:20px;">
              <div>
                <strong style="font-size:0.95rem; display:block; margin-bottom:12px;">Omnichannel Headless Storefront Preview</strong>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
                  <div style="background:var(--bg-surface-subtle); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; text-align:center;">
                    <div style="font-size:2rem; margin-bottom:6px;">🎧</div>
                    <div style="font-weight:700; font-size:0.85rem;">Wireless ANC Headphones</div>
                    <div style="color:var(--brand-primary); font-weight:800; font-family:var(--font-mono); margin:4px 0;">$249.00</div>
                    <button class="btn btn-secondary btn-sm" style="width:100%; font-size:0.75rem; padding:4px 8px;">+ Add to Cart</button>
                  </div>
                  <div style="background:var(--bg-surface-subtle); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; text-align:center;">
                    <div style="font-size:2rem; margin-bottom:6px;">⌚</div>
                    <div style="font-weight:700; font-size:0.85rem;">Smart Fitness Watch Pro</div>
                    <div style="color:var(--brand-primary); font-weight:800; font-family:var(--font-mono); margin:4px 0;">$199.00</div>
                    <button class="btn btn-secondary btn-sm" style="width:100%; font-size:0.75rem; padding:4px 8px;">+ Add to Cart</button>
                  </div>
                  <div style="background:var(--bg-surface-subtle); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; text-align:center;">
                    <div style="font-size:2rem; margin-bottom:6px;">📷</div>
                    <div style="font-weight:700; font-size:0.85rem;">4K Creator Drone</div>
                    <div style="color:var(--brand-primary); font-weight:800; font-family:var(--font-mono); margin:4px 0;">$649.00</div>
                    <button class="btn btn-secondary btn-sm" style="width:100%; font-size:0.75rem; padding:4px 8px;">+ Add to Cart</button>
                  </div>
                </div>
              </div>

              <div class="hr-side-card">
                <strong style="font-size:0.9rem;">Instant Checkout & Tax</strong>
                <div style="font-size:0.85rem; display:flex; flex-direction:column; gap:6px;">
                  <div style="display:flex; justify-content:space-between;"><span>Subtotal:</span><strong>$249.00</strong></div>
                  <div style="display:flex; justify-content:space-between;"><span>US Sales Tax:</span><strong>$20.54</strong></div>
                  <div style="display:flex; justify-content:space-between; font-weight:800; color:var(--brand-primary); font-size:1rem; border-top:1px solid var(--border-subtle); padding-top:6px;">
                    <span>Total:</span><span>$269.54</span>
                  </div>
                </div>
                <button class="btn btn-primary btn-sm" style="width:100%; background:#000; color:#fff;">
                   Pay / 1-Click Buy
                </button>
              </div>
            </div>
          </div>
        `;break;case"mobile-apps":d=`
          <div class="mobile-mockup-wrap">
            <!-- Phone Frame 1 -->
            <div class="phone-frame">
              <div class="phone-notch"></div>
              <div class="phone-screen">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:6px;">
                  <strong>Customer Portal</strong>
                  <span style="font-size:0.7rem; color:var(--accent-success);">● Live</span>
                </div>
                <div style="background:var(--brand-primary-light); padding:10px; border-radius:12px;">
                  <div style="font-size:0.7rem; color:var(--brand-primary); font-weight:700;">ACTIVE MEMBERSHIP</div>
                  <div style="font-size:1rem; font-weight:800; color:var(--text-primary);">Gold Tier VIP</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  <div style="background:var(--bg-surface-subtle); padding:8px; border-radius:8px; display:flex; justify-content:space-between;">
                    <span>📦 Order #7719</span><span style="color:var(--brand-primary);">Out for Delivery</span>
                  </div>
                  <div style="background:var(--bg-surface-subtle); padding:8px; border-radius:8px; display:flex; justify-content:space-between;">
                    <span>💳 Reward Balance</span><strong style="color:var(--accent-success);">1,450 pts</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Feature Highlights -->
            <div style="max-width:440px; display:flex; flex-direction:column; gap:14px;">
              <span class="brand-badge">iOS & Android App Suite</span>
              <h3 style="font-size:1.6rem; font-weight:800;">Native Performance with Cross-Platform Speed</h3>
              <p style="color:var(--text-secondary); font-size:0.95rem;">
                Engineered in React Native & Flutter. Delivers 60 FPS smooth animations, instant push notifications, biometric FaceID authentication, and seamless offline data caching.
              </p>
              <div style="display:flex; gap:12px;">
                <div style="padding:10px 16px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); font-weight:700; font-size:0.85rem;">
                  ⭐ 4.9 App Store Rating
                </div>
                <div style="padding:10px 16px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); font-weight:700; font-size:0.85rem;">
                  🚀 99.9% Crash-Free
                </div>
              </div>
            </div>
          </div>
        `;break;case"web-apps":d=`
          <div class="mockup-app-window">
            <div class="mockup-window-header">
              <div class="mockup-window-dots">
                <span class="mockup-dot red"></span>
                <span class="mockup-dot yellow"></span>
                <span class="mockup-dot green"></span>
              </div>
              <div class="mockup-window-title">ApexCloud Enterprise Hub // Multi-Tenant SaaS Console</div>
              <div class="mock-badge success">SOC 2 Type II</div>
            </div>
            <div style="padding:24px; display:grid; grid-template-columns: repeat(3, 1fr); gap:16px;">
              <div style="background:var(--bg-surface-subtle); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">ACTIVE API THROUGHPUT</div>
                <div style="font-size:1.6rem; font-weight:800; color:var(--brand-primary); margin:6px 0;">18.4k req/s</div>
                <div style="font-size:0.75rem; color:var(--accent-success);">▲ 14% vs last week</div>
              </div>
              <div style="background:var(--bg-surface-subtle); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">MULTI-TENANT ISOLATION</div>
                <div style="font-size:1.6rem; font-weight:800; color:var(--accent-success); margin:6px 0;">100% RLS</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Zero cross-tenant bleed</div>
              </div>
              <div style="background:var(--bg-surface-subtle); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">AVERAGE P99 LATENCY</div>
                <div style="font-size:1.6rem; font-weight:800; color:var(--brand-secondary); margin:6px 0;">14.2 ms</div>
                <div style="font-size:0.75rem; color:var(--accent-success);">Global Edge CDN</div>
              </div>
            </div>
          </div>
        `;break}e.innerHTML=d,n==="pos-systems"&&r()}function r(){const n=e.querySelectorAll(".pos-item-btn"),p=e.querySelector("#pos-receipt-items"),d=e.querySelector("#pos-tax"),l=e.querySelector("#pos-total"),i=e.querySelector("#pos-checkout-btn");let c=16.5;n.forEach(u=>{u.addEventListener("click",()=>{const m=u.dataset.name,g=parseFloat(u.dataset.price);c+=g;const v=document.createElement("div");v.style.display="flex",v.style.justifyContent="space-between",v.style.fontSize="0.82rem",v.innerHTML=`<span>1x ${m}</span><span style="font-family:var(--font-mono);">$${g.toFixed(2)}</span>`,p.appendChild(v),p.scrollTop=p.scrollHeight;const y=c*.0825,h=c+y;d.textContent=`$${y.toFixed(2)}`,l.textContent=`$${h.toFixed(2)}`})}),i&&i.addEventListener("click",()=>{i.textContent="✓ Payment Approved ($"+l.textContent+")",i.style.background="var(--accent-success)",setTimeout(()=>{i.textContent="💳 Charge Card / Apple Pay",i.style.background=""},2500)})}a(),s(o)}function S(){const t=document.getElementById("project-cost-estimator");if(!t)return;const e=t.querySelectorAll(".est-type-btn"),o=t.querySelectorAll(".est-feature-checkbox"),a=t.querySelectorAll('input[name="est-platform"]'),s=t.querySelector("#est-timeline"),r=document.getElementById("est-calculated-price"),n=document.getElementById("est-calculated-duration");let p=6500,d=1;function l(){let i=p;o.forEach(m=>{m.checked&&(i+=parseInt(m.dataset.price||0))}),a.forEach(m=>{m.checked&&(d=parseFloat(m.dataset.multiplier||1))});const c=Math.round(i*d),u=Math.max(4,Math.round(c/2200));r&&(r.textContent=`$${c.toLocaleString()}`),n&&(n.textContent=`~ ${u} to ${u+2} Weeks`)}e.forEach(i=>{i.addEventListener("click",()=>{e.forEach(c=>c.classList.remove("active")),i.classList.add("active"),p=parseInt(i.dataset.basePrice||6500),l()})}),o.forEach(i=>i.addEventListener("change",l)),a.forEach(i=>i.addEventListener("change",l)),s&&s.addEventListener("change",l),l()}function A(){const t=document.getElementById("consultation-modal"),e=document.querySelectorAll('[data-open-modal="consultation"]'),o=document.getElementById("close-consultation-modal");t&&(e.forEach(a=>{a.addEventListener("click",s=>{s.preventDefault(),t.classList.add("active")})}),o&&o.addEventListener("click",()=>{t.classList.remove("active")}),t.addEventListener("click",a=>{a.target===t&&t.classList.remove("active")}))}function P(){const t=document.getElementById("consultation-form"),e=document.getElementById("consultation-success");t&&t.addEventListener("submit",o=>{o.preventDefault();const a=t.querySelector('button[type="submit"]');a&&(a.disabled=!0,a.textContent="Submitting Request..."),setTimeout(()=>{t.style.display="none",e&&(e.style.display="block")},1e3)})}
