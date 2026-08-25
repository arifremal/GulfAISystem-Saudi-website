import type { TranslationDict } from './types'
import { eventsEn } from './events-en'
import { servicePagesEn } from './service-pages-en'

export const en: TranslationDict = {
  ...servicePagesEn,
  ...eventsEn,

  // Nav
  'nav.about': 'About Us',
  'nav.industries': 'Industries',
  'nav.services': 'AI Capabilities',
  'nav.howWeWork': 'How We Work',
  'nav.whyUs': 'Why Us',
  'nav.contact': 'Contact',
  'nav.viewAll': 'View all {label}',
  'nav.viewAllShort': 'View all',
  'nav.soon': 'Soon',
  'nav.cta.services': 'Services',
  'nav.cta.contact': 'Contact Us',
  'nav.cta.consult': 'Book a Consultation',
  'nav.aria.openMenu': 'Open menu',
  'nav.aria.closeMenu': 'Close menu',
  'nav.logoAlt': 'Gulf AI Systems',
  'nav.lang.en': 'English',
  'nav.lang.ar': 'العربية',
  'nav.lang.switch': 'Switch language',

  // Hero
  'hero.slide1.tab': 'TRUSTED PARTNER',
  'hero.slide1.line1': 'Enterprise AI Solutions',
  'hero.slide1.line2': 'for Saudi Businesses',
  'hero.slide2.tab': 'AI TRAINING',
  'hero.slide2.line1': 'AI Training',
  'hero.slide2.line2': 'For Modern Teams',
  'hero.slide3.tab': 'OPERATIONS AUTOMATION',
  'hero.slide3.line1': 'Automate ERP, ',
  'hero.slide3.line2': 'Procurement & Finance',
  'hero.cta': 'Free Consultation',
  'hero.aria.book': 'Book consultation',

  // Home SEO
  'home.meta.title': 'Enterprise AI Solutions for Saudi Businesses | Gulf AI Systems',
  'home.meta.description':
    'Enterprise AI, private agents, ERP and automation solutions for Saudi businesses. Improve operations with Gulf AI Systems.',

  // Proof
  // Proof strip — static value cards (not stats)
  'proof.1.value': '100%',
  'proof.1.label': 'Customer Focus',
  'proof.2.value': '24/7',
  'proof.2.label': 'AI Availability',
  'proof.3.value': 'AI + Human',
  'proof.3.label': 'Better Decisions',
  'proof.4.value': 'Secure',
  'proof.4.label': 'Enterprise Ready',

  // About intro (home)
  'aboutIntro.imageAlt': 'Gulf AI Systems and Global AI Group team collaborating',
  'aboutIntro.eyebrow': 'About us',
  'aboutIntro.title': 'An Australian AI Company Operating in Saudi Arabia',
  'aboutIntro.body':
    'Gulf AI Systems is part of Global AI Group, an Australian founded technology company delivering secure AI, intelligent automation, private AI infrastructure, and enterprise software solutions for organisations in Saudi Arabia.',
  'aboutIntro.value1.title': 'Secure AI',
  'aboutIntro.value1.desc': 'Privacy and control by design',
  'aboutIntro.value2.title': 'Arabic & English',
  'aboutIntro.value2.desc': 'Bilingual enterprise delivery',
  'aboutIntro.value3.title': 'Customer Success',
  'aboutIntro.value3.desc': 'Long term partnership and support',
  'aboutIntro.cta': 'Discover Our Story',

  // Industries section
  'industries.title': 'AI Solutions for Every Saudi Industry',
  'industries.subtitle':
    'Practical AI solutions tailored for Saudi businesses across multiple industries, delivering intelligent automation where it matters most.',
  'industries.learnMore': 'Learn more',
  'industries.comingSoon': 'Coming soon',
  'industries.imageAlt': '{title} solutions in Saudi Arabia',
  'industries.construction.title': 'Construction',
  'industries.construction.description':
    'AI Training, RFQ automation, procurement, ZATCA finance, and AI agents built for contractors, developers, and suppliers.',
  'industries.logistics.title': 'Logistics & Freight Forwarding',
  'industries.logistics.description':
    'Copilot for shipping docs, customs workflows, and customer comms, plus WhatsApp agents and document extraction AI.',
  'industries.healthcare.title': 'Healthcare & Pharmaceuticals',
  'industries.healthcare.description':
    'Copilot for compliance reporting, patient communications, procurement, and HR onboarding at scale.',
  'industries.manufacturing.title': 'Manufacturing & Industrial',
  'industries.manufacturing.description':
    'Copilot for production reporting, supply chain coordination, quality compliance, and supplier management.',
  'industries.retail.title': 'Retail & Ecommerce',
  'industries.retail.description':
    'Copilot for marketing content, sales analytics, inventory reporting, and supplier coordination.',
  'industries.professional.title': 'Professional Services',
  'industries.professional.description':
    'Copilot for proposals, client reports, financial analysis, and pitch decks, for consultancies, law firms, and agencies.',

  // Services
  'services.title': 'What We Offer',
  'services.subtitle':
    'A complete AI transformation stack: from quick productivity wins to fully automated operations. Start anywhere, expand everywhere.',
  'services.learnMore': 'Explore this service',
  'services.aria.slides': 'Service slides',
  'services.aria.goTo': 'Go to {title}',
  'services.training.title': 'AI Training',
  'services.training.description':
    'Practical AI training for modern organisations, covering AI fundamentals, ChatGPT for business, Microsoft Copilot, prompt engineering, productivity, responsible AI, and adoption strategy.',
  'services.training.p1': 'AI Fundamentals & ChatGPT',
  'services.training.p2': 'Microsoft Copilot modules',
  'services.training.p3': 'Prompt engineering & productivity',
  'services.training.p4': 'Responsible AI & adoption',
  'services.agents.title': 'Private AI Agents',
  'services.agents.description':
    'Custom AI agents that run 24/7, handling customer queries, extracting document data, and automating repetitive workflows. Built on your data, under your control.',
  'services.agents.p1': 'WhatsApp customer agent',
  'services.agents.p2': 'Document extraction agent',
  'services.agents.p3': 'Custom workflow agents',
  'services.agents.p4': 'Bilingual (Arabic + English)',
  'services.ops.title': 'Operations Automation',
  'services.ops.description':
    'Full stack operations platform: ERP, procurement automation, RFQ automation, and ZATCA compliant finance. Built in house, not layered on third party systems.',
  'services.ops.p1': 'Industry specific ERP',
  'services.ops.p2': 'Procurement automation',
  'services.ops.p3': 'RFQ automation',
  'services.ops.p4': 'ZATCA e invoicing',

  // Approach
  'approach.badge': 'Land & Expand',
  'approach.title': 'Start Small. Win Fast. Expand Boldly.',
  'approach.subtitle':
    'Our land and expand model means you see value in 30 days, not 12 months. Prove AI works for your team, then scale at your pace.',
  'approach.1.timing': 'Week 1 to 4',
  'approach.1.title': 'AI Training',
  'approach.1.description':
    'Quick productivity wins through practical AI skills, including Microsoft Copilot, ChatGPT, and prompt engineering for daily work.',
  'approach.2.timing': 'Week 4 to 8',
  'approach.2.title': 'Adoption Deepens',
  'approach.2.description':
    'Habits form. Teams start hitting walls ("Copilot can\'t do X"), which is exactly where AI agents come in.',
  'approach.3.timing': 'Month 3 to 6',
  'approach.3.title': 'Private AI Agents',
  'approach.3.description':
    'We deploy WhatsApp agents, document extraction, and custom workflow agents that run 24/7 on your data.',
  'approach.4.timing': 'Month 6+',
  'approach.4.title': 'Full Operations Platform',
  'approach.4.description':
    'ERP, procurement, ZATCA finance: your entire operation on one AI powered platform built for Saudi business.',

  // Problem
  'problem.title': 'The Real Cost of Staying Manual',
  'problem.subtitle':
    'Most Saudi businesses still run on paper, Excel, and WhatsApp. Vision 2030 is changing the rules. The companies that adopt AI now will lead the next decade.',
  'problem.1.title': 'Hours lost to manual work',
  'problem.1.description':
    'Your team spends 40 to 60% of their day on email, data entry, document formatting, and reporting that AI can do in seconds.',
  'problem.2.title': 'Compliance pressure mounting',
  'problem.2.description':
    'ZATCA e invoicing, SDAIA AI guidelines, and Vision 2030 targets mean manual processes are becoming a regulatory risk.',
  'problem.3.title': 'Knowledge trapped in silos',
  'problem.3.description':
    "Critical know how lives in WhatsApp chats, spreadsheets, and people's heads, so every handover or resignation resets progress.",
  'problem.4.title': 'Competitors are moving',
  'problem.4.description':
    'Microsoft is skilling 3 million Saudis in AI by 2030. The companies that adopt early will win talent, contracts, and market share.',

  // Why us (home)
  'whyUs.title': 'Why Saudi Businesses Choose Gulf AI Systems',
  'whyUs.subtitle':
    'An Australian company registered in Saudi Arabia, delivering bilingual AI transformation built for real Saudi workflows, compliance, and growth.',
  'whyUs.badge': 'Saudi Vision 2030 Aligned',
  'whyUs.imageAlt': 'Saudi business team using Gulf AI Systems',
  'whyUs.1.title': 'Built for Saudi Arabia',
  'whyUs.1.description':
    'Every solution is designed for Saudi business realities: bilingual workflows, ZATCA compliance, Vision 2030 alignment, and Arabic first delivery.',
  'whyUs.2.title': 'Proprietary Platform',
  'whyUs.2.description':
    'Our AI agents and operations platform are built in house, not layered on SAP, Oracle, or Odoo. Full control, no vendor lock in.',
  'whyUs.3.title': 'Prove ROI in 30 Days',
  'whyUs.3.description':
    'AI Training delivers measurable productivity gains in the first month. No 12 month consulting engagements before you see value.',
  'whyUs.4.title': 'Human in the Loop',
  'whyUs.4.description':
    'AI handles the heavy lifting, but your team stays in control of critical decisions. We build trust first, automate second.',
  'whyUs.strip.vision': 'Saudi Vision 2030 Aligned',
  'whyUs.strip.registered': 'Registered in Saudi Arabia',
  'whyUs.strip.bilingual': 'Arabic & English Support',
  'whyUs.strip.enterprise': 'Enterprise AI',
  'whyUs.strip.human': 'Human Led Control',

  // Audit CTA
  'audit.title': 'Ready to automate your construction operations?',
  'audit.body':
    'Book a free Construction Automation Audit and see how ERP, AI automation, and AI agents can help your company reduce manual work, improve visibility, and respond faster.',
  'audit.cta': 'Book a Free Construction Operations AI Audit',
  'audit.modal.title': 'Book a Consultation',
  'audit.modal.subtitle':
    'Tell us what you would like to achieve, and our team will contact you.',
  'audit.modal.closeForm': 'Close consultation form',
  'audit.modal.close': 'Close',
  'audit.form.name': 'Full Name',
  'audit.form.company': 'Company Name',
  'audit.form.email': 'Work Email',
  'audit.form.phone': 'Phone Number',
  'audit.form.service': 'Service Interested In',
  'audit.form.servicePlaceholder': 'Select a service',
  'audit.form.message': 'Message',
  'audit.form.submit': 'Request Consultation',
  'audit.form.sending': 'Sending...',
  'audit.form.success': "Thank you. We'll be in touch shortly.",
  'audit.form.error': 'Something went wrong. Please try again.',
  'audit.service.fundamentals': 'AI Fundamentals Training',
  'audit.service.agents': 'Private AI Agents',
  'audit.service.ops': 'Operations Automation',
  'audit.service.erp': 'AI Powered ERP',
  'audit.service.copilot': 'AI Training',
  'audit.service.other': 'Other',

  // Contact
  'contact.hero.eyebrow': 'Contact Gulf AI Systems',
  'contact.hero.title': 'Talk to Gulf AI Systems',
  'contact.hero.subtitle':
    'Connect with our team to explore practical AI solutions, intelligent automation, Microsoft Copilot, enterprise AI agents, and digital transformation strategies tailored to your business goals.',
  'contact.hero.ctaPrimary': 'Book a Consultation',
  'contact.hero.ctaSecondary': 'Talk to Our Team',

  'contact.formSection.eyebrow': 'Send an Enquiry',
  'contact.formSection.title': 'Tell Us About Your Business Goals',
  'contact.formSection.subtitle':
    'Share your requirements with our team, and we will respond with the most suitable next steps for your organisation.',

  'contact.form.name': 'Name',
  'contact.form.email': 'Email',
  'contact.form.phone': 'Phone Number',
  'contact.form.service': 'Select Your Service',
  'contact.form.company': 'Company Name',
  'contact.form.message': 'Message / Special Requests',
  'contact.form.submit': 'Submit Inquiry',
  'contact.form.sending': 'Sending...',
  'contact.form.success': "Thank you. We'll be in touch shortly.",
  'contact.form.error': 'Something went wrong. Please try again.',
  'contact.imageAlt':
    'Saudi business professionals collaborating on enterprise AI and digital transformation',
  'contact.imageBadge': 'Gulf AI Systems',

  'contact.info.eyebrow': 'Reach us',
  'contact.info.title': 'Contact information',
  'contact.info.subtitle':
    'Choose the channel that works best for your team: office, phone, email, or WhatsApp.',
  'contact.info.visitTitle': 'Visit Us',
  'contact.info.contactTitle': 'Contact Us',
  'contact.info.phoneTitle': 'Phone',
  'contact.info.emailTitle': 'Email',
  'contact.info.whatsappTitle': 'WhatsApp',
  'contact.info.hoursTitle': 'Business Hours',
  'contact.info.hoursWeekdayLabel': 'Sunday to Thursday',
  'contact.info.hoursWeekdayTime': '9:00 AM to 6:00 PM',
  'contact.info.hoursFridayLabel': 'Friday and Saturday',
  'contact.info.hoursFridayValue': 'Closed',
  'contact.info.hoursNote': 'We typically respond within one business day.',
  'contact.info.officeTitle': 'Office',
  'contact.info.officeLine1': 'Jeddah, Saudi Arabia',
  'contact.info.officeLine2': "Level 26, King's Road Tower",
  'contact.info.officeLine3': 'King Abdul Aziz Road',
  'contact.info.officeLine4': 'Jeddah 21499',
  'contact.info.hoursWeekday': 'Sun to Thu: 9am to 6pm',
  'contact.info.hoursFriday': 'Friday and Saturday: Closed',

  'contact.why.eyebrow': 'Why Contact Us',
  'contact.why.title': 'Why Contact Gulf AI Systems',
  'contact.why.subtitle':
    'A trusted partner helping Saudi organisations adopt practical AI, automation, and enterprise solutions.',
  'contact.why.enterprise.title': 'Enterprise AI Expertise',
  'contact.why.enterprise.desc':
    'Practical AI that boosts productivity, streamlines operations, and supports better decisions.',
  'contact.why.australia.title': 'Australian Technology Experience',
  'contact.why.australia.desc':
    'Enterprise technology expertise with a clear understanding of Saudi business needs.',
  'contact.why.specialists.title': 'AI, ERP and Automation Specialists',
  'contact.why.specialists.desc':
    'From Microsoft Copilot and AI agents to ERP and workflow automation.',
  'contact.why.bilingual.title': 'Arabic and English Support',
  'contact.why.bilingual.desc':
    'Bilingual consultation and support for Arabic and English business teams.',

  'contact.industries.eyebrow': 'Who We Support',
  'contact.industries.title': 'Industries We Support',
  'contact.industries.subtitle':
    'We support Saudi organisations across multiple industries with practical AI, automation, ERP, and digital transformation solutions.',
  'contact.industries.professional': 'Professional Services',
  'contact.industries.realEstate': 'Real Estate',
  'contact.industries.healthcare': 'Healthcare',
  'contact.industries.retail': 'Retail',
  'contact.industries.logistics': 'Logistics',
  'contact.industries.manufacturing': 'Manufacturing',
  'contact.industries.government': 'Government and Public Sector',

  'contact.process.badge': 'Our Process',
  'contact.process.title': 'Your AI Transformation Journey',
  'contact.process.subtitle':
    'A simple, transparent process that helps us understand your goals, recommend the right solution, and deliver measurable business outcomes.',
  'contact.process.contact.title': 'Contact',
  'contact.process.discovery.title': 'Discovery',
  'contact.process.demo.title': 'Solution Demo',
  'contact.process.proposal.title': 'Proposal',

  'contact.faq.eyebrow': 'FAQs',
  'contact.faq.title': 'Frequently Asked Questions',
  'contact.faq.subtitle':
    'Answers for Saudi organisations exploring AI, automation, Microsoft Copilot, ERP, and digital transformation.',
  'contact.faq.1.q': 'What AI solutions does Gulf AI Systems provide in Saudi Arabia?',
  'contact.faq.1.a':
    'Gulf AI Systems provides enterprise AI agents, AI Training (including Microsoft Copilot), workflow automation, ERP solutions, private AI knowledge systems, finance automation, and digital transformation services for Saudi organisations.',
  'contact.faq.2.q': 'Can your AI solutions work with our existing business systems?',
  'contact.faq.2.a':
    'Yes. Our solutions can integrate with existing ERP, CRM, finance, Microsoft 365, and operational systems, allowing businesses to improve workflows without replacing their entire technology environment.',
  'contact.faq.3.q': 'Do you provide AI Training in Saudi Arabia?',
  'contact.faq.3.a':
    'Yes. We provide role based AI Training for Finance, HR, Executive, IT, and Operations teams, including Microsoft Copilot modules, in Riyadh, Jeddah, online, and on site where available.',
  'contact.faq.4.q': 'What is an enterprise AI agent?',
  'contact.faq.4.a':
    'An enterprise AI agent is a digital assistant that can support or automate business tasks such as document processing, reporting, customer enquiries, workflow updates, data retrieval, and internal coordination.',
  'contact.faq.5.q': 'Can Gulf AI Systems help us develop an AI strategy?',
  'contact.faq.5.a':
    'Yes. We assess your current processes, systems, business priorities, and readiness before recommending a practical AI roadmap aligned with your organisation’s goals.',
  'contact.faq.6.q': 'Do you provide ERP and business automation solutions?',
  'contact.faq.6.a':
    'Yes. We provide AI powered ERP solutions, workflow automation, system integration, and intelligent business process improvement for organisations seeking more connected operations.',
  'contact.faq.7.q': 'Can your solutions support Arabic and English?',
  'contact.faq.7.a':
    'Yes. We design bilingual AI and automation solutions that can support both Arabic and English business environments, depending on the project requirements.',
  'contact.faq.8.q': 'Which industries does Gulf AI Systems support?',
  'contact.faq.8.a':
    'We support organisations across professional services, real estate, healthcare, retail, logistics, manufacturing, government, and other enterprise sectors in Saudi Arabia.',
  'contact.faq.9.q': 'Do you provide private AI solutions for internal company knowledge?',
  'contact.faq.9.a':
    'Yes. We can create secure private AI knowledge systems that help employees access approved policies, procedures, documents, and internal information more efficiently.',
  'contact.faq.10.q': 'How can AI improve business productivity?',
  'contact.faq.10.a':
    'AI can reduce repetitive work, improve information access, accelerate reporting, support decision making, automate document handling, and help teams work more efficiently.',
  'contact.faq.11.q': 'Do you offer online and on site consultations?',
  'contact.faq.11.a':
    'Yes. Initial consultations and demonstrations can be delivered online, with on site meetings available for suitable projects and locations in Saudi Arabia.',
  'contact.faq.12.q': 'How long does an AI implementation take?',
  'contact.faq.12.a':
    'Timelines depend on the solution, integrations, data readiness, and project scope. After the discovery stage, we provide a clear implementation plan and estimated timeline.',
  'contact.faq.13.q': 'How do you protect business data?',
  'contact.faq.13.a':
    'Security and access control are considered throughout the solution design. Deployment options, permissions, integrations, and data handling processes are selected according to the organisation’s requirements.',
  'contact.faq.14.q': 'How do we get started?',
  'contact.faq.14.a':
    'Contact our team and share your business goals. We will arrange a discovery discussion, identify suitable opportunities, and recommend the most appropriate next step.',

  'contact.cta.title': 'Ready to Explore What AI Can Do for Your Business?',
  'contact.cta.subtitle':
    'Book a consultation with our team to discuss practical AI, ERP, Microsoft Copilot, and automation opportunities for your organisation.',
  'contact.cta.bookDemo': 'Book a Consultation',
  'contact.cta.contactTeam': 'Contact Our Team',

  'contact.meta.title': 'Contact Gulf AI Systems | Enterprise AI Saudi Arabia',
  'contact.meta.description':
    'Speak with Gulf AI Systems about AI training, private AI agents, ERP and business automation solutions across Saudi Arabia.',

  'contact.service.copilot': 'AI Training',
  'contact.service.agents': 'Private AI Agents',
  'contact.service.ops': 'Operations Automation',
  'contact.service.other': 'Other',
  'contact.service.rfq': 'AI RFQ Automation Agent',
  'contact.service.erp': 'Construction ERP',
  'contact.service.procurement': 'Procurement Automation',
  'contact.service.zatca': 'ZATCA Finance Automation',
  'contact.service.knowledge': 'Private AI Knowledge Base',
  'contact.service.general': 'General Inquiry',

  // About page
  'about.hero.eyebrow': 'About us',
  'about.hero.title': 'About Gulf AI Systems',
  'about.hero.subtitle':
    'Helping Saudi businesses modernize with AI automation, ERP, and digital growth built for real enterprise teams.',
  'about.hero.ctaDemo': 'Book Demo',
  'about.hero.ctaContact': 'Contact Us',
  'about.meta.title': 'About Gulf AI Systems | Enterprise AI Partner in Saudi Arabia',
  'about.meta.description':
    'Learn how Gulf AI Systems helps Saudi organisations adopt practical AI, private agents, ERP and automation securely.',
  'about.who.title': 'A Trusted AI and ERP Partner in the Kingdom',
  'about.who.body':
    'Gulf AI Systems helps Saudi organisations adopt practical AI, intelligent automation, ERP, and digital transformation solutions designed for secure, scalable, and bilingual enterprise environments.',
  'about.who.imageAlt':
    'Saudi business professional in a modern office representing Gulf AI Systems enterprise partnership',
  'about.who.1.title': 'Australian Company',
  'about.who.1.desc':
    'Founded in Australia with deep expertise in enterprise software, AI, automation, and digital transformation.',
  'about.who.2.title': 'Registered in Saudi Arabia',
  'about.who.2.desc':
    'Operating locally with an understanding of Saudi business requirements, regulatory expectations, and enterprise transformation priorities.',
  'about.who.3.title': 'Built for Enterprise Teams',
  'about.who.3.desc':
    'Secure and scalable solutions for organisations working across Arabic and English, with human oversight, system integration, and practical business adoption.',

  'about.vision2030.eyebrow': 'Saudi Vision 2030',
  'about.vision2030.title': 'Advancing Digital Transformation in the Kingdom',
  'about.vision2030.subtitle':
    'Practical AI, automation, and enterprise systems that support Saudi digital transformation goals.',
  'about.vision2030.cta': 'Book a Consultation',
  'about.vision2030.imageAlt':
    'Saudi business professionals collaborating outdoors with a modern Riyadh skyline',
  'about.vision2030.ai.title': 'AI Transformation',
  'about.vision2030.ai.desc': 'Helping organisations adopt practical AI solutions.',
  'about.vision2030.automation.title': 'Enterprise Automation',
  'about.vision2030.automation.desc': 'Connecting systems to improve productivity.',
  'about.vision2030.workforce.title': 'Workforce Enablement',
  'about.vision2030.workforce.desc': 'Upskilling teams for responsible AI adoption.',
  'about.vision2030.strip.digital': 'Digital Transformation',
  'about.vision2030.strip.enterpriseAi': 'Enterprise AI',
  'about.vision2030.strip.automation': 'Intelligent Automation',
  'about.vision2030.strip.copilot': 'Microsoft Copilot',
  'about.vision2030.strip.agents': 'AI Agents',
  'about.vision2030.strip.innovation': 'Digital Innovation',

  'about.vision.badge': 'Our Vision for Saudi Growth',
  'about.vision.title': 'Building the intelligent operating layer for Saudi businesses',
  'about.vision.subtitle':
    'Gulf AI Systems exists to help Saudi companies move from disconnected manual work to connected, intelligent operations.',
  'about.vision.1.title': 'Connected Operations',
  'about.vision.1.desc':
    'Unifying teams, systems, data, and workflows into one clear operating view.',
  'about.vision.2.title': 'Practical AI Adoption',
  'about.vision.2.desc':
    'Deploying AI that supports real teams, real decisions, and real business outcomes.',
  'about.vision.3.title': 'Saudi Market Focus',
  'about.vision.3.desc':
    'Combining Australian technology expertise with local Saudi business needs, compliance, and growth priorities.',
  'about.why.eyebrow': 'Why choose us',
  'about.why.title': 'Why companies choose Gulf AI Systems',
  'about.why.subtitle':
    'We combine enterprise grade technology with practical delivery, so your team sees results, not just software.',
  'about.why.1.title': 'Saudi focused expertise',
  'about.why.1.desc':
    'Local market knowledge across procurement, compliance, and bilingual delivery.',
  'about.why.2.title': 'AI with human control',
  'about.why.2.desc':
    'Automation that supports decisions with clear oversight, not black box risk.',
  'about.why.3.title': 'End to end delivery',
  'about.why.3.desc':
    'From strategy and build through rollout, training, and ongoing support.',
  'about.why.4.title': 'Australian standards',
  'about.why.4.desc':
    'Enterprise engineering discipline with quality, security, and delivery rigor.',
  'about.why.5.title': 'Faster modernization',
  'about.why.5.desc':
    'Practical roadmaps that move teams from manual work to connected operations quickly.',
  'about.why.6.title': 'Enterprise ready security',
  'about.why.6.desc':
    'Controls, compliance readiness, and architecture built for regulated environments.',
  'about.moments.eyebrow': 'Our People & Moments',
  'about.moments.title': 'Our Journey in Action',
  'about.moments.subtitle':
    'A closer look at our people, partnerships and the moments shaping our work across Australia and Saudi Arabia.',
  'about.moments.videoTitle': 'Gulf AI Systems company video',
  'about.moments.playVideo': 'Play company video',
  'about.moments.leftTopAlt': 'Gulf AI Systems team together at a business event',
  'about.moments.leftBottomAlt': 'Gulf AI Systems leaders sharing a partnership moment',
  'about.moments.rightTopAlt': 'Gulf AI Systems colleagues collaborating in person',
  'about.moments.rightBottomAlt': 'Gulf AI Systems team at work across our markets',
  'about.people.founders.eyebrow': 'LEADERSHIP',
  'about.people.founders.title': 'Founders',
  'about.people.founders.desc':
    'Experienced operators guiding Global AI Group with a focus on secure delivery, responsible adoption, and partner first outcomes.',
  'about.people.advisors.eyebrow': 'LEADERSHIP',
  'about.people.advisors.title': 'AI Advisors',
  'about.people.advisors.desc':
    'A select group of experienced advisors supporting Global AI Group with strategic insight across AI, business, governance, operations, and industry growth.',
  'about.people.developers.title': 'Meet Our Developers',
  'about.people.developers.desc':
    'A hybrid collective of strategists, engineers, creatives, and compliance experts focused on partner outcomes.',
  'about.role.ceo': 'Chief Executive Officer',
  'about.role.ops': 'Director Operations',
  'about.role.cro': 'Chief Relationship Officer',
  'about.role.aiConsultant': 'Artificial Intelligence Consultant',
  'about.role.markets': 'Markets & transformation',
  'about.role.ml': 'AI & machine learning',
  'about.role.strategy': 'Strategy & markets',
  'about.role.security': 'Security & systems',
  'about.role.transformOps': 'Transformation & ops',
  'about.role.legal': 'Legal & litigation',
  'about.role.finance': 'Finance & modelling',
  'about.role.leadership': 'Leadership & culture',
  'about.role.talent': 'Talent & capability',
  'about.role.cto': 'Chief Technology Officer',
  'about.role.cmo': 'Chief Marketing Officer',
  'about.role.coordinator': 'Project Coordinator',
  'about.role.aiDev': 'Artificial Intelligence Developer',
  'about.role.marketing': 'Marketing Manager',

  // Footer
  'footer.logoAlt': 'Gulf AI Systems',
  'footer.brandName': 'Gulf AI Systems',
  'footer.tagline':
    'Empowering Saudi businesses with AI, ERP, automation, and intelligent solutions for smarter, more connected operations.',
  'footer.visitGlobal': 'Visit Global AI Group',
  'footer.ctaAbout': 'Discover Our Story',
  'footer.col.company': 'Company',
  'footer.col.services': 'AI Capabilities',
  'footer.col.industries': 'Industries',
  'footer.col.contact': 'Contact',
  'footer.nav.home': 'Home',
  'footer.location': 'Riyadh, Kingdom of Saudi Arabia',
  'footer.copyright': '© {year} Gulf AI Systems. All rights reserved.',
}
