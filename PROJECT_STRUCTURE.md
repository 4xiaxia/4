.
├── PROJECT_STRUCTURE.md
├── README.md
├── assets
│   └── images
│       ├── media
│       │   └── agent.mp4
│       └── red_culture
│           ├── litiemng.jpg
│           ├── red.webp
│           ├── songyuanyuan.jpg
│           ├── xinhai.webp
│           ├── zhenchengkuai.jpg
│           └── zhengyuzhi.jpg
├── data
│   ├── event_announcements.json
│   ├── red_culture.json
│   ├── scenic_spots.json
│   ├── self_media.json
│   └── village_figures.json
├── dev.log
├── docs
│   ├── 251207-1857-AGENTS.md
│   ├── 251207-1937-ADM组件映射规范.md
│   ├── 251207-2045-前后端穴位图.md
│   ├── 7.zip
│   ├── AGENTS.md
│   ├── API_KEY_SETUP.md
│   ├── CDN组件改造实施指南.md
│   ├── LIVE_DEMO_GUIDE.md
│   ├── 东里村智能导游系统 - 全新前端架构总结.md
│   ├── 军工思路开发指南.md
│   ├── 前后端路由钩子与通信功能修复验证报告.md
│   ├── 前端视觉优化实施方案.md
│   ├── 后端入口与项目完整性分析报告.md
│   ├── 后端说明书.md
│   ├── 当前进度.md
│   ├── 战略详细提示文档.md
│   ├── 页面组件分析与API交互设计.md
│   ├── 项目摸底报告.md
│   ├── 项目摸底报告_初稿.md
│   ├── 项目文档索引.md
│   ├── 项目深度分析总结报告.md
│   └── 项目深度分析报告.md
├── index.css
├── index.html
├── index.tsx
├── metadata.json
├── package-lock.json
├── package.json
├── scripts
│   ├── pre-demo-check.sh
│   ├── rollback.js
│   ├── rollback.sh
│   ├── setup-demo.js
│   └── setup-demo.sh
├── server.cjs
├── server.log
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── AIBookmark.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── AdminPanelRefactored.tsx
│   │   ├── AgentManager.tsx
│   │   ├── AgentPresenter.tsx
│   │   ├── ArticleDetail.tsx
│   │   ├── BottomChatWidget.tsx
│   │   ├── CelebritySection.tsx
│   │   ├── ChatPageEnhanced.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DemoDashboard.tsx
│   │   ├── FloatingAgentBar.tsx
│   │   ├── Home.tsx
│   │   ├── LocalSpecialsSection.tsx
│   │   ├── LoginPageEnhanced.tsx
│   │   ├── MapView.tsx
│   │   ├── PresenterMode.tsx
│   │   ├── SmartInputBox.tsx
│   │   ├── SpotDetail.tsx
│   │   ├── SpotList.tsx
│   │   ├── TourGuide.tsx
│   │   ├── VillageAgentSystem.tsx
│   │   ├── common
│   │   │   ├── Icon.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── UncleAvatar.tsx
│   │   ├── layout
│   │   │   ├── ResponsiveLayout.tsx
│   │   │   └── VillageLayout.tsx
│   │   └── pages
│   │       ├── VillageHomePage.tsx
│   │       └── VillageLoginPage.tsx
│   ├── config
│   │   └── featureFlags.ts
│   ├── hooks
│   │   └── useGeolocation.ts
│   ├── pages
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminHotKnowledgeConfig.tsx
│   │   ├── AnnouncementPage.tsx
│   │   ├── App.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── CheckInPage.tsx
│   │   ├── FiguresCategoryPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MobileApp.tsx
│   │   ├── NatureSpotsListPage.tsx
│   │   ├── RedCultureListPage.tsx
│   │   ├── SpotDetail.tsx
│   │   ├── SpotDetailPage.tsx
│   │   ├── SpotList.tsx
│   │   ├── SpotListPage.tsx
│   │   ├── UserProfilePage.tsx
│   │   ├── global.css
│   │   └── index.tsx
│   ├── routes
│   │   └── index.tsx
│   ├── services
│   │   ├── APIKeyManager.ts
│   │   ├── AgentCoordinationManager.ts
│   │   ├── CacheNotificationService.ts
│   │   ├── __tests__
│   │   │   └── voiceService.test.example.ts
│   │   ├── adminApiService.ts
│   │   ├── agentA.ts
│   │   ├── agentB_Enhanced.ts
│   │   ├── agentC_RealDataProducer.ts
│   │   ├── agentD.ts
│   │   ├── agentLogService.ts
│   │   ├── agentSystem.ts
│   │   ├── aiService.ts
│   │   ├── apiService.test.ts
│   │   ├── apiService.ts
│   │   ├── blackboardManager.ts
│   │   ├── blackboardSharedPool.ts
│   │   ├── communicationTest.ts
│   │   ├── config.ts
│   │   ├── configService.ts
│   │   ├── geminiService.ts
│   │   ├── highPerformanceDataAccess.ts
│   │   ├── mapService.ts
│   │   ├── minimaxService.ts
│   │   ├── offlineDb.ts
│   │   ├── safeAgentWrapper.ts
│   │   ├── staticData.ts
│   │   ├── supabaseService.ts
│   │   ├── voiceService.improvements.md
│   │   ├── voiceService.ts
│   │   └── voiceService.usage.md
│   ├── styles
│   │   ├── index.ts
│   │   └── theme.ts
│   ├── types
│   │   ├── amap.d.ts
│   │   ├── anp-protocol.ts
│   │   ├── simple-agent-protocol.ts
│   │   └── speech-recognition.d.ts
│   └── utils
│       ├── audioUtils.ts
│       ├── constants.ts
│       ├── demoDataGenerator.ts
│       ├── imageProcessor.ts
│       ├── magicNumbers.ts
│       └── mapUtils.ts
├── tsconfig.json
├── types.ts
└── vite.config.ts

22 directories, 148 files
