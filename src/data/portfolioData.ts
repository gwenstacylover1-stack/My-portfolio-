export interface ArchitectureNode {
  id: string;
  step: string;
  title: string;
  layer: string;
  protocol: string;
  summary: string;
  securityNote: string;
  accent: 'cyan' | 'blue' | 'pink';
}

export interface VideoChapter {
  step: number;
  seconds: number;
  title: string;
  description: string;
}

export type ProjectAccentTheme = 'pink' | 'cyan' | 'holo' | 'emerald';

export interface ProjectCaseStudy {
  coreGoal: string;
  securityHighlights: string[];
  engineeringHighlights: string[];
}

export interface FlagshipProject {
  id: 'tarakverse-ai' | 'dark-stark-smm' | 'jarvis-ai' | 'jhon-ai';
  orderNumber: string;
  name: string;
  exactMediaLabel: string;
  status: 'LIVE DEPLOYED' | 'IN DEVELOPMENT';
  accentTheme: ProjectAccentTheme;
  spotlightAccent: 'cyan' | 'blue' | 'pink' | 'emerald';
  youtubeUrl: string;
  fallbackImage: string;
  liveUrl?: string;
  summary: string;
  tags: string[];
  chapters: VideoChapter[];
  architecturePipeline: string[];
  engineeringFocus: string;
  caseStudy: ProjectCaseStudy;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: 'layout' | 'shield' | 'database' | 'cpu';
  accent: 'cyan' | 'blue' | 'pink';
  skills: string[];
}

export interface ArchitectureStandard {
  id: string;
  index: string;
  title: string;
  description: string;
  metricLabel: string;
  icon: 'lock' | 'zap' | 'git';
}

export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: 'globe' | 'sparkles' | 'server';
}

export interface EstimatorProjectType {
  id: string;
  label: string;
  subtitle: string;
  minInr: number;
  maxInr: number;
}

export interface EstimatorFeature {
  id: string;
  label: string;
  detail: string;
  minInr: number;
  maxInr: number;
}

export interface EstimatorTimeline {
  id: 'standard' | 'priority';
  label: string;
  eta: string;
  multiplier: number;
  detail: string;
}

/**
 * Strict 1-to-1 Project-to-Video mapping for all 4 flagship live YouTube Shorts demos.
 */
export const PROJECT_DEMO_VIDEOS = {
  tarakverseAi: 'https://youtube.com/shorts/PUNv565xN08',
  darkStarkSmm: 'https://youtube.com/shorts/UZN4OEPgsE4',
  jarvisAi: 'https://youtube.com/shorts/ybXkXPKhDvI',
  jhonAi: 'https://youtube.com/shorts/P-BpngNgnwY',
} as const;

export const CONTACT_INFO = {
  email: 'batmanofgothamthegoat@gmail.com',
  whatsappNumber: '919059511206',
  whatsappDisplay: '+91 90595 11206',
  location: 'Hyderabad, Telangana, India · Available Worldwide Remote',
  livePlatformUrl: 'https://cheap-dark-stark-smm-panel.pages.dev/',
  livePlatformName: 'Dark Stark SMM',
  defaultWhatsappGreeting:
    'Hi Tarak, I viewed your portfolio and would like to discuss a Full-Stack Web / AI project.',
} as const;

export const HERO_PROOF_ITEMS = [
  {
    id: 'live-platform',
    title: 'Live Deployed Platform',
    subtitle: 'Serverless Production App on Cloudflare Edge',
    accent: 'cyan' as const,
  },
  {
    id: 'ai-builds',
    title: '3 Multimodal AI Builds',
    subtitle: 'Real-Time Voice, Live Vision & 3D UI',
    accent: 'blue' as const,
  },
  {
    id: 'cloud-security',
    title: 'End-to-End Cloud Security',
    subtitle: 'Edge API Proxies & Real-Time Firestore',
    accent: 'pink' as const,
  },
];

