import { Card, Col, Row, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { CompassOutlined, MessageOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const DemoDashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Link to="/map">
            <Card hoverable>
              <Statistic title="地图导览" value=" " prefix={<CompassOutlined />} />
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Link to="/spots">
            <Card hoverable>
              <Statistic title="景点列表" value=" " prefix={<AppstoreOutlined />} />
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Link to="/chat">
            <Card hoverable>
              <Statistic title="智能客服" value=" " prefix={<MessageOutlined />} />
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Link to="/admin">
            <Card hoverable>
              <Statistic title="后台管理" value=" " prefix={<SettingOutlined />} />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default DemoDashboard;
