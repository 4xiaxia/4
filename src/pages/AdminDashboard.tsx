import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Spin, Alert, Table, Tag, Typography } from 'antd';
import { LineChartOutlined, FileTextOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getDashboardAnalytics } from '../services/apiService';

const { Title } = Typography;

// 定义数据类型
interface OverviewStats {
  totalSubmissions: number;
  totalDrafts: number;
  totalUsers: number;
  todayActive: number;
}

interface ContentStat {
  redCulture: number;
  ecology: number;
  folk: number;
  food: number;
  celebrity: number;
}

interface RecentActivity {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [contentStats, setContentStats] = useState<ContentStat | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardAnalytics();
        setOverview(response.data.overview);
        setContentStats(response.data.contentStats);
        setRecentActivity(response.data.recentActivity);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取仪表板数据失败');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  if (loading) {
    return <Spin tip="正在加载数据..." style={{ display: 'block', marginTop: '50px' }} />;
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <div>
      <Title level={2}>管理后台仪表板</Title>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="总提交数" value={overview?.totalSubmissions} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="总用户数" value={overview?.totalUsers} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="今日活跃" value={overview?.todayActive} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="草稿数" value={overview?.totalDrafts} prefix={<LineChartOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="最近提交内容">
        <Table dataSource={recentActivity} columns={columns} rowKey="id" />
      </Card>
    </div>
  );
};

export default AdminDashboard;