export const LIVE_PLATFORM_ARCHITECTURE: ArchitectureNode[] = [
  {
    id: 'frontend',
    step: '01',
    title: 'React Frontend',
    layer: 'Cloudflare Pages',
    protocol: 'HTTPS / Global CDN Edge',
    summary:
      'Responsive dark-mode SPA served directly from Cloudflare global edge PoPs with instant cold-start delivery, real-time wallet listeners, and client-side order telemetry.',
    securityNote: 'Zero API secrets or upstream provider credentials exist in browser bundles.',
    accent: 'cyan',
  },
  {
    id: 'edge-proxy',
    step: '02',
    title: 'Cloudflare Workers Edge Proxy',
    layer: 'API Keys Hidden',
    protocol: 'Serverless Edge Runtime',
    summary:
      'Isolated edge proxy layer handling request signing, rate validation, Anti-Replay UPI/UTR Verification & Admin Audit, and secret injection via Cloudflare Environment Secrets.',
    securityNote: 'Strict CORS enforcement and server-side token verification before upstream routing.',
    accent: 'blue',
  },
  {
    id: 'firebase',
    step: '03',
    title: 'Firebase Auth & Cloud Firestore',
    layer: 'Real-Time Database',
    protocol: 'OAuth / Atomic Transactions',
    summary:
      'Handles user authentication, atomic credit ledger updates, real-time order state synchronization, and verified UTR transaction deduplication.',
    securityNote: 'Granular Firestore Security Rules lock wallet mutations to verified server flows.',
    accent: 'cyan',
  },
  {
    id: 'upstream',
    step: '04',
    title: 'Upstream SMM REST APIs',
    layer: 'Automated Order Fulfillment',
    protocol: 'Encrypted JSON REST',
    summary:
      'Dispatches automated order execution requests, bulk refills, and real-time order status synchronization directly with upstream fulfillment providers.',
    securityNote: 'Outbound calls occur strictly from the Cloudflare Worker boundary.',
    accent: 'pink',
  },
];

