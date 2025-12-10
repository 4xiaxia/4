# 项目逻辑与数据流图

本文档使用 Mermaid.js 语法，为您清晰地展示项目的核心业务逻辑和数据流动路径。

## 1. 项目逻辑业务流映射图 (Business Logic Flow)

这张图描绘了用户在“东里村智能导游系统”中的主要交互路径。

```mermaid
graph TD
    subgraph "用户交互层"
        A[访问应用] --> B{选择功能};
        B --> C[浏览景点列表];
        B --> D[查看地图导览];
        B --> E[使用AI智能客服];
        B --> F[进入管理后台];
    end

    subgraph "功能模块"
        C --> G[点击景点查看详情];
        D --> H[点击标记点/导航];
        E --> I[输入问题/语音];
        F --> J[查看数据/提交内容];
    end

    subgraph "核心服务"
        G --> K[景点详情页];
        H --> L[调用地图App/Web导航];
        I --> M[AI模型处理];
        J --> N[后台数据看板/表单];
    end

    subgraph "最终呈现"
        K --> O[展示景点图文];
        L --> P[跳转至导航服务];
        M --> Q[返回AI回答];
        N --> R[更新后台UI];
    end
```

## 2. 总数据流逻辑图 (Overall Data Flow)

这张图展示了数据如何在系统的前后端、API服务以及第三方依赖之间进行流动。

```mermaid
graph TD
    subgraph "前端 (React App)"
        UI(用户界面) -- 发起请求 --> Services(API服务层);
        Services -- 调用后端API --> Backend;
        Services -- 调用第三方AI --> AI_Services;
        Services -- 调用地图SDK --> Map_SDK;
        Services -- 读写 --> Supabase_DB;
    end

    subgraph "后端 (Node.js/Express)"
        Backend(本地API服务器) -- 提供数据 --> UI;
        Backend -- 读/写 --> InMemoryData(内存数据库);
    end

    subgraph "第三方服务"
        AI_Services(SiliconFlow/BigModel/Minimax) -- 返回结果 --> Services;
        Map_SDK(高德地图) -- 返回地图数据/服务 --> UI;
        Supabase_DB(Supabase) -- 返回数据 --> Services;
    end

    subgraph "数据存储"
        InMemoryData;
    end

    %% Styling
    style UI fill:#f9f,stroke:#333,stroke-width:2px
    style Services fill:#ccf,stroke:#333,stroke-width:2px
    style Backend fill:#9cf,stroke:#333,stroke-width:2px
    style AI_Services fill:#f99,stroke:#333,stroke-width:2px
    style Map_SDK fill:#9f9,stroke:#333,stroke-width:2px
    style Supabase_DB fill:#fcf,stroke:#333,stroke-width:2px
```
