import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Spin, Alert, Typography, Image, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getSpotById } from '../services/apiService';
import { Spot } from '../types';

const { Title, Paragraph, Text } = Typography;

const SpotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('未提供景点ID');
      setLoading(false);
      return;
    }

    const fetchSpotDetail = async () => {
      try {
        const response = await getSpotById(id);
        setSpot(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取景点详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchSpotDetail();
  }, [id]);

  if (loading) {
    return <Spin tip="正在加载详情..." style={{ display: 'block', marginTop: '50px' }} />;
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  if (!spot) {
    return <Alert message="未找到该景点" type="warning" showIcon />;
  }

  return (
    <div>
      <Link to="/spots">
        <Button type="primary" icon={<LeftOutlined />} style={{ marginBottom: '20px' }}>
          返回列表
        </Button>
      </Link>
      <Card>
        <Title level={2}>{spot.name}</Title>
        <Image
          width="100%"
          src={spot.image || 'https://w.wallhaven.cc/full/47/wallhaven-4733ro.jpg'}
          alt={spot.name}
          style={{ marginBottom: '20px' }}
        />
        <Paragraph>{spot.desc}</Paragraph>
        <Text strong>位置：</Text><Text>{spot.location || '未知'}</Text>
        <br />
        <Text strong>记录时间：</Text><Text>{spot.createdAt ? new Date(spot.createdAt).toLocaleDateString() : '未知'}</Text>
      </Card>
    </div>
  );
};

export default SpotDetail;