export const LIVE_PLATFORM_TECH = [
  'React',
  'Cloudflare Pages',
  'Cloudflare Workers',
  'Firebase Auth',
  'Cloud Firestore',
  'Anti-Replay UPI/UTR Verification & Admin Audit',
  'REST APIs',
];

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'tarakverse-ai',
    orderNumber: '01',
    name: 'TARAKVERSE AI',
    exactMediaLabel:
      'TARAKVERSE AI — Generative Media & Neural Post-Production Studio',
    status: 'IN DEVELOPMENT',
    accentTheme: 'pink',
    spotlightAccent: 'pink',
    youtubeUrl: PROJECT_DEMO_VIDEOS.tarakverseAi,
    fallbackImage: '/src/assets/images/lab_tarakverse_studio_1795180258725.jpg',
    summary:
      'High-speed creator studio for generative cinema, 4K/8K neural upscaling, bilingual Telugu & English voice sync, and Cloudflare Worker edge proxies backed by a private production vault.',
    tags: [
      'React',
      'Cloudflare Workers',
      'Generative AI APIs',
      'Credit System',
      'UPI QR Verification',
      'Firebase',
    ],
    chapters: [
      {
        step: 1,
        seconds: 0,
        title: 'Home Studio Bento Deck',
        description:
          'Veo 2 Cine, Kling v1.0, 4K Imagen 3, AI Tools Suite & Private Vault.',
      },
      {
        step: 2,
        seconds: 2,
        title: 'Inspire Gallery & 1-Click Cinematic Remix',
        description:
          'Curated camera/lens presets (70mm IMAX, 35mm Anamorphic).',
      },
      {
        step: 3,
        seconds: 17,
        title: 'Multi-Engine Studio & Edge Proxy',
        description:
          'Live 4K FLUX edge worker proxy, cinematic styles & aspect controls.',
      },
      {
        step: 4,
        seconds: 27,
        title: 'Neural Post-Production Suite (Pro v2.8)',
        description:
          '4K/8K Neural Tensor V4 Upscaler & bilingual Telugu/English Voice Sync.',
      },
      {
        step: 5,
        seconds: 43,
        title: 'Private Production Vault',
        description:
          'Cloud storage telemetry & 4K ProRes / H.265 master exports.',
      },
    ],
    architecturePipeline: [
      'React Creator Bento Deck with multi-engine prompt & lens presets',
      'Cloudflare Workers Edge Proxy isolating generative image/video keys',
      'Neural Post-Production Suite (4K/8K Tensor Upscaler & Telugu/English Voice Sync)',
      'Private Vault & Firebase Credit Ledger with UPI QR verification',
    ],
    engineeringFocus:
      'Zero-key edge routing, atomic credit deduction, and low-latency cinema mastering workflows.',
    caseStudy: {
      coreGoal:
        'Unify multi-engine AI image/video generation (Veo 2 Cine, Kling v1.0, 4K Imagen 3, FLUX), neural upscaling, and bilingual Telugu/English voice sync inside a single serverless studio without exposing vendor API keys in client code.',
      securityHighlights: [
        'All upstream generative image/video API tokens live strictly inside Cloudflare Worker Environment Secrets with zero client-side bundle exposure.',
        'UPI QR credit top-up workflow pairs Firebase Auth identity with atomic Cloud Firestore balance ledgers.',
        'Private Production Vault scopes media metadata and export telemetry per authenticated user session.',
      ],
      engineeringHighlights: [
        'Unified multi-engine creator bento workspace with curated 70mm IMAX and 35mm Anamorphic 1-click remix presets.',
        'Integrated Pro v2.8 neural post-production pipeline for 4K/8K tensor upscaling and bilingual Telugu/English audio sync.',
        'Serverless edge orchestration designed for smooth mobile and desktop studio responsiveness.',
      ],
    },
  },
  {
    id: 'dark-stark-smm',
    orderNumber: '02',
    name: 'DARK STARK SMM PANEL',
    exactMediaLabel:
      'DARK STARK SMM PANEL — Full-Stack Serverless E-Commerce & Wallet Platform',
    status: 'LIVE DEPLOYED',
    accentTheme: 'cyan',
    spotlightAccent: 'cyan',
    youtubeUrl: PROJECT_DEMO_VIDEOS.darkStarkSmm,
    fallbackImage: '/src/assets/images/lab_dark_stark_smm_panel_1795187929480.jpg',
    liveUrl: CONTACT_INFO.livePlatformUrl,
    summary:
      'Full-stack serverless Social Media Marketing platform running 2,809+ live API services with bulk order operations, real-time Firestore wallet telemetry, UPI/UTR deposits, and 24/7 support.',
    tags: [
      'React',
      'Cloudflare Pages',
      'Cloudflare Workers',
      'Firebase Auth',
      'Cloud Firestore',
      'Anti-Replay UPI/UTR Verification & Admin Audit',
    ],
    chapters: [
      {
        step: 1,
        seconds: 10,
        title: 'Multi-Platform Catalog',
        description:
          '2,809+ live API services across Instagram, YouTube, Telegram, X, TikTok & Spotify.',
      },
      {
        step: 2,
        seconds: 25,
        title: 'Order Management & Bulk Operations',
        description:
          'Searchable ledger, Copy Order IDs, Bulk Refill & partial auto-refunds.',
      },
      {
        step: 3,
        seconds: 45,
        title: 'Real-Time Wallet & Spend Dashboard',
        description:
          'Live balance tracking, spend analytics & no-refresh order status push.',
      },
      {
        step: 4,
        seconds: 50,
        title: 'UPI Direct Deposit & UTR Verification',
        description:
          'Quick INR tiers, dynamic merchant QR & 12-digit UTR pipeline.',
      },
      {
        step: 5,
        seconds: 55,
        title: '24/7 Support Desk & Verification Portal',
        description:
          'Ticket system linked to Order/Transaction IDs & priority escalation.',
      },
    ],
    architecturePipeline: [
      'React Frontend on Cloudflare Pages with zero-refresh live order state',
      'Cloudflare Workers Edge Proxy hiding upstream SMM provider keys',
      'Firebase Auth & Cloud Firestore atomic wallet + 12-digit UTR ledger',
      'Upstream Multi-Platform Fulfillment & Support Ticket REST APIs',
    ],
    engineeringFocus:
      'High-throughput serverless order automation with tamper-proof wallet transactions and Anti-Replay UPI/UTR Verification & Admin Audit.',
    caseStudy: {
      coreGoal:
        'Deliver a production-ready, zero-server-overhead e-commerce and digital fulfillment platform capable of handling 2,809+ live catalog services, instant UPI/UTR wallet deposits, and real-time order updates.',
      securityHighlights: [
        'Cloudflare Workers Edge Proxy completely isolates upstream SMM provider keys and fulfillment credentials from client JavaScript.',
        'Anti-Replay UPI/UTR Verification & Admin Audit prevents duplicate 12-digit UTR credit claims through Cloud Firestore transaction deduplication.',
        'Firestore Security Rules enforce strict per-user read/write isolation for wallet balances, order histories, and support tickets.',
      ],
      engineeringHighlights: [
        'Deployed globally on Cloudflare Pages for near-instant load speed with zero recurring static hosting bills.',
        'Real-time Firestore listeners push wallet updates, bulk refills, and partial auto-refunds with zero manual page refreshes.',
        '24/7 ticket desk and verification portal linked directly to Order & Transaction IDs for priority resolution.',
      ],
    },
  },
  {
    id: 'jarvis-ai',
    orderNumber: '03',
    name: 'J.A.R.V.I.S. AI',
    exactMediaLabel:
      'J.A.R.V.I.S. (MARK-X) — 3D Holographic Multimodal Assistant & Smart Home Hub',
    status: 'IN DEVELOPMENT',
    accentTheme: 'holo',
    spotlightAccent: 'blue',
    youtubeUrl: PROJECT_DEMO_VIDEOS.jarvisAi,
    fallbackImage: '/src/assets/images/lab_jarvis_hologram_1795180257613.jpg',
    summary:
      '3D holographic multimodal AI command system featuring 137ms omnilingual console, HOLO-CORE optical radar, custom .glb avatar shaders, BLE/Wi-Fi smart home bridge, and bilingual neural voice.',
    tags: [
      'React',
      'Three.js',
      'Multimodal AI API',
      'Neural TTS',
      'Live Camera Vision',
      'Firebase',
    ],
    chapters: [
      {
        step: 1,
        seconds: 7,
        title: 'Omnilingual Multimodal Chat Console',
        description:
          '137ms latency, live Google Search grounding, voice replay & Snap Cam Frame.',
      },
      {
        step: 2,
        seconds: 17,
        title: 'HOLO-CORE Optical Vision & Radar',
        description:
          '16kHz ambient audio/vision radar with one-tap Telugu & English scene analysis.',
      },
      {
        step: 3,
        seconds: 20,
        title: '3D Avatar Engine & IoT Bridge',
        description:
          'Natural/Hologram shaders, custom .glb upload, BLE Scanner & Wi-Fi Smart Home Bridge.',
      },
      {
        step: 4,
        seconds: 23,
        title: 'Holographic Command HUD',
        description:
          'Live telemetry bars (CPU, Memory, Network, Power) & 144ms Fenrir Voice AI.',
      },
      {
        step: 5,
        seconds: 26,
        title: 'AI Utilities Suite & Auth',
        description:
          'Vision AI, Bilingual Call Attendant, Audio Transcriber & secure user authentication.',
      },
    ],
    architecturePipeline: [
      'Three.js Holographic Core & custom .glb shader engine at 60fps',
      'HOLO-CORE 16kHz Audio/Vision Radar & Snap Cam Frame pipeline',
      'BLE Scanner & Wi-Fi Smart Home IoT Bridge + 144ms Fenrir Voice AI',
      'Firebase Auth & Cloud State Sync with Edge-Protected Multimodal APIs',
    ],
    engineeringFocus:
      'Sub-150ms multimodal command turn-around paired with real-time 3D WebGL shaders and IoT hardware control.',
    caseStudy: {
      coreGoal:
        'Combine a responsive 3D holographic WebGL avatar interface with real-time optical vision, bilingual English/Telugu neural speech, and smart-home BLE/Wi-Fi controls in a single web workspace.',
      securityHighlights: [
        'Protected Firebase Authentication guards user command logs, vision sessions, and IoT bridge configurations.',
        'Multimodal AI and Neural TTS API calls route through edge-proxied endpoints to prevent client-side key leakage.',
        'Explicit browser permission scoping for camera, microphone, and Web Bluetooth device scanning.',
      ],
      engineeringHighlights: [
        'Three.js 3D Avatar Engine supporting Natural/Hologram shader toggles and custom .glb model uploads.',
        'HOLO-CORE 16kHz optical vision & radar workspace with Snap Cam Frame and one-tap Telugu & English scene analysis.',
        'Omnilingual console paired with live Google Search grounding, Fenrir Voice AI, and an integrated AI utilities suite.',
      ],
    },
  },
  {
    id: 'jhon-ai',
    orderNumber: '04',
    name: 'JHON AI',
    exactMediaLabel:
      'JHON AI — Real-Time Duplex Voice, Vision & Tactical Device Companion',
    status: 'IN DEVELOPMENT',
    accentTheme: 'emerald',
    spotlightAccent: 'emerald',
    youtubeUrl: PROJECT_DEMO_VIDEOS.jhonAi,
    fallbackImage: '/src/assets/images/lab_jhon_voice_vision_1795180257318.jpg',
    summary:
      'Voice-first full-duplex AI companion engineered with live RMS mic waveform diagnostics, orbital camera & screen share vision, bilingual Telugu/English auto-lift call handling, and explicit device action safety gates.',
    tags: [
      'React',
      'Live Audio/Video Streams',
      'Firebase Auth',
      'Multilingual TTS',
      'Cloudflare Workers',
    ],
    chapters: [
      {
        step: 1,
        seconds: 5,
        title: 'Real-Time Audio RMS Waveform Diagnostics',
        description:
          'Live 30-second mic RMS telemetry with 70% peak alerts.',
      },
      {
        step: 2,
        seconds: 20,
        title: 'Live Duplex Command Center',
        description:
          'Full-duplex Zubenelgenubi / Chirp 3 HD voice interface & live telemetry.',
      },
      {
        step: 3,
        seconds: 25,
        title: 'HOLO-CORE Camera & Screen Share',
        description:
          'Orbital motion-tracking vision workspace with live voice interruption.',
      },
      {
        step: 4,
        seconds: 31,
        title: 'Bilingual Auto-Lift Call Attendant',
        description:
          'Telugu + English away-mode call handling with privacy-masked caller IDs.',
      },
      {
        step: 5,
        seconds: 34,
        title: 'Safety Action Boundary & Device Intents',
        description:
          'Explicit user authorization gate before triggering call or SMS actions.',
      },
    ],
    architecturePipeline: [
      'Live Web Audio RMS Waveform Diagnostics & 70% Peak Telemetry',
      'Full-Duplex Chirp 3 HD Voice Pipeline with live voice interruption',
      'HOLO-CORE Front/Rear Camera & Screen Share Vision Stream',
      'Explicit Authorization Safety Boundary for Call/SMS Intents & Firebase Auth',
    ],
    engineeringFocus:
      'Resilient full-duplex media streams, privacy-masked call automation, and human-in-the-loop safety boundaries.',
    caseStudy: {
      coreGoal:
        'Build a hands-free, full-duplex voice and live-vision AI companion that supports natural bilingual English/Telugu interaction, camera/screen inspection, and strictly gated device actions.',
      securityHighlights: [
        'Human-in-the-loop Safety Action Boundary requires explicit user authorization before executing any call or SMS intent.',
        'Privacy-masked caller ID handling inside the Bilingual Auto-Lift Call Attendant workflow.',
        'Cloudflare Worker edge routing and Firebase Authentication isolate user sessions and protect all AI stream credentials.',
      ],
      engineeringHighlights: [
        'Live 30-second Web Audio RMS waveform diagnostics with automated 70% peak threshold alerts.',
        'Full-duplex voice command center with live barge-in interruption while sharing front/rear camera or desktop screen feeds.',
        'Seamless bilingual English & Telugu speech synthesis tuned for natural real-time conversation.',
      ],
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend & UI Engineering',
    icon: 'layout',
    accent: 'cyan',
    skills: [
      'React',
      'JavaScript (ES6+)',
      'TypeScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'Three.js / 3D Canvas',
      'Responsive Dark-Mode UI/UX',
      'PWA Configuration',
    ],
  },
  {
    id: 'backend-security',
    title: 'Serverless Backend & Cloud Security',
    icon: 'shield',
    accent: 'blue',
    skills: [
      'Cloudflare Workers (API Key Proxy)',
      'Cloudflare Pages',
      'REST API Integration',
      'Edge Routing',
      'Environment Secrets Management',
      'Anti-Replay UPI/UTR Verification & Admin Audit',
    ],
  },
  {
    id: 'database-auth',
    title: 'Database & Authentication',
    icon: 'database',
    accent: 'cyan',
    skills: [
      'Firebase Authentication (Google OAuth & Email/Password)',
      'Cloud Firestore',
      'Real-Time User Wallets & Transaction Ledgers',
      'Firestore Security Rules',
      'Session Logging',
    ],
  },
  {
    id: 'ai-devops',
    title: 'AI Engineering & DevOps',
    icon: 'cpu',
    accent: 'pink',
    skills: [
      'Multimodal LLMs (Text, Live Vision, Voice)',
      'Neural Text-to-Speech (TTS)',
      'Generative Image/Video API Pipelines',
      'Git',
      'GitHub',
      'GitLab',
      'CI/CD Automated Deployments',
    ],
  },
];

