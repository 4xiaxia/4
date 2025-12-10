import React, { useEffect, useState } from 'react';
import { List, Card, Spin, Alert, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { getSpots } from '../services/apiService';

const { Title, Paragraph } = Typography;

// 定义景点数据类型
interface Spot {
  id: string;
  name: string;
  desc: string;
  image: string;
}

const SpotList: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await getSpots();
        setSpots(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取景点数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  if (loading) {
    return <Spin tip="正在加载景点..." style={{ display: 'block', marginTop: '50px' }} />;
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <div>
      <Title level={2}>景点列表</Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
        dataSource={spots}
        renderItem={(spot) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={spot.name} src={spot.image || 'https://w.wallhaven.cc/full/qz/wallhaven-qz3l7d.jpg'} />}
              actions={[
                <Link to={`/spots/${spot.id}`}>查看详情</Link>,
              ]}
            >
              <Card.Meta
                title={spot.name}
                description={<Paragraph ellipsis={{ rows: 2 }}>{spot.desc}</Paragraph>}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SpotList;
