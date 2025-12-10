// 后端入口文件：server.cjs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// --- 内存数据库 ---
const spots = [
  { id: '1', name: '东里古樟树', coord: '118.205,25.235', desc: '300年树龄的古樟树...', image: 'https://w.wallhaven.cc/full/qz/wallhaven-qz3l7d.jpg', location: '村口广场东侧', createdAt: '2025-01-01' },
  { id: '2', name: '辛亥革命纪念馆', coord: '118.206,25.236', desc: '纪念辛亥革命历史...', image: 'https://w.wallhaven.cc/full/47/wallhaven-4733ro.jpg', location: '村委会旁边', createdAt: '2025-01-02' },
  { id: '3', name: '清水溪', coord: '118.204,25.237', desc: '清澈见底的小溪...', image: 'https://w.wallhaven.cc/full/k9/wallhaven-k9o2jd.jpg', location: '村西头', createdAt: '2025-01-03' }
];
// ... (其他数据)

// --- API 路由 ---

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API Server is running' });
});

// 获取景点列表
app.get('/api/spots', (req, res) => {
  res.json({ success: true, data: spots });
});

// 获取景点详情
app.get('/api/spots/:id', (req, res) => {
  const spot = spots.find(s => s.id === req.params.id);
  if (spot) {
    res.json({ success: true, data: spot });
  } else {
    res.status(404).json({ success: false, message: 'Spot not found' });
  }
});

// 获取仪表板数据
app.get('/api/admin/analytics/dashboard', (req, res) => {
    res.json({
        success: true,
        data: {
            overview: { totalSubmissions: 120, totalDrafts: 15, totalUsers: 340, todayActive: 45 },
            contentStats: { redCulture: 20, ecology: 35, folk: 25, food: 10, celebrity: 30 },
            recentActivity: [
                { id: '101', name: '新提交：红色故事', type: 'redCulture', createdAt: new Date().toISOString() },
                { id: '102', name: '更新：古树信息', type: 'ecology', createdAt: new Date().toISOString() }
            ]
        }
    });
});


// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 村智能导游系统后端API服务器启动成功!`);
  console.log(`📍 服务地址: http://localhost:${PORT}`);
  console.log(`📚 API文档: http://localhost:${PORT}/api/health`);
  console.log(`⏰ 启动时间: ${new Date().toLocaleString()}`);
});