export const ARCHITECTURE_STANDARDS: ArchitectureStandard[] = [
  {
    id: 'zero-key-exposure',
    index: '01',
    title: 'Zero Frontend Key Exposure',
    description:
      'Sensitive AI and third-party API keys are never exposed in client-side JavaScript—every external call is isolated behind secure Cloudflare Worker edge proxies.',
    metricLabel: 'Edge Secret Isolation',
    icon: 'lock',
  },
  {
    id: 'serverless-scale',
    index: '02',
    title: 'Real-Time Serverless Scale',
    description:
      "Combining Cloudflare's global edge network with Firebase Auth and Cloud Firestore delivers instant load times, secure user sessions, and real-time database updates.",
    metricLabel: 'Global Edge + Firestore',
    icon: 'zap',
  },
  {
    id: 'modern-cicd',
    index: '03',
    title: 'Modern CI/CD & Version Control',
    description:
      'Structured multi-file codebases managed through Git, GitHub, and GitLab with automated deployments for rapid, reliable shipping.',
    metricLabel: 'Automated Pipelines',
    icon: 'git',
  },
];

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: 'fullstack-platforms',
    title: 'Full-Stack Web Platforms',
    description:
      'High-speed React & Cloudflare storefronts, SaaS portals, and custom admin dashboards.',
    deliverables: ['React + TypeScript SPA', 'Cloudflare Pages & Edge', 'Admin & Order Dashboards'],
    icon: 'globe',
  },
  {
    id: 'custom-ai-apps',
    title: 'Custom AI Voice & Vision Apps',
    description:
      'Real-time multimodal AI assistants, support bots, and generative media web tools.',
    deliverables: ['Live Voice & Camera Vision', 'Neural Bilingual TTS', 'Generative AI Studios'],
    icon: 'sparkles',
  },
  {
    id: 'serverless-wallets',
    title: 'Serverless API & Wallet Systems',
    description:
      'Secure Firebase authentication, real-time user credit/wallet systems, and protected Cloudflare Worker backends.',
    deliverables: ['Zero-Key Edge Proxies', 'Firestore Credit Ledgers', 'Anti-Replay UPI/UTR Verification & Admin Audit'],
    icon: 'server',
  },
];

