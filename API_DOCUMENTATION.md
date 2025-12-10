# 前后端数据API接口文档

本文档详细说明了“东里村智能导游系统”的前后端API接口，旨在为开发人员提供清晰、统一的参考。

---

## 认证相关 (`/auth`)

### 1. 发送登录验证码

- **功能描述**: 向指定手机号发送登录验证码。
- **请求**: `POST /auth/send-code`
- **请求体**:
  ```json
  {
    "phone": "13800138000"
  }
  ```
- **前端调用示例**:
  ```typescript
  import { sendLoginCode } from '../services/apiService';
  sendLoginCode('13800138000').then(response => console.log(response.message));
  ```
- **成功响应**:
  ```json
  {
    "success": true,
    "message": "验证码已发送"
  }
  ```

### 2. 使用验证码登录

- **功能描述**: 使用手机号和验证码进行登录，成功后返回用户信息和Token。
- **请求**: `POST /auth/login`
- **请求体**:
  ```json
  {
    "phone": "13800138000",
    "code": "123456"
  }
  ```
- **前端调用示例**:
  ```typescript
  import { loginWithCode } from '../services/apiService';
  loginWithCode('13800138000', '123456').then(response => {
    const token = response.data.token;
    localStorage.setItem('authToken', token);
  });
  ```
- **成功响应**:
  ```json
  {
    "success": true,
    "data": {
      "user": { "id": "user-123", "phone": "13800138000" },
      "token": "some-jwt-token"
    },
    "message": "登录成功"
  }
  ```

---

## 景点相关 (`/spots`)

### 1. 获取景点列表

- **功能描述**: 获取所有景点的列表，支持分页和分类筛选。
- **请求**: `GET /spots`
- **查询参数**:
  - `category` (string, 可选): 景点分类
  - `page` (number, 可选): 页码
  - `limit` (number, 可选): 每页数量
- **前端调用示例**:
  ```typescript
  import { getSpots } from '../services/apiService';
  getSpots({ category: 'nature', page: 1, limit: 10 }).then(response => {
    console.log(response.data); // 景点数组
  });
  ```
- **成功响应**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "1",
        "name": "东里古樟树",
        "coord": "118.205,25.235",
        "desc": "..."
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 1 }
  }
  ```

### 2. 获取景点详情

- **功能描述**: 根据ID获取单个景点的详细信息。
- **请求**: `GET /spots/:id`
- **URL参数**: `id` (string, 必填): 景点的ID。
- **前端调用示例**:
  ```typescript
  import { getSpotById } from '../services/apiService';
  getSpotById('1').then(response => {
    console.log(response.data); // 景点对象
  });
  ```
- **成功响应**:
  ```json
  {
    "success": true,
    "data": {
      "id": "1",
      "name": "东里古樟树",
      "desc": "...",
      "image": "...",
      "location": "..."
    }
  }
  ```

---

## 管理后台相关 (`/admin`)

### 1. 获取仪表板数据

- **功能描述**: 获取管理后台仪表板所需的统计数据。
- **请求**: `GET /admin/analytics/dashboard`
- **认证**: 需要在请求头中携带管理员的 `Authorization: Bearer <token>`。
- **前端调用示例**:
  ```typescript
  import { getDashboardAnalytics } from '../services/apiService';
  getDashboardAnalytics().then(response => {
    console.log(response.data); // 仪表板数据对象
  });
  ```
- **成功响应**:
  ```json
  {
    "success": true,
    "data": {
      "overview": {
        "totalSubmissions": 10,
        "totalUsers": 100,
        "todayActive": 15
      },
      "recentActivity": [
        { "id": "...", "name": "新提交的景点", "type": "ecology", "createdAt": "..." }
      ]
    }
  }
  ```

### 2. 提交新内容

- **功能描述**: 管理员提交新的内容（如景点、人物等）。
- **请求**: `POST /admin/content/submit`
- **认证**: 需要管理员Token。
- **请求体**:
  ```json
  {
    "name": "新景点",
    "type": "ecology",
    "desc": "这是一个新发现的生态景点...",
    "location_desc": "位于村西头的小树林里",
    "recommender_name": "张三"
  }
  ```
- **前端调用示例**:
  ```typescript
  import { submitContent } from '../services/apiService';
  const newContent = { name: '新景点', ... };
  submitContent(newContent).then(response => {
    console.log(response.data); // 新创建的内容对象
  });
  ```
- **成功响应**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "name": "新景点",
      "status": "pending",
      "createdAt": "..."
    },
    "message": "内容提交成功"
  }
  ```
---
*（注：此文档省略了人物、公告、打卡等接口，它们的结构与景点接口类似。）*