export const ESTIMATOR_PROJECT_TYPES: EstimatorProjectType[] = [
  {
    id: 'custom-3d-portfolio',
    label: 'Custom 3D Portfolio',
    subtitle: 'Interactive canvas / 3D centerpiece, Liquid Glass UI & mobile-tuned motion',
    minInr: 12000,
    maxInr: 22000,
  },
  {
    id: 'business-website',
    label: 'Business Website',
    subtitle: 'High-conversion product or agency storefront deployed on Cloudflare Edge',
    minInr: 10000,
    maxInr: 18000,
  },
  {
    id: 'ai-api-web-app',
    label: 'AI / API Web App',
    subtitle: 'Multimodal voice/vision assistant, edge proxy backend & Firebase Auth',
    minInr: 25000,
    maxInr: 45000,
  },
  {
    id: 'ui-ux-redesign',
    label: 'UI/UX Redesign',
    subtitle: 'Dark-luxury architecture overhaul, responsive polish & 60fps performance pass',
    minInr: 8000,
    maxInr: 15000,
  },
];

export const ESTIMATOR_FEATURES: EstimatorFeature[] = [
  {
    id: 'interactive-3d-motion',
    label: 'Interactive 3D & Motion',
    detail: 'Custom GPU-tuned 3D canvas or Three.js scene with scroll choreography',
    minInr: 5000,
    maxInr: 10000,
  },
  {
    id: 'custom-domain-seo',
    label: 'Custom Domain & SEO Setup',
    detail: 'DNS routing, SSL, Open Graph previews, sitemap & Lighthouse optimization',
    minInr: 2500,
    maxInr: 4500,
  },
  {
    id: 'ai-chatbot-worker',
    label: 'AI Chatbot / Worker API',
    detail: 'Zero-exposure Cloudflare Worker proxy + custom multimodal AI integration',
    minInr: 7500,
    maxInr: 15000,
  },
  {
    id: 'admin-dashboard',
    label: 'Admin Dashboard',
    detail: 'Firebase Auth, real-time Firestore ledger, analytics & wallet/order controls',
    minInr: 9000,
    maxInr: 18000,
  },
];

export const ESTIMATOR_TIMELINES: EstimatorTimeline[] = [
  {
    id: 'standard',
    label: 'Standard',
    eta: '2 – 4 Weeks',
    multiplier: 1,
    detail: 'Balanced milestone delivery with architecture review & QA polish',
  },
  {
    id: 'priority',
    label: 'Priority',
    eta: '7 – 12 Days',
    multiplier: 1.25,
    detail: 'Accelerated dedicated sprint for urgent launches & rapid shipping',
  },
];

export const PROJECT_TYPES = [
  'Full-Stack Web App',
  'Custom AI Assistant',
  'SaaS / Dashboard',
  'Other',
] as const;
